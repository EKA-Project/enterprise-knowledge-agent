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
import { createMockPersistence } from "./mockPersistence.js";

// MOCK-ONLY working copy of every table. Deleted with src/data/mock/ in Phase C.
//
// Why a copy: the files in data/mock/ stay pristine, so `npm run validate:mock`
// always checks the original data. When services start writing (pin, archive,
// reindex), they change THIS copy, and every service sees the same change. That
// is how one source of truth works here. A page reload resets it to the seed data.
//
// Only services import this file; pages never do.
export const seedDb = {
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

// Starts from the saved copy when one exists and still matches the seed data.
const persistence = createMockPersistence(seedDb);
export const db = { ...seedDb, ...persistence.load() };
persistence.attach(db);

// Dev tool: forget every saved change and go back to the seed data.
export function resetMockDb() {
  persistence.reset();
  window.location.reload();
}

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

// New mock documents get doc_025, doc_026, ... (the seed ends at doc_024).
// A counter, not "highest id + 1", so a deleted id is never handed out again;
// real UUIDs are never reused either. Ids are opaque to the frontend.
let lastDocumentNumber = db.documents.reduce(
  (highest, doc) => Math.max(highest, Number(/^doc_(\d+)$/.exec(doc.id)?.[1] ?? 0)),
  0,
);

export function nextDocumentId() {
  lastDocumentNumber += 1;
  return `doc_${String(lastDocumentNumber).padStart(3, "0")}`;
}

// New mock users get usr_019, usr_020, ... (the seed ends at usr_018). Counts up
// from the highest id in the db, so an id is never reused.
let lastUserNumber = db.users.reduce(
  (highest, user) => Math.max(highest, Number(/^usr_(\d+)$/.exec(user.id)?.[1] ?? 0)),
  0,
);

export function nextUserId() {
  lastUserNumber += 1;
  return `usr_${String(lastUserNumber).padStart(3, "0")}`;
}