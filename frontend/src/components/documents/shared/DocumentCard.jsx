import { Pin, Bookmark, MoreHorizontal } from 'lucide-react';
import '../../../styles/Document.css';

// Format badge colours for the employee/manager view (same file-type
// colours already used in the Knowledge Base list).
const formatStyles = {
  PDF: 'bg-red-100 text-red-700',
  DOCX: 'bg-green-100 text-green-700',
  MD: 'bg-sky-100 text-sky-700',
};

// Status pill colours come from the semantic status tokens in variables.css.
const statusStyles = {
  Indexed: 'bg-(--status-success-bg) text-(--status-success)',
  Processing: 'bg-(--status-info-bg) text-(--status-info)',
  Outdated: 'bg-(--status-warning-bg) text-(--status-warning)',
  Failed: 'bg-(--status-danger-bg) text-(--status-danger)',
};

// In the admin view a healthy ("Indexed") document uses a quiet outlined pill.
const adminIndexedStyle =
  'border border-(--border-subtle) bg-(--bg-surface) text-(--text-secondary)';

// Pin / bookmark / more actions shown only in the admin view.
// Pinned and bookmarked state lives in DocumentsContent, not here.
function AdminActions({ document, onToggleFlag }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        aria-label={document.isPinned ? 'Unpin document' : 'Pin document'}
        aria-pressed={Boolean(document.isPinned)}
        onClick={() => onToggleFlag(document.id, 'isPinned')}
        className={`rounded-md p-1 transition-colors ${document.isPinned
          ? 'text-(--primary)'
          : 'text-(--text-muted) hover:text-(--text-primary)'
          }`}
      >
        <Pin size={14} className={document.isPinned ? 'fill-current' : ''} />
      </button>

      <button
        type="button"
        aria-label={document.isBookmarked ? 'Remove bookmark' : 'Bookmark document'}
        aria-pressed={Boolean(document.isBookmarked)}
        onClick={() => onToggleFlag(document.id, 'isBookmarked')}
        className={`rounded-md p-1 transition-colors ${document.isBookmarked
          ? 'text-amber-500'
          : 'text-(--text-muted) hover:text-(--text-primary)'
          }`}
      >
        <Bookmark size={14} className={document.isBookmarked ? 'fill-current' : ''} />
      </button>

      {/* Static for now — the actions menu is not built yet */}
      <button
        type="button"
        aria-label="More document actions"
        className="rounded-md p-1 text-(--text-muted) transition-colors hover:text-(--text-primary)"
      >
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}


function DocumentCard({ document, adminMode = false, onToggleFlag }) {
  // Employee/manager: coloured square. Admin: small outlined box.
  const badgeStyle = adminMode
    ? 'h-7 w-10 rounded-lg border border-(--text-primary) bg-(--bg-surface) text-(--text-primary)'
    : `h-11 w-11 rounded-xl ${formatStyles[document.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)'
    }`;

  const categoryStyle = adminMode
    ? 'bg-(--bg-surface-subtle) text-(--text-secondary)'
    : 'border border-(--border-subtle) text-(--text-secondary)';

  const statusStyle =
    adminMode && document.status === 'Indexed'
      ? adminIndexedStyle
      : statusStyles[document.status] ?? '';


  return (
    <article className="rounded-4xl border border-(--border-subtle) bg-(--bg-surface) p-4 transition-colors hover:border-(--border-medium)">
      {/* Header: format badge on the left, category + title in the column beside it */}
      <div className="flex items-start gap-4">
        <span
          className="doc-mono rounded-md bg-(--bg-surface-subtle) px-2 py-1 text-[10px] font-bold text-(--text-primary)"
        >
          {document.format}
        </span>



        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`min-w-0 truncate rounded-full px-3 py-1 text-[10px] font-semibold ${categoryStyle}`}
            >
              {document.category}
            </span>

            {adminMode && <AdminActions document={document} onToggleFlag={onToggleFlag} />}
          </div>

          <h2 className="doc-heading mt-2 text-xl font-bold leading-7 text-(--text-primary)">
            {document.title}
          </h2>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-(--text-secondary)">
        {document.description}
      </p>

      {/* Divider before the meta row */}
      <div className="mt-4 border-t border-(--border-subtle)" />

      {/* Meta info and status share one row */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-(--text-muted)">
          {document.readTime} • {document.size} • {document.pages} pages
        </p>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold ${statusStyle}`}
        >
          {document.status === 'Indexed' && '✓ '}
          {document.status}
        </span>
      </div>
    </article>
  );
}

export default DocumentCard;