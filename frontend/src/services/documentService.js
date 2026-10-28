import { canReadDocument } from "../utils/canReadDocument.js";
import { sharedKeywords } from "../utils/sharedKeywords.js";
import { db, getInsightRow, getReadableActiveDocuments } from "./mockDb.js";
import { clone, delay, paginate } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for documents (read side). Shapes: data-architecture.md sections 4.3
// to 4.7 and 10.1. Writes (pin, archive, reindex, upload) come in the next commit.
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