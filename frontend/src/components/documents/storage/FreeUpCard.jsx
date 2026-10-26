import { Fragment, useMemo, useState } from 'react';
import {
  AlertTriangle, ChevronLeft, ChevronRight, Clock, Copy, FileText, Search, Sparkles,
} from 'lucide-react';
import { storageFiles } from './StorageData';
import CustomThresholdModal from './CustomThresholdModal';
import '../../../styles/Document.css';

const TABS = [
  { key: 'large', label: 'Large files', icon: FileText, tone: 'bg-[#e0ecff] text-[#2563eb]' },
  { key: 'idle', label: 'Not opened recently', icon: Clock, tone: 'bg-[#fff0c0] text-[#b86b00]' },
  { key: 'failed', label: 'Failed ingestions', icon: AlertTriangle, tone: 'bg-[#fde2e1] text-[#d9373f]' },
  { key: 'dupes', label: 'Duplicates', icon: Copy, tone: 'bg-[#ede4ff] text-[#7c3aed]' },
];
const LARGE_CHIPS = [10, 50, 100, 150];
const IDLE_CHIPS = [30, 60, 90];
const PER_PAGE = [5, 10, 15, 20];
const SORTS = [
  ['size-desc', 'Largest first'],
  ['size-asc', 'Smallest first'],
  ['name', 'Name A–Z'],
  ['idle-desc', 'Least recently opened'],
];
const TYPE_TILE = {
  PDF: 'bg-[#fde2e1] text-[#d9373f]',
  DOCX: 'bg-[#e0ecff] text-[#2563eb]',
  MD: 'bg-[#d9f7ea] text-[#08966a]',
  CSV: 'bg-[#e0f1fd] text-[#0c82c0]',
  TXT: 'bg-[#fff0c0] text-[#b86b00]',
};
const STATUS = {
  Ready: 'bg-[#edfdf5] text-[#0f8f63]',
  Outdated: 'bg-[#fff6dc] text-[#b86b00]',
  Failed: 'bg-[#ffe9e8] text-[#d9373f]',
};
const COLS = 'grid grid-cols-[44px_64px_minmax(0,2.6fr)_130px_90px_130px_130px_100px] items-center gap-4';

const sizeLabel = (mb) => `${mb.toFixed(1)} MB`;
const openedLabel = (d) => (d <= 1 ? 'Today' : d < 14 ? `${d} days ago` : d < 60 ? `${Math.round(d / 7)} weeks ago` : `${Math.round(d / 30)} months ago`);

