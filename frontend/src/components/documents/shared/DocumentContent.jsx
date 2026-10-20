import { Search, ChevronDown, LayoutGrid, List, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { documentCategories, documentFormats } from './DocumentData';
import { DocToastHost } from './DocToast';
import {
  ALL_CATEGORIES,
  ALL_FORMATS,
  SAVED_FILTER,
  PINNED_FILTER,
  filterDocuments,
  paginate,
} from './documentFilters';
import {
  setDocumentResults,
  setStatusFilter,
  useStatusFilter,
  loadDocuments,
} from './documentResults.js';
import { useRoleDocuments, setDocumentArchivedFlag } from './roleDocuments.js';
import ArchiveModal from '../summary/ArchiveModal.jsx';
import { showDocToast } from './DocToast';
import { setDocumentArchived } from '../summary/summaryService';
import DocumentCard from './DocumentCard.jsx';
import DocumentList from './DocumentList.jsx';
import DocumentPagination from './DocumentPagination.jsx';
import DocumentEmptyState from './DocumentEmptyState.jsx';

// Single place that knows the summary URL (matches the route in AppRoutes)
const summaryPath = (doc) => `/documents/summary?id=${doc.id}`;

// Small "Filtered by: …" chip with a clear button
function FilterChip({ label, value, clearLabel, onClear }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) py-1.5 pl-3 pr-2 text-xs text-(--text-secondary)">
      {label} <strong className="font-semibold text-(--text-primary)">{value}</strong>
      <button
        type="button"
        aria-label={clearLabel}
        onClick={onClear}
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-(--text-muted) transition-colors hover:text-(--text-primary)"
      >
        <X size={12} />
      </button>
    </span>
  );
}

function DocumentsContent({ adminMode = false, variant = 'default' }) {
  const isManager = variant === 'manager';
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [format, setFormat] = useState(ALL_FORMATS);
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Status picked in the admin Document Health Overview ("" = none)
  const status = useStatusFilter();

  const { items: docs, loading, toggleFlag: handleToggleFlag } = useRoleDocuments();
  const [archiveTarget, setArchiveTarget] = useState(null); // doc waiting for Confirm Archive

  const confirmArchive = async () => {
    const doc = archiveTarget;
    const next = !doc.isArchived;
    setArchiveTarget(null);
    setDocumentArchivedFlag(doc.id, next);
    await setDocumentArchived(doc.id, next);
    showDocToast(
      next
        ? `📦 Document "${doc.title}" archived`
        : `Document "${doc.title}" restored to active repository`,
      'neutral',
    );
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const openSummary = (doc) => navigate(summaryPath(doc));

  const filteredDocuments = filterDocuments(docs, { search, category, format, status });
  const { pageItems, total, totalPages, current, from, to } = paginate(
    filteredDocuments,
    page,
    pageSize,
  );

  // Back to page 1 whenever the filter or page size changes
  useEffect(() => {
    setPage(1);
  }, [search, category, format, status, pageSize]);

  const resetFilters = () => {
    setSearch('');
    setCategory(ALL_CATEGORIES);
    setFormat(ALL_FORMATS);
    setStatusFilter('');
  };

  // Text shown in the "Filtered by" chip (category label, or Saved / Pinned)
  const categoryLabel =
    documentCategories.find((cat) => cat.value === category)?.label ?? category;
  const isCategoryFiltered = category !== ALL_CATEGORIES;

  // Tell the page hero how many documents the current filter shows
  useEffect(() => {
    if (loading) return;
    setDocumentResults({
      count: total,
      filterLabel: isCategoryFiltered ? categoryLabel : '',
    });
  }, [loading, total, isCategoryFiltered, categoryLabel]);
  // Reset shared state when leaving the page
  useEffect(
    () => () => {
      setDocumentResults({ count: null, filterLabel: '' });
      setStatusFilter('');
    },
    [],
  );

  return (
    <>
      {/* Filter controls */}
      <section className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-3 shadow-(--shadow-sm)">
        <div className="flex w-full min-w-0 items-center gap-4 rounded-full bg-(--bg-surface-subtle) px-2.5 py-2 lg:w-auto lg:flex-1">
          <Search size={16} className="shrink-0 text-(--text-muted)" />
          <input
            type="text"
            placeholder={
              isManager
                ? 'Filter documents by name, keyword, or author…'
                : 'Search by title, summary keywords, or author...'
            }
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted)"
          />
        </div>

        {/* Active filter chips */}
        {isCategoryFiltered && (
          <FilterChip
            label="Filtered by:"
            value={categoryLabel}
            clearLabel="Clear category filter"
            onClear={() => setCategory(ALL_CATEGORIES)}
          />
        )}
        {status && (
          <FilterChip
            label="Status:"
            value={status}
            clearLabel="Clear status filter"
            onClear={() => setStatusFilter('')}
          />
        )}

        <div className="relative shrink-0">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-(--border-subtle) bg-(--bg-surface) py-2 pl-4 pr-10 text-sm font-semibold text-(--text-primary) outline-none"
          >
            <option value={ALL_CATEGORIES}>
              {isManager ? `All Categories (${documentCategories.length})` : 'All Categories'}
            </option>
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
              <option key={fmt.value} value={fmt.value}>
                {fmt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
          />
        </div>

        {/* Grid / list toggle: active button is solid */}
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

      {total === 0 ? (
        <DocumentEmptyState onReset={resetFilters} />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  adminMode={adminMode}
                  onToggleFlag={handleToggleFlag}
                  onOpen={openSummary}
                  onArchive={adminMode ? setArchiveTarget : undefined}
                />
              ))}
            </section>
          ) : (
            <DocumentList
              documents={pageItems}
              adminMode={adminMode}
              shortStatus={!isManager}
              onToggleFlag={handleToggleFlag}
              onOpen={openSummary}
              onArchive={adminMode ? setArchiveTarget : undefined}
            />
          )}

          <DocumentPagination
            from={from}
            to={to}
            total={total}
            current={current}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
            {archiveTarget && (
        <ArchiveModal
          title={archiveTarget.title}
          archived={archiveTarget.isArchived}
          onClose={() => setArchiveTarget(null)}
          onConfirm={confirmArchive}
        />
      )}
      <DocToastHost />
    </>
  );
}

export default DocumentsContent;