import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable table wrapper with header (icon, title, subtitle) + buttons + pagination footer
 *
 * <TableContainer
 *   icon={<Icon />}
 *   title="Title"
 *   subtitle="Subtitle"
 *   buttons={[{ label, icon: IconComponent, onClick }]}
 *   page={1}
 *   pageSize={5}
 *   total={10}
 *   onPageChange={(page) => {}}
 *   onPageSizeChange={(size) => {}}
 * >
 *   <DataTable ... />
 * </TableContainer>
 */

function TableContainer({
  icon,
  title,
  subtitle,
  buttons = [],
  page = 1,
  pageSize = 5,
  total = 0,
  onPageChange,
  onPageSizeChange,
  children, // <DataTable /> goes here
}) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface) overflow-hidden shadow-sm">
      {/* Header: icon + title/subtitle + buttons */}
      <div className="flex items-start justify-between gap-4 border-b border-(--border-subtle) px-6 py-4 bg-(--bg-surface)">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 text-(--primary) shrink-0">{icon}</div>}
          <div>
            <h3 className="text-sm font-semibold text-(--text-primary)">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-(--text-muted) mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {buttons.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {buttons.map((button, idx) => {
              const Icon = button.icon;
              const isPrimary = button.variant === "primary";
              return (
                <button
                  key={idx}
                  onClick={button.onClick}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-colors ${
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

      {/* Table body */}
      <div className="overflow-x-auto">{children}</div>

      {/* Footer: pagination */}
      <div className="flex items-center justify-between gap-4 border-t border-(--border-subtle) px-6 py-3 bg-white">
        <div className="text-xs text-(--text-muted)">
          Showing <span className="font-semibold">{startItem}</span>–
          <span className="font-semibold">{endItem}</span> of{" "}
          <span className="font-semibold">{total}</span> documents
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="pageSize"
              className="text-xs font-semibold text-(--text-muted)"
            >
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
              className="px-2 py-1 text-xs border border-(--border-subtle) rounded bg-(--bg-surface) text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-(--primary)"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-1 rounded hover:bg-(--bg-surface-subtle) disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} className="text-(--text-muted)" />
            </button>

            <span className="text-xs font-semibold text-(--text-primary) px-2">
              {page} of {totalPages}
            </span>

            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-1 rounded hover:bg-(--bg-surface-subtle) disabled:opacity-50 disabled:cursor-not-allowed"
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
