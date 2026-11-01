import { canReadDocument } from "../utils/canReadDocument.js";
import { canManageDocument, canPinDocuments, canUploadToDepartment } from "../utils/documentPermissions.js";
import { sharedKeywords } from "../utils/sharedKeywords.js";
import { db, getInsightRow, getReadableActiveDocuments, nextDocumentId } from "./mockDb.js";
import { clone, delay, nowIso, paginate, ServiceError } from "./mockHelpers.js";
import { startIngestionAttempt } from "./mockIngestion.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for documents. Shapes: data-architecture.md sections 4.3 to 4.7 and
// 10.1. Reads come first, writes at the end of the file.
// A document that does not exist and one the viewer may not read look the same:
// the per-document functions resolve to null.

const DEFAULT_LIMIT = 50;

// Looks up one document and applies the read rule. null = not found OR not allowed.
function findReadableDocument(id) {
  const doc = db.documents.find((d) => d.id === id);
  return doc && canReadDocument(getMockCurrentUser(), doc) ? doc : null;
}

// List search: title, description and file name, plus the knowledge tags
// (insight keywords) of a ready insight. Searching INSIDE the text is Semantic
// Search's job, not this filter's.
function matchesQuery(doc, needle) {
  const insight = getInsightRow(doc.id);
  const tags = insight?.status === "ready" ? insight.keywords.map((k) => k.term) : [];
  return [doc.title, doc.description, doc.fileName, ...tags].some((text) =>
    text.toLowerCase().includes(needle),
  );
}

// GET /documents?departmentId=&status=&pinned=&q=&limit=&offset=
// Only documents the viewer may read; archived ones are never listed here.
// Newest update first, except a pinned list, which uses the pin order (pinnedAt).
/**
 * @param {{departmentId?: string, status?: import('../types').DocumentStatus, pinned?: boolean, q?: string, limit?: number, offset?: number}} [filters]
 * @returns {Promise<{total: number, limit: number, offset: number, items: import('../types').Document[]}>}
 */
export async function getDocuments(filters = {}) {
  await delay();
  const { departmentId, status, pinned, q, limit = DEFAULT_LIMIT, offset = 0 } = filters;
  const needle = q?.trim().toLowerCase();

  const matches = getReadableActiveDocuments(getMockCurrentUser())
    .filter((doc) => departmentId === undefined || doc.departmentId === departmentId)
    .filter((doc) => status === undefined || doc.status === status)
    .filter((doc) => pinned === undefined || doc.isPinned === pinned)
    .filter((doc) => !needle || matchesQuery(doc, needle))
    .sort((a, b) =>
      pinned === true
        ? b.pinnedAt.localeCompare(a.pinnedAt)
        : b.updatedAt.localeCompare(a.updatedAt) || a.id.localeCompare(b.id),
    );

  const page = paginate(matches, limit, offset);
  return clone(page);
}

// The org-wide pins, in pin order. Same as GET /documents?pinned=true.
/** @returns {Promise<import('../types').Document[]>} */
export async function getPinnedDocuments() {
  return (await getDocuments({ pinned: true })).items;
}

// GET /documents/{id}  (an archived document is readable by the admin and that
// department's manager only; canReadDocument handles it)
/** @returns {Promise<import('../types').Document|null>} */
export async function getDocument(id) {
  await delay();
  const doc = findReadableDocument(id);
  return doc ? clone(doc) : null;
}

// GET /documents/{id}/sections  (null = no such readable document; [] = it has
// no sections yet, e.g. still processing)
/** @returns {Promise<import('../types').DocumentSection[]|null>} */
export async function getDocumentSections(id) {
  await delay();
  if (!findReadableDocument(id)) return null;
  return clone(db.sections.filter((s) => s.documentId === id).sort((a, b) => a.index - b.index));
}

// GET /documents/{id}/related?limit=5
// Real backend: a live pgvector query. Here: the hand-written related table,
// filtered to what the viewer may read, with the "why related" keywords added.
/** @returns {Promise<import('../types').RelatedDocument[]|null>} */
export async function getRelatedDocuments(id, limit = 5) {
  await delay();
  if (!findReadableDocument(id)) return null;

  const user = getMockCurrentUser();
  const source = getInsightRow(id);
  const results = [];
  for (const row of db.related.filter((r) => r.documentId === id)) {
    const doc = db.documents.find((d) => d.id === row.relatedDocumentId);
    if (!doc || !canReadDocument(user, doc)) continue; // never reveal unreadable documents
    const target = getInsightRow(doc.id);
    results.push({
      document: doc,
      score: row.score,
      sharedKeywords: source && target ? sharedKeywords(source, target) : [],
    });
  }
  return clone(results.sort((a, b) => b.score - a.score).slice(0, limit));
}

