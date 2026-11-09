import { useState } from 'react';
import { Pin, Bookmark } from 'lucide-react';
import '../../../styles/Document.css';

import DocumentCardMenu from './DocumentCardMenu.jsx';
import Badge from '../../common/Badge.jsx';

// File-type tile colours.
export const formatStyles = {
  PDF: 'bg-(--status-danger-bg) text-(--status-danger)',
  DOCX: 'bg-sky-100 text-sky-700',
  MD: 'bg-indigo-100 text-indigo-700',
  TXT: 'bg-(--bg-surface-subtle) text-(--text-secondary)',
  FIG: 'bg-purple-100 text-purple-700',
  CSV: 'bg-green-100 text-green-700',
};

// Status pill text + colours.
export const statusMeta = {
  Indexed: {
    label: '✓ Indexed & Ready',
    style: 'border border-(--status-verified-border) bg-(--status-verified-bg) text-(--status-success)',
    type: 'success',
  },
  Processing: {
    label: 'Processing',
    style: 'border border-sky-200 bg-(--status-info-bg) text-(--status-info)',
    type: 'info',
  },
  Outdated: {
    label: 'Outdated',
    style: 'border border-amber-200 bg-(--status-warning-bg) text-(--status-warning)',
    type: 'warning',
  },
  Failed: {
    label: '⚠ Failed Ingestion',
    style: 'border border-(--status-danger) bg-(--status-danger-bg) text-(--status-danger)',
    type: 'danger',
  },
};

const DEFAULT_TILE = 'bg-(--bg-surface-subtle) text-(--text-primary)';

// The parent still passes the prop as `document`; it is renamed to `doc` here
// so it does not hide the browser's global `document`.
function DocumentCard({
  document: doc,
  adminMode = false,
  showActions = true,
  onToggleFlag,
  onOpen,
  onArchive,
  onEditMetadata,
  onReindex,
  onDelete,
}) {
  // The "Pinned" / "Saved" tags only show after the user toggles them in this session
  const [showPinnedTag, setShowPinnedTag] = useState(false);
  const [showSavedTag, setShowSavedTag] = useState(false);

  const togglePin = () => {
    setShowPinnedTag(!doc.isPinned);
    onToggleFlag?.(doc.id, 'isPinned');
  };

  const toggleSave = () => {
    setShowSavedTag(!doc.isBookmarked);
    onToggleFlag?.(doc.id, 'isBookmarked');
  };

  // Run a handler without opening the card
  const stop = (fn) => (event) => {
    event.stopPropagation();
    fn();
  };

  // Give the menu a callback only when the parent supplied one. Otherwise the menu
  // falls back to its built-in action (e.g. Edit Metadata modal, Re-index).
  const withDoc = (fn) => (fn ? () => fn(doc) : undefined);

  const status = statusMeta[doc.status] ?? {
    label: doc.status,
    style: 'border border-(--border-subtle) bg-(--bg-surface-subtle) text-(--text-secondary)',
  };
  const tileStyle = formatStyles[doc.format] ?? DEFAULT_TILE;

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => onOpen?.(doc)}
      // Enter opens the card only when the card itself is focused, not a button inside it
      onKeyDown={(e) => e.key === 'Enter' && e.target === e.currentTarget && onOpen?.(doc)}
      className="flex cursor-pointer flex-col rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm) transition-all hover:border-(--accent-highlight) hover:shadow-(--shadow-md)"
    >
      <div className="flex items-start gap-4">
        <span
          className={`doc-mono flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${tileStyle}`}
        >
          {doc.format}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              {adminMode && showPinnedTag && doc.isPinned && (
                <span className="rounded-full border border-(--border-subtle) bg-(--bg-surface) px-2.5 py-1 text-[10px] font-semibold text-(--primary)">
                  📌 Pinned
                </span>
              )}

              <span className="min-w-0 truncate rounded-full bg-(--bg-surface-subtle) px-3 py-1 text-[10px] font-semibold text-(--text-secondary)">
                {doc.category}
              </span>

              {showSavedTag && doc.isBookmarked && <Badge text="⭐ Saved" type="warning" size="sm" />}
            </div>

            {showActions && (
              <div className="flex shrink-0 items-center gap-1">
                {adminMode ? (
                  <button
                    type="button"
                    aria-label={doc.isPinned ? 'Unpin document' : 'Pin document'}
                    aria-pressed={Boolean(doc.isPinned)}
                    onClick={stop(togglePin)}
                    className={`group cursor-pointer rounded-md p-1 transition-colors ${
                      doc.isPinned ? 'text-[#e5484d]' : 'text-(--text-muted) hover:text-[#e5484d]'
                    }`}
                  >
                    <Pin size={14} className={doc.isPinned ? 'fill-current' : 'group-hover:fill-current'} />
                  </button>
                ) : (
                  doc.isPinned && (
                    <span className="p-1 text-[#e5484d]" aria-label="Pinned by admin">
                      <Pin size={14} className="fill-current" />
                    </span>
                  )
                )}

                <button
                  type="button"
                  aria-label={doc.isBookmarked ? 'Remove bookmark' : 'Bookmark document'}
                  aria-pressed={Boolean(doc.isBookmarked)}
                  onClick={stop(toggleSave)}
                  className={`cursor-pointer rounded-md p-1 transition-colors ${
                    doc.isBookmarked ? 'text-amber-500' : 'text-(--text-muted) hover:text-(--text-primary)'
                  }`}
                >
                  <Bookmark size={14} className={doc.isBookmarked ? 'fill-current' : ''} />
                </button>

                <DocumentCardMenu
                  doc={doc}
                  adminMode={adminMode}
                  isPinned={Boolean(doc.isPinned)}
                  isBookmarked={Boolean(doc.isBookmarked)}
                  onOpen={withDoc(onOpen)}
                  onToggleBookmark={toggleSave}
                  onTogglePin={togglePin}
                  onArchive={withDoc(onArchive)}
                  onEditMetadata={withDoc(onEditMetadata)}
                  onReindex={withDoc(onReindex)}
                  onDelete={withDoc(onDelete)}
                />
              </div>
            )}
          </div>

          <h2 className="doc-heading mt-2 text-lg font-bold leading-6 text-(--text-primary)">{doc.title}</h2>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-[13px] leading-5 text-(--text-secondary)">{doc.description}</p>

      <div className="mt-auto pt-4">
        <div className="border-t border-(--border-subtle)" />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="doc-mono text-[10px] text-(--text-muted)">
            {doc.readTime} • {doc.size} • {doc.pages} pages
          </p>

          {status.type ? (
            <Badge text={status.label} type={status.type} size="sm" />
          ) : (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold ${status.style}`}
            >
              {status.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default DocumentCard;