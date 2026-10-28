// @ts-check
// MOCK-ONLY TABLE: stands in for GET /documents/{id}/related.
// The real endpoint runs a live query on document_insights.embedding, so there
// is no table behind this file and it is deleted with src/data/mock/.
// documentService applies canReadDocument and sharedKeywords() on top of it.
//
// Rules:
//  - only documents with a READY insight have an embedding, so only they appear
//  - scores are similarity (0 to 1), shown as "similarity", never as accuracy
//  - pairs are listed in both directions with the same score
//  - doc_019 has no related documents on purpose, so the empty state gets used

/**
 * @typedef {Object} RelatedRow
 * @property {string} documentId
 * @property {string} relatedDocumentId
 * @property {number} score
 */

/** @type {RelatedRow[]} */
export const related = [
  { documentId: "doc_001", relatedDocumentId: "doc_015", score: 0.86 },
  { documentId: "doc_001", relatedDocumentId: "doc_003", score: 0.78 },
  { documentId: "doc_003", relatedDocumentId: "doc_015", score: 0.91 },
  { documentId: "doc_003", relatedDocumentId: "doc_001", score: 0.78 },
  { documentId: "doc_015", relatedDocumentId: "doc_003", score: 0.91 },
  { documentId: "doc_015", relatedDocumentId: "doc_001", score: 0.86 },
  { documentId: "doc_007", relatedDocumentId: "doc_009", score: 0.82 },
  { documentId: "doc_009", relatedDocumentId: "doc_007", score: 0.82 },
];