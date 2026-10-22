import { ChevronLeft, ChevronRight } from "lucide-react";

const arrow =
  "grid size-6 place-items-center rounded-full border border-(--border-medium) bg-(--bg-surface-elevated) text-(--text-secondary) transition-colors hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) disabled:cursor-default disabled:opacity-40 disabled:hover:border-(--border-medium) disabled:hover:text-(--text-secondary)";

export default function RowPager({ page, pages, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        aria-live="polite"
        className="rounded-full bg-(--bg-surface-subtle) px-2 py-px font-mono text-[10px] text-(--text-secondary)"
      >
        {page + 1} / {pages}
      </span>
      <button type="button" aria-label="Previous themes" onClick={onPrev} disabled={page === 0} className={arrow}>
        <ChevronLeft size={13} />
      </button>
      <button type="button" aria-label="Next themes" onClick={onNext} disabled={page === pages - 1} className={arrow}>
        <ChevronRight size={13} />
      </button>
    </div>
  );
}