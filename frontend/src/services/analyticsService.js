import { canReadDocument } from "../utils/canReadDocument.js";
import { canReindexCollection } from "../utils/departmentPermissions.js";
import { canManageDocument } from "../utils/documentPermissions.js";
import { db } from "./mockDb.js";
import { clone, delay, nowIso, ServiceError } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for Analytics. Shapes: data-architecture.md sections 4.8 and 4.9.
// Nothing here is stored: every total is computed on each call (blueprint rule 6).
// Only the admin and managers may call it, and only aggregates leave this file:
// no raw question text and no individual askers (blueprint 4.8).

const MONTHS_SHOWN = 6; // bars on the audit-conflicts chart
const DAY_MS = 24 * 60 * 60 * 1000;

// Blueprint 4.9: the resolution values each kind of finding accepts.
const RESOLUTIONS = {
  contradiction: ["superseded_document", "edited_document", "not_a_conflict"],
  knowledge_gap: ["document_added", "not_needed"],
};
// Closed without any change to the documents, so the status is "dismissed".
const DISMISSING = ["not_a_conflict", "not_needed"];

/** Admin and managers only (employees get no analytics). */
export const canViewAnalytics = (user) => user?.role === "admin";

function requireViewer() {
  const user = getMockCurrentUser();
  if (!canViewAnalytics(user)) throw new ServiceError(403, "Analytics is available to administrators and managers");
  return user;
}

// Blueprint 4.9: the admin sees every finding. A manager sees a finding when it
// belongs to their department and they can read every document in documentIds, so
// a quote from a document the viewer cannot read is never shown.
function canSeeFinding(user, finding) {
  if (user.role === "admin") return true;
  if (finding.departmentId !== user.departmentId) return false;
  return finding.documentIds.every((id) => {
    const doc = db.documents.find((d) => d.id === id);
    return Boolean(doc) && canReadDocument(user, doc);
  });
}

function countBy(rows, keyOf) {
  const counts = new Map();
  for (const row of rows) counts.set(keyOf(row), (counts.get(keyOf(row)) ?? 0) + 1);
  return counts;
}

// GET /analytics/findings?kind=&status=
/**
 * @param {{kind?: 'contradiction'|'knowledge_gap', status?: 'open'|'resolved'|'dismissed'}} [filters]
 * @returns {Promise<import('../types').Finding[]>}
 */
export async function getFindings(filters = {}) {
  await delay();
  const user = requireViewer();
  const { kind, status } = filters;
  return clone(
    db.findings
      .filter((f) => canSeeFinding(user, f))
      .filter((f) => kind === undefined || f.kind === kind)
      .filter((f) => status === undefined || f.status === status)
      .sort((a, b) => b.detectedAt.localeCompare(a.detectedAt) || a.id.localeCompare(b.id)),
  );
}

// "Deprecate snippet" (blueprint 4.9): the older document is marked as superseded
// by the newer one, so retrieval skips or down-ranks it. Checked BEFORE anything
// is written.
function supersedeOlderDocument(user, finding) {
  const documents = finding.evidence.claims
    .map((claim) => db.documents.find((d) => d.id === claim.documentId))
    .filter(Boolean)
    .sort((a, b) => a.uploadedAt.localeCompare(b.uploadedAt));
  if (documents.length < 2) throw new ServiceError(422, "Both documents must still exist to deprecate one");

  const older = documents[0];
  const newer = documents[documents.length - 1];
  if (!canManageDocument(user, older)) throw new ServiceError(403, "You are not allowed to change the older document");

  older.supersededById = newer.id;
  older.updatedAt = nowIso();
}

// PATCH /findings/{id}  { resolution }  (admin, or that department's manager)
// Never automatic: a person confirms every resolution (blueprint 4.9).
/**
 * @param {string} id
 * @param {string} resolution  one of RESOLUTIONS for the finding's kind
 * @returns {Promise<import('../types').Finding>}
 */
