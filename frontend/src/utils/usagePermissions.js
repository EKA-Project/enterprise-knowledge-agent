// Who may read a department's usage numbers (blueprint section 6: managers are
// limited to their own department, the admin sees every department).
// The backend enforces the same rule; hiding a widget is never the real check.

/**
 * @param {import('../types').User} user
 * @param {string} departmentId
 * @returns {boolean}
 */
export function canViewDepartmentUsage(user, departmentId) {
  if (user.role === "admin") return true;
  return user.role === "manager" && user.departmentId === departmentId;
}