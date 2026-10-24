import { PAGE_SIZES } from './documentFilters';
import '../../../styles/Document.css';

const pill =
  'cursor-pointer rounded-full border border-(--border-medium) bg-(--bg-surface) px-3.5 py-1 text-xs text-(--text-secondary) transition-colors hover:bg-(--bg-surface-subtle) disabled:cursor-default disabled:opacity-40 disabled:hover:bg-(--bg-surface)';

// Up to 5 page numbers centred on the current page
function visiblePages(current, totalPages) {
  const start = Math.max(1, Math.min(current - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function DocumentPagination({ from, to, total, current, totalPages, pageSize, onPageChange, onPageSizeChange }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-5 py-2.5 shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-center gap-4 text-xs text-(--text-secondary)">
        <p>
          Showing <b className="text-(--text-primary)">{from}–{to}</b> of{' '}
          <b className="text-(--text-primary)">{total}</b> documents
        </p>
        <label className="flex items-center gap-2 text-(--text-muted)">
          Per page:
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="doc-mono cursor-pointer rounded-md border border-(--border-medium) bg-(--bg-surface) px-1.5 py-0.5 text-xs text-(--text-primary)"
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1.5">
        <button type="button" className={pill} disabled={current === 1} onClick={() => onPageChange(current - 1)}>
          ← Prev
        </button>
        {visiblePages(current, totalPages).map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === current ? 'page' : undefined}
            onClick={() => onPageChange(n)}
            className={`doc-mono h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-bold transition-colors ${
              n === current
                ? 'bg-(--sidebar-bg) text-white'
                : 'text-(--text-secondary) hover:bg-(--bg-surface-subtle)'
            }`}
          >
            {n}
          </button>
        ))}
        <button type="button" className={pill} disabled={current === totalPages} onClick={() => onPageChange(current + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default DocumentPagination;