// GET /documents/{id}/ingestion
/** @returns {Promise<import('../types').DocumentIngestion|null>} */
export async function getIngestion(id) {
  await delay();
  if (!findReadableDocument(id)) return null;
  const row = db.ingestion.find((r) => r.documentId === id);
  return row ? clone(row) : null;
}

// ── writes ──────────────────────────────────────────────────────────
// Every write enforces the permission table in data-architecture.md section 4.3
// itself; hiding a button in the UI is never the real check. A refused write
// throws a ServiceError (status 403, 404, 409 or 422, like HTTP).

const SUPPORTED_FORMATS = ["pdf", "docx", "md", "csv", "txt"];
const VISIBILITIES = ["organization", "department"];
const EDITABLE_FIELDS = ["title", "description", "authorName", "visibility"];

// The document, only if the viewer may read it (else 404) and manage it (else 403).
function getManageableDocument(id) {
  const doc = findReadableDocument(id);
  if (!doc) throw new ServiceError(404, "Document not found");
  if (!canManageDocument(getMockCurrentUser(), doc)) {
    throw new ServiceError(403, "You are not allowed to change this document");
  }
  return doc;
}

// SHA-256 of the file content, so two uploads of the same file are detected as
// duplicates (the Storage page). crypto.subtle only exists on secure origins
// (https or localhost).
async function computeContentHash(file) {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  const hex = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `sha256:${hex}`;
}

// Validates an uploaded File and returns the fields that depend on it.
async function readUploadedFile(file) {
  const extension = file?.name?.split(".").pop()?.toLowerCase();
  if (!SUPPORTED_FORMATS.includes(extension)) {
    throw new ServiceError(422, `Unsupported file type. Allowed: ${SUPPORTED_FORMATS.join(", ")}`);
  }
  if (!(file.size > 0)) throw new ServiceError(422, "The file is empty");
  if (typeof file.arrayBuffer !== "function") throw new ServiceError(422, "Expected a File");
  return {
    fileName: file.name,
    format: extension,
    sizeBytes: file.size,
    contentHash: await computeContentHash(file),
  };
}

// "Quarterly_Plan_v2.docx" -> "Quarterly Plan v2" (used when no title is given)
const titleFromFileName = (fileName) => fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();

// PUT /documents/{id}/pin   { pinned: boolean }   (admin only; idempotent)
/** @returns {Promise<import('../types').Document>} */
export async function setPinned(id, pinned) {
  await delay(80);
  if (typeof pinned !== "boolean") throw new ServiceError(422, "pinned must be true or false");
  const doc = findReadableDocument(id);
  if (!doc) throw new ServiceError(404, "Document not found");
  if (!canPinDocuments(getMockCurrentUser())) throw new ServiceError(403, "Only the admin can pin documents");
  if (doc.archivedAt) throw new ServiceError(409, "An archived document cannot be pinned");

  if (doc.isPinned !== pinned) {
    doc.isPinned = pinned;
    doc.pinnedAt = pinned ? nowIso() : null; // pinnedAt gives the pin order
  }
  return clone(doc);
}

// POST /documents/{id}/archive
// An archived document leaves every list and count, and loses its pin.
/** @returns {Promise<import('../types').Document>} */
export async function archiveDocument(id) {
  await delay();
  const doc = getManageableDocument(id);
  if (doc.archivedAt) throw new ServiceError(409, "The document is already archived");

  const now = nowIso();
  Object.assign(doc, { archivedAt: now, updatedAt: now, isPinned: false, pinnedAt: null });
  return clone(doc);
}

// PATCH /documents/{id}   { title?, description?, authorName?, visibility? }
// Only these fields: department, file and counts are not editable here, because
// moving a document changes who can read it.
/**
 * @param {string} id
 * @param {{title?: string, description?: string, authorName?: string|null, visibility?: import('../types').DocumentVisibility}} changes
 * @returns {Promise<import('../types').Document>}
 */
export async function updateDocument(id, changes) {
  await delay();
  const doc = getManageableDocument(id);

  const keys = Object.keys(changes ?? {});
  if (keys.length === 0) throw new ServiceError(422, "No changes given");
  const notEditable = keys.filter((key) => !EDITABLE_FIELDS.includes(key));
  if (notEditable.length > 0) throw new ServiceError(422, `These fields cannot be changed: ${notEditable.join(", ")}`);

  // Validate everything first so a bad field never leaves a half-applied edit
  const next = {};
  if ("title" in changes) {
    next.title = String(changes.title ?? "").trim();
    if (!next.title) throw new ServiceError(422, "The title cannot be empty");
  }
  if ("description" in changes) next.description = String(changes.description ?? "").trim();
  if ("authorName" in changes) next.authorName = String(changes.authorName ?? "").trim() || null;
  if ("visibility" in changes) {
    if (!VISIBILITIES.includes(changes.visibility)) throw new ServiceError(422, "Unknown visibility");
    next.visibility = changes.visibility;
  }

  Object.assign(doc, next, { updatedAt: nowIso() });
  return clone(doc);
}

