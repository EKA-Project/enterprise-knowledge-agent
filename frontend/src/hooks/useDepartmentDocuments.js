import { getDepartment } from "../services/departmentService.js";
import { getDocuments } from "../services/documentService.js";
import { getCurrentUser } from "../services/userService.js";
import { toManagerDocumentRow } from "../utils/managerDocumentRow.js";
import useApi from "./useApi.js";

// One page of the manager's own department documents.
// Returns { data: { departmentName, total, items }, loading, error, reload }.
// Paging is done by the service (limit/offset), so we never fetch "all" and slice.
export default function useDepartmentDocuments(page, pageSize) {
  return useApi(async () => {
    const user = await getCurrentUser();
    // The admin has no department. A manager always has one.
    if (!user.departmentId) return { departmentName: null, total: 0, items: [] };

    const [department, documents] = await Promise.all([
      getDepartment(user.departmentId),
      getDocuments({
        departmentId: user.departmentId,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),
    ]);

    return {
      departmentName: department?.name ?? null,
      total: documents.total,
      items: documents.items.map((doc) => toManagerDocumentRow(doc)),
    };
  }, [page, pageSize]);
}