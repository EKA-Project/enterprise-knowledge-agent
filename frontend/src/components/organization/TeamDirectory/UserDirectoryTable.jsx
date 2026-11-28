import { ViewButton, EditButton, RemoveButton, ReindexButton } from "../../common/RowIconButtons";
import DepartmentIcon from "./DepartmentIcon";
import { Crown, Globe, Star, User } from "lucide-react";
import { getInitials, ROLE_LABELS } from "../OrganizationData";
import Pagination from "../../common/Pagination";
const mono = "font-(family-name:--font-mono)";
const COLS = "grid grid-cols-[2.2fr_2.3fr_1fr_1fr_1.2fr_1.5fr] items-center gap-4";

const ROLE_STYLES = {
  Manager: "border-(--status-warning)/30 bg-(--status-warning-bg) text-(--status-warning)",
  Admin: "border-(--status-danger)/30 bg-(--status-danger-bg) text-(--status-danger)",
  Employee: "border-(--status-success)/30 bg-(--status-success-bg) text-(--status-success)",
};
const ROLE_ICONS = { Admin: Crown, Manager: Star, Employee: User };
const STATUS_STYLES = {
  Active: "border-(--status-success)/30 bg-(--status-success-bg) text-(--status-success)",
  Terminated: "border-(--status-error)/30 bg-(--status-error-bg) text-(--status-error)",
};
const FADE = { Terminated: "opacity-50" };

export default function UserDirectoryTable({
  rows, total, page, perPage, onPage, onPerPage, getDept,
  onView, onEdit, onTerminate, onReactivate,
}) {

  return (
    <section className="org-rise overflow-hidden rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-3 px-6 pb-4 pt-6">
        <div>
          <h3 className="font-(family-name:--font-serif) text-[22px] font-bold text-(--text-primary)">User Directory ({total})</h3>
          <p className="mt-1 text-[12.5px] text-(--text-muted)">Manage member roles and account statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-[12px] text-(--text-muted)">
            Per page:
            <select
              value={perPage}
              onChange={(e) => onPerPage(Number(e.target.value))}
              className="rounded-lg border border-(--border-medium) bg-(--bg-surface) px-2.5 py-1 text-[12px] font-semibold text-(--text-primary) outline-none transition hover:border-(--primary) focus:border-(--border-focus)"
            >
            {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>  
      </div>

<div className="org-user-directory__scroll-container overflow-x-auto xl:overflow-x-visible">
                    <div className="min-w-[1000px]">
          <div className={`${COLS} bg-(--bg-surface-subtle) px-6 py-3 ${mono} text-[10px] uppercase tracking-[0.14em] text-(--text-muted)`}>
            <span>Name</span>
            <span>Department</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined</span>
            <span className="text-right">Actions</span>
          </div>

          {rows.length === 0 ? (
            <p className="org-fade px-6 py-10 text-center text-[13px] text-(--text-muted)">No members match your filters.</p>
          ) : (
            <ul>
            {rows.map((u) => {
              const dept = getDept(u.department);
              const terminated = u.status === "Terminated";
              const isAdmin = u.role === ROLE_LABELS.admin;
              const RoleIcon = ROLE_ICONS[u.role] ?? User;
              return (
                <li
                  key={u.id}
                  className={`${COLS} org-fade border-t border-(--border-subtle) px-6 py-3.5 transition-colors duration-200 hover:bg-(--primary-light)/70 ${FADE[u.status] ?? ""}`}
                >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-(--primary-light) text-[12px] font-bold text-(--primary)">
                    {getInitials(u.name)}
                  </span>
                  <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onView(u.id)}
                    className="block max-w-full truncate text-left text-[14px] font-bold text-(--text-primary) transition hover:text-(--primary)"
                  >
                  {u.name}
                </button>
                <p className="truncate text-[11.5px] text-(--text-muted)">{u.email}</p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              {isAdmin ? (
              <>
              <span className="grid size-6 shrink-0 place-items-center rounded-md border border-(--border-medium) bg-(--primary-light) text-(--primary)">
                <Globe size={13} aria-hidden="true" />
              </span>
              <span className="truncate text-[13px] font-semibold text-(--text-primary)">Organization-wide</span>
              <span className={`${mono} shrink-0 rounded border border-(--border-medium) bg-(--bg-surface-subtle) px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-(--text-secondary)`}>
                GLOBAL
              </span>
            </>
            ) : (
            <>
            <DepartmentIcon colorKey={dept.colorKey} iconKey={dept.iconKey} />
            <span className="truncate text-[13px] font-semibold text-(--text-primary)">{u.department}</span>
              {u.leadOf && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded border border-(--status-warning)/30 bg-(--status-warning-bg) px-1.5 py-0.5 text-[9.5px] font-bold text-(--status-warning)">
                  <Star size={9} aria-hidden="true" /> Lead
                </span>
              )}
            </>
          )}
        </div>

        <span className={`${mono} inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${ROLE_STYLES[u.role] ?? ROLE_STYLES.Employee}`}>
          <RoleIcon size={10} aria-hidden="true" /> {u.role}
        </span>
        <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold ${STATUS_STYLES[u.status] ?? ""}`}>{u.status}</span>
        <span className={`${mono} text-[11.5px] text-(--text-muted)`}>{u.joined}</span>

        <div className="flex items-center justify-end gap-1">
          <ViewButton label="View details & activity" onClick={() => onView(u.id)} />
          {onEdit && <EditButton label={`Edit ${u.name}`} onClick={() => onEdit(u.id)} />}
          {terminated
              ? onReactivate && (
                <button
                  type="button"
                  onClick={() => onReactivate(u.id)}
                  className="ml-1 rounded-full border border-(--status-verified-border) bg-(--status-success-bg) px-2.5 py-0.5 text-[11px] font-bold text-(--status-success) transition duration-200 hover:-translate-y-0.5 hover:bg-(--status-success) hover:text-white active:scale-95"
                >
                  Re-activate
                </button>
              )
            : onTerminate && (
                <RemoveButton label={`Terminate ${u.name}`} onClick={() => onTerminate(u.id)} />
              )}
          </div>
        </li>
        );
  })}
            </ul>
          )}
        </div>
      </div>
      <Pagination
  page={page}
  pageSize={perPage}
  total={total}
  onPageChange={onPage}
  itemLabel="members"
/>
    </section>
  );
}