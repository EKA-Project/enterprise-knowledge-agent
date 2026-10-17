
import { FileText, Link2, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DocumentInfoCard({ document }) {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--status-danger-bg) text-(--status-danger)">
            <FileText size={20} strokeWidth={1.7} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="rounded-full bg-(--status-danger-bg) px-2 py-1 font-semibold text-(--status-danger)">
                {document.format}
              </span>

              <span className="rounded-full bg-(--bg-surface-subtle) px-2.5 py-1 text-(--text-secondary)">
                {document.category}
              </span>

              <span className="rounded-full bg-(--status-verified-bg) px-2.5 py-1 font-semibold text-(--status-success)">
                {document.status}
              </span>

              <span className="text-(--text-muted)">
                {document.size} • {document.readTime} • {document.pages} pages
              </span>
            </div>

            <h2 className="mt-2 break-words [font-family:var(--font-serif)] text-xl font-bold leading-tight text-(--text-primary) sm:text-2xl">
              {document.title}
            </h2>

            <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-(--text-muted)">
              <span>Author: {document.author}</span>
              <span>Uploaded: {document.uploadedAt}</span>
              <span>Indexed Chunks: {document.indexedChunks}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:pl-3">
          <button
            type="button"
            onClick={() =>
              navigate("/ask-eka", {
                state: {
                  documentId: document.id,
                  documentTitle: document.title,
                },
              })
            }
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:flex-none"
          >
            Ask About This Doc
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            aria-label="Copy document reference"
            onClick={() =>
              navigator.clipboard?.writeText(document.title)
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--border-subtle) text-(--text-secondary) transition-colors hover:bg-(--bg-surface-subtle)"
          >
            <Link2 size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DocumentInfoCard;
