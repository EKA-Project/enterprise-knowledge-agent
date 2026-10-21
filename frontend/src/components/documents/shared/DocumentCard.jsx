import { useState } from 'react';
import { Pin, Bookmark, MoreHorizontal } from 'lucide-react';
import '../../../styles/Document.css';
import DocumentCardMenu from './DocumentCardMenu.jsx';

// File-type tile colours (keyed by document.format). Unknown formats fall back to neutral.
// Exported so the list view and the summary page use the same colours.
export const formatStyles = {
  PDF: 'bg-(--status-danger-bg) text-(--status-danger)',
  DOCX: 'bg-sky-100 text-sky-700',
  MD: 'bg-indigo-100 text-indigo-700',
  TXT: 'bg-(--bg-surface-subtle) text-(--text-secondary)',
  FIG: 'bg-purple-100 text-purple-700',
  CSV: 'bg-green-100 text-green-700',
};

// Status pill text + colours (keyed by document.status).
export const statusMeta = {
  Indexed: {
    label: '✓ Indexed & Ready',
    style: 'border border-(--status-verified-border) bg-(--status-verified-bg) text-(--status-success)',
  },
  Processing: {
    label: 'Processing',
    style: 'border border-sky-200 bg-(--status-info-bg) text-(--status-info)',
  },
  Outdated: {
    label: 'Outdated',
    style: 'border border-amber-200 bg-(--status-warning-bg) text-(--status-warning)',
  },
  Failed: {
    label: '⚠ Failed Ingestion',
    style: 'border border-orange-200 bg-orange-50 text-orange-600',
  },
};

// Small dark tooltip shown under an icon button on hover.
function Tooltip({ children }) {
  return (
    <span className="pointer-events-none absolute right-0 top-full z-10 mt-1 hidden whitespace-nowrap rounded-md bg-(--sidebar-bg) px-2 py-1 text-[10px] font-medium text-white group-hover:block">
      {children}
    </span>
  );
}

function DocumentCard({ document, adminMode = false, showActions = true, onToggleFlag, onOpen, onArchive }) {
  // "Pinned" / "Saved" tags appear when the user toggles a flag on this card
  // (not for documents that were already pinned / saved when the page loaded).
  const [showPinnedTag, setShowPinnedTag] = useState(false);
  const [showSavedTag, setShowSavedTag] = useState(false);

  // Pin toggle (used by the pin icon and the "..." menu)
  const togglePin = () => {
    setShowPinnedTag(!document.isPinned);
    onToggleFlag(document.id, 'isPinned');
  };

  const handlePin = (e) => {
    e.stopPropagation(); // don't open the summary when pinning
    togglePin();
  };

  // Bookmark toggle (used by the bookmark icon and the "..." menu)
  const toggleSave = () => {
    setShowSavedTag(!document.isBookmarked);
    onToggleFlag(document.id, 'isBookmarked');
  };

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSave();
  };

  const status = statusMeta[document.status] ?? {
    label: document.status,
    style: 'border border-(--border-subtle) bg-(--bg-surface-subtle) text-(--text-secondary)',
  };

  const tileStyle =
    formatStyles[document.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)';

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => onOpen?.(document)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen?.(document)}
      className="flex cursor-pointer flex-col rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm) transition-all hover:border-(--accent-highlight) hover:shadow-(--shadow-md)"
    >
      {/* Header: format tile on the left, tags + title in the column beside it */}
      <div className="flex items-start gap-4">
        <span
          className={`doc-mono flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${tileStyle}`}
        >
          {document.format}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            {/* Tags */}
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              {adminMode && showPinnedTag && document.isPinned && (
                <span className="rounded-full border border-(--border-subtle) bg-(--bg-surface) px-2.5 py-1 text-[10px] font-semibold text-(--primary)">
                  📌 Pinned
                </span>
              )}
              <span className="min-w-0 truncate rounded-full bg-(--bg-surface-subtle) px-3 py-1 text-[10px] font-semibold text-(--text-secondary)">
                {document.category}
              </span>
              {showSavedTag && document.isBookmarked && (
                <span className="rounded-full bg-(--status-warning-bg) px-2.5 py-1 text-[10px] font-semibold text-(--status-warning)">
                  ⭐ Saved
                </span>
              )}
            </div>

            {/* Actions (hidden in the manager view, like the video) */}
            {showActions && (
              <div className="flex shrink-0 items-center gap-1">
                {adminMode ? (
                  <div className="group relative">
                    <button
                      type="button"
                      aria-label={document.isPinned ? 'Unpin document' : 'Pin document'}
                      aria-pressed={Boolean(document.isPinned)}
                      onClick={handlePin}
                      className={`cursor-pointer rounded-md p-1 transition-colors ${document.isPinned
                        ? 'text-(--primary)'
                        : 'text-(--text-muted) hover:text-(--text-primary)'
                        }`}
                    >
                      <Pin size={14} className={document.isPinned ? 'fill-current' : ''} />
                    </button>
                    <Tooltip>{document.isPinned ? 'Unpin Document' : 'Pin Document'}</Tooltip>
                  </div>
                ) : (
                  // Employee / Manager: a pinned document just shows a static blue pin
                  document.isPinned && (
                    <span className="p-1 text-(--primary)" aria-label="Pinned by admin">
                      <Pin size={14} className="fill-current" />
                    </span>
                  )
                )}

                <button
                  type="button"
                  aria-label={document.isBookmarked ? 'Remove bookmark' : 'Bookmark document'}
                  aria-pressed={Boolean(document.isBookmarked)}
                  onClick={handleSave}
                  className={`cursor-pointer rounded-md p-1 transition-colors ${document.isBookmarked
                    ? 'text-amber-500'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                    }`}
                >
                  <Bookmark size={14} className={document.isBookmarked ? 'fill-current' : ''} />
                </button>

                <DocumentCardMenu
                  adminMode={adminMode}
                  isPinned={Boolean(document.isPinned)}
                  isBookmarked={Boolean(document.isBookmarked)}
                  onOpen={() => onOpen?.(document)}
                  onToggleBookmark={toggleSave}
                  onTogglePin={togglePin}
                  onArchive={() => onArchive?.(document)}
                  onEditMetadata={() => onEditMetadata?.(document)}
                  onReindex={() => onReindex?.(document)}
                />
              </div>
            )}
          </div>

          <h2 className="doc-heading mt-2 text-lg font-bold leading-6 text-(--text-primary)">
            {document.title}
          </h2>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-[13px] leading-5 text-(--text-secondary)">
        {document.description}
      </p>

      {/* Divider, then meta info and status on one row */}
      <div className="mt-auto pt-4">
        <div className="border-t border-(--border-subtle)" />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="doc-mono text-[10px] text-(--text-muted)">
            {document.readTime} • {document.size} • {document.pages} pages
          </p>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold ${status.style}`}
          >
            {status.label}
          </span>
        </div>
      </div>
    </article>
  );
}

export default DocumentCard;