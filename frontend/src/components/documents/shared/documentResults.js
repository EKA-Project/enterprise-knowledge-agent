import { useSyncExternalStore } from 'react';

// Tiny shared store: the document list publishes how many documents the
// current filter shows, and the page hero reads it for its eyebrow
// ("20 Docs", "5 Docs (Saved Bookmarks)"). Replace with props/context or an
// API-driven count when the backend arrives.
let results = { count: null, filterLabel: '' };
const listeners = new Set();

export function setDocumentResults(next) {
  if (next.count === results.count && next.filterLabel === results.filterLabel) return;
  results = next;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Returns e.g. "20 Docs" or "5 Docs (Saved Bookmarks)".
// `fallbackCount` is used until the list has reported its first count.
export function useDocumentCountText(fallbackCount) {
  const { count, filterLabel } = useSyncExternalStore(subscribe, () => results);
  return `${count ?? fallbackCount} Docs${filterLabel ? ` (${filterLabel})` : ''}`;
}