export async function resolveFinding(id, resolution) {
  await delay();
  const user = requireViewer();
  const finding = db.findings.find((f) => f.id === id);
  if (!finding || !canSeeFinding(user, finding)) throw new ServiceError(404, "Finding not found");
  // Same rule as managing a department's documents: the admin, or that department's manager.
  if (!canReindexCollection(user, finding.departmentId)) {
    throw new ServiceError(403, "You are not allowed to resolve this finding");
  }
  if (finding.status !== "open") throw new ServiceError(409, "This finding is already closed");
  if (!RESOLUTIONS[finding.kind].includes(resolution)) {
    throw new ServiceError(422, `Resolution must be one of: ${RESOLUTIONS[finding.kind].join(", ")}`);
  }

  if (resolution === "superseded_document") supersedeOlderDocument(user, finding);

  Object.assign(finding, {
    status: DISMISSING.includes(resolution) ? "dismissed" : "resolved",
    resolvedAt: nowIso(),
    resolvedById: user.id,
    resolution,
  });
  return clone(finding);
}

// GET /analytics/summary?range=30d
// Counts only what the viewer may read. `range` is a number of days with a "d"
// suffix ("7d", "30d", "90d").
/**
 * @param {string} range
 * @returns {Promise<{
 *   citations: {total: number, byDepartment: {departmentId: string, count: number}[], byDocument: {documentId: string, count: number}[]},
 *   scannedChunks: number,
 *   conflictsByMonth: {month: string, count: number}[],
 *   gaps: {unanswered: number, lowSimilarity: number},
 *   usage: {activeUsers: number, documentsAccessed: number},
 * }>}
 */
export async function getAnalyticsSummary(range) {
  await delay();
  const user = requireViewer();
  const days = Number.parseInt(range, 10);
  if (!(days > 0)) throw new ServiceError(422, "Unknown range");
  const cutoff = Date.now() - days * DAY_MS;

  const readable = db.documents.filter((doc) => canReadDocument(user, doc));
  const readableIds = new Set(readable.map((doc) => doc.id));
  const departmentOf = new Map(db.documents.map((doc) => [doc.id, doc.departmentId]));

  // Events in the range, minus those about documents the viewer cannot read.
  const events = db.activityEvents
    .filter((e) => new Date(e.occurredAt).getTime() >= cutoff)
    .filter((e) => e.documentId === null || readableIds.has(e.documentId));
  const cited = events.filter((e) => e.type === "cited");
  const unanswered = events.filter((e) => e.type === "question_unanswered");

  const citedByDepartment = countBy(cited, (e) => departmentOf.get(e.documentId));
  const citedByDocument = countBy(cited, (e) => e.documentId);

  // Contradictions per calendar month, for the last MONTHS_SHOWN months.
  const contradictions = db.findings.filter((f) => f.kind === "contradiction" && canSeeFinding(user, f));
  const now = new Date();
  const conflictsByMonth = Array.from({ length: MONTHS_SHOWN }, (_, i) => {
    const first = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (MONTHS_SHOWN - 1 - i), 1));
    const month = first.toISOString().slice(0, 7); // "2026-10"
    return { month, count: contradictions.filter((f) => f.detectedAt.startsWith(month)).length };
  });

  return clone({
    citations: {
      total: cited.length,
      byDepartment: db.departments.map((d) => ({ departmentId: d.id, count: citedByDepartment.get(d.id) ?? 0 })),
      byDocument: [...citedByDocument].map(([documentId, count]) => ({ documentId, count })),
    },
    scannedChunks: readable.filter((doc) => !doc.archivedAt).reduce((sum, doc) => sum + doc.chunkCount, 0),
    conflictsByMonth,
    gaps: {
      unanswered: unanswered.filter((e) => e.payload.reason === "no_results").length,
      lowSimilarity: unanswered.filter((e) => e.payload.reason === "low_similarity").length,
    },
    usage: {
  // Unique members who performed meaningful activity
  activeMembers: new Set(
    events
      .filter((e) =>
        ["question_asked", "opened", "cited"].includes(e.type)
      )
      .map((e) => e.userId)
      .filter(Boolean)
    ).size,

    // Unique documents cited in AI-generated answers
    documentsCited: new Set(
        cited
        .map((e) => e.documentId)
        .filter(Boolean)
        ).size,
    },
  });
}