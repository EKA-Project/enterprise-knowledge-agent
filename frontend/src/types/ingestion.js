// Shape for `document_ingestion`: one row per document, retries are attempts
// on the same row. Source: data-architecture.md, section 4.7.

/** @typedef {'extraction'|'chunking'|'embedding'|'indexing'} IngestionStep */

/**
 * @typedef {Object} IngestionAttempt
 * @property {number} attempt
 * @property {IngestionStep} step
 * @property {'running'|'succeeded'|'failed'} status
 * @property {string|null} errorMessage
 * @property {string} startedAt
 * @property {string|null} finishedAt
 */

/**
 * @typedef {Object} DocumentIngestion
 * @property {string} documentId
 * @property {'queued'|'running'|'succeeded'|'failed'} status
 * @property {IngestionStep} step  Current or failed step
 * @property {string|null} errorMessage
 * @property {number} attempt      Starts at 1
 * @property {IngestionAttempt[]} attempts
 * @property {string|null} startedAt
 * @property {string|null} finishedAt
 */

export {};