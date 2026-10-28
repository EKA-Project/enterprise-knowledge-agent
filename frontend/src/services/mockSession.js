import { users } from "../data/mock/users.js";

// MOCK-ONLY stand-in for "who is signed in". Phase C replaces it with GET /me,
// so this file is deleted together with src/data/mock/.
//
// AuthContext already saves the role switcher's choice in localStorage under
// this key, so we read it from there and leave AuthContext untouched. If
// AuthContext renames the key or the role labels, update this file too.
const ROLE_STORAGE_KEY = "eka-role";

// Role label saved by the switcher -> the mock user who plays that role.
// All three are in Engineering, which has the richest data.
const USER_ID_BY_ROLE = {
  Admin: "usr_001", // Maya Narang
  Manager: "usr_003", // Rachel Green, Engineering & DevOps
  Employee: "usr_005", // Alex Morgan, Engineering & DevOps
};

/**
 * Read on every call, not cached: the switcher can change at any time, and the
 * next service call must see the new role. Unknown or missing labels fall back
 * to the employee, the least privileged user.
 *
 * @returns {import('../types').User}
 */
export function getMockCurrentUser() {
  let role = null;
  try {
    role = localStorage.getItem(ROLE_STORAGE_KEY);
  } catch {
    // localStorage can be unavailable (private mode, tests): use the fallback
  }
  const userId = USER_ID_BY_ROLE[role] ?? USER_ID_BY_ROLE.Employee;
  return users.find((u) => u.id === userId);
}