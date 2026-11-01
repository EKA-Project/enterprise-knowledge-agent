import { getMyBookmarks } from "../services/bookmarkService.js";
import { getDepartments } from "../services/departmentService.js";
import { getDocument, getPinnedDocuments } from "../services/documentService.js";
import { toDocumentRow } from "../utils/documentRow.js";
import useApi from "./useApi.js";

// The design shows 3 rows per dashboard panel.
const PANEL_ROWS = 3;

// departmentId -> department name, for the meta line of each row
async function loadDepartmentNames() {
  const departments = await getDepartments();
  return new Map(departments.map((dept) => [dept.id, dept.name]));
}

// Org-wide pins, newest pin first. Every role sees the same pins (only what the
// current user may read, which the service already filters).
// Returns { data: { items }, loading, error, reload }.
export function usePinnedDocuments() {
  return useApi(async () => {
    const [documents, names] = await Promise.all([getPinnedDocuments(), loadDepartmentNames()]);
    return { items: documents.slice(0, PANEL_ROWS).map((doc) => toDocumentRow(doc, names)) };
  });
}

// The current user's newest bookmarks. A bookmark row holds only ids, so each of
// the (at most 3) documents is loaded with getDocument.
export function useBookmarkedDocuments() {
  return useApi(async () => {
    const [bookmarks, names] = await Promise.all([getMyBookmarks(), loadDepartmentNames()]);
    const newest = bookmarks.slice(0, PANEL_ROWS);
    const documents = await Promise.all(newest.map((row) => getDocument(row.documentId)));
    // getDocument gives null if a document stopped being readable between the two calls
    return { items: documents.filter(Boolean).map((doc) => toDocumentRow(doc, names)) };
  });
}