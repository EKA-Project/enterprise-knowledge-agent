// src/components/documents/shared/roleDocuments.js  (REPLACEMENT, same exports as before)
//
// What changed: the data now comes from the shared services instead of DocumentData.js.
// The Admin / Manager / Employee components, DocumentList and the summary modals keep calling
// the same names: useRoleDocuments, deleteDocument, setDocumentArchivedFlag, startReindex,
// saveDocumentMetadata. Only what happens inside them changed.
//
// The rows this hook returns keep the OLD shape ('PDF', 'Indexed', '2.4 MB', '8 min read',
// category = department name), so no component needs editing. When dost's utils/documentRow.js
// already builds such a row, use it in toRow() instead of the code below.
//
// NOT TESTED against your app: written from the files you sent. Items marked CHECK need a look.

import { useContext, useEffect, useSyncExternalStore } from 'react';
import AuthContext from '../../../context/AuthContext.jsx';
import { showDocToast } from './DocToast';
import {
  getDocuments,
  getDocument,
  setPinned,
  archiveDocument as archiveDocumentApi,
  unarchiveDocument,
  deleteDocument as deleteDocumentApi,
  reindexDocument,
  replaceDocumentFile,
  updateDocument,
} from '../../../services/documentService.js';
import { getMyBookmarks, addBookmark, removeBookmark } from '../../../services/bookmarkService.js';
import { getDepartments } from '../../../services/departmentService.js';
import { getUsers } from '../../../services/userService.js';
import { formatFileSize } from '../../../utils/formatFileSize.js'; // CHECK: export name
import { estimateReadTime } from '../../../utils/estimateReadTime.js'; // CHECK: export name and return type


// The list is small in the mock phase, so one request gets everything and the existing
// client-side filters (documentFilters.js) keep working. Move filters to the server later.
const LIST_LIMIT = 200;
const STATUS_LABEL = { ready: 'Indexed', processing: 'Processing', failed: 'Failed' };
const REINDEX_POLL_MS = 1000;
const REINDEX_MAX_POLLS = 30;

// ── store: one list shared by every component that calls the hook ──────────
let state = { items: [], loading: true, error: null };
let loadedRole = null;
let requestId = 0;
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => state;
function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}
function patchRow(id, patch) {
  setState({ items: state.items.map((row) => (row.id === id ? { ...row, ...patch } : row)) });
}

// ── service document -> the row shape the components already expect ─────────
function readTimeText(wordCount) {
  if (wordCount == null) return '—';
  const result = estimateReadTime(wordCount);
  if (typeof result === 'string') return result; // util already returns "4 min read"
  return result ? `${result} min read` : '—';
}

function toRow(doc, { departmentNames, userNames, bookmarkedIds }) {
  const indexedAt = doc.lastIndexedAt ? Date.parse(doc.lastIndexedAt) : null;
  return {
    id: doc.id,
    title: doc.title,
    format: String(doc.format).toUpperCase(),
    category: departmentNames.get(doc.departmentId) ?? '',
    departmentId: doc.departmentId,
    description: doc.description,
    readTime: readTimeText(doc.wordCount),
    size: doc.sizeBytes == null ? '—' : formatFileSize(doc.sizeBytes),
    pages: doc.pageCount,
    status: STATUS_LABEL[doc.status] ?? doc.status,
    author: doc.authorName ?? userNames.get(doc.uploadedById) ?? '—',
    chunks: doc.chunkCount,
    isPinned: doc.isPinned,
    isBookmarked: bookmarkedIds.has(doc.id),
    isArchived: Boolean(doc.archivedAt),
    reindexedNow: indexedAt !== null && Date.now() - indexedAt < 60_000, // "Just now (Re-indexed)"
  };
}

// Loads the list for the CURRENT mock user (the role switcher changes who that is).
export async function refreshDocuments() {
  const mine = ++requestId; // a newer request wins, so a slow old one never overwrites it
  try {
    const [page, bookmarks, departments, users] = await Promise.all([
      getDocuments({ limit: LIST_LIMIT }),
      getMyBookmarks(),
      getDepartments(),
      getUsers(),
    ]);
    if (mine !== requestId) return;
    const lookups = {
      departmentNames: new Map(departments.map((d) => [d.id, d.name])),
      userNames: new Map(users.map((u) => [u.id, u.name])),
      bookmarkedIds: new Set(bookmarks.map((b) => b.documentId)),
    };
    setState({ items: page.items.map((doc) => toRow(doc, lookups)), loading: false, error: null });
  } catch (error) {
    if (mine === requestId) setState({ loading: false, error });
  }
}

