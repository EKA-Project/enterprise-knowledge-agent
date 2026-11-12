// src/components/documents/shared/documentResults.js  (REPLACEMENT)
//
// Only UI state is left here: the count shown in the page hero and the status picked in the
// Document Health Overview. The documents themselves are no longer stored in this file;
// they come from roleDocuments.js, which calls the services.

import { useSyncExternalStore } from 'react';

function createStore(initial) {
  let value = initial;
  const listeners = new Set();
  return {
    get: () => value,
    set: (next) => {
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// ---- How many documents the current filter shows (read by the page hero) ----
const resultsStore = createStore({ count: null, filterLabel: '' });

export function setDocumentResults(next) {
  const current = resultsStore.get();
  if (next.count === current.count && next.filterLabel === current.filterLabel) return;
  resultsStore.set(next);
}

// Returns e.g. "20 Docs" or "5 Docs (Saved Bookmarks)".
// `fallbackCount` is used until the list has reported its first count.
export function useDocumentCountText(fallbackCount) {
  const { count, filterLabel } = useSyncExternalStore(resultsStore.subscribe, resultsStore.get);
  return `${count ?? fallbackCount} Docs${filterLabel ? ` (${filterLabel})` : ''}`;
}

// ---- Status picked in the Document Health Overview ("" = none) ----
const statusStore = createStore('');

export function setStatusFilter(status) {
  if (status !== statusStore.get()) statusStore.set(status);
}

export function useStatusFilter() {
  return useSyncExternalStore(statusStore.subscribe, statusStore.get);
}

// ---- Compatibility with the old file. Delete these once `grep -rn "documentResults" src`
// shows nobody imports them. ----
export { useRoleDocuments as useDocuments, refreshDocuments as loadDocuments } from './roleDocuments.js';