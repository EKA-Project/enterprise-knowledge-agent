import { FileIcon } from './ChatIcons';
import { MONO } from './ChatUtils';

// One verified-source card shown under an answer.
export default function CitationPill({ title, meta }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--badge-border)] bg-[var(--accent-chip)] px-3.5 py-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]">
        <FileIcon size={14} />
      </span>
      <div className="min-w-0">
        <p className={`${MONO} m-0 truncate text-[11.5px] font-bold text-[var(--text-primary)]`}>{title}</p>
        <p className={`${MONO} m-0 text-[10px] text-[var(--text-muted)]`}>{meta}</p>
      </div>
    </div>
  );
}