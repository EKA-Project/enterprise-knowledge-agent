// Shared helpers for the mock service layer (Phase B). Deleted together with
// src/data/mock/ when real API calls replace the service internals (Phase C).

// Fake network wait. Pages must already handle loading states, because the real
// API is never instant.
export const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// Services return COPIES of the mock rows. Without this, a page that edits what
// it received would silently change the "database" for every other page.
export const clone = (value) => structuredClone(value);

// One page of a list, in the shape every list endpoint returns:
// { total, limit, offset, items }. `total` counts ALL matches, not just this page.
export function paginate(rows, limit, offset = 0) {
  const safeLimit = Math.max(1, Math.floor(limit));
  const safeOffset = Math.max(0, Math.floor(offset));
  return {
    total: rows.length,
    limit: safeLimit,
    offset: safeOffset,
    items: rows.slice(safeOffset, safeOffset + safeLimit),
  };
}