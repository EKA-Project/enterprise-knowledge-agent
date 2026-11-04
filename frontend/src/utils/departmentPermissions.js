// Department WRITE rules from data-architecture.md sections 4.1 and 10.2.
// Mock services enforce them; the real backend enforces the same rules. UI code
// may use them to hide buttons, but that is only a convenience, never security.

/**
 * Create, edit and assign the manager of a department: admin only.
 * @param {import('../types').User|null} user
 */
export function canManageDepartments(user) {
  return user?.role === "admin";
}

/**
 * Re-index a department's collection: the admin, or that department's manager.
 * (Same rule as managing its documents.)
 * @param {import('../types').User|null} user
 * @param {string} departmentId
 */
export function canReindexCollection(user, departmentId) {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.role === "manager" && user.departmentId === departmentId;
}