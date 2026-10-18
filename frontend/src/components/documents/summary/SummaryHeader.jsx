import { Link } from 'react-router-dom';
import { Link2, ChevronRight, Bookmark, Pin, MoreHorizontal } from 'lucide-react';
import { formatStyles, statusMeta } from '../shared/DocumentCard';
import '../../../styles/Document.css';

const circle =
  'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors';

// Top card. Admin gets bookmark / pin / kebab next to the link button.
function SummaryHeader({
  doc, adminMode, archived, saved, pinned,
  onCopyLink, onToggleSave, onTogglePin,
}) {
  const tile = formatStyles[doc.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)';
  const status = statusMeta[doc.status] ?? statusMeta.Indexed;

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm) sm:flex-row sm:items-start">
      <span
        className={`doc-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[10px] font-bold ${tile}`}
      >
        {doc.format}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-(--bg-surface-subtle) px-3 py-1 text-[10px] font-semibold text-(--text-secondary)">
            {doc.category}
          </span>
          {archived ? (
            <span className="rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1 text-[10px] font-semibold text-(--text-primary)">
              Archived
            </span>
          ) : (
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${status.style}`}>
              {status.label}
            </span>
          )}
          <span className="text-[11px] text-(--text-muted)">
            {doc.size} • {doc.readTime} • {doc.pages} pages
          </span>
        </div>

        <h1 className="doc-heading mt-2 text-2xl font-bold leading-tight text-(--text-primary) sm:text-[28px]">
          {doc.title}
        </h1>

        <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-(--text-muted)">
          <span>Author: {doc.author}</span>
          <span>Uploaded: {doc.uploaded}</span>
          <span>Indexed Chunks: {doc.chunks}</span>
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          to="/ask-eka"
          state={{ question: `Tell me about "${doc.title}"` }}
          className="inline-flex items-center gap-1 rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
        >
          Ask About This Doc <ChevronRight size={12} />
        </Link>

        <button
          type="button"
          aria-label="Copy document link"
          onClick={onCopyLink}
          className={`${circle} border-(--border-medium) bg-(--bg-surface) text-(--text-secondary) hover:bg-(--bg-surface-subtle)`}
        >
          <Link2 size={14} />
        </button>

        {adminMode && (
          <>
            <button
              type="button"
              aria-label={saved ? 'Remove bookmark' : 'Bookmark document'}
              aria-pressed={saved}
              onClick={onToggleSave}
              className={`${circle} bg-(--bg-surface) hover:bg-(--bg-surface-subtle) ${
                saved ? 'border-amber-400 text-amber-500' : 'border-(--border-medium) text-(--text-secondary)'
              }`}
            >
              <Bookmark size={14} className={saved ? 'fill-current' : ''} />
            </button>

            <button
              type="button"
              aria-label={pinned ? 'Unpin document' : 'Pin document'}
              aria-pressed={pinned}
              onClick={onTogglePin}
              className={`${circle} border-(--border-medium) ${
                pinned
                  ? 'bg-(--bg-surface-subtle) text-(--primary)'
                  : 'bg-(--bg-surface) text-(--text-secondary) hover:bg-(--bg-surface-subtle)'
              }`}
            >
              <Pin size={14} className={pinned ? 'fill-current' : ''} />
            </button>

            {/* Actions menu: not shown open in any video, kept static */}
            <button
              type="button"
              aria-label="More document actions"
              className={`${circle} border-(--border-medium) bg-(--bg-surface) text-(--text-secondary) hover:bg-(--bg-surface-subtle)`}
            >
              <MoreHorizontal size={14} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default SummaryHeader;