const errorText = (error) => error?.message || 'Something went wrong';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Waits until the document leaves "processing" (the mock pipeline finishes on its own).
async function waitForIndexing(id) {
  for (let i = 0; i < REINDEX_MAX_POLLS; i += 1) {
    const doc = await getDocument(id);
    if (!doc || doc.status !== 'processing') return doc;
    await sleep(REINDEX_POLL_MS);
  }
  return null;
}

// Shared tail of every flow that starts an ingestion attempt.
async function followIngestion(title, id) {
  await refreshDocuments(); // the row now shows "Processing"
  const result = await waitForIndexing(id);
  await refreshDocuments();
  if (result?.status === 'failed') {
    showDocToast(`✕ Re-indexing failed for "${title}"`, 'neutral'); // CHECK: does DocToast have an error type?
  } else {
    showDocToast(`✓ Successfully re-indexed vector embeddings for "${title}"`, 'success');
  }
}

// ── actions (same names as before) ─────────────────────────────────────────

// Returns true when the document was deleted. Protected documents are refused by the service (403/409).
export async function deleteDocument(id) {
  try {
    await deleteDocumentApi(id);
  } catch (error) {
    showDocToast(errorText(error), 'neutral');
    return false;
  }
  await refreshDocuments();
  return true;
}

// value === true archives. Un-archiving has no service function yet (see the notes), so it is refused.
export async function setDocumentArchivedFlag(id, value) {
  try {
    if (value) await archiveDocumentApi(id);
    else await unarchiveDocument(id);
  } catch (error) {
    showDocToast(errorText(error), 'neutral');
    return false;
  }
  await refreshDocuments();
  return true;
}



export async function startReindex(doc) {
  showDocToast(`⏳ Queued vector re-indexing for "${doc.title}"…`, 'neutral');
  try {
    await reindexDocument(doc.id);
    await followIngestion(doc.title, doc.id);
  } catch (error) {
    showDocToast(errorText(error), 'neutral');
    await refreshDocuments();
  }
}

// "Save Changes & Re-index" of the Edit Metadata modal.
// Editable on the service: title, description, authorName, visibility. The department (category)
// cannot be moved by updateDocument, so a changed category is ignored here.
export async function saveDocumentMetadata(doc, changes) {
  const { file, title, author, executiveSummary } = changes;
  const edits = {};
  if (title !== undefined) edits.title = title;
  if (executiveSummary !== undefined) edits.description = executiveSummary;
  if (author !== undefined) edits.authorName = author;

  try {
    if (Object.keys(edits).length > 0) await updateDocument(doc.id, edits);
    if (file) {
      showDocToast(`⏳ Replacing file and re-indexing "${edits.title ?? doc.title}"…`, 'neutral');
      await replaceDocumentFile(doc.id, file); // overwrites the file, restarts ingestion
      await followIngestion(edits.title ?? doc.title, doc.id);
    } else {
      await startReindex({ ...doc, title: edits.title ?? doc.title });
    }
  } catch (error) {
    showDocToast(errorText(error), 'neutral');
    await refreshDocuments();
  }
}

// ── the hook ───────────────────────────────────────────────────────────────

// Returns { items, loading, error, refresh, toggleFlag(id, 'isPinned' | 'isBookmarked') }.
export function useRoleDocuments() {
  const { activeRole } = useContext(AuthContext);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  // Reload when the role changes (visible documents and bookmarks differ per user).
  // CHECK: the mock session must already know the new role when this effect runs.
  useEffect(() => {
    if (loadedRole === activeRole) return;
    loadedRole = activeRole;
    setState({ loading: true, error: null });
    refreshDocuments();
  }, [activeRole]);

  const toggleFlag = async (id, flag) => {
    const row = state.items.find((item) => item.id === id);
    if (!row) return;
    const next = !row[flag];
    patchRow(id, { [flag]: next }); // optimistic
    try {
      if (flag === 'isPinned') await setPinned(id, next); // admin only, 403 for others
      else if (next) await addBookmark(id);
      else await removeBookmark(id);
    } catch (error) {
      patchRow(id, { [flag]: !next }); // roll back
      showDocToast(errorText(error), 'neutral');
    }
  };

  const refresh = () => {
    setState({ loading: true, error: null });
    return refreshDocuments();
  };

  return { items: snapshot.items, loading: snapshot.loading, error: snapshot.error, refresh, toggleFlag };
}