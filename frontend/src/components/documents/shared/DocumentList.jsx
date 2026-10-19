import DataTable from '../../common/DataTable.jsx';
import { formatStyles, statusMeta } from './DocumentCard.jsx';

// List view of the documents: columns as in the reference video.
// Built on the shared DataTable. `onOpen(document)` opens the summary page.
function DocumentList({ documents, onOpen }) {
  const columns = [
    {
      key: 'title',
      header: 'Document Name',
      width: '32%',
      render: (doc) => (
        <div className="flex items-center gap-3">
          <span
            className={`doc-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
              formatStyles[doc.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)'
            }`}
          >
            {doc.format}
          </span>
          <div className="min-w-0">
            <p className="doc-heading text-sm font-bold leading-5 text-(--text-primary)">
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
      width: '15%',
      render: (doc) => (
        <span className="inline-block rounded-full bg-(--bg-surface-subtle) px-3 py-1.5 text-[10px] font-semibold text-(--text-secondary)">
          {doc.category}
        </span>
      ),
    },
    {
      key: 'author',
      header: 'Author / Owner',
      width: '17%',
      render: (doc) => <span className="text-xs text-(--text-secondary)">{doc.author}</span>,
    },
    {
      key: 'size',
      header: 'Size',
      width: '8%',
      render: (doc) => <span className="text-xs text-(--text-secondary)">{doc.size}</span>,
    },
    {
      key: 'chunks',
      header: 'Chunks',
      width: '9%',
      render: (doc) => (
        <span className="doc-mono rounded bg-(--bg-surface-subtle) px-1.5 py-0.5 text-[11px] text-(--text-secondary)">
          {doc.chunks} chunks
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '12%',
      render: (doc) => {
        const status = statusMeta[doc.status] ?? {
          label: doc.status,
          style: 'border border-(--border-subtle) bg-(--bg-surface-subtle) text-(--text-secondary)',
        };
        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold ${status.style}`}
          >
            {status.label}
          </span>
        );
      },
    },
    {
      key: 'action',
      header: 'Action',
      width: '9%',
      align: 'right',
      render: (doc) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation(); // the row click would open it a second time
            onOpen?.(doc);
          }}
          className="cursor-pointer whitespace-nowrap rounded-full border border-(--border-medium) bg-white px-3 py-1 text-xs font-semibold text-(--text-primary) transition-colors hover:border-(--primary) hover:text-(--primary)"
        >
          Summary →
        </button>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-(--radius-table) border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      <DataTable
        columns={columns}
        rows={documents}
        caption="Documents"
        onRowClick={onOpen}
      />
    </div>
  );
}

export default DocumentList;