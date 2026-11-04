// Shapes for the `departments` table and the Collection Insights response.
// Source of truth: data-architecture.md, sections 4.1 and 10.2.

/**
 * AI-written collection overview, stored in the `insight` JSONB column.
 * @typedef {Object} DepartmentInsight
 * @property {'pending'|'ready'|'failed'} status
 * @property {string|null} generatedAt  ISO 8601 UTC
 * @property {string|null} model        Model that wrote the overview
 * @property {string|null} overview
 * @property {string[]} basedOnDocumentIds  Used to detect staleness
 * @property {boolean} [isStale]  Read-only, added by the service/API, never stored
 */

/**
 * @typedef {Object} Department
 * @property {string} id
 * @property {string} name
 * @property {string} code         2 to 6 uppercase letters, e.g. "ENG"
 * @property {string} description  Written by a person; rarely changes
 * @property {string} scope        What kinds of documents belong here
 * @property {string} colorKey     Theme color name (e.g. "violet"), NOT a hex value
 * @property {string} iconKey      lucide icon name (e.g. "sliders-horizontal")
 * @property {string|null} managerId  FK to users.id; null while unassigned
 * @property {DepartmentInsight|null} [insight]  Detail endpoint only
 * @property {number} [documentCount]  Read-only, computed by the service/API
 * @property {number} [memberCount]    Read-only, computed by the service/API
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Response of getCollection(): everything the Collection Insights modal shows.
 * @typedef {Object} DepartmentCollection
 * @property {{id: string, name: string, description: string}} department
 * @property {{id: string, name: string}|null} lead
 * @property {number} activeDocumentCount
 * @property {DepartmentInsight|null} insight
 * @property {'live'|'outdated'|'preparing'|null} badge
 * @property {string} overview  insight.overview when ready, else department.description
 * @property {{total: number, limit: number, offset: number, items: CollectionDocumentItem[]}} documents
 * @property {import('./insight').Keyword[]} keywords
 * @property {string[]} samplePrompts
 */

/**
 * @typedef {Object} CollectionDocumentItem
 * @property {import('./document').Document} document
 * @property {{id: string, name: string}} uploader
 * @property {string[]} topTakeaways
 */

export {};