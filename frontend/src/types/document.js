// Shapes for `documents`, `document_sections` and `bookmarks`.
// Source: data-architecture.md, sections 4.3, 4.4 and 4.6.

/** @typedef {'pdf'|'docx'|'md'|'csv'|'txt'} DocumentFormat */
/** @typedef {'processing'|'ready'|'failed'} DocumentStatus */
/** @typedef {'organization'|'department'} DocumentVisibility */

/**
 * The light record shown in every list, card and table. No heavy text here.
 * `storageKey` exists in the database but is never sent to the frontend.
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} title            Editable; not the file name
 * @property {string} fileName         Original uploaded file name
 * @property {DocumentFormat} format
 * @property {string} description      1 to 2 sentences for cards
 * @property {string} departmentId     Replaces "category" everywhere
 * @property {string} uploadedById
 * @property {string|null} authorName  Free text, may be external
 * @property {DocumentVisibility} visibility
 * @property {number} sizeBytes        Raw bytes; format with formatFileSize()
 * @property {number|null} pageCount   Null until extraction succeeds
 * @property {number|null} wordCount   Null until extraction succeeds
 * @property {string} contentHash      "sha256:..." for duplicate detection
 * @property {DocumentStatus} status   Follows its document_ingestion row
 * @property {number} chunkCount       Written by the pipeline, never edited by the UI
 * @property {boolean} isPinned
 * @property {string|null} pinnedAt    Non-null exactly when isPinned is true
 * @property {boolean} isProtected
 * @property {string|null} protectedReason  Required when isProtected is true
 * @property {string|null} supersededById
 * @property {string|null} archivedAt  Null means active
 * @property {string} uploadedAt
 * @property {string} updatedAt
 * @property {string|null} lastIndexedAt
 * @property {string|null} lastOpenedAt  Read-only: computed from activity_events
 * @property {string|null} lastCitedAt   Read-only: computed from activity_events
 */

/**
 * One flat array holds the sections of ALL documents; filter by documentId.
 * @typedef {Object} DocumentSection
 * @property {string} id
 * @property {string} documentId
 * @property {number} index       Order within the document, starting at 1
 * @property {string} title
 * @property {number|null} pageStart
 * @property {number|null} pageEnd
 * @property {string} content     The document's own text (not AI output)
 */

/**
 * Per-user saved document. `isBookmarked` is computed from this table, never
 * stored on the document.
 * @typedef {Object} Bookmark
 * @property {string} userId
 * @property {string} documentId
 * @property {string} createdAt
 */

export {};