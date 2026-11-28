// EKA-EDIT: new file. Storage page service. Blueprint sections 4.3, 4.10, 7, 11. Admin only.
// Endpoints later: GET /storage/summary, GET /storage/suggestions, GET /storage/audit/export,
// POST /documents/{id}/archive, POST /documents/{id}/unarchive, DELETE /documents/{id}.
import { db, getReadableActiveDocuments } from "./mockDb.js";
import { clone, delay, paginate, ServiceError } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";
import {
  archiveDocument,
  deleteDocument,
  getArchivedDocuments,
  unarchiveDocument,
} from "./documentService.js";
import { consumeVerificationToken } from "./twoFactorService.js";
import { getIdleDays } from "../utils/getIdleDays.js";
import {
  DEFAULT_IDLE_DAYS,
  DEFAULT_LARGE_MB,
  STORAGE_QUOTA_BYTES,
} from "../config/storageConfig.js";

const FORMATS = ["pdf", "docx", "md", "csv", "txt"];
const KINDS = ["large", "stale", "failed", "duplicates"];
const MB = 1024 * 1024;

function assertAdmin() {
  if (getMockCurrentUser()?.role !== "admin") throw new ServiceError(403, "Only the admin can use Storage Management");
}

const sumBytes = (docs) => docs.reduce((s, d) => s + d.sizeBytes, 0);
const activeDocs = () => getReadableActiveDocuments(getMockCurrentUser());

// Protected documents never count as reclaimable.
const reclaimable = (docs) => sumBytes(docs.filter((d) => !d.isProtected));

function matchKind(docs, kind, { days, minSizeBytes }) {
  if (kind === "large") return docs.filter((d) => d.sizeBytes > minSizeBytes);
  if (kind === "stale") return docs.filter((d) => getIdleDays(d) > days);
  if (kind === "failed") return docs.filter((d) => d.status === "failed");
  // duplicates: same contentHash, counted over all active documents
  const counts = new Map();
  docs.forEach((d) => counts.set(d.contentHash, (counts.get(d.contentHash) ?? 0) + 1));
  return docs.filter((d) => counts.get(d.contentHash) > 1);
}

function applyScope(docs, { departmentId, format, q }) {
  const needle = q?.trim().toLowerCase();
  return docs
    .filter((d) => !departmentId || d.departmentId === departmentId)
    .filter((d) => !format || d.format === format)
    .filter((d) => !needle || d.title.toLowerCase().includes(needle) || d.fileName.toLowerCase().includes(needle));
}

const SORTERS = {
  "size-desc": (a, b) => b.sizeBytes - a.sizeBytes,
  "size-asc": (a, b) => a.sizeBytes - b.sizeBytes,
  "name-asc": (a, b) => a.title.localeCompare(b.title),
  "name-desc": (a, b) => b.title.localeCompare(a.title),
  "opened-asc": (a, b) => getIdleDays(b) - getIdleDays(a), // least recently opened first
};

const withDefaults = (f = {}) => ({
  days: DEFAULT_IDLE_DAYS,
  minSizeBytes: DEFAULT_LARGE_MB * MB,
  ...f,
});

// GET /storage/summary
// Raw numbers only. Percent, share, "GB" text are derived in the UI.
/**
 * @returns {Promise<{quotaBytes:number, usedBytes:number, documentCount:number, reclaimableBytes:number,
 *   recycleBinCount:number, byDepartment:{departmentId:string, documentCount:number, sizeBytes:number}[],
 *   byFormat:{format:string, fileCount:number, sizeBytes:number}[]}>}
 */
export async function getStorageSummary() {
  await delay();
  assertAdmin();
  const docs = activeDocs();
  return clone({
    quotaBytes: STORAGE_QUOTA_BYTES,
    usedBytes: sumBytes(docs),
    documentCount: docs.length,
    reclaimableBytes: reclaimable(docs.filter((d) => getIdleDays(d) > DEFAULT_IDLE_DAYS)),
    recycleBinCount: db.documents.filter((d) => d.archivedAt).length,
    byDepartment: db.departments.map((dep) => {
      const own = docs.filter((d) => d.departmentId === dep.id);
      return { departmentId: dep.id, documentCount: own.length, sizeBytes: sumBytes(own) };
    }),
    byFormat: FORMATS.map((format) => {
      const own = docs.filter((d) => d.format === format);
      return { format, fileCount: own.length, sizeBytes: sumBytes(own) };
    }),
  });
}

// GET /storage/suggestions?kind=&days=&minSizeBytes=&departmentId=&format=&q=&sortBy=&limit=&offset=
// kind: large | stale | failed | duplicates. Items are the light documents (blueprint 4.3).
// reclaimableBytes covers ALL matches, not only this page, protected excluded.
/**
 * @param {{kind: 'large'|'stale'|'failed'|'duplicates', days?: number, minSizeBytes?: number,
 *   departmentId?: string, format?: string, q?: string, sortBy?: string, limit?: number, offset?: number}} filters
 */
