import { onServiceCall } from "./mockHelpers.js";

// MOCK-ONLY: saves the mock db in localStorage so edits survive a refresh.
// Deleted with src/data/mock/ in Phase C.
// Turn it off on your machine in .env.local: VITE_MOCK_PERSIST=false

const STORAGE_KEY = "eka-mock-db";
const ENABLED = import.meta.env?.VITE_MOCK_PERSIST !== "false";

// Computed from the seed data itself, so editing data/mock/ discards an older
// saved copy instead of hiding the new seed data.
function fingerprint(value) {
  const text = JSON.stringify(value);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) | 0;
  return String(hash);
}

export function createMockPersistence(seeds) {
  const version = fingerprint(seeds);

  const load = () => {
    if (!ENABLED) return null;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved?.seedVersion === version ? saved.tables : null;
    } catch {
      return null; // unreadable or unavailable storage: use the seed data
    }
  };

  const save = (tables) => {
    if (!ENABLED) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ seedVersion: version, tables }));
    } catch {
      // storage full or unavailable: the app works, it just does not save
    }
  };

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to remove
    }
  };

  // Save before every service call, and when the tab is closed or hidden.
  const attach = (tables) => {
    onServiceCall(() => save(tables));
    if (typeof window === "undefined") return;
    window.addEventListener("pagehide", () => save(tables));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") save(tables);
    });
  };

  return { load, save, reset, attach };
}