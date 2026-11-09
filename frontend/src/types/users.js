// Shape for the `users` table. Source: data-architecture.md, section 4.2.
// There are no job titles: a user is an admin, a manager or an employee.

/** @typedef {'admin'|'manager'|'employee'} UserRole */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} employeeCode  Shown as the Emp ID. Format NSA|NSM|NSE-000, set once at creation and never recalculated.
 * @property {UserRole} role
 * @property {string|null} departmentId  Null only for the admin
 * @property {'active'|'inactive'} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export {};