// POST /documents/{id}/reindex
// Starts a new attempt; the document is "processing" until the mock finishes it.
// A ready document keeps its counts while re-indexing (same file, so same counts).
/** @returns {Promise<import('../types').Document>} */
export async function reindexDocument(id) {
  await delay();
  const doc = getManageableDocument(id);
  if (doc.status === "processing") throw new ServiceError(409, "The document is already being indexed");

  startIngestionAttempt(id);
  return clone(doc);
}

// POST /documents   (file + metadata)
// Admin: any department. Manager: own department only. Employee: never.
// The document starts "processing" with null counts; ingestion fills them in.
/**
 * @param {File} file
 * @param {{departmentId: string, title?: string, description?: string, authorName?: string|null, visibility?: import('../types').DocumentVisibility}} metadata
 * @returns {Promise<import('../types').Document>}
 */
export async function uploadDocument(file, metadata = {}) {
  await delay();
  const user = getMockCurrentUser();
  const { departmentId, title, description, authorName, visibility = "organization" } = metadata;

  if (!canUploadToDepartment(user, departmentId)) {
    throw new ServiceError(403, "You cannot upload to this department");
  }
  if (!db.departments.some((d) => d.id === departmentId)) throw new ServiceError(422, "Unknown department");
  if (!VISIBILITIES.includes(visibility)) throw new ServiceError(422, "Unknown visibility");
  const fileFields = await readUploadedFile(file);

  const now = nowIso();
  /** @type {import('../types').Document} */
  const doc = {
    id: nextDocumentId(),
    title: title?.trim() || titleFromFileName(fileFields.fileName),
    fileName: fileFields.fileName,
    format: fileFields.format,
    description: description?.trim() ?? "",
    departmentId,
    uploadedById: user.id,
    authorName: authorName?.trim() || null,
    visibility,
    sizeBytes: fileFields.sizeBytes,
    pageCount: null,
    wordCount: null,
    contentHash: fileFields.contentHash,
    status: "processing",
    chunkCount: 0,
    isPinned: false,
    pinnedAt: null,
    isProtected: false,
    protectedReason: null,
    supersededById: null,
    archivedAt: null,
    uploadedAt: now,
    updatedAt: now,
    lastIndexedAt: null,
    lastOpenedAt: null,
    lastCitedAt: null,
  };
  db.documents.push(doc);
  startIngestionAttempt(doc.id);
  return clone(doc);
}

// PUT /documents/{id}/file
// Overwrites the file in place (no version history), drops the sections and the
// insight (they are rebuilt from the new file) and restarts ingestion.
/**
 * @param {string} id
 * @param {File} file
 * @returns {Promise<import('../types').Document>}
 */
export async function replaceDocumentFile(id, file) {
  await delay();
  const doc = getManageableDocument(id);
  if (doc.status === "processing") throw new ServiceError(409, "The document is already being indexed");
  const fileFields = await readUploadedFile(file);

  Object.assign(doc, fileFields, {
    status: "processing",
    pageCount: null,
    wordCount: null,
    chunkCount: 0,
    lastIndexedAt: null,
    updatedAt: nowIso(),
  });
  db.sections = db.sections.filter((s) => s.documentId !== id);
  db.insights = db.insights.filter((i) => i.documentId !== id);
  startIngestionAttempt(id);
  return clone(doc);
}

// DELETE /documents/{id}
// A protected document cannot be deleted (blueprint 4.3). Everything that belonged
// to the document goes with it, like the SQL cascades; a document it superseded
// just loses the link (ON DELETE SET NULL).
/** @returns {Promise<{id: string}>} */
export async function deleteDocument(id) {
  await delay();
  const user = getMockCurrentUser();
  const doc = findReadableDocument(id);
  if (!doc) throw new ServiceError(404, "Document not found");
  if (!canManageDocument(user, doc)) throw new ServiceError(403, "You are not allowed to delete this document");
  if (doc.isProtected) {
    throw new ServiceError(user.role === "admin" ? 409 : 403, "A protected document cannot be deleted");
  }

  db.documents = db.documents.filter((d) => d.id !== id);
  for (const other of db.documents) if (other.supersededById === id) other.supersededById = null;
  db.sections = db.sections.filter((s) => s.documentId !== id);
  db.insights = db.insights.filter((i) => i.documentId !== id);
  db.ingestion = db.ingestion.filter((r) => r.documentId !== id);
  db.bookmarks = db.bookmarks.filter((b) => b.documentId !== id);
  db.activityEvents = db.activityEvents.filter((e) => e.documentId !== id);
  db.related = db.related.filter((r) => r.documentId !== id && r.relatedDocumentId !== id); // mock-only table
  return { id };
}