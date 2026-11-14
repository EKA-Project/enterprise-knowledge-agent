
import { Link } from 'react-router-dom';
import { Link as LinkIcon, Bookmark, Pin, Archive } from 'lucide-react';
import SummaryKebabMenu from './SummaryKebabMenu';
import Badge from '../../common/Badge.jsx';
import '../../../styles/Document.css';
import { statusMeta, PinnedByAdmin } from '../shared/DocumentCard';

const circle =
  'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--border-medium) bg-(--bg-surface) transition-colors hover:bg-(--bg-surface-subtle)';

// Top card. Admin gets bookmark / pin / kebab next to the link button.
function SummaryHeader({
  doc,
  adminMode,
  archived,
  saved,
  pinned,
  onCopyLink,
  onToggleSave,
  onTogglePin,
  onEdit,
  onReindex,
  onArchive,
  onDelete,
}) {
  const status = statusMeta[doc.status] ?? statusMeta.Indexed;

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) px-8 py-7 shadow-(--shadow-sm) sm:flex-row sm:items-start">
      <Badge
        format={doc.format}
        className="doc-mono !h-12 !w-12 !rounded-2xl !text-[11px]"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#e1f0fa] px-3 py-1 text-[11px] font-semibold text-[#3d5a73]">
            {doc.category}
          </span>

          {archived ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--text-primary)">
              <Archive size={14} />
              Archived
            </span>
          ) : (
            <Badge
              text={status.label}
              type={status.type}
              size="sm"
              className={`!px-3 !py-1 !text-[11px] ${doc.status === 'Indexed'
                  ? '!border-[#bdeedb] !bg-[#edfdf7] !text-[#0f8f63]'
                  : status.style
                }`}
            />
          )}

          <span className="doc-mono text-xs text-[#7c949a]">
            {doc.size} • {doc.readTime} • {doc.pages} pages
          </span>
        </div>

        <h1 className="doc-heading mt-2 text-3xl font-bold leading-[1.15] text-[#10283f] sm:text-[36px]">
          {doc.title}
        </h1>

        <p className="mt-2 flex flex-wrap gap-x-6 gap-y-0.5 text-sm text-[#7c949a]">
          <span>
            Author:{' '}
            <b className="font-medium text-[#3d4f63]">
              {doc.author}
            </b>
          </span>

          <span>
            Uploaded:{' '}
            <b className="font-medium text-[#3d4f63]">
              {doc.uploaded}
            </b>
          </span>

          <span>
            Indexed Chunks:{' '}
            <b className="font-medium text-[#3d4f63]">
              {doc.chunks}
            </b>
          </span>
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          to="/ask-eka"
          state={{ question: `Tell me about "${doc.title}"` }}
          className="inline-flex items-center rounded-(--radius-pill) border border-(--primary) bg-(--primary) px-2 py-1 text-(length:--font-size-sm) font-bold text-(--primary-contrast) [transition:background-color_var(--transition-fast)] hover:bg-(--primary-hover)"
        >
          Ask About This Doc →
        </Link>

        {/* Copy Link */}
        <button
          type="button"
          aria-label="Copy document link"
          onClick={onCopyLink}
          className={`${circle} text-(--text-secondary)`}
        >
          <LinkIcon size={14} />
        </button>

        {/* Individual Bookmark - All Roles */}
        <button
          type="button"
          aria-label={saved ? 'Remove bookmark' : 'Bookmark document'}
          aria-pressed={Boolean(saved)}
          onClick={onToggleSave}
          className={`${circle} ${saved
              ? 'text-(--action-saved)'
              : 'text-(--text-secondary)'
            }`}
        >
          <Bookmark
            size={14}
            className={saved ? 'fill-current' : ''}
          />
        </button>

        {/* Pin - Admin Only */}
        {adminMode ? (
          <button
            type="button"
            aria-label={pinned ? 'Unpin document' : 'Pin document'}
            aria-pressed={Boolean(pinned)}
            onClick={onTogglePin}
            className={`${circle} ${pinned
                ? 'text-(--action-pinned)'
                : 'text-(--text-secondary)'
              }`}
          >
            <Pin
              size={14}
              className={pinned ? 'fill-current' : ''}
            />
          </button>
        ) : (
          pinned && (
            <PinnedByAdmin
              className={`${circle} !cursor-default`}
            />
          )
        )}

        {/* Admin-only 3-dots Menu */}
        {adminMode && (
          <SummaryKebabMenu
            circleClass={circle}
            onEdit={onEdit}
            onReindex={onReindex}
            onArchive={onArchive}
            onDelete={onDelete}
            archived={archived}
          />
        )}
      </div>
    </header>
  );
}

export default SummaryHeader;
