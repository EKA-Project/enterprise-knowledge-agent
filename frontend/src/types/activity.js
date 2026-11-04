// Shapes for `activity_events` and `findings`.
// Source: data-architecture.md, sections 4.8 and 4.9.

/**
 * Append-only log. `payload` depends on `type`:
 *   opened              {}
 *   cited               { sectionId, chunkId }
 *   question_unanswered { text, reason: 'no_results'|'low_similarity', bestScore }
 * @typedef {Object} ActivityEvent
 * @property {string} id
 * @property {'opened'|'cited'|'question_unanswered'} type
 * @property {string|null} userId
 * @property {string|null} documentId  Null for question_unanswered
 * @property {string} occurredAt
 * @property {Object} payload
 */

/**
 * One exact quote backing a contradiction. A claim without a quote is not a finding.
 * @typedef {Object} Claim
 * @property {string} documentId
 * @property {string} sectionId
 * @property {string} quote
 */

/**
 * `evidence` depends on `kind`:
 *   contradiction  { claims: Claim[] }  (at least two)
 *   knowledge_gap  { questionCount, askerCount, topic }
 * @typedef {Object} Finding
 * @property {string} id
 * @property {'contradiction'|'knowledge_gap'} kind
 * @property {'open'|'resolved'|'dismissed'} status
 * @property {'low'|'medium'|'high'|null} severity  Required for contradictions
 * @property {string} title
 * @property {string|null} departmentId
 * @property {string[]} documentIds  Empty for knowledge gaps
 * @property {Object} evidence
 * @property {string} detectedAt
 * @property {string|null} resolvedAt
 * @property {string|null} resolvedById
 * @property {string|null} resolution
 */

export {};