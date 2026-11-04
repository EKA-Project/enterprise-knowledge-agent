// The WRITE rules from data-architecture.md section 4.3, next to canReadDocument.
// Mock services enforce them; the real backend enforces the same rules. UI code
// may use them to hide buttons, but that is only a convenience, never security.

/**
 * Admin: any department. Manager: their own department only. Employee: never.
 * @param {import('../types').User|null} user
 * @param {string} departmentId
 */
export function canUploadToDepartment(user, departmentId) {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.role === "manager" && user.departmentId === departmentId;
}

/**
 * Edit, archive, delete, re-index or replace the file of a document:
 * the admin for any document, a manager for their own department's only.
 * @param {import('../types').User|null} user
 * @param {import('../types').Document} doc
 */
export function canManageDocument(user, doc) {
  return canUploadToDepartment(user, doc.departmentId);
}

/** Pinning is org-wide, so only the admin may do it. @param {import('../types').User|null} user */
export function canPinDocuments(user) {
  return user?.role === "admin";
}