import { Link } from 'react-router-dom';
import { FileIcon } from './ChatIcons';
import { MONO, getDocumentLink } from './ChatUtils';

// citation: { document_id, document_name, page, snippet, score }
// Click opens the Documents page and passes the document id and page in router state.
export default function CitationChip({ citation }) {
  const { to, state } = getDocumentLink(citation);

  return (
    <Link
      to={to}
      state={state}
      title={`Open ${citation.document_name}`}
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--badge-border)] bg-[var(--accent-chip)] px-3.5 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]">
        <FileIcon size={14} />
      </span>
      <span className="min-w-0">
        <span className={`${MONO} block truncate text-[12.5px] font-bold text-[var(--text-primary)]`}>{citation.document_name}</span>
        <span className={`${MONO} block text-[11px] text-[var(--text-muted)]`}>page {citation.page} • verified source</span>
      </span>
    </Link>
  );
}