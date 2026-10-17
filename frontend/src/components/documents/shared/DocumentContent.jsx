import { Search, ChevronDown, LayoutGrid, List, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { documents, documentCategories, documentFormats } from './DocumentData';
import {
  ALL_CATEGORIES,
  ALL_FORMATS,
  SAVED_FILTER,
  PINNED_FILTER,
  filterDocuments,
} from './documentFilters';
import DocumentCard from './DocumentCard.jsx';


function DocumentsContent({ adminMode = false }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [format, setFormat] = useState(ALL_FORMATS);
  const [viewMode, setViewMode] = useState('grid');
  // Local copy of the documents, so pin / bookmark toggles show up in the UI.
  const [docs, setDocs] = useState(documents);


  const handleToggleFlag = (id, flag) => {
    setDocs((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [flag]: !item[flag] } : item,
      ),
    );
  };
  const filteredDocuments = filterDocuments(docs, { search, category, format });

  // Text shown in the "Filtered by" chip (category label, or Saved / Pinned)
  const categoryLabel =
    documentCategories.find((cat) => cat.value === category)?.label ?? category;
  const isCategoryFiltered = category !== ALL_CATEGORIES;


  return (
    <>
      {/* Filter controls */}
      <section className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-3 shadow-(--shadow-sm)">
        <div className="flex w-full min-w-0 items-center gap-4 rounded-full bg-(--bg-surface-subtle) px-2.5 py-2 lg:w-auto lg:flex-1">
          <Search size={16} className="shrink-0 text-(--text-muted)" />
          <input
            type="text"
            placeholder="Search by title, summary keywords, or author..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted)"
          />
        </div>

        {/* Active category filter chip */}
        {isCategoryFiltered && (
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) py-1.5 pl-3 pr-2 text-xs text-(--text-secondary)">
            Filtered by: <strong className="font-semibold text-(--text-primary)">{categoryLabel}</strong>
            <button
              type="button"
              aria-label="Clear category filter"
              onClick={() => setCategory(ALL_CATEGORIES)}
              className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-(--text-muted) transition-colors hover:text-(--text-primary)"
            >
              <X size={12} />
            </button>
          </span>
        )}

        <div className="relative shrink-0">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
          >
            <option value={ALL_CATEGORIES}>All Categories</option>
            <option value={SAVED_FILTER}>⭐ Saved Bookmarks</option>
            <option value={PINNED_FILTER}>📌 Admin Pinned</option>

            {documentCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-(--text-muted)"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
          >
            <option value={ALL_FORMATS}>All Formats</option>

            {documentFormats.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
          />
        </div>

        {/* Grid / list toggle: active button is solid blue */}
        <div className="flex shrink-0 items-center gap-1 rounded-xl border border-(--border-subtle) p-1">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            className={`cursor-pointer rounded-lg p-2 transition-colors ${viewMode === 'grid'
              ? 'bg-(--primary) text-(--primary-contrast)'
              : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
          >
            <LayoutGrid size={15} />
          </button>

          <button
            type="button"
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            className={`cursor-pointer rounded-lg p-2 transition-colors ${viewMode === 'list'
              ? 'bg-(--primary) text-(--primary-contrast)'
              : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
          >
            <List size={15} />
          </button>
        </div>
      </section>

      {viewMode === 'grid' && (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              adminMode={adminMode}
              onToggleFlag={handleToggleFlag}
            />
          ))}
        </section>
      )}

      {viewMode === 'list' && (
        <section className="overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
          {/* List view (restyled in a later step) */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-(--border-subtle)">
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Document Name
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Category
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Author / Owner
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Size
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Chunks
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Status
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-(--text-muted)">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((document) => (
                  <tr
                    key={document.id}
                    className="border-b border-(--border-subtle) transition-colors last:border-b-0 hover:bg-(--bg-surface-subtle)"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="doc-mono rounded-md bg-(--bg-surface-subtle) px-2 py-1 text-[10px] font-bold text-(--text-primary)">
                          {document.format}
                        </span>
                        <span className="text-sm font-semibold text-(--text-primary)">
                          {document.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-(--text-secondary)">
                      {document.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-(--text-secondary)">
                      {document.author}
                    </td>

                    <td className="px-5 py-4 text-sm text-(--text-secondary)">
                      {document.size}
                    </td>

                    <td className="px-5 py-4 text-sm text-(--text-secondary)">
                      {document.chunks}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-(--bg-surface-subtle) px-3 py-1.5 text-[10px] font-semibold text-(--text-secondary)">
                        {document.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/documents/summary", {
                            state: { document },
                          })
                        }
                        className="text-sm font-semibold text-(--text-primary) transition-opacity hover:opacity-70"
                      >
                        Summary →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section >
      )
      }
    </>
  );
}

export default DocumentsContent;