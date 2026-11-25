import { canManageUsers } from "../utils/userPermissions.js";
import { db, nextUserId } from "./mockDb.js";
import { clone, delay, nowIso, ServiceError } from "./mockHelpers.js";
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
    db.users.filter(
      (u) =>
        (departmentId === undefined || u.departmentId === departmentId) &&
        (role === undefined || u.role === role) &&
        (status === undefined || u.status === status),
    ),
  );
}

// ── writes ──────────────────────────────────────────────────────────
// Every write enforces its rules itself, and validates everything BEFORE anything
// is written, so a bad field never leaves a half-applied change. A refused write
// throws a ServiceError (403, 404, 409, 422). Hiding a button is never the check.

const ASSIGNABLE_ROLES = ["manager", "employee"]; // exactly one admin exists
const CREATE_FIELDS = ["name", "email", "role", "departmentId"];
const EDIT_FIELDS = ["role", "departmentId"];
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const CODE_PREFIX_BY_ROLE = { admin: "NSA", manager: "NSM", employee: "NSE" };

// "usr_019" + "manager" -> "NSM-019". Set once at creation and never recalculated.
const employeeCodeFor = (role, id) => `${CODE_PREFIX_BY_ROLE[role]}-${id.replace(/^usr_/, "")}`;

function requireAdmin() {
  if (!canManageUsers(getMockCurrentUser())) throw new ServiceError(403, "Only the admin can change users");
}

function getUserOrThrow(id) {
  const user = db.users.find((u) => u.id === id);
  if (!user) throw new ServiceError(404, "User not found");
  return user;
}

function requireNotAdmin(user) {
  if (user.role === "admin") throw new ServiceError(409, "The admin account cannot be changed here");
}

function requireAssignableRole(role) {
  if (!ASSIGNABLE_ROLES.includes(role)) {
    throw new ServiceError(422, `Role must be one of: ${ASSIGNABLE_ROLES.join(", ")}`);
  }
}

function requireDepartment(departmentId) {
  if (!db.departments.some((d) => d.id === departmentId)) throw new ServiceError(422, "Unknown department");
}

// A manager is a foreign key on the department, so moving or removing them would
// leave the department pointing at the wrong person.
function requireNotAManager(user, action) {
  const department = db.departments.find((d) => d.managerId === user.id);
  if (department) {
    throw new ServiceError(409, `${user.name} manages ${department.name}. Assign another manager before ${action}.`);
  }
}

// POST /users  (admin only). The new member starts active.
/**
 * @param {{name: string, email: string, role: 'manager'|'employee', departmentId: string}} input
 * @returns {Promise<import('../types').User>}
 */
export async function createUser(input = {}) {
  await delay();
  requireAdmin();

  const notAllowed = Object.keys(input).filter((key) => !CREATE_FIELDS.includes(key));
  if (notAllowed.length > 0) throw new ServiceError(422, `These fields cannot be set: ${notAllowed.join(", ")}`);
  const missing = CREATE_FIELDS.filter((key) => !String(input[key] ?? "").trim());
  if (missing.length > 0) throw new ServiceError(422, `Missing fields: ${missing.join(", ")}`);

  const name = input.name.trim();
  const email = input.email.trim();
  if (!EMAIL_PATTERN.test(email)) throw new ServiceError(422, "Enter a valid email address");
  requireAssignableRole(input.role);
  requireDepartment(input.departmentId);
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new ServiceError(409, "A member with this email already exists");
  }

  const id = nextUserId();
  const now = nowIso();
  /** @type {import('../types').User} */
  const user = {
    id,
    employeeCode: employeeCodeFor(input.role, id),
    name,
    email,
    role: input.role,
    departmentId: input.departmentId,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
  db.users.push(user);
  return clone(user);
}

// PATCH /users/{id}  { role?, departmentId? }  (admin only)
// A department's manager cannot change role or department until another manager
// is assigned.
/**
 * @param {string} id
 * @param {{role?: 'manager'|'employee', departmentId?: string}} changes
 * @returns {Promise<import('../types').User>}
 */
export async function updateUser(id, changes = {}) {
  await delay();
  requireAdmin();
  const user = getUserOrThrow(id);
  requireNotAdmin(user);

  const keys = Object.keys(changes);
  if (keys.length === 0) throw new ServiceError(422, "No changes given");
  const notEditable = keys.filter((key) => !EDIT_FIELDS.includes(key));
  if (notEditable.length > 0) throw new ServiceError(422, `These fields cannot be changed: ${notEditable.join(", ")}`);

  if ("role" in changes) requireAssignableRole(changes.role);
  if ("departmentId" in changes) requireDepartment(changes.departmentId);

  const next = { role: changes.role ?? user.role, departmentId: changes.departmentId ?? user.departmentId };
  const changed = next.role !== user.role || next.departmentId !== user.departmentId;
  if (changed) requireNotAManager(user, "changing their role or department");

  Object.assign(user, next, { updatedAt: nowIso() });
  return clone(user);
}

// POST /users/{id}/deactivate  (admin only; idempotent)
// The row stays, because documents reference uploadedById.
/** @returns {Promise<import('../types').User>} */
export async function deactivateUser(id) {
  await delay();
  requireAdmin();
  const user = getUserOrThrow(id);
  requireNotAdmin(user);
  if (user.status === "active") {
    requireNotAManager(user, "deactivating them");
    Object.assign(user, { status: "inactive", updatedAt: nowIso() });
  }
  return clone(user);
}

// POST /users/{id}/reactivate  (admin only; idempotent)
/** @returns {Promise<import('../types').User>} */
export async function reactivateUser(id) {
  await delay();
  requireAdmin();
  const user = getUserOrThrow(id);
  if (user.status !== "active") Object.assign(user, { status: "active", updatedAt: nowIso() });
  return clone(user);
}