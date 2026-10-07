import '../../../styles/Document.css';

function DocumentCard({ document, adminMode = false }) {
  return (
    <article className="rounded-4xl border border-(--border-subtle) bg-(--bg-surface) p-4 transition-colors hover:border-(--border-medium)">
      {/* Document format and category */}
  <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="doc-mono rounded-md bg-(--bg-surface-subtle) px-2 py-1 text-[10px] font-bold text-(--text-primary)">
            {document.format}
          </span>
          <span className="rounded-full border border-(--border-subtle) px-3 py-1 text-[10px] font-semibold text-(--text-secondary)">
            {document.category}
          </span>
        </div>

        {adminMode && (
          <div className="flex items-center gap-2 text-(--text-muted)">
            <button
              type="button"
              aria-label="Pin document"
              className="text-sm transition-colors hover:text-(--text-primary)"
            >
              📌
            </button>
            <button
              type="button"
              aria-label="Bookmark document"
              className="text-sm transition-colors hover:text-(--text-primary)"
            >
              🔖
            </button>
            <button
              type="button"
              aria-label="More document actions"
              className="text-sm font-bold transition-colors hover:text-(--text-primary)"
            >
              •••
            </button>
          </div>
        )}
      </div>

      <h2 className="doc-heading mt-4 text-xl font-bold leading-7 text-(--text-primary)">
        {document.title}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-(--text-secondary)">
        {document.description}
      </p>
      {/* Divider before the meta row */}
      <div className="mt-4 border-t border-(--border-subtle)" />

      {/* Meta info and status share one row */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-(--text-muted)">
          {document.readTime} • {document.size} • {document.pages} pages
        </p>


       <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-[10px] font-semibold text-green-700">
         {document.status === 'Indexed' && '✓ '}
         {document.status}
       </span>
      </div>
    </article>
  );
}



export default DocumentCard;