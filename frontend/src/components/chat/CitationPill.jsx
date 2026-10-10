import { Link } from 'react-router-dom';
import { FileIcon } from './ChatIcons';
import { MONO, getDocumentLink } from './ChatUtils';

export default function CitationPill({ documentId, page, title, meta, onOpen }) {
  const { to, state } = getDocumentLink({ documentId, page });

  return (
    <Link
      to={to}
      state={state}
      onClick={onOpen}
      title={`Open ${title}`}
      className="group flex items-center gap-3 rounded-xl border border-[var(--badge-border)] bg-[var(--accent-chip)] px-3.5 py-2.5 transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]">
        <FileIcon size={14} />
      </span>
      <div className="min-w-0">
        <p className={`${MONO} m-0 truncate text-[12.5px] font-bold text-[var(--text-primary)]`}>{title}</p>
        <p className={`${MONO} m-0 text-[11px] text-[var(--text-muted)]`}>{meta}</p>
      </div>
    </Link>
  );
}