// EKA-EDIT: new file. Loads everything the Storage page needs through services only.
// summary + departments + Recycle Bin load together. Every write refreshes them,
// and `version` changes so the Free up space list reloads too.
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDepartments } from "../services/departmentService.js";
import {
  archiveDocuments,
  getRecycleBin,
  getStorageSummary,
  purgeDocuments,
  restoreDocument,
} from "../services/storageService.js";

export function useStorageData() {
  const [data, setData] = useState({ summary: null, departments: [], bin: [], binTotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [summary, departments, binPage] = await Promise.all([
        getStorageSummary(),
        getDepartments(),
        getRecycleBin({ limit: 200 }),
      ]);
      setData({ summary, departments, bin: binPage.items, binTotal: binPage.total });
      setError(null);
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // departmentId -> { id, name, colorKey, iconKey }  (names are looked up, never stored: blueprint rule 3)
  const departmentsById = useMemo(
    () => new Map(data.departments.map((d) => [d.id, d])),
    [data.departments],
  );

  // Each action returns the service result ({succeeded, failed}) so the page can toast,
  // then refreshes. Bulk actions never throw for a single refused document.
  const archive = useCallback(async (ids) => {
    const result = await archiveDocuments(ids);
    await refresh();
    return result;
  }, [refresh]);

  const purge = useCallback(async (ids, options) => {
    const result = await purgeDocuments(ids, options);
    await refresh();
    return result;
  }, [refresh]);

  const restore = useCallback(async (id) => {
    const doc = await restoreDocument(id);
    await refresh();
    return doc;
  }, [refresh]);

  return {
    summary: data.summary,
    departments: data.departments,
    departmentsById,
    bin: data.bin,
    binTotal: data.binTotal,
    loading,
    error,
    version,
    refresh,
    archive,
    purge,
    restore,
  };
}