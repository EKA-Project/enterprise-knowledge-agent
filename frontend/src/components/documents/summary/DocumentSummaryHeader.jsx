
const statusStyles = {
  "Indexed & Ready":
    "bg-(--status-verified-bg) text-(--status-success)",
  Processing:
    "bg-(--status-info-bg) text-(--status-info)",
  Failed:
    "bg-(--status-danger-bg) text-(--status-danger)",
};

function DocumentSummaryHeader({ document }) {
  const statusStyle =
    statusStyles[document.status] ??
    "bg-(--bg-surface-subtle) text-(--text-secondary)";

  return (
    <header className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
        DOCUMENT INTELLIGENCE / SUMMARY
      </p>

      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="break-words text-2xl font-bold leading-tight text-(--text-primary) sm:text-3xl">
            {document.title}
          </h1>

          <p className="mt-2 text-sm text-(--text-muted)">
            AI-generated synthesis, document insights, and ingestion details.
          </p>
        </div>

        <span
          className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle}`}
        >
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
          {document.status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs font-semibold text-(--text-secondary)">
          {document.format}
        </span>

        <span className="rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-secondary)">
          {document.category}
        </span>

        <span className="rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-secondary)">
          {document.size}
        </span>

        <span className="rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-secondary)">
          {document.readTime}
        </span>

        <span className="rounded-lg border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-xs text-(--text-secondary)">
          {document.pages} pages
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-(--text-muted)">
        <span>Author: {document.author}</span>
        <span>Uploaded: {document.uploadedAt}</span>
        <span>Indexed chunks: {document.indexedChunks}</span>
      </div>
    </header>
  );
}

export default DocumentSummaryHeader;
