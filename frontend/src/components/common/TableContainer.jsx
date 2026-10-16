import { useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ==========================================================================
   TableContainer
   --------------------------------------------------------------------------
   The CARD around a table. It owns the header (icon, title, subtitle,
   action buttons) and the pagination footer. It knows nothing about columns
   or rows: the table itself goes in as `children` (usually <DataTable />).

   Usage:
     <TableContainer
       icon={<Users size={20} />}
       title="Team Roster"
       subtitle="9 members in Engineering"
       buttons={[{ label: "Add Member", icon: UserPlus, onClick, variant: "primary" }]}
       page={page}
       pageSize={pageSize}
       total={rows.length}
       itemLabel="members"
       onPageChange={setPage}
       onPageSizeChange={setPageSize}
     >
       <DataTable columns={columns} rows={rows} />
     </TableContainer>

   Curve: controlled by --radius-table in variables.css.
   ========================================================================== */

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

function TableContainer({
  // Header
  icon,
  title,
  subtitle,
  buttons = [], // [{ label, icon, onClick, variant?: "primary" }]

  // Pagination
  page = 1,
  pageSize = 5,
  total = 0,
  itemLabel = "items", // noun used in "Showing 1-5 of 9 ___"
  onPageChange = () => {},
  onPageSizeChange = () => {},

  // The table goes here
  children,
}) {
  // useId keeps the label/select pairing unique when two tables share a page
  const pageSizeId = useId();

  // ---- Pagination maths (safe for an empty table) ----
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <div className="overflow-hidden rounded-(--radius-table) border border-(--border-subtle) bg-(--bg-surface) shadow-sm">
      {/* ================= HEADER: icon + title/subtitle + buttons ================= */}
      <div className="flex items-start justify-between gap-4 border-b border-(--border-subtle) bg-(--bg-surface) px-7 py-5">
        {/* Left: icon + text */}
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 shrink-0 text-(--primary)">{icon}</div>}
          <div>
            <h3 className="text-sm font-semibold text-(--text-primary)">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-(--text-muted)">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: action buttons */}
        {buttons.length > 0 && (
          <div className="flex shrink-0 items-center gap-2">
            {buttons.map((button, idx) => {
              const Icon = button.icon;
              const isPrimary = button.variant === "primary";
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={button.onClick}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    isPrimary
                      ? "bg-(--primary) text-white hover:bg-(--primary-hover)"
                      : "border border-(--border-subtle) text-(--primary) hover:bg-(--bg-surface-subtle)"
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {button.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= BODY: the table (children) ================= */}
      <div className="overflow-x-auto">{children}</div>

      {/* ================= FOOTER: summary + rows per page + prev/next ================= */}
      <div className="flex items-center justify-between gap-4 border-t border-(--border-subtle) bg-white px-7 py-4">
        {/* Summary: "Showing 1-5 of 9 members" */}
        <div className="text-xs text-(--text-muted)">
          Showing <span className="font-semibold">{startItem}</span>–
          <span className="font-semibold">{endItem}</span> of{" "}
          <span className="font-semibold">{total}</span> {itemLabel}
        </div>

        <div className="flex items-center gap-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <label
              htmlFor={pageSizeId}
              className="text-xs font-semibold text-(--text-muted)"
            >
              Rows per page:
            </label>
            <select
              id={pageSizeId}
              value={pageSize}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
              className="rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-xs text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-(--primary)"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Prev / page indicator / Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="cursor-pointer rounded-full p-1.5 hover:bg-(--bg-surface-subtle) disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} className="text-(--text-muted)" />
            </button>

            <span className="px-2 text-xs font-semibold text-(--text-primary)">
              {page} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="cursor-pointer rounded-full p-1.5 hover:bg-(--bg-surface-subtle) disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight size={16} className="text-(--text-muted)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableContainer;