import Tooltip from "../common/Tooltip";
import DepartmentIcon from "./DepartmentIcon";
import { getInitials } from "./OrganizationData";

const mono = "font-(family-name:--font-mono)";
const COLS = "grid grid-cols-[2.2fr_2.3fr_1fr_1.2fr_1fr_1.2fr_1.5fr] items-center gap-4";

const ROLE_STYLES = {
  Manager: "border-[#fde68a] bg-[#fffbeb] text-[#d97706]",
  Admin: "border-[#fecdd3] bg-[#fff1f2] text-[#be123c]",
  Employee: "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]",
};
const STATUS_STYLES = {
  Active: "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]",
  Invited: "border-(--badge-border) bg-(--badge-bg) text-(--badge-text)",
  Suspended: "border-[#fed7aa] bg-[#fff7ed] text-[#c2410c]",
  Terminated: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]",
};
const FADE = { Suspended: "opacity-70", Terminated: "opacity-50" };

const pager =
  "rounded-full border border-(--border-medium) bg-white px-3 py-1 text-[11.5px] font-semibold text-(--text-primary) transition duration-200 hover:border-(--primary) hover:text-(--primary) active:scale-95 disabled:opacity-40 disabled:hover:border-(--border-medium) disabled:hover:text-(--text-primary)";

export default function UserDirectoryTable({
  rows, total, page, pageCount, perPage, onPage, onPerPage, getDept,
  onView, onEdit, onTerminate, onReactivate,
}) {
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <section className="org-rise overflow-hidden rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-3 px-6 pb-4 pt-6">
        <div>
          <h3 className="font-(family-name:--font-serif) text-[22px] font-bold text-(--text-primary)">User Directory ({total})</h3>
          <p className="mt-1 text-[12.5px] text-(--text-muted)">Manage member roles, access levels, and account statuses.</p>
        </div>
        <span className={`${mono} rounded-full bg-(--bg-surface-subtle) px-3 py-1 text-[11px] font-semibold text-(--text-secondary)`}>
          Showing {from}-{to} of {total}
        </span>
      </div>

<div className="org-user-directory__scroll-container overflow-x-auto xl:overflow-x-visible">
                    <div className="min-w-[1000px]">
          <div className={`${COLS} bg-(--bg-surface-subtle) px-6 py-3 ${mono} text-[10px] uppercase tracking-[0.14em] text-(--text-muted)`}>
            <span>Name</span>
            <span>Department</span>
            <span>Role</span>
            <span>Access level</span>
            <span>Status</span>
            <span>Last active</span>
            <span className="text-right">Actions</span>
          </div>

          {rows.length === 0 ? (
            <p className="org-fade px-6 py-10 text-center text-[13px] text-(--text-muted)">No members match your filters.</p>
          ) : (
            <ul>
              {rows.map((u) => {
                const dept = getDept(u.department);
                const terminated = u.status === "Terminated";
                return (
                  <li
                    key={u.id}
                    className={`${COLS} org-fade border-t border-(--border-subtle) px-6 py-3.5 transition-colors duration-200 hover:bg-(--primary-light)/70 ${FADE[u.status] ?? ""}`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dcf1ec] text-[12px] font-bold text-[#2b8aa0]">
                        {getInitials(u.name)}
                      </span>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => onView(u.id)}
                          className="block max-w-full truncate text-left text-[14px] font-bold text-(--primary) underline underline-offset-2 transition hover:text-(--primary-hover)"
                        >
                          {u.name}
                        </button>
                        <p className="truncate text-[11.5px] text-(--text-muted)">{u.email}</p>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <DepartmentIcon icon={dept.icon} tone={dept.tone} />
                        <span className="truncate text-[13px] font-semibold text-(--text-primary)">{u.department}</span>
                      </div>
                      {u.leadOf && (
                        <span className="mt-1 inline-flex max-w-full items-center gap-1 truncate rounded border border-[#fde68a] bg-[#fffbeb] px-1.5 py-0.5 text-[9.5px] font-bold text-[#b45309]">
                          <span aria-hidden="true">👔</span> Lead: {u.leadOf}
                        </span>
                      )}
                    </div>

                    <span className={`${mono} w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${ROLE_STYLES[u.role] ?? ROLE_STYLES.Employee}`}>
                      {u.role}
                    </span>
                    <span className={`${mono} w-fit rounded-full border border-(--border-medium) bg-(--bg-surface-subtle) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-(--text-secondary)`}>
                      {u.access}
                    </span>
                    <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold ${STATUS_STYLES[u.status]}`}>{u.status}</span>
                    <span className={`${mono} text-[11.5px] text-(--text-muted)`}>{u.lastActive}</span>

                    <div className="flex items-center justify-end gap-4 text-[12.5px] font-bold">
                      <Tooltip label="View Details & Activity">
                        <button type="button" onClick={() => onView(u.id)} className="text-(--primary) transition hover:text-(--primary-hover) hover:underline">
                          View
                        </button>
                      </Tooltip>
                      <button type="button" onClick={() => onEdit(u.id)} className="text-(--text-secondary) transition hover:text-(--primary) hover:underline">
                        Edit
                      </button>
                      {terminated ? (
                        <button
                          type="button"
                          onClick={() => onReactivate(u.id)}
                          className="rounded-full border border-(--status-verified-border) bg-(--status-success-bg) px-2.5 py-0.5 text-[11px] text-(--status-success) transition duration-200 hover:-translate-y-0.5 hover:bg-(--status-success) hover:text-white active:scale-95"
                        >
                          Re-activate
                        </button>
                      ) : (
                        <button type="button" onClick={() => onTerminate(u.id)} className="text-(--status-danger) transition hover:text-[#b91c1c] hover:underline">
                          Terminate
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-(--border-subtle) px-6 py-4 text-[12px] text-(--text-muted)">
        <div className="flex flex-wrap items-center gap-5">
          <span>
            Showing <b className="text-(--text-primary)">{from}-{to}</b> of <b className="text-(--text-primary)">{total}</b> members
          </span>
          <label className="flex items-center gap-2">
            Per page:
            <select
              value={perPage}
              onChange={(e) => onPerPage(Number(e.target.value))}
              className="rounded-lg border border-(--border-medium) bg-white px-2.5 py-1 text-[12px] font-semibold text-(--text-primary) outline-none transition hover:border-(--primary) focus:border-(--border-focus)"
            >
              {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className={pager} disabled={page <= 1} onClick={() => onPage(page - 1)}>← Prev</button>
          <span className="font-semibold text-(--text-primary)">Page {page} of {pageCount}</span>
          <button type="button" className={pager} disabled={page >= pageCount} onClick={() => onPage(page + 1)}>Next →</button>
        </div>
      </div>
    </section>
  );
}