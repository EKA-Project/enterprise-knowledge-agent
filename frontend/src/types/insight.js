// Shapes for `document_insights` and the related-documents response.
// Source: data-architecture.md, sections 4.5 and 10.3.
// The `embedding` column is never sent to the frontend.

/**
 * @typedef {Object} Takeaway
 * @property {string} text
 * @property {string} sectionId  Must be a section of the SAME document
 */

/**
 * @typedef {Object} SectionSummary
 * @property {string} sectionId
 * @property {string} summary
 * @property {string[]} highlights
 */

/**
 * A "knowledge tag". `weight` is relevance from 0 to 1, never shown as accuracy.
 * @typedef {Object} Keyword
 * @property {string} term
 * @property {number} weight
 * @property {'topic'|'entity'} kind
 */

/**
 * @typedef {Object} DocumentInsight
 * @property {string} documentId
 * @property {'pending'|'ready'|'failed'} status
 * @property {string|null} generatedAt
 * @property {string|null} model
 * @property {string|null} summary
 * @property {Takeaway[]} takeaways
 * @property {SectionSummary[]} sectionSummaries
 * @property {Keyword[]} keywords
 * @property {string[]} suggestedQuestions
 */

/**
 * Response item of getRelatedDocuments(). `score` is "similarity", not accuracy.
 * @typedef {Object} RelatedDocument
 * @property {import('./document').Document} document
 * @property {number} score
 * @property {string[]} sharedKeywords
 */

export {};