import { db } from "./mockDb.js";
import { delay, ServiceError } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for storage. In Phase C only the bodies change (an HTTP call).

// The blueprint keeps the quota in backend configuration (STORAGE_QUOTA_BYTES),
// not in a table. The mock keeps it here. 1 GB = 1024 MB, the same as formatFileSize.
const STORAGE_QUOTA_BYTES = 50 * 1024 ** 3;

// GET /storage/summary  (admin only)
// Raw bytes only: the percentage, free space and labels are calculated by the UI.
/**
 * @returns {Promise<{usedBytes: number, quotaBytes: number}>}
 */
export async function getStorageSummary() {
  await delay();
  if (getMockCurrentUser().role !== "admin") {
    throw new ServiceError(403, "You are not allowed to view storage usage");
  }

  // Archived documents still occupy storage, so every document counts.
  const usedBytes = db.documents.reduce((total, doc) => total + doc.sizeBytes, 0);
  return { usedBytes, quotaBytes: STORAGE_QUOTA_BYTES };
}