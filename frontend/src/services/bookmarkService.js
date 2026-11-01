import { canReadDocument } from "../utils/canReadDocument.js";
import { db } from "./mockDb.js";
import { clone, delay, nowIso, ServiceError } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for bookmarks. Shape: data-architecture.md section 4.6.
// Bookmarks belong to a user and are never a field on the document. Services
// return the stored rows; a page that needs the documents calls getDocument().

// The document, only if it exists AND the user may read it. null = missing or not allowed.
function findReadableDocument(user, documentId) {
  const doc = db.documents.find((d) => d.id === documentId);
  return doc && canReadDocument(user, doc) ? doc : null;
}

// GET /me/bookmarks
// The current user's bookmarks, newest first. A bookmark whose document the user
// can no longer read, or that is archived, is left out, so a page never shows a
// document the user may not see.
/** @returns {Promise<import('../types').Bookmark[]>} */
export async function getMyBookmarks() {
  await delay();
  const user = getMockCurrentUser(); // read AFTER the delay, like every other service

  const rows = db.bookmarks
    .filter((row) => row.userId === user.id)
    .filter((row) => {
      const doc = findReadableDocument(user, row.documentId);
      return doc && !doc.archivedAt;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.documentId.localeCompare(b.documentId));

  return clone(rows);
}

// PUT /me/bookmarks/{documentId}  (idempotent: bookmarking twice keeps one row)
/** @returns {Promise<import('../types').Bookmark>} */
export async function addBookmark(documentId) {
  await delay(80);
  const user = getMockCurrentUser();

  const doc = findReadableDocument(user, documentId);
  if (!doc) throw new ServiceError(404, "Document not found");
  if (doc.archivedAt) throw new ServiceError(409, "An archived document cannot be bookmarked");

  let row = db.bookmarks.find((b) => b.userId === user.id && b.documentId === documentId);
  if (!row) {
    row = { userId: user.id, documentId, createdAt: nowIso() };
    db.bookmarks.push(row);
  }
  return clone(row);
}

// DELETE /me/bookmarks/{documentId}  (idempotent; only ever touches the user's own rows)
// No read check: a user can always drop their own bookmark.
/** @returns {Promise<{documentId: string}>} */
export async function removeBookmark(documentId) {
  await delay(80);
  const user = getMockCurrentUser();

  db.bookmarks = db.bookmarks.filter((b) => !(b.userId === user.id && b.documentId === documentId));
  return { documentId };
}