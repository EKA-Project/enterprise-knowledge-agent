import { useSyncExternalStore } from 'react';

// Small shared stores so the page hero, the health overview and the document
// list can talk to each other without prop-drilling through three role pages.
// Replace with context / props / API state when the backend arrives.

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