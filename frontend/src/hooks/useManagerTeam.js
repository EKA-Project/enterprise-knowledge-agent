import { getDepartment } from "../services/departmentService.js";
import { getDepartmentUsage } from "../services/usageService.js";
import { getCurrentUser, getUsers } from "../services/userService.js";
import useApi from "./useApi.js";

// Everything the manager overview needs about the manager's own team.
// Returns { data: { user, department, members }, loading, error, reload }:
//   user        the signed-in user (from GET /me)
//   department  their department, or null when they have none (the admin)
//   members     ACTIVE users of that department, each merged with their usage
//               (dailyQueries, searches, lastActiveAt, documentsUploaded)
//
// Nothing is stored on the page: when the backend arrives, only the services
// change. The merge happens here once, so components never join two lists.
export default function useManagerTeam() {
  return useApi(async () => {
    const user = await getCurrentUser();
    // The admin has no department; a manager always has one.
    if (!user.departmentId) return { user, department: null, members: [] };

    // These three do not depend on each other, so they run in parallel.
    const [department, users, usage] = await Promise.all([
      getDepartment(user.departmentId),
      getUsers({ departmentId: user.departmentId, status: "active" }),
      getDepartmentUsage(user.departmentId),
    ]);
    if (!department) throw new Error(`Department ${user.departmentId} not found`);

    // The usage endpoint returns one row per active member, so every member matches.
    const usageByUserId = new Map(usage.map((row) => [row.userId, row]));
    const members = users.map((member) => ({ ...member, ...usageByUserId.get(member.id) }));

    return { user, department, members };
  });
}