import { db } from './mockDb.js';

// Called by documentService.updateDocument after a successful edit.
export function recordAmendment({ documentId, userId, changedFields }) {
  if (!changedFields.length) return;
  db.amendments.push({
    id: `amd_${Date.now()}`,
    documentId,
    userId,
    changedFields,
    at: new Date().toISOString(),
  });
}

// Newest first. Used by Recently Updated and "Updated This Week".
export async function getAmendments({ limit = 50 } = {}) {
  return db.amendments
    .slice()
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, limit)
    .map((a) => ({ ...a }));
}