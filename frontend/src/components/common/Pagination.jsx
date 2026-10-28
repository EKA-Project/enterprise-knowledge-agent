/**
 * page: current page, starting at 1
 * pageSize: rows per page
 * total: total number of rows
 * onPageChange: (nextPage) => void
 * itemLabel: noun for the summary, e.g. "members" or "documents"
 */
function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  itemLabel = "items",
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const buttonClass =
    "cursor-pointer rounded-full border border-(--border-subtle) px-3 py-1 text-xs font-medium text-(--text-secondary) transition-colors hover:bg-(--primary-light) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-(--border-subtle) px-5 py-3 text-xs text-(--text-secondary)"
    >
      <p>
        Showing{" "}
        <strong className="text-(--text-primary)">
          {start}–{end}
        </strong>{" "}
        of <strong className="text-(--text-primary)">{total}</strong>{" "}
        {itemLabel}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className={buttonClass}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          ← Previous
        </button>

        <span className="font-mono font-semibold text-(--text-primary)">
          {page} of {pageCount}
        </span>

        <button
          type="button"
          className={buttonClass}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next →
        </button>
      </div>
    </nav>
  );
}

export default Pagination;