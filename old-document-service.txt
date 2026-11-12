import { documents } from './DocumentData';

// Mock "API" for the Documents page. Every function is async and returns plain
// data, exactly like a real request would. When the backend is ready, replace
// the bodies with fetch() calls (e.g. GET /api/documents); no component changes.

// In-memory database, so flag changes survive until the page is reloaded
const db = documents.map((doc) => ({ ...doc }));

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// GET /documents
export async function getDocuments() {
  await delay();
  return db.map((doc) => ({ ...doc }));
}

// GET /documents/:id  (resolves to null when the id doesn't exist)
export async function getDocumentById(id) {
  await delay();
  const doc = db.find((item) => item.id === id);
  return doc ? { ...doc } : null;
}

// PATCH /documents/:id  { isPinned | isBookmarked: boolean }
export async function setDocumentFlag(id, flag, value) {
  await delay(80);
  const doc = db.find((item) => item.id === id);
  if (!doc) throw new Error(`Document ${id} not found`);
  doc[flag] = value;
  return { ...doc };
}