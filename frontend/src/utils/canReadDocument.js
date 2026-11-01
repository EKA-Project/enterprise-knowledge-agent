/**
 * The read rule from data-architecture.md section 6. Mock services use this;
 * the real backend enforces the same rule, so this never replaces server checks.
 *
 * @param {import('../types').User|null} user
 * @param {import('../types').Document} doc
 * @returns {boolean}
 */
export function canReadDocument(user, doc) {
  if (!user) return false; // added guard: no signed-in user, no access
  if (user.role === "admin") return true;

  // Archived documents: only the owning department's manager (admin handled above)
  if (doc.archivedAt) {
    return user.role === "manager" && user.departmentId === doc.departmentId;
  }

  return doc.visibility === "organization" || doc.departmentId === user.departmentId;
}