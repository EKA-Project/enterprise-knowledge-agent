import { useContext, useMemo, useSyncExternalStore } from 'react';
import AuthContext from '../../../context/AuthContext.jsx';
import { useDocuments, toggleDocumentFlag } from './documentResults.js';
import { showDocToast } from './DocToast';
import { reindexDocument, updateDocumentMetadata } from '../summary/summaryService';

// Layer over the shared documents store (backend-ready: each map = one API resource).
//  bookmarks[role][id]  private per role      | archived[id]   global
//  edits[id]            metadata edits, global | processing[id] re-index running
//  reindexed[id]        "Just now (Re-indexed)"
// Pin stays global via toggleDocumentFlag.
let deleted = {};
let bookmarks = {};
let archived = {};
let edits = {};
let processing = {};
let reindexed = {};
let version = 0;
const listeners = new Set();
const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const emit = () => {
  version += 1;
  listeners.forEach((l) => l());
};


export function deleteDocument(id) {
  deleted = { ...deleted, [id]: true }; // backend: DELETE /documents/:id
  emit();
}

export function setDocumentArchivedFlag(id, value) {
  archived = { ...archived, [id]: value };
  emit();
}

// Re-index flow from the video: "Queued" toast + Processing card, then success toast.
export async function startReindex(doc) {
  if (processing[doc.id]) return;
  processing = { ...processing, [doc.id]: true };
  emit();
  showDocToast(`⏳ Queued vector re-indexing for "${doc.title}"…`, 'neutral');
  await reindexDocument(doc.id);
  await new Promise((r) => setTimeout(r, 3000)); // mock pipeline time, remove with the real API
  processing = { ...processing, [doc.id]: false };
  reindexed = { ...reindexed, [doc.id]: true };
  emit();
  showDocToast(`✓ Successfully re-indexed vector embeddings for "${doc.title}"`, 'success');
}

// "Save Changes & Re-index" of the Edit Metadata modal
export async function saveDocumentMetadata(doc, changes) {
  // eslint-disable-next-line no-unused-vars
  const { file, ...fields } = changes;
  edits = { ...edits, [doc.id]: fields };
  emit();
  await updateDocumentMetadata(doc.id, changes);
  return startReindex({ ...doc, title: fields.title });
}

// Same shape as useDocuments(), plus toggleFlag(id, 'isPinned' | 'isBookmarked').
export function useRoleDocuments() {
  const { activeRole } = useContext(AuthContext);
  const { items, loading } = useDocuments();
  const v = useSyncExternalStore(subscribe, () => version);

  const docs = useMemo(
    () =>
      items
        .filter((d) => !deleted[d.id])
        .map((d) => {
          const e = edits[d.id];
          const isArchived = archived[d.id] ?? false;
          return {
            ...d,
            ...(e
              ? { title: e.title, category: e.category, author: e.author, description: e.executiveSummary, edited: true }
              : {}),
            isBookmarked: bookmarks[activeRole]?.[d.id] ?? Boolean(d.isBookmarked),
            isArchived,
            reindexedNow: Boolean(reindexed[d.id]),
            status: isArchived ? 'Archived' : processing[d.id] ? 'Processing' : d.status,
          };
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, activeRole, v],
  );

  const toggleFlag = (id, flag) => {
    if (flag !== 'isBookmarked') {
      toggleDocumentFlag(id, flag);
      return;
    }
    const current = docs.find((d) => d.id === id)?.isBookmarked;
    bookmarks = { ...bookmarks, [activeRole]: { ...bookmarks[activeRole], [id]: !current } };
    emit();
  };

  return { items: docs, loading, toggleFlag };
}