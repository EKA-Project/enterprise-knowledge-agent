import { users } from "../data/mock/users.js";
import { clone, delay } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for users. Every function is async and returns the stored shape
// from data-architecture.md section 4.2. In Phase C only the bodies change.

// GET /me
/** @returns {Promise<import('../types').User>} */
export async function getCurrentUser() {
  await delay(80);
  return clone(getMockCurrentUser());
}

// GET /users?departmentId=&role=&status=
// Every filter is optional. Mock phase: everyone may list users (see the open
// question in the PR notes about names-only access for non-admins).
/**
 * @param {{departmentId?: string, role?: import('../types').UserRole, status?: 'active'|'inactive'}} [filters]
 * @returns {Promise<import('../types').User[]>}
 */
export async function getUsers(filters = {}) {
  await delay();
  const { departmentId, role, status } = filters;
  return clone(
    users.filter(
      (u) =>
        (departmentId === undefined || u.departmentId === departmentId) &&
        (role === undefined || u.role === role) &&
        (status === undefined || u.status === status),
    ),
  );
}