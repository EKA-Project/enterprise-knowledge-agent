// Shared helpers for the mock service layer (Phase B). Deleted together with
// src/data/mock/ when real API calls replace the service internals (Phase C).

// Fake network wait. Pages must already handle loading states, because the real
// API is never instant.
export const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// Services return COPIES of the mock rows. Without this, a page that edits what
// it received would silently change the "database" for every other page.
export const clone = (value) => structuredClone(value);