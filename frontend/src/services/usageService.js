import { canViewDepartmentUsage } from "../utils/usagePermissions.js";
import { db } from "./mockDb.js";
import { clone, delay, ServiceError } from "./mockHelpers.js";
import { getMockCurrentUser } from "./mockSession.js";

// Mock "API" for member usage. In Phase C only the body changes (an HTTP call).
// The backend will need a "question asked" event to calculate dailyQueries; the
// blueprint has none yet, which is why the numbers come from a mock-only table.

// Two 30-day periods, so the dashboard's "growth vs previous period" compares
// real data. The validator (scripts/validateMockData.js) uses the same number.
export const USAGE_DAYS = 60;

// GET /departments/{id}/usage  (admin, or that department's manager)
// One row per ACTIVE member of the department. A member with no recorded usage
// still gets a row (all zeros), so the roster never depends on the usage data.
/**
 * @param {string} departmentId
 * @returns {Promise<import('../types/usage.js').DepartmentMemberUsage[]>}
 */
export async function getDepartmentUsage(departmentId) {
  await delay();
  if (!db.departments.some((d) => d.id === departmentId)) {
    throw new ServiceError(404, "Department not found");
  }
  if (!canViewDepartmentUsage(getMockCurrentUser(), departmentId)) {
    throw new ServiceError(403, "You are not allowed to view this department's usage");
  }

  const members = db.users.filter((u) => u.departmentId === departmentId && u.status === "active");

  return clone(
    members.map((member) => {
      const row = db.memberUsage.find((r) => r.userId === member.id);
      return {
        userId: member.id,
        dailyQueries: row?.dailyQueries ?? Array(USAGE_DAYS).fill(0),
        searches: row?.searches ?? 0,
        lastActiveAt: row?.lastActiveAt ?? null,
        documentsUploaded: db.documents.filter((doc) => doc.uploadedById === member.id && !doc.archivedAt).length,
      };
    }),
  );
}