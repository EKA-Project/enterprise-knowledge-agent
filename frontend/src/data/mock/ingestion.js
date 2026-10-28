// @ts-check
// MOCK TABLE: document_ingestion. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.7. One row per document; a retry is
// another attempt on the SAME row. Only documentService reads this file.
// Each document's status follows its row here: succeeded = ready,
// running = processing, failed = failed. For succeeded rows, finishedAt equals
// the document's lastIndexedAt.

/**
 * Builds the common case: one attempt that went straight through.
 * The exported rows are still plain objects.
 * @param {string} documentId
 * @param {string} startedAt
 * @param {string} finishedAt
 * @returns {import('../../types').DocumentIngestion}
 */
const succeeded = (documentId, startedAt, finishedAt) => ({
  documentId,
  status: "succeeded",
  step: "indexing",
  errorMessage: null,
  attempt: 1,
  attempts: [{ attempt: 1, step: "indexing", status: "succeeded", errorMessage: null, startedAt, finishedAt }],
  startedAt,
  finishedAt,
});

/** @type {import('../../types').DocumentIngestion[]} */
export const ingestion = [
  succeeded("doc_001", "2026-10-22T11:02:00Z", "2026-10-22T11:09:00Z"),
  {
    // FAILED twice at the embedding step (rate limit)
    documentId: "doc_002", status: "failed", step: "embedding",
    errorMessage: "Embedding API rate limit reached (HTTP 429)",
    attempt: 2,
    attempts: [
      { attempt: 1, step: "embedding", status: "failed", errorMessage: "HTTP 429", startedAt: "2026-10-21T14:41:00Z", finishedAt: "2026-10-21T14:44:00Z" },
      { attempt: 2, step: "embedding", status: "failed", errorMessage: "Embedding API rate limit reached (HTTP 429)", startedAt: "2026-10-21T14:48:00Z", finishedAt: "2026-10-21T14:52:00Z" },
    ],
    startedAt: "2026-10-21T14:48:00Z", finishedAt: "2026-10-21T14:52:00Z",
  },
  succeeded("doc_003", "2026-10-05T10:03:00Z", "2026-10-05T10:12:00Z"),
  succeeded("doc_004", "2026-09-20T09:01:00Z", "2026-09-20T09:06:00Z"),
  succeeded("doc_005", "2026-03-10T09:01:00Z", "2026-03-10T09:05:00Z"),
  succeeded("doc_006", "2026-10-01T09:02:00Z", "2026-10-01T09:08:00Z"),
  succeeded("doc_007", "2026-10-10T09:03:00Z", "2026-10-10T09:10:00Z"),
  succeeded("doc_008", "2026-09-05T09:02:00Z", "2026-09-05T09:09:00Z"),
  succeeded("doc_009", "2026-10-02T09:03:00Z", "2026-10-02T09:11:00Z"),
  succeeded("doc_010", "2026-08-30T09:02:00Z", "2026-08-30T09:07:00Z"),
  succeeded("doc_011", "2026-07-10T09:01:00Z", "2026-07-10T09:04:00Z"),
  {
    // Large file: attempt 1 timed out, attempt 2 succeeded.
    // "Index latency" uses the latest successful attempt: 09:14 to 09:25.
    documentId: "doc_012", status: "succeeded", step: "indexing", errorMessage: null,
    attempt: 2,
    attempts: [
      { attempt: 1, step: "embedding", status: "failed", errorMessage: "Request timed out", startedAt: "2026-10-01T09:02:00Z", finishedAt: "2026-10-01T09:12:00Z" },
      { attempt: 2, step: "indexing", status: "succeeded", errorMessage: null, startedAt: "2026-10-01T09:14:00Z", finishedAt: "2026-10-01T09:25:00Z" },
    ],
    startedAt: "2026-10-01T09:14:00Z", finishedAt: "2026-10-01T09:25:00Z",
  },
  succeeded("doc_013", "2026-08-20T09:01:00Z", "2026-08-20T09:04:00Z"),
  succeeded("doc_014", "2026-09-25T09:01:00Z", "2026-09-25T09:05:00Z"),
  succeeded("doc_015", "2026-10-10T09:02:00Z", "2026-10-10T09:08:00Z"),
  succeeded("doc_016", "2026-02-02T09:01:00Z", "2026-02-02T09:04:00Z"),
  {
    // RUNNING: still in progress, so finishedAt is null
    documentId: "doc_017", status: "running", step: "embedding", errorMessage: null,
    attempt: 1,
    attempts: [
      { attempt: 1, step: "embedding", status: "running", errorMessage: null, startedAt: "2026-10-27T15:02:00Z", finishedAt: null },
    ],
    startedAt: "2026-10-27T15:02:00Z", finishedAt: null,
  },
  succeeded("doc_018", "2026-09-12T09:02:00Z", "2026-09-12T09:12:00Z"),
  succeeded("doc_019", "2026-10-16T09:01:00Z", "2026-10-16T09:06:00Z"),
  succeeded("doc_020", "2026-10-25T10:02:00Z", "2026-10-25T10:07:00Z"),
  succeeded("doc_021", "2026-09-28T09:02:00Z", "2026-09-28T09:08:00Z"),
  succeeded("doc_022", "2026-10-12T09:01:00Z", "2026-10-12T09:05:00Z"),
  succeeded("doc_023", "2026-08-18T09:02:00Z", "2026-08-18T09:10:00Z"),
  succeeded("doc_024", "2026-09-03T09:02:00Z", "2026-09-03T09:13:00Z"),
];