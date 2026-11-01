import { estimateReadTime } from "./estimateReadTime.js";
import { formatFileSize } from "./formatFileSize.js";

// Stored document.status -> the status the manager table works with.
// Kept in one place so the table and the RAG Health KPI use the same words.
export const TABLE_STATUS_BY_DOCUMENT_STATUS = {
  ready: "indexed",
  processing: "indexing",
  failed: "failed",
};

// "4 min read • 7 pages" for a ready document. Null counts (a csv has no word
// count) are left out, so no number is ever invented.
function buildReadyMeta(doc) {
  const readTime = estimateReadTime(doc.wordCount);
  const pages = doc.pageCount ? `${doc.pageCount} ${doc.pageCount === 1 ? "page" : "pages"}` : null;
  return [readTime, pages].filter(Boolean).join(" • ");
}

// What one row of the manager documents table needs. Every value is derived from
// the stored document (blueprint rule 6). `userNames` is a Map of userId -> name,
// because documents store ids, never names (blueprint rule 3).
export function toManagerDocumentRow(doc, userNames) {
  const status = TABLE_STATUS_BY_DOCUMENT_STATUS[doc.status] ?? "indexing";

  let meta;
  if (status === "indexing") meta = "Processing…";
  else if (status === "failed") meta = "Indexing failed";
  else meta = buildReadyMeta(doc);

  return {
    id: doc.id,
    title: doc.title,
    type: doc.format, // picks the file-type chip colour
    meta,
    uploader: userNames.get(doc.uploadedById) ?? "Unknown user",
    size: formatFileSize(doc.sizeBytes),
    chunks: doc.chunkCount, // 0 for processing and failed documents
    status,
  };
}