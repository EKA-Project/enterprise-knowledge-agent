import { Search, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { documents, documentCategories, documentFormats } from './DocumentData';
import DocumentCard from './DocumentCard.jsx';

function DocumentsContent({ adminMode = false }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [format, setFormat] = useState('All Formats');
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
  const filteredDocuments = docs.filter((document) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      document.title.toLowerCase().includes(searchText) ||
      document.description.toLowerCase().includes(searchText);

    const matchesCategory =
      category === 'All Categories' ||
      document.category === category;

    const matchesFormat =
      format === 'All Formats' ||
      document.format === format;

    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <>
      {/* Filter controls */}
      <section className="mb-8 flex items-center gap-3 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-3 shadow-(--shadow-sm)">
        <div className="flex min-w-0 flex-1 items-center gap-4 rounded-full bg-(--bg-surface-subtle) px-2.5 py-2">
          <Search size={16} className="shrink-0 text-(--text-muted)" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted)"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
          >
            <option value="All Categories">
              All Categories ({documentCategories.length})
            </option>

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
            className="appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
          >
            <option value="All Formats">All Formats</option>

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

      {viewMode === 'grid' && (
        <section className="grid grid-cols-3 gap-5">
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
          {/* List view */}
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
        </section>
      )}
    </>
  );
}

export default DocumentsContent;