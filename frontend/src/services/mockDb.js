import { activityEvents } from "../data/mock/activityEvents.js";
import { bookmarks } from "../data/mock/bookmarks.js";
import { departments } from "../data/mock/departments.js";
import { documents } from "../data/mock/documents.js";
import { findings } from "../data/mock/findings.js";
import { ingestion } from "../data/mock/ingestion.js";
import { insights } from "../data/mock/insights.js";
import { related } from "../data/mock/related.js";
import { sections } from "../data/mock/sections.js";
import { users } from "../data/mock/users.js";
import { canReadDocument } from "../utils/canReadDocument.js";
import { clone } from "./mockHelpers.js";

// MOCK-ONLY working copy of every table. Deleted with src/data/mock/ in Phase C.
//
// Why a copy: the files in data/mock/ stay pristine, so `npm run validate:mock`
// always checks the original data. When services start writing (pin, archive,
// reindex), they change THIS copy, and every service sees the same change. That
// is how one source of truth works here. A page reload resets it to the seed data.
//
// Only services import this file; pages never do.
export const db = {
  departments: clone(departments),
  users: clone(users),
  documents: clone(documents),
  sections: clone(sections),
  insights: clone(insights),
  ingestion: clone(ingestion),
  bookmarks: clone(bookmarks),
  related: clone(related),
  activityEvents: clone(activityEvents),
  findings: clone(findings),
};

/**
 * The read rule applied to active documents: what this user may see in lists and
 * counts. Archived documents are excluded; the Storage page reads them separately.
 * @param {import('../types').User} user
 * @returns {import('../types').Document[]}
 */
export function getReadableActiveDocuments(user) {
  return db.documents.filter((doc) => !doc.archivedAt && canReadDocument(user, doc));
}

/** The insight row of a document, or undefined (a document may have none yet). */
export function getInsightRow(documentId) {
  return db.insights.find((insight) => insight.documentId === documentId);
}