export async function getSuggestions(filters) {
  await delay();
  assertAdmin();
  const { kind, sortBy = "size-desc", limit = 10, offset = 0 } = filters ?? {};
  if (!KINDS.includes(kind)) throw new ServiceError(422, "Unknown suggestion kind");
  if (!SORTERS[sortBy]) throw new ServiceError(422, "Unknown sort");

  const matches = applyScope(matchKind(activeDocs(), kind, withDefaults(filters)), filters ?? {});
  matches.sort(kind === "duplicates"
    ? (a, b) => a.contentHash.localeCompare(b.contentHash) || SORTERS[sortBy](a, b)
    : SORTERS[sortBy]);

  return clone({ ...paginate(matches, limit, offset), reclaimableBytes: reclaimable(matches) });
}

// Tab badges. Same filters as getSuggestions, one count per kind.
/** @returns {Promise<{large:number, stale:number, failed:number, duplicates:number}>} */
export async function getSuggestionCounts(filters = {}) {
  await delay();
  assertAdmin();
  const f = withDefaults(filters);
  const count = (kind) => applyScope(matchKind(activeDocs(), kind, f), f).length;
  return { large: count("large"), stale: count("stale"), failed: count("failed"), duplicates: count("duplicates") };
}

// ---- Recycle Bin ----
// GET /documents?archived=true
export const getRecycleBin = (paging) => getArchivedDocuments(paging);

// POST /documents/{id}/unarchive
export async function restoreDocument(id) {
  assertAdmin();
  return unarchiveDocument(id);
}

// ---- Bulk actions (no new endpoint: one call per document) ----
async function runBulk(ids, action) {
  const succeeded = [];
  const failed = [];
  for (const id of ids) {
    try {
      await action(id);
      succeeded.push(id);
    } catch (err) {
      failed.push({ id, status: err.status ?? 500, message: err.message });
    }
  }
  return { succeeded, failed };
}

/** Move to Recycle Bin = archive (also unpins). @returns {Promise<{succeeded:string[], failed:{id:string,status:number,message:string}[]}>} */
export async function archiveDocuments(ids) {
  assertAdmin();
  return runBulk(ids, archiveDocument);
}

// Permanent delete. A protected document is refused with 409 and a clear message.
// verificationToken (2FA) is optional: the UI asks for it on single purge from the bin.
/** @returns {Promise<{succeeded:string[], failed:{id:string,status:number,message:string}[]}>} */
export async function purgeDocuments(ids, { verificationToken } = {}) {
  assertAdmin();
  if (verificationToken) consumeVerificationToken(verificationToken);
  return runBulk(ids, async (id) => {
    const doc = db.documents.find((d) => d.id === id);
    if (doc?.isProtected) {
      throw new ServiceError(
        409,
        `This document is protected and cannot be deleted. Protection is applied for compliance reasons: ${doc.protectedReason}. Contact your administrator to review its protection status.`,
      );
    }
    return deleteDocument(id);
  });
}

// ---- Export ----
const csvCell = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// GET /storage/audit/export  (backend later returns the file itself)
/** @returns {Promise<{fileName:string, mimeType:string, content:string}>} */
export async function exportStorageAudit() {
  await delay();
  assertAdmin();
  const deptName = new Map(db.departments.map((d) => [d.id, d.name]));
  const dupCounts = new Map();
  db.documents.filter((d) => !d.archivedAt).forEach((d) => dupCounts.set(d.contentHash, (dupCounts.get(d.contentHash) ?? 0) + 1));

  const header = [
    "Document ID", "Title", "File Name", "Format", "Department", "Location", "Status",
    "Size (bytes)", "Size (MB)", "Protected", "Uploaded At", "Last Opened At", "Last Cited At",
    "Idle Days", "Archived At", "Flags",
  ];
  const rows = db.documents.map((d) => {
    const flags = [];
    if (!d.archivedAt) {
      if (d.sizeBytes > DEFAULT_LARGE_MB * MB) flags.push("large");
      if (getIdleDays(d) > DEFAULT_IDLE_DAYS) flags.push("stale");
      if (d.status === "failed") flags.push("failed");
      if (dupCounts.get(d.contentHash) > 1) flags.push("duplicate");
    }
    return [
      d.id, d.title, d.fileName, d.format.toUpperCase(), deptName.get(d.departmentId) ?? "",
      d.archivedAt ? "Recycle Bin" : "Active", d.status, d.sizeBytes, (d.sizeBytes / MB).toFixed(2),
      d.isProtected ? "Yes" : "No", d.uploadedAt, d.lastOpenedAt ?? "", d.lastCitedAt ?? "",
      getIdleDays(d), d.archivedAt ?? "", flags.join("; "),
    ];
  });

  const content = "\uFEFF" + [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
  return {
    fileName: `eka-storage-audit-${new Date().toISOString().slice(0, 10)}.csv`,
    mimeType: "text/csv;charset=utf-8",
    content,
  };
}