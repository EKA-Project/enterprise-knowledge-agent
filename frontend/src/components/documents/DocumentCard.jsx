

function DocumentCard({ document }) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 transition-colors hover:border-(--border-medium)">
      {/* Document format and category */}
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-(--bg-surface-subtle) px-2 py-1 font-mono text-[10px] font-bold text-(--text-primary)">
          {document.format}
        </span>

        <span className="rounded-full border border-(--border-subtle) px-3 py-1 text-[10px] font-semibold text-(--text-secondary)">
          {document.category}
        </span>
      </div>

      <h2 className="mt-5 font-serif text-xl font-bold leading-7 text-(--text-primary)">
        {document.title}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-(--text-secondary)">
        {document.description}
      </p>

      <p className="mt-4 text-xs text-(--text-muted)">
        {document.readTime} • {document.size} • {document.pages} pages
      </p>

      <div className="mt-5">
        <span className="inline-flex rounded-full bg-(--bg-surface-subtle) px-3 py-1.5 text-[10px] font-semibold text-(--text-secondary)">
          {document.status}
        </span>
      </div>
    </article>
  );
}



export default DocumentCard;