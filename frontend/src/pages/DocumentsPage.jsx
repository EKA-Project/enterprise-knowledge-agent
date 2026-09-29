import { Search, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { documents, documentCategories, documentFormats } from '../components/documents/DocumentData';
import DocumentCard from '../components/documents/DocumentCard';
import '../styles/document.css';


export default function DocumentsPage() {
    const [category, setCategory] = useState('All Categories');
    const [format, setFormat] = useState('All Formats');
    const [viewMode, setViewMode] = useState('grid');
    return (
        <div className="px-6 py-6">
            {/* Documents page hero */}
            <section className="mb-6 flex items-start justify-between">
                <div>
                    <p className="doc-mono text-xs font-semibold uppercase tracking-[0.16em] text-(--text-eyebrow)">
                    </p>

                    <h1 className="doc-heading mt-2 text-4xl font-bold text-(--text-primary)">
                        Raw sources, structured.
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-(--text-secondary)">
                        Every playbook, compliance standards and contarct that feed EKA&apos;s intelligence.
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
                >
                    + Ingest Document
                </button>
            </section>

            {/* Static filter controls — functionality will be added in later steps. */}
            <section className="mb-8 flex items-center gap-3 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-3 shadow-(--shadow-sm)">
                {/* Document search */}
                <div className="flex min-w-0 flex-1 items-center gap-4 rounded-full bg-(--bg-surface-subtle) px-2.5 py-2">
                    <Search size={16} className="shrink-0 text-(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="min-w-0 flex-1 bg-transparent text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted)"
                    />
                </div>

                {/* Category filter */}
                <div className="relative shrink-0">
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
                    >
                        <option value="All Categories">All Categories ({documentCategories.length})</option>
                        {documentCategories.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                    <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-(--text-muted)"
                    />
                </div>

                {/* Format filter */}
                <div className="relative shrink-0">
                    <select
                        value={format}
                        onChange={(event) => setFormat(event.target.value)}
                        className="appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
                    >
                        <option value="All Formats">All Formats</option>
                        {documentFormats.map((fmt) => (
                            <option key={fmt} value={fmt}>{fmt}</option>
                        ))}
                    </select>
                    <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
                    />
                </div>

                {/* Grid/List view toggle — functionality comes in Step 6. */}
                <div className="flex shrink-0 items-center rounded-full border border-(--border-subtle) p-1">
                    <button
                        type="button"
                        aria-label="Grid view"
                        onClick={() => setViewMode('grid')}
                        className={`rounded-full p-2 ${viewMode === 'grid'
                            ? 'bg-(--bg-surface-subtle) text-(--text-primary)'
                            : 'text-(--text-muted)'
                            }`}
                    >
                        <LayoutGrid size={15} />
                    </button>
                    <button
                        type="button"
                        aria-label="List view"
                        onClick={() => setViewMode('list')}
                        className={`rounded-full p-2 ${viewMode === 'list'
                            ? 'bg-(--bg-surface-subtle) text-(--text-primary)'
                            : 'text-(--text-muted)'
                            }`}
                    >
                        <List size={15} />
                    </button>
                </div>
            </section>


            {/* Document grid — filtering will be wired in the next step. */}
            {viewMode === 'grid' && (
                <section className="grid grid-cols-3 gap-5">
                    {documents.map((document) => (
                        <DocumentCard key={document.id} document={document} />
                    ))}
                </section>
            )}
        </div>
    );
}