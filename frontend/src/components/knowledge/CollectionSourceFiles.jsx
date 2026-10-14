import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const PAGE_SIZE = 3;

// Format tile colours (status tokens so a theme change updates them too)
export const formatStyles = {
    PDF: 'bg-(--status-danger-bg) text-(--status-danger)',
    DOCX: 'bg-(--status-info-bg) text-(--status-info)',
    MD: 'bg-(--bg-surface-subtle) text-(--text-secondary)',
    TXT: 'bg-(--bg-surface-subtle) text-(--text-secondary)',
    FIG: 'bg-(--cat-lavender-bg) text-(--cat-lavender)',
};

// Paginated "Source files in collection" list shown inside the insights modal.
function CollectionSourceFiles({ files }) {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(files.length / PAGE_SIZE);
    const start = (page - 1) * PAGE_SIZE;
    const visibleFiles = files.slice(start, start + PAGE_SIZE);

    return (
        <section>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="kb-mono text-[10px] uppercase tracking-[0.12em] text-(--text-secondary)">
                    Source files in collection
                </span>
                <span className="kb-mono text-[10px] text-(--text-muted)">
                    {files.length} indexed files
                </span>
            </div>

            <ul className="space-y-2.5">
                {visibleFiles.map((file) => (
                    <li
                        key={file.id}
                        className="cursor-pointer rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-4 transition-colors hover:border-(--accent-highlight)"
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[9px] font-bold ${formatStyles[file.format]}`}
                            >
                                {file.format}
                            </span>

                            <div className="min-w-0 flex-1">
                                <h4 className="kb-serif text-sm font-bold text-(--text-primary)">{file.title}</h4>
                                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-(--text-muted)">
                                    <span>{file.size}</span>
                                    <span>•</span>
                                    <span className="kb-mono rounded-full bg-(--bg-surface-subtle) px-2 py-0.5 text-[10px]">
                                        {file.chunks} chunks
                                    </span>
                                    <span>• {file.author}</span>
                                </div>
                            </div>

                            {/* Link to the Document Summary page is wired once that page exists */}
                            <button
                                type="button"
                                aria-label={`Open ${file.title}`}
                                className="cursor-pointer mt-1 text-(--text-muted)"
                            >
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        <p className="mt-2 text-xs leading-snug text-(--text-secondary)">{file.description}</p>

                        <ul className="mt-2.5 space-y-1.5">
                            {file.notes.map((note) => (
                                <li key={note} className="flex items-center gap-2 text-[11px] text-(--text-muted)">
                                    <span className="ml-1 h-1 w-1 shrink-0 rounded-full bg-(--primary)" />
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* Pagination bar */}
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-(--bg-surface-subtle) px-3.5 py-2.5">
                <span className="kb-mono text-[10px] text-(--text-muted)">
                    Showing {start + 1}-{start + visibleFiles.length} of {files.length} documents (Page {page}/{totalPages})
                </span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1.5 text-xs font-semibold text-(--text-primary) disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                        ← Prev
                    </button>
                    <button
                        type="button"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1.5 text-xs font-semibold text-(--text-primary) disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CollectionSourceFiles;