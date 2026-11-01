import { db } from "./mockDb.js";
import { nowIso } from "./mockHelpers.js";

// MOCK-ONLY simulation of the ingestion pipeline (extract, chunk, embed, index).
// Nothing real runs, so a timer finishes each attempt. Deleted in Phase C, where
// the backend's pipeline does this work and the service only reads the result.

export const MOCK_INGESTION_MS = 1500;

// MOCK-ONLY estimate of what extraction would find. The numbers are made up from
// the file size, but deterministic, so the same file always gives the same result.
// pdf/docx have pages; csv has no word count (matches the seed data).
export function estimateIndexingResult(format, sizeBytes) {
  const textUnits = Math.max(1, Math.round(sizeBytes / 6));
  return {
    pageCount: format === "pdf" || format === "docx" ? Math.max(1, Math.ceil(textUnits / 300)) : null,
    wordCount: format === "csv" ? null : textUnits,
    chunkCount: Math.max(1, Math.ceil(textUnits / 80)),
  };
}

/**
 * Starts a new attempt on the document's ingestion row (creating the row for a
 * new document) and sets the document to "processing". A retry is another attempt
 * on the SAME row: there is no version history (blueprint 4.7).
 */
export function startIngestionAttempt(documentId) {
  const doc = db.documents.find((d) => d.id === documentId);
  let row = db.ingestion.find((r) => r.documentId === documentId);
  if (!row) {
    row = { documentId, status: "queued", step: "extraction", errorMessage: null, attempt: 0, attempts: [], startedAt: null, finishedAt: null };
    db.ingestion.push(row);
  }

  const startedAt = nowIso();
  const attempt = row.attempt + 1;
  row.attempts.push({ attempt, step: "extraction", status: "running", errorMessage: null, startedAt, finishedAt: null });
  Object.assign(row, { status: "running", step: "extraction", errorMessage: null, attempt, startedAt, finishedAt: null });
  doc.status = "processing";

  setTimeout(() => completeIngestionAttempt(documentId, attempt), MOCK_INGESTION_MS);
}

// The timer's job. It does nothing if the document was deleted meanwhile, or if a
// newer attempt has started (that attempt has its own timer).
function completeIngestionAttempt(documentId, attempt) {
  const doc = db.documents.find((d) => d.id === documentId);
  const row = db.ingestion.find((r) => r.documentId === documentId);
  if (!doc || !row || row.attempt !== attempt) return;

  const finishedAt = nowIso();
  Object.assign(row.attempts[row.attempts.length - 1], { step: "indexing", status: "succeeded", finishedAt });
  Object.assign(row, { status: "succeeded", step: "indexing", finishedAt });

  // A document that was never indexed (new upload, retried failure, replaced file)
  // gets its counts now. A plain re-index of the same file keeps the counts it had.
  if (doc.chunkCount === 0) Object.assign(doc, estimateIndexingResult(doc.format, doc.sizeBytes));
  doc.status = "ready";
  doc.lastIndexedAt = finishedAt;
}