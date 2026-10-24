import { Bookmark, Pin, Code2, TrendingUp, Shield, Users, Palette, Scale } from 'lucide-react';
import DataTable from '../../common/DataTable.jsx';
import { formatStyles, statusMeta } from './DocumentCard.jsx';
import DocumentCardMenu from './DocumentCardMenu.jsx';

// Short status text used in the admin / employee list ("● Ready").
// The manager list (shortStatus = false) keeps the full "✓ Indexed & Ready".
const SHORT_LABEL = { Indexed: 'Ready' };

// Department icon tile (icon + colours) per category
const deptStyle = {
  'Engineering & DevOps': { icon: Code2, cls: 'bg-[#dff3e8] text-[#1a8f5a]' },
  'Sales & Go-To-Market': { icon: TrendingUp, cls: 'bg-[#fff1d6] text-[#e08a00]' },
  'Security & Compliance': { icon: Shield, cls: 'bg-[#fde2e3] text-[#d1334f]' },
  'People & HR Operations': { icon: Users, cls: 'bg-[#e1ecfd] text-[#2f5fc4]' },
  'Product Strategy & Design': { icon: Palette, cls: 'bg-[#efe6fd] text-[#7b4fc9]' },
  'Legal & Finance': { icon: Scale, cls: 'bg-[#e6efe9] text-[#4b6a58]' },
};

// List view of the documents, built on the shared DataTable.
// Rows and the "Summary →" button open the summary page.
function DocumentList({
  documents,
  adminMode = false,
  showActions = true,
  shortStatus = true,
  onOpen,
  onToggleFlag,
  onArchive,
  onEditMetadata,
  onReindex,
  onDelete,
}) {
  const iconButton = 'cursor-pointer rounded-md p-1 transition-colors';

  const columns = [
    {
      key: 'title',
      header: 'Document Name',
      width: '30%',
      render: (doc) => (
        <div className="flex items-center gap-3">
          <span
            className={`doc-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
              formatStyles[doc.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)'
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
      header: 'Department',
      width: '16%',
      render: (doc) => {
        const d = deptStyle[doc.category];
        const Icon = d?.icon;
        return (
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-(--text-primary)">
            {Icon && (
              <span className={`flex h-6 w-6 items-center justify-center rounded-md ${d.cls}`}>
                <Icon size={13} />
              </span>
            )}
            {doc.category}
          </span>
        );
      },
    },
    {
      key: 'author',
      header: 'Author / Owner',
      width: '13%',
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
        <span className="doc-mono whitespace-nowrap rounded-md border border-[#cfe3f3] bg-[#e1f0fa] px-2 py-0.5 text-[10px] font-semibold text-(--text-secondary)">
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
                className={`${iconButton} ${
                  doc.isPinned ? 'text-(--primary)' : 'text-(--text-muted) hover:text-(--text-primary)'
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
              className={`${iconButton} ${
                doc.isBookmarked ? 'text-amber-500' : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <Bookmark size={14} className={doc.isBookmarked ? 'fill-current' : ''} />
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpen?.(doc)}
            className="mx-1 cursor-pointer whitespace-nowrap rounded-full border border-[#cfe3f3] bg-white px-3 py-1 text-[11px] font-semibold text-(--text-primary) transition-colors hover:border-(--primary) hover:text-(--primary)"
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
              onDelete={() => onDelete?.(doc)}
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