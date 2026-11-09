// @ts-check
// MOCK TABLE: users. Disposable: deleted when the API is live.
// Shape: data-architecture.md section 4.2. Only userService reads this file.
// Rules: exactly one admin (departmentId null); every manager manages the
// department they belong to; no job titles; passwords never live here.

/** @type {import('../../types/users.js').User[]} */
export const users = [
  // Admin: the only user without a department
  { id: "usr_001", employeeCode: "NSA-001", name: "Maya Narang", email: "maya@northstar.studio", role: "admin", departmentId: null, status: "active", createdAt: "2026-01-05T09:00:00Z", updatedAt: "2026-01-05T09:00:00Z" },

  // Managers: one per department (see departments.managerId)
  { id: "usr_002", employeeCode: "NSM-002", name: "Priya Nair", email: "priya@northstar.studio", role: "manager", departmentId: "dept_hr", status: "active", createdAt: "2026-01-12T09:00:00Z", updatedAt: "2026-01-12T09:00:00Z" },
  { id: "usr_003", employeeCode: "NSM-003", name: "Rachel Green", email: "rachel@northstar.studio", role: "manager", departmentId: "dept_eng", status: "active", createdAt: "2026-01-12T09:00:00Z", updatedAt: "2026-01-12T09:00:00Z" },
  { id: "usr_004", employeeCode: "NSM-004", name: "Marcus Chen", email: "marcus@northstar.studio", role: "manager", departmentId: "dept_prod", status: "active", createdAt: "2026-01-12T09:00:00Z", updatedAt: "2026-01-12T09:00:00Z" },
  { id: "usr_006", employeeCode: "NSM-006", name: "Sofia Alvarez", email: "sofia@northstar.studio", role: "manager", departmentId: "dept_sec", status: "active", createdAt: "2026-01-14T09:00:00Z", updatedAt: "2026-01-14T09:00:00Z" },
  { id: "usr_007", employeeCode: "NSM-007", name: "Jordan Blake", email: "jordan@northstar.studio", role: "manager", departmentId: "dept_gtm", status: "active", createdAt: "2026-01-14T09:00:00Z", updatedAt: "2026-01-14T09:00:00Z" },
  { id: "usr_008", employeeCode: "NSM-008", name: "Helena Ortiz", email: "helena@northstar.studio", role: "manager", departmentId: "dept_legal", status: "active", createdAt: "2026-01-14T09:00:00Z", updatedAt: "2026-01-14T09:00:00Z" },

  // Employees
  { id: "usr_005", employeeCode: "NSE-005", name: "Alex Morgan", email: "alex@northstar.studio", role: "employee", departmentId: "dept_eng", status: "active", createdAt: "2026-02-03T09:00:00Z", updatedAt: "2026-02-03T09:00:00Z" },
  { id: "usr_009", employeeCode: "NSE-009", name: "Ben Carter", email: "ben@northstar.studio", role: "employee", departmentId: "dept_eng", status: "active", createdAt: "2026-02-10T09:00:00Z", updatedAt: "2026-02-10T09:00:00Z" },
  { id: "usr_010", employeeCode: "NSE-010", name: "Nina Patel", email: "nina@northstar.studio", role: "employee", departmentId: "dept_eng", status: "active", createdAt: "2026-02-17T09:00:00Z", updatedAt: "2026-02-17T09:00:00Z" },
  { id: "usr_011", employeeCode: "NSE-011", name: "Tom Reyes", email: "tom@northstar.studio", role: "employee", departmentId: "dept_hr", status: "active", createdAt: "2026-02-17T09:00:00Z", updatedAt: "2026-02-17T09:00:00Z" },
  { id: "usr_012", employeeCode: "NSE-012", name:"Aisha Khan", email: "aisha@northstar.studio", role: "employee", departmentId: "dept_hr", status: "active", createdAt: "2026-03-02T09:00:00Z", updatedAt: "2026-03-02T09:00:00Z" },
  { id: "usr_013", employeeCode: "NSE-013", name: "Leo Fischer", email: "leo@northstar.studio", role: "employee", departmentId: "dept_prod", status: "active", createdAt: "2026-03-02T09:00:00Z", updatedAt: "2026-03-02T09:00:00Z" },
  { id: "usr_014", employeeCode: "NSE-014", name: "Mei Tanaka", email: "mei@northstar.studio", role: "employee", departmentId: "dept_prod", status: "active", createdAt: "2026-03-09T09:00:00Z", updatedAt: "2026-03-09T09:00:00Z" },
  { id: "usr_015", employeeCode: "NSE-015", name: "Omar Haddad", email: "omar@northstar.studio", role: "employee", departmentId: "dept_sec", status: "active", createdAt: "2026-03-09T09:00:00Z", updatedAt: "2026-03-09T09:00:00Z" },
  {id: "usr_016", employeeCode: "NSE-016", name: "Clara Dubois", email: "clara@northstar.studio", role: "employee", departmentId: "dept_gtm", status: "active", createdAt: "2026-03-16T09:00:00Z", updatedAt: "2026-03-16T09:00:00Z" },
  { id: "usr_017", employeeCode: "NSE-017", name: "Ravi Menon", email: "ravi@northstar.studio", role: "employee", departmentId: "dept_legal", status: "active", createdAt: "2026-03-16T09:00:00Z", updatedAt: "2026-03-16T09:00:00Z" },

  // Inactive: the row stays because documents reference uploadedById, but the
  // person is not counted in memberCount
  { id: "usr_018", employeeCode: "NSE-018", name: "Sam Whitaker", email: "sam@northstar.studio", role: "employee", departmentId: "dept_eng", status: "inactive", createdAt: "2026-02-03T09:00:00Z", updatedAt: "2026-09-30T09:00:00Z" },
];