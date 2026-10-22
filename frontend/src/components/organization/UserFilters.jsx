import { Search } from "lucide-react";
import { ACCESS_LEVELS, USER_ROLES, USER_STATUSES } from "./OrganizationData";

const select =
  "rounded-xl border border-(--border-medium) bg-white px-3 py-2 text-[12px] font-semibold text-(--text-primary) outline-none transition duration-200 hover:border-(--primary) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";

export default function UserFilters({ filters, onChange, departmentNames }) {
  return (
    <div className="org-rise flex flex-wrap items-center gap-3 rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) p-4 shadow-(--shadow-sm)">
      <label className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-xl border border-(--badge-border) bg-(--primary-light) px-3.5 py-2.5 transition focus-within:border-(--border-focus) focus-within:shadow-[0_0_0_3px_var(--primary-glow)]">
        <Search size={15} className="shrink-0 text-(--text-muted)" aria-hidden="true" />
        <input
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="Search members by name, email address, or department..."
          aria-label="Search members"
          className="w-full bg-transparent text-[13px] text-(--text-primary) outline-none placeholder:text-(--text-muted)"
        />
      </label>

      <select aria-label="Department" value={filters.dept} onChange={(e) => onChange({ dept: e.target.value })} className={select}>
        <option value="all">All Departments</option>
        {departmentNames.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <select aria-label="Role" value={filters.role} onChange={(e) => onChange({ role: e.target.value })} className={select}>
        <option value="all">All Roles</option>
        {USER_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <select aria-label="Access level" value={filters.access} onChange={(e) => onChange({ access: e.target.value })} className={select}>
        <option value="all">All Access</option>
        {ACCESS_LEVELS.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      <select aria-label="Status" value={filters.status} onChange={(e) => onChange({ status: e.target.value })} className={select}>
        <option value="all">All Status</option>
        {USER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}