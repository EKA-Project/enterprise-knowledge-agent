// src/services/mockPersistCore.js  (MOCK ONLY, delete in Phase C)
//
// Saves the in-memory mock database to storage and loads it back, so edits, pins, bookmarks,
// archives, deletes and uploads survive a page refresh. No imports, so it is easy to test.
//
// It never edits the seed files. It only replaces the arrays on the `db` object.
// A saved copy is thrown away when the seed data changed (different table sizes) or when
// PERSIST_VERSION is bumped, so old saved data can never fight with new seed data.

export const PERSIST_VERSION = 1;
export const STORAGE_KEY = 'eka.mockDb';

const tableNames = (db) => Object.keys(db).filter((name) => Array.isArray(db[name])).sort();

// Fingerprint of the SEED (taken before anything is loaded): table names and row counts.
const seedSignature = (db) => `v${PERSIST_VERSION};` + tableNames(db).map((n) => `${n}:${db[n].length}`).join('|');

export function createMockPersistence({ db, storage, key = STORAGE_KEY }) {
  const signature = seedSignature(db); // must be computed before hydrate()
  let lastSaved = null;

  function read() {
    try {
      const raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null; // corrupted JSON or blocked storage
    }
  }

  // Replaces the db tables with the saved ones. Returns true when saved data was applied.
  function hydrate() {
    const saved = read();
    if (!saved || saved.signature !== signature || typeof saved.tables !== 'object') {
      if (saved) reset(); // stale or broken: forget it
      return false;
    }
    for (const name of tableNames(db)) {
      if (Array.isArray(saved.tables[name])) db[name] = saved.tables[name];
    }
    lastSaved = JSON.stringify(saved.tables);
    return true;
  }

  // Writes the current tables. Skips the write when nothing changed.
  function save() {
    const tables = {};
    for (const name of tableNames(db)) tables[name] = db[name];
    const json = JSON.stringify(tables);
    if (json === lastSaved) return false;
    try {
      storage.setItem(key, JSON.stringify({ signature, savedAt: new Date().toISOString(), tables }));
      lastSaved = json;
      return true;
    } catch {
      return false; // quota full or storage blocked: keep working in memory
    }
  }

  function reset() {
    try {
      storage.removeItem(key);
    } catch {
      /* ignore */
    }
    lastSaved = null;
  }

  return { hydrate, save, reset, signature };
}

// Saves every few seconds and when the page is hidden or closed. Call once after hydrate().
// `target` is the window (injectable for tests). Returns a function that stops it.
export function startAutoSave(persistence, { intervalMs = 2000, target = globalThis } = {}) {
  const save = () => persistence.save();
  const timer = setInterval(save, intervalMs);
  const onHidden = () => { if (target.document?.visibilityState === 'hidden') save(); };
  target.addEventListener?.('pagehide', save);
  target.addEventListener?.('beforeunload', save);
  target.document?.addEventListener?.('visibilitychange', onHidden);
  return () => {
    clearInterval(timer);
    target.removeEventListener?.('pagehide', save);
    target.removeEventListener?.('beforeunload', save);
    target.document?.removeEventListener?.('visibilitychange', onHidden);
  };
}