import { useMemo, useState } from "react";
import UserStatCards from "./UserStatCards";
import UserFilters from "./UserFilters";
import UserDirectoryTable from "./UserDirectoryTable";

const EMPTY_FILTERS = { query: "", dept: "all", role: "all", access: "all", status: "all" };

export default function UserManagementTab({ users, departments, onView, onEdit, onTerminate, onReactivate }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return users.filter(
      (u) =>
        (!q || `${u.name} ${u.email} ${u.department}`.toLowerCase().includes(q)) &&
        (filters.dept === "all" || u.department === filters.dept) &&
        (filters.role === "all" || u.role === filters.role) &&
        (filters.access === "all" || u.access === filters.access) &&
        (filters.status === "all" || u.status === filters.status),
    );
  }, [users, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pageCount);
  const rows = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const deptByName = useMemo(() => Object.fromEntries(departments.map((d) => [d.name, d])), [departments]);
  const getDept = (name) => deptByName[name] ?? { icon: "briefcase", tone: "indigo" };

  const changeFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <UserStatCards users={users} />
      <UserFilters filters={filters} onChange={changeFilters} departmentNames={departments.map((d) => d.name)} />
      <UserDirectoryTable
        rows={rows}
        total={filtered.length}
        page={safePage}
        pageCount={pageCount}
        perPage={perPage}
        onPage={setPage}
        onPerPage={(n) => {
          setPerPage(n);
          setPage(1);
        }}
        getDept={getDept}
        onView={onView}
        onEdit={onEdit}
        onTerminate={onTerminate}
        onReactivate={onReactivate}
      />
    </div>
  );
}