// `selected` (Set of ids) lives in the page so the Step 5 bulk bar can read it.
function FreeUpCard({ selected, onSelectedChange, hiddenIds }) {
  const [tab, setTab] = useState('large');
  const [largeMin, setLargeMin] = useState(10); // MB
  const [idleMin, setIdleMin] = useState(30); // days
  const [customOpen, setCustomOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('size-desc');
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Rows of one tab after threshold + search (counts on the tabs use the same rule)
  const baseRows = (key) => {
    const list = storageFiles[key].filter((f) => !hiddenIds.has(f.id));
    if (key === 'large') return list.filter((f) => f.sizeMb > largeMin);
    if (key === 'idle') return list.filter((f) => f.idleDays > idleMin);
    return list;
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = baseRows(tab).filter(
      (f) => !q || f.name.toLowerCase().includes(q) || f.file.toLowerCase().includes(q),
    );
    if (tab !== 'dupes') {
      list = [...list].sort((a, b) =>
        sort === 'size-desc' ? b.sizeMb - a.sizeMb
        : sort === 'size-asc' ? a.sizeMb - b.sizeMb
        : sort === 'idle-desc' ? b.idleDays - a.idleDays
        : a.name.localeCompare(b.name),
      );
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, largeMin, idleMin, query, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / perPage));
  const safePage = Math.min(page, pages - 1);
  const start = safePage * perPage;
  const visible = rows.slice(start, start + perPage);
  const selectable = visible.filter((f) => !f.isProtected);
  const allOnPage = selectable.length > 0 && selectable.every((f) => selected.has(f.id));

  const toggleOne = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelectedChange(next);
  };
  const toggleAll = () => {
    const next = new Set(selected);
    selectable.forEach((f) => (allOnPage ? next.delete(f.id) : next.add(f.id)));
    onSelectedChange(next);
  };

  const reset = (fn) => (v) => {
    fn(v);
    setPage(0);
  };
  const chips = tab === 'large' ? LARGE_CHIPS : tab === 'idle' ? IDLE_CHIPS : null;
  const current = tab === 'large' ? largeMin : idleMin;
  const unit = tab === 'large' ? 'MB' : 'days';
  const setCurrent = reset(tab === 'large' ? setLargeMin : setIdleMin);
  const isCustomActive = tab === 'large' && !LARGE_CHIPS.includes(largeMin);

  const chipCls = (on) =>
    `doc-mono h-8 cursor-pointer rounded-full border px-4 text-[12px] font-semibold transition-colors ${
      on ? 'border-[#153830] bg-[#153830] text-white' : 'border-[#cfe3f3] bg-white text-[#10283f] hover:bg-[#e1f0fa]'
    }`;

  return (
    <section className="rounded-[28px] border border-(--border-subtle) bg-(--bg-surface) px-9 py-8 shadow-(--shadow-sm)">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e1f0fa] text-[#1f718e]">
          <Sparkles size={18} />
        </span>
        <div>
          <h2 className="text-[22px] font-bold text-[#10283f]">Free up space</h2>
          <p className="text-[13px] text-[#7c949a]">Review files that are safe to recycle. Protected files are locked.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-3">
        {TABS.map((t) => {
          const on = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => { setTab(t.key); setPage(0); }}
              className={`flex h-11 cursor-pointer items-center gap-2.5 rounded-full border px-4 text-[14px] font-semibold transition-colors ${
                on ? 'border-[#1b79a8] bg-[#e0f1fd] text-[#10283f]' : 'border-[#e3eef7] bg-white text-[#44596a] hover:bg-[#f2f8fd]'
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${t.tone}`}>
                <Icon size={13} />
              </span>
              {t.label}
              <span className="doc-mono rounded-full bg-[#e1f0fa] px-2 text-[12px]">{baseRows(t.key).length}</span>
            </button>
          );
        })}
      </div>

      {/* Threshold chips + filter + sort */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {chips && (
          <>
            {chips.map((c) => (
              <button key={c} type="button" onClick={() => setCurrent(c)} className={chipCls(current === c)}>
                &gt;{c} {unit}
              </button>
            ))}
            {tab === 'large' && (
              <button type="button" onClick={() => setCustomOpen(true)} className={chipCls(isCustomActive)}>
                {isCustomActive ? `>${largeMin} MB` : 'Custom'}
              </button>
            )}
          </>
        )}
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c949a]" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              placeholder="Filter by name…"
              className="h-10 w-[240px] rounded-full border border-[#cfe3f3] bg-[#f4f9fd] pl-9 pr-4 text-[13px] text-[#10283f] outline-none focus:border-[#1b79a8]"
            />
          </div>
          {tab !== 'dupes' && (
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 cursor-pointer rounded-full border border-[#cfe3f3] bg-white px-4 text-[13px] text-[#10283f] outline-none"
            >
              {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-[18px] border border-[#e3eef7]">
        <div className={`${COLS} bg-[#e1f0fa] px-5 py-3`}>
          <input
            type="checkbox"
            checked={allOnPage}
            onChange={toggleAll}
            disabled={selectable.length === 0}
            className="h-4 w-4 cursor-pointer accent-[#153830]"
          />
          {['Type', 'Document', 'Dept', 'Size', 'Last opened', 'Last cited', 'Status'].map((h) => (
            <span key={h} className="doc-mono text-[11px] uppercase tracking-[0.14em] text-[#7c949a]">{h}</span>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="px-5 py-14 text-center text-[15px] text-[#7c949a]">Nothing to clean up here.</p>
        ) : (
          visible.map((f, i) => (
            <Fragment key={f.id}>
              {tab === 'dupes' && f.group !== visible[i - 1]?.group && (
                <div className="bg-[#f2f8fd] px-5 py-2.5 text-[12px] font-semibold text-[#44596a]">
                  Duplicate group: {f.group}
                </div>
              )}
              <div className={`${COLS} border-t border-[#e3eef7] px-5 py-3.5 ${selected.has(f.id) ? 'bg-[#f0f8fe]' : 'bg-white'}`}>
                <input
                  type="checkbox"
                  checked={selected.has(f.id)}
                  disabled={f.isProtected}
                  onChange={() => toggleOne(f.id)}
                  className="h-4 w-4 cursor-pointer accent-[#153830] disabled:cursor-not-allowed disabled:opacity-40"
                />
                <span className={`doc-mono inline-flex h-7 w-12 items-center justify-center rounded-md text-[11px] font-bold ${TYPE_TILE[f.type]}`}>
                  {f.type}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[14px] font-semibold text-[#10283f]">{f.name}</span>
                    {f.isProtected && (
                      <span className="shrink-0 rounded-full bg-[#e1f0fa] px-2 py-0.5 text-[10px] font-bold uppercase text-[#1f718e]">
                        Protected
                      </span>
                    )}
                  </div>
                  <span className="doc-mono block truncate text-[11px] text-[#7c949a]">{f.file}</span>
                </div>
                <span className="w-fit rounded-full bg-[#e1f0fa] px-3 py-1 text-[12px] font-semibold text-[#44596a]">{f.dept}</span>
                <span className="doc-mono text-[13px] font-bold text-[#10283f]">{sizeLabel(f.sizeMb)}</span>
                <span className="text-[13px] text-[#44596a]">{openedLabel(f.idleDays)}</span>
                <span className="text-[13px] text-[#44596a]">{f.cited}</span>
                <span className={`w-fit rounded-full px-3 py-1 text-[12px] font-semibold ${STATUS[f.status]}`}>{f.status}</span>
              </div>
            </Fragment>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#7c949a]">
        <span className="doc-mono">
          {rows.length === 0 ? '0 files' : `${start + 1}–${Math.min(start + perPage, rows.length)} of ${rows.length}`}
        </span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            Rows per page
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(0); }}
              className="h-8 cursor-pointer rounded-lg border border-[#cfe3f3] bg-white px-2 text-[#10283f] outline-none"
            >
              {PER_PAGE.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#cfe3f3] text-[#10283f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            disabled={safePage >= pages - 1}
            onClick={() => setPage(safePage + 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#cfe3f3] text-[#10283f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {customOpen && (
        <CustomThresholdModal
          initial={largeMin}
          onClose={() => setCustomOpen(false)}
          onApply={(mb) => { setLargeMin(mb); setPage(0); setCustomOpen(false); }}
        />
      )}
    </section>
  );
}

export default FreeUpCard;