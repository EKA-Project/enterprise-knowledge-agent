import { useContext, useMemo, useSyncExternalStore } from 'react';
import AuthContext from '../../../context/AuthContext.jsx';
import { useDocuments, toggleDocumentFlag } from './documentResults.js';

// Per-role bookmarks + shared archived flag, layered over the shared documents store.
//  - Pin stays global (admin pins, everyone sees it) -> handled by toggleDocumentFlag
//  - Bookmark is private to each role: bookmarks[role][docId]
//  - Archived is global: archived[docId]
// Backend-ready: swap these two maps for API calls (GET/PUT /me/bookmarks, PATCH /documents/:id).
let bookmarks = {};
let archived = {};
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

export function setDocumentArchivedFlag(id, value) {
  archived = { ...archived, [id]: value };
  emit();
}

// Same shape as useDocuments(), plus toggleFlag(id, 'isPinned' | 'isBookmarked').
export function useRoleDocuments() {
  const { activeRole } = useContext(AuthContext);
  const { items, loading } = useDocuments();
  const v = useSyncExternalStore(subscribe, () => version);

  const docs = useMemo(
    () =>
      items.map((d) => {
        const isArchived = archived[d.id] ?? false;
        return {
          ...d,
          // seed value from DocumentData until this role changes it
          isBookmarked: bookmarks[activeRole]?.[d.id] ?? Boolean(d.isBookmarked),
          isArchived,
          status: isArchived ? 'Archived' : d.status,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, activeRole, v],
  );

  const toggleFlag = (id, flag) => {
    if (flag !== 'isBookmarked') {
      toggleDocumentFlag(id, flag); // pin: shared by every role
      return;
    }
    const current = docs.find((d) => d.id === id)?.isBookmarked;
    bookmarks = { ...bookmarks, [activeRole]: { ...bookmarks[activeRole], [id]: !current } };
    emit();
  };

  return { items: docs, loading, toggleFlag };
}