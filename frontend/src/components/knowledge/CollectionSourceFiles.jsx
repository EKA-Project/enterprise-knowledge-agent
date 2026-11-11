
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../common/Badge.jsx';
import Pagination from '../common/Pagination.jsx';

const PAGE_SIZE = 3;

// Paginated "Source files in collection" list shown inside the insights modal.
function CollectionSourceFiles({ files }) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(files.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
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
                        onClick={() => navigate(`/documents/${file.id}`)}
                        className="cursor-pointer rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-4 transition-colors hover:border-(--accent-highlight)"
                    >
                        <div className="flex items-start gap-3">
                            <Badge format={file.format} />

                            <div className="min-w-0 flex-1">
                                <h4 className="kb-serif text-sm font-bold text-(--text-primary)">
                                    {file.title}
                                </h4>

                                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-(--text-muted)">
                                    <span>{file.size}</span>
                                    <span>•</span>

                                    <span className="kb-mono rounded-full bg-(--bg-surface-subtle) px-2 py-0.5 text-[10px]">
                                        {file.chunks} chunks
                                    </span>

                                    <span>• {file.author}</span>
                                </div>
                            </div>

                            {/* Opens the Document Summary page */}
                            <Link
                                to={`/documents/${file.id}`}
                                onClick={(event) => event.stopPropagation()}
                                aria-label={`Open ${file.title}`}
                                className="mt-1 cursor-pointer text-(--text-muted) hover:text-(--primary)"
                            >
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <p className="mt-2 text-xs leading-snug text-(--text-secondary)">
                            {file.description}
                        </p>

                        <ul className="mt-2.5 space-y-1.5">
                            {file.notes.map((note) => (
                                <li
                                    key={note}
                                    className="flex items-center gap-2 text-[11px] text-(--text-muted)"
                                >
                                    <span className="ml-1 h-1 w-1 shrink-0 rounded-full bg-(--primary)" />
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* Shared Pagination */}
            <div className="mt-3 overflow-hidden rounded-2xl bg-(--bg-surface-subtle)">
                <Pagination
                    page={currentPage}
                    pageSize={PAGE_SIZE}
                    total={files.length}
                    onPageChange={setPage}
                    itemLabel="documents"
                />
            </div>
        </section>
    );
}

export default CollectionSourceFiles;
