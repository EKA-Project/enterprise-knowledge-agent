import { useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ==========================================================================
   TableContainer
   --------------------------------------------------------------------------
   The CARD around a table. It owns the header (icon, title, subtitle and an
   `actions` slot for buttons) and the pagination footer. It knows nothing
   about columns, rows or button styling: the table goes in as `children`
   (usually <DataTable />) and the buttons come in through `actions`.

   Usage:
     <TableContainer
       icon={<span aria-hidden="true">👥</span>}
       title="Engineering Team Roster (9)"
       subtitle="Department personnel and query activity."
       actions={<AddMemberButton onClick={onAddMember} />}
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
  actions, // any JSX for the right side of the header, usually buttons

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
      {/* ================= HEADER: icon + title/subtitle + actions ================= */}
      <div className="flex items-center justify-between gap-4 border-b border-(--border-subtle) bg-(--bg-surface) px-7 py-5">
        {/* Left: icon + title on one row, subtitle underneath */}
        <div>
          <div className="flex items-center gap-2">
            {icon && <span className="shrink-0 text-(--primary)">{icon}</span>}
            <h3 className="text-[1.1rem] font-bold leading-tight text-(--text-primary)">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="mt-1 text-[0.8rem] text-(--text-muted)">{subtitle}</p>
          )}
        </div>

        {/* Right: action slot (each page passes its own buttons) */}
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
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