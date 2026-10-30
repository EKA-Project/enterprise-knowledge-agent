import { getDepartment } from "../services/departmentService.js";
import { getDocuments } from "../services/documentService.js";
import { getCurrentUser } from "../services/userService.js";
import useApi from "./useApi.js";

// The two document numbers on the manager KPI cards, for the manager's own
// department. Returns { data: { documentCount, readyCount }, loading, error, reload }.
export default function useDepartmentKpis() {
  return useApi(async () => {
    const user = await getCurrentUser();
    // The admin has no department; a manager always has one.
    if (!user.departmentId) return { documentCount: 0, readyCount: 0 };

    const [department, ready] = await Promise.all([
      getDepartment(user.departmentId),
      // limit 1: we only need `total`, not the rows
      getDocuments({ departmentId: user.departmentId, status: "ready", limit: 1 }),
    ]);

    return {
      // Per viewer, so it always matches the documents table total
      documentCount: department?.documentCount ?? 0,
      readyCount: ready.total,
    };
  });
}