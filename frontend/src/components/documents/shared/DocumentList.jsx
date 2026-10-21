import { Bookmark, Pin } from 'lucide-react';
import DataTable from '../../common/DataTable.jsx';
import { formatStyles, statusMeta } from './DocumentCard.jsx';
import DocumentCardMenu from './DocumentCardMenu.jsx';

// Short status text used in the admin / employee list ("● Ready").
// The manager list (showActions = false) keeps the full "✓ Indexed & Ready".
const SHORT_LABEL = { Indexed: 'Ready' };

// List view of the documents (columns as in the reference video), built on the
// shared DataTable. Rows and the "Summary →" button open the summary page.
function DocumentList({ documents, adminMode = false, showActions = true, shortStatus = true, onOpen, onToggleFlag, onArchive }) {
  const iconButton = 'cursor-pointer rounded-md p-1 transition-colors';

  const columns = [
    {
      key: 'title',
      header: 'Document Name',
      width: '31%',
      render: (doc) => (
        <div className="flex items-center gap-3">
          <span
            className={`doc-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${formatStyles[doc.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)'
              }`}
          >
            {doc.format}
          </span>
          <div className="min-w-0">
            <p className="doc-heading text-[13px] font-bold leading-5 text-(--text-primary)">
              {doc.title}
            </p>
            <p className="doc-mono mt-0.5 text-[10px] text-(--text-muted)">
              {doc.readTime} • {doc.pages} pages
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      width: '14%',
      render: (doc) => (
        <span className="inline-block rounded-full bg-(--bg-surface-subtle) px-3 py-1 text-[10px] font-semibold text-(--text-secondary)">
          {doc.category}
        </span>
      ),
    },
    {
      key: 'author',
      header: 'Author / Owner',
      width: '14%',
      render: (doc) => <span className="text-xs text-(--text-secondary)">{doc.author}</span>,
    },
    {
      key: 'size',
      header: 'Size',
      width: '7%',
      render: (doc) => (
        <span className="doc-mono whitespace-nowrap text-xs text-(--text-secondary)">{doc.size}</span>
      ),
    },
    {
      key: 'chunks',
      header: 'Chunks',
      width: '9%',
      render: (doc) => (
        <span className="doc-mono whitespace-nowrap rounded-md border border-(--border-subtle) bg-(--bg-surface) px-2 py-0.5 text-[10px] font-semibold text-(--text-secondary)">
          {doc.chunks} chunks
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (doc) => {
        const status = statusMeta[doc.status] ?? {
          label: doc.status,
          style: 'border border-(--border-subtle) bg-(--bg-surface-subtle) text-(--text-secondary)',
        };
        const label = shortStatus ? `● ${SHORT_LABEL[doc.status] ?? status.label}` : status.label;
        return (
          <span
            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.style}`}
          >
            {label}
          </span>
        );
      },
    },
    {
      key: 'action',
      header: 'Action',
      width: '15%',
      align: 'right',
      render: (doc) => (
        // Stop clicks so the row doesn't also open the summary
        <div
          className="flex items-center justify-end gap-1"
          onClick={(event) => event.stopPropagation()}
        >
          {showActions &&
            (adminMode ? (
              <button
                type="button"
                aria-label={doc.isPinned ? 'Unpin document' : 'Pin document'}
                aria-pressed={Boolean(doc.isPinned)}
                onClick={() => onToggleFlag?.(doc.id, 'isPinned')}
                className={`${iconButton} ${doc.isPinned ? 'text-(--primary)' : 'text-(--text-muted) hover:text-(--text-primary)'
                  }`}
              >
                <Pin size={14} className={doc.isPinned ? 'fill-current' : ''} />
              </button>
            ) : (
              doc.isPinned && (
                <span className="p-1 text-(--primary)" aria-label="Pinned by admin">
                  <Pin size={14} className="fill-current" />
                </span>
              )
            ))}

          {showActions && (
            <button
              type="button"
              aria-label={doc.isBookmarked ? 'Remove bookmark' : 'Bookmark document'}
              aria-pressed={Boolean(doc.isBookmarked)}
              onClick={() => onToggleFlag?.(doc.id, 'isBookmarked')}
              className={`${iconButton} ${doc.isBookmarked ? 'text-amber-500' : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
            >
              <Bookmark size={14} className={doc.isBookmarked ? 'fill-current' : ''} />
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpen?.(doc)}
            className="mx-1 cursor-pointer whitespace-nowrap rounded-full border border-(--border-medium) bg-white px-3 py-1 text-[11px] font-semibold text-(--text-primary) transition-colors hover:border-(--primary) hover:text-(--primary)"
          >
            Summary →
          </button>

          {showActions && (
            <DocumentCardMenu
              adminMode={adminMode}
              isPinned={Boolean(doc.isPinned)}
              isBookmarked={Boolean(doc.isBookmarked)}
              onOpen={() => onOpen?.(doc)}
              onToggleBookmark={() => onToggleFlag?.(doc.id, 'isBookmarked')}
              onTogglePin={() => onToggleFlag?.(doc.id, 'isPinned')}
              onArchive={() => onArchive?.(doc)}
              onEditMetadata={() => onEditMetadata?.(doc)}
              onReindex={() => onReindex?.(doc)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-(--radius-table) border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      <DataTable columns={columns} rows={documents} caption="Documents" onRowClick={onOpen} />
    </div>
  );
}

export default DocumentList;