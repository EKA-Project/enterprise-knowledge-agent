
/**
 * Reusable Pagination
 * All props are optional.
 */
function Pagination({
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange = () => {},
  itemLabel = 'items',

  // Optional features
  variant = 'default',
  showPageNumbers = false,
  pageSizeOptions,
  onPageSizeChange = () => {},
}) {
  const safePageSize = Math.max(1, pageSize);
  const pageCount = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.max(1, Math.min(page, pageCount));

  const start = total === 0 ? 0 : (currentPage - 1) * safePageSize + 1;
  const end = Math.min(currentPage * safePageSize, total);

  const buttonClass =
    'inline-flex cursor-pointer items-center gap-1 rounded-full border border-(--border-medium) bg-(--bg-surface-elevated) px-3.5 py-1.5 text-xs font-semibold text-(--text-secondary) shadow-(--shadow-sm) transition-colors hover:border-(--primary) hover:bg-(--primary-light) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-(--primary) disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:border-(--border-medium) disabled:hover:bg-(--bg-surface-elevated) disabled:hover:text-(--text-secondary)';

  const containerClass =
    variant === 'rounded'
      ? 'mt-6 flex flex-wrap items-center justify-between gap-3 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-5 py-2.5 text-xs text-(--text-secondary) shadow-(--shadow-sm)'
      : 'flex flex-wrap items-center justify-between gap-3 border-t border-(--border-subtle) px-5 py-3 text-xs text-(--text-secondary)';

  const visiblePages = () => {
    const first = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
    const last = Math.min(pageCount, first + 4);

    return Array.from(
      { length: last - first + 1 },
      (_, i) => first + i
    );
  };

  return (
    <nav
      aria-label="Pagination"
      className={`${containerClass} relative`}
    >
      {/* Left: Showing count */}
      <div className="flex flex-wrap items-center gap-4">
        <p>
          Showing{' '}
          <strong className="text-(--text-primary)">
            {start}–{end}
          </strong>{' '}
          of{' '}
          <strong className="text-(--text-primary)">
            {total}
          </strong>{' '}
          {itemLabel}
        </p>
      </div>

      {/* Center: Per page */}
      {pageSizeOptions?.length > 0 && (
        <label className="flex items-center gap-2 text-(--text-muted) lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          Per page:
          <select
            value={pageSize}
            onChange={(e) =>
              onPageSizeChange(Number(e.target.value))
            }
            className="cursor-pointer rounded-md border border-(--border-medium) bg-(--bg-surface) px-1.5 py-0.5 text-xs text-(--text-primary)"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Right: Pagination controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className={buttonClass}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ← Previous
        </button>

        {showPageNumbers ? (
          visiblePages().map((number) => (
            <button
              key={number}
              type="button"
              aria-current={
                number === currentPage ? 'page' : undefined
              }
              onClick={() => onPageChange(number)}
              className={`h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-bold transition-colors ${
                number === currentPage
                  ? 'bg-(--sidebar-bg) text-white'
                  : 'text-(--text-secondary) hover:bg-(--bg-surface-subtle)'
              }`}
            >
              {number}
            </button>
          ))
        ) : (
          <span className="px-2 font-mono font-semibold text-(--text-primary)">
            {currentPage} of {pageCount}
          </span>
        )}

        <button
          type="button"
          className={buttonClass}
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
