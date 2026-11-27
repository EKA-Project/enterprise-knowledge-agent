// User WRITE rules. The blueprint does not define who may change users yet (it is
// listed under Known gaps), so this follows the department rules: admin only.
// Mock services enforce them; the real backend enforces the same rules. UI code
// may use them to hide buttons, but that is only a convenience, never security.

/**
 * Invite, edit, deactivate and re-activate users: admin only.
 * @param {import('../types').User|null} user
 */
export function canManageUsers(user) {
  return user?.role === "admin";
}