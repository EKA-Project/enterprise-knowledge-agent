import { Link } from 'react-router-dom';
import { Link as LinkIcon, Bookmark, Pin } from 'lucide-react';
import SummaryKebabMenu from './SummaryKebabMenu';
import { formatStyles, statusMeta } from '../shared/DocumentCard';
import '../../../styles/Document.css';

const circle =
  'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--border-medium) bg-white transition-colors hover:bg-[#e1f0fa]';

// Top card. Admin gets bookmark / pin / kebab next to the link button.
function SummaryHeader({
  doc, adminMode, archived, saved, pinned,
  onCopyLink, onToggleSave, onTogglePin,
  onEdit, onReindex, onArchive, onDelete,
}) {
  const tile = formatStyles[doc.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)';
  const status = statusMeta[doc.status] ?? statusMeta.Indexed;

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) px-8 py-7 shadow-(--shadow-sm) sm:flex-row sm:items-start">
      <span
        className={`doc-mono flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f5b9bd] text-[11px] font-bold ${tile}`}
      >
        {doc.format}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
         <span className="rounded-full bg-[#e1f0fa] px-3 py-1 text-[11px] font-semibold text-[#3d5a73]">
            {doc.category}
          </span>
          {archived ? (
            <span className="rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--text-primary)">
              Archived
            </span>
          ) : (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${doc.status === 'Indexed'
                  ? 'border border-[#bdeedb] bg-[#edfdf7] text-[#0f8f63]'
                  : status.style
                }`}
            >
              {status.label}
            </span>
          )}
          <span className="doc-mono text-xs text-[#7c949a]">
            {doc.size} • {doc.readTime} • {doc.pages} pages
          </span>
        </div>

        <h1 className="doc-heading mt-2 text-3xl font-bold leading-[1.15] text-[#10283f] sm:text-[36px]">
          {doc.title}
        </h1>

        <p className="mt-2 flex flex-wrap gap-x-6 gap-y-0.5 text-sm text-[#7c949a]">
          <span>Author: <b className="font-medium text-[#3d4f63]">{doc.author}</b></span>
          <span>Uploaded: <b className="font-medium text-[#3d4f63]">{doc.uploaded}</b></span>
          <span>Indexed Chunks: <b className="font-medium text-[#3d4f63]">{doc.chunks}</b></span>
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          to="/ask-eka"
          state={{ question: `Tell me about "${doc.title}"` }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#153830] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0f2b25]"
        >
          Ask About This Doc →
        </Link>

        <button
          type="button"
          aria-label="Copy document link"
          onClick={onCopyLink}
          className={`${circle} text-(--text-secondary)`}
        >
          <LinkIcon size={14} />
        </button>

        {adminMode && (
          <>
            <button
              type="button"
              aria-label={saved ? 'Remove bookmark' : 'Bookmark document'}
              aria-pressed={saved}
              onClick={onToggleSave}
              className={`${circle} ${saved ? 'text-[#f39c0a]' : 'text-(--text-secondary)'}`}
            >
              <Bookmark size={14} className={saved ? 'fill-current' : ''} />
            </button>

            <button
              type="button"
              aria-label={pinned ? 'Unpin document' : 'Pin document'}
              aria-pressed={pinned}
              onClick={onTogglePin}
              className={`group ${circle} ${pinned ? 'text-[#e5484d]' : 'text-(--text-secondary) hover:text-[#e5484d]'}`}
            >
              <Pin size={14} className={pinned ? 'fill-current' : 'group-hover:fill-current'} />
            </button>

            <SummaryKebabMenu
              onEdit={onEdit}
              onReindex={onReindex}
              onArchive={onArchive}
              onDelete={onDelete}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default SummaryHeader;