import { Fragment, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Archive, ClipboardList, Copy, History, Lock, Paintbrush, RotateCcw, Search, Zap } from 'lucide-react';
import { dupGroups } from './StorageData';
import { DeptPill, StatusPill, TypeTile } from './StorageBits';
import CustomThresholdModal from './CustomThresholdModal';
import '../../../styles/Document.css';

const TABS = [
  { key: 'large', label: 'Large files', icon: Archive, on: 'bg-[#0a7bc4] text-white', off: 'bg-[#e3f0fa] text-[#1b79a8]' },
  { key: 'idle', label: 'Not opened recently', icon: History, on: 'bg-[#f08a1c] text-white', off: 'bg-[#fff0dc] text-[#d9822b]' },
  { key: 'failed', label: 'Failed ingestions', icon: AlertTriangle, on: 'bg-[#e5484d] text-white', off: 'bg-[#ffe9e8] text-[#e5484d]' },
  { key: 'dupes', label: 'Duplicates', icon: Copy, on: 'bg-[#7c5ce0] text-white', off: 'bg-[#ece8fd] text-[#7c5ce0]' },
];
const LARGE_CHIPS = [10, 50, 100];
const IDLE_CHIPS = [30, 60, 90];
const PER_PAGE = [5, 10, 15, 20];
const SORTS = [
  ['size-desc', 'Sort: Size (Largest)', (a, b) => b.sizeMb - a.sizeMb],
  ['size-asc', 'Sort: Size (Smallest)', (a, b) => a.sizeMb - b.sizeMb],
  ['name-asc', 'Sort: File Name (A-Z)', (a, b) => a.name.localeCompare(b.name)],
  ['name-desc', 'Sort: File Name (Z-A)', (a, b) => b.name.localeCompare(a.name)],
  ['opened-desc', 'Sort: Last Opened (Oldest first)', (a, b) => b.idleDays - a.idleDays],
];
const TH = 'doc-mono px-3 text-[11px] font-normal uppercase tracking-[0.12em] text-[#7c949a]';

// `files` = active documents. `filter` = { mode: 'dept' | 'format', key } from the cards above.
function FreeUpCard({ files, filter, onClearFilter, selected, onSelectedChange, onSweep, onToast, glow }) {
  const [tab, setTab] = useState('large');
  const [largeMin, setLargeMin] = useState(10); // MB
  const [customVal, setCustomVal] = useState(null);
  const [idleMin, setIdleMin] = useState(90); // days
  const [customOpen, setCustomOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('size-desc');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => setPage(0), [filter.key, filter.mode, tab, largeMin, idleMin, query, sort]);

  const rowsFor = (key) => {
    const list = files.filter(
      (f) => filter.key === 'ALL' || (filter.mode === 'dept' ? f.dept === filter.key : f.type === filter.key),
    );
    if (key === 'large') return list.filter((f) => f.sizeMb > largeMin);
    if (key === 'idle') return list.filter((f) => f.idleDays > idleMin);
    if (key === 'failed') return list.filter((f) => f.status === 'Failed');
    return list.filter((f) => f.group);
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorter = SORTS.find((s) => s[0] === sort)[2];
    let list = rowsFor(tab)
      .filter((f) => !q || f.name.toLowerCase().includes(q) || f.file.toLowerCase().includes(q))
      .sort(sorter);
    if (tab === 'dupes') list = Object.keys(dupGroups).flatMap((g) => list.filter((f) => f.group === g));
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, filter, tab, largeMin, idleMin, query, sort]);

  const count = rows.length;
  const reclaim = rows.filter((f) => !f.isProtected).reduce((s, f) => s + f.sizeMb, 0);
  const lead =
    tab === 'large' ? `occupying > ${largeMin} MB`
    : tab === 'idle' ? `inactive > ${idleMin} days`
    : tab === 'failed' ? 'with pipeline failures'
    : 'with duplicate copies';

  const pages = Math.max(1, Math.ceil(count / perPage));
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

  const chip = (on) =>
    `doc-mono h-8 cursor-pointer rounded-full px-4 text-[12.5px] font-semibold transition-colors ${
      on ? 'bg-[#0a7bc4] text-white' : 'text-[#44596a] hover:text-[#10283f]'
    }`;

  return (
    <section
      id="free-up-card"
      className={`overflow-hidden rounded-[28px] border-t-[3px] border-t-[#1796a8] border-x border-b border-x-(--border-subtle) border-b-(--border-subtle) bg-(--bg-surface) px-9 pb-8 pt-[26px] shadow-(--shadow-sm) transition-shadow duration-500 ${
        glow ? 'shadow-[0_0_0_5px_rgba(246,185,100,0.45)]' : ''
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-5">
          <button
            type="button"
            onClick={onSweep}
            className="flex h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-[#e1f0fa] text-[#e8801a] transition-transform hover:scale-105"
          >
            <Paintbrush size={24} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="doc-heading text-[30px] font-black leading-[38px] text-[#10283f]">Free up space</h2>
              <span className="doc-mono inline-flex h-[22px] items-center gap-1.5 rounded-full bg-[#e1f0fa] px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1b79a8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1b79a8]" />
                Suggestions
              </span>
            </div>
            <p className="mt-1.5 text-[14px] text-[#7c949a]">
              Targeted reclamation suggestions modeled after intelligent storage analytics to trim orphaned vectors and bloated PDFs.
            </p>
          </div>
        </div>
        <span className="doc-mono inline-flex h-10 items-center gap-2 rounded-full border border-[#c4ecd9] bg-[#eefbf5] px-5 text-[13px] font-bold text-[#0f8f63]">
          <Zap size={13} className="fill-current text-[#e8801a]" />
          {reclaim.toFixed(1)} MB Reclaimable
        </span>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2 border-b border-[#e3eef7]">
        {TABS.map((t) => {
          const isOn = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`-mb-px flex cursor-pointer items-center gap-3 rounded-t-xl border-b-2 px-4 pb-3 pt-2.5 text-[15px] font-semibold text-[#10283f] transition-colors ${
                isOn ? 'border-[#1796a8] bg-[#f1f8fd]' : 'border-transparent hover:bg-[#f7fbfe]'
              }`}
            >
              <span className={`flex h-[34px] w-[34px] items-center justify-center rounded-xl ${isOn ? t.on : t.off}`}>
                <Icon size={16} />
              </span>
              {t.label}
              <span className={`doc-mono flex h-[26px] min-w-[26px] items-center justify-center rounded-full px-1.5 text-[12px] font-bold ${isOn ? 'bg-[#0a7bc4] text-white' : 'bg-[#e3eef7] text-[#7c949a]'}`}>
                {rowsFor(t.key).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary + filters */}
      <div className="mt-5 rounded-[20px] bg-[#e1f0fa] px-[15px] py-[12px]">
        <p className="text-[13px] text-[#44596a]">
          {count === 0 ? (
            '0 files matching current cleanup parameters'
          ) : (
            <>
              Showing <span className="doc-mono font-semibold text-[#10283f]">{count} {count === 1 ? 'file' : 'files'}</span> {lead} •{' '}
              <span className="doc-mono font-bold text-[#0f9d6b]">{reclaim.toFixed(1)} MB</span> can be freed
            </>
          )}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {filter.key !== 'ALL' && (
            <div className="inline-flex h-10 items-center gap-3 rounded-full bg-white px-4 text-[12px]">
              <span className="doc-mono font-semibold text-[#1b79a8]">
                {filter.mode === 'dept' ? 'Department' : 'Format'}: {filter.key}
              </span>
              <button type="button" onClick={onClearFilter} className="inline-flex cursor-pointer items-center gap-1 font-bold text-[#0a7bc4] underline">
                <RotateCcw size={11} /> View All
              </button>
            </div>
          )}

          {(tab === 'large' || tab === 'idle') && (
            <div className="inline-flex items-center gap-0.5 rounded-full bg-white/70 p-1">
              {(tab === 'large' ? LARGE_CHIPS : IDLE_CHIPS).map((c) => {
                const isOn = tab === 'large' ? largeMin === c && customVal === null : idleMin === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      if (tab === 'large') { setLargeMin(c); setCustomVal(null); } else setIdleMin(c);
                    }}
                    className={chip(isOn)}
                  >
                    &gt; {c} {tab === 'large' ? 'MB' : 'days'}
                  </button>
                );
              })}
              {tab === 'large' && (
                <button type="button" onClick={() => setCustomOpen(true)} className={chip(customVal !== null)}>
                  {customVal !== null ? `> ${customVal} MB` : 'Custom ›'}
                </button>
              )}
            </div>
          )}

          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c949a]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter files..."
              className="h-8 w-[246px] rounded-full bg-white pl-10 pr-4 text-[12px] text-[#10283f] outline-none placeholder:text-[#9db0bd]"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="doc-mono h-8 w-[250px] cursor-pointer rounded-full bg-white px-2 text-[12px] text-[#10283f] outline-none"
          >
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-[20px] border border-[#e3eef7] bg-white">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-[#dcf0fd]">
            <tr className="h-[52px]">
              <th className="w-12 px-4">
                <input type="checkbox" checked={allOnPage} onChange={toggleAll} disabled={selectable.length === 0} className="h-[18px] w-[18px] cursor-pointer accent-[#0a7bc4]" />
              </th>
              <th className={TH}>Type</th>
              <th className={TH}>Document Name</th>
              <th className={TH}>Department / Category</th>
              <th className={TH}>Size</th>
              <th className={TH}>Last Opened</th>
              <th className={TH}>Last Cited</th>
              <th className={TH}>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="py-14 text-center text-[15px] text-[#7c949a]">Nothing to clean up here.</td>
              </tr>
            )}
            {visible.map((f, i) => {
              const isFirstOfGroup = tab === 'dupes' && f.group !== visible[i - 1]?.group;
              const grp = rows.filter((r) => r.group === f.group);
              return (
                <Fragment key={f.id}>
                  {isFirstOfGroup && (
                    <tr>
                      <td colSpan={8} className="px-3 pb-1 pt-3">
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d6e8f5] border-l-[3px] border-l-[#1b79a8] bg-[#f1f8fd] px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e1f0fa] text-[#1b79a8]">
                              <ClipboardList size={15} />
                            </span>
                            <div>
                              <p className="text-[14px] font-semibold text-[#10283f]">Duplicate Group: {dupGroups[f.group].title}</p>
                              <p className="doc-mono text-[10.5px] text-[#7c949a]">{dupGroups[f.group].note}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="doc-mono rounded-full border border-[#c9def6] bg-[#eaf3fd] px-3 py-1 text-[11px] font-bold text-[#1b79a8]">
                              {grp.length} Copies Detected
                            </span>
                            <span className="doc-mono rounded-full border border-[#c4ecd9] bg-[#eefbf5] px-3 py-1 text-[11px] font-bold text-[#0f8f63]">
                              +{grp.reduce((s, r) => s + r.sizeMb, 0).toFixed(1)} MB Reclaimable
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr className={`border-t border-[#e3eef7] ${selected.has(f.id) ? 'bg-[#e8f3fc]' : 'bg-white hover:bg-[#f7fbfe]'}`}>
                    <td className="px-4 py-[21px]">
                      <input
                        type="checkbox"
                        checked={selected.has(f.id)}
                        disabled={f.isProtected}
                        onChange={() => toggleOne(f.id)}
                        className="h-[18px] w-[18px] cursor-pointer accent-[#0a7bc4] disabled:cursor-not-allowed disabled:opacity-30"
                      />
                    </td>
                    <td className="px-3"><TypeTile type={f.type} /></td>
                    <td className="px-3">
                      <div className="flex items-center gap-3">
                        <div className="min-w-0">
                          <p className="max-w-[330px] truncate text-[14px] font-semibold text-[#10283f]">{f.name}</p>
                          <p className="doc-mono max-w-[330px] truncate text-[11px] text-[#7c949a]">{f.file}</p>
                        </div>
                        {f.isProtected && (
                          <span className="group/p relative shrink-0">
                            <span className="doc-mono inline-flex items-center gap-1 rounded-full border border-[#d6e1ea] bg-[#f1f5f8] px-2.5 py-1 text-[10px] font-bold text-[#6b7f8f]">
                              <Lock size={10} /> Protected
                            </span>
                            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-max max-w-[190px] -translate-x-1/2 rounded-lg bg-[#5d6b7a] px-3 py-1.5 text-center text-[11px] leading-4 text-white group-hover/p:block">
                              {f.note}
                            </span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3"><DeptPill name={f.dept} /></td>
                    <td className="doc-mono px-3 text-[13px] font-bold text-[#10283f]">{f.sizeMb.toFixed(1)} MB</td>
                    <td className="doc-mono px-3 text-[12px] text-[#7c949a]">{f.opened}</td>
                    <td className="doc-mono px-3 text-[12px] text-[#7c949a]">{f.cited}</td>
                    <td className="px-3"><StatusPill status={f.status} /></td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination (67px band, 34px page buttons) */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-[#e0f0f9] px-6 py-1 text-[14px] text-[#7c949a]">
        <div className="flex items-center gap-5">
          <span>
            Showing <strong className="text-[#10283f]">{count === 0 ? 0 : `${start + 1}–${Math.min(start + perPage, count)}`}</strong> of <strong className="text-[#10283f]">{count}</strong> files
          </span>
          <label className="flex items-center gap-2">
            Show per page:
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(0); }}
              className="doc-mono h-8 w-[62px] cursor-pointer rounded-lg border border-[#cfe3f3] bg-white px-2 text-[13px] text-[#10283f] outline-none"
            >
              {PER_PAGE.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} className="h-[25px] cursor-pointer rounded-full bg-white px-3 text-[12px]  font-semibold text-[#10283f]  disabled:cursor-not-allowed disabled:opacity-60">
            ← Prev
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={`doc-mono h-[34px] w-[34px] cursor-pointer rounded-lg text-[14px] font-bold ${i === safePage ? 'bg-[#147aa5] text-white' : 'text-[#44596a] hover:bg-white'}`}
            >
              {i + 1}
            </button>
          ))}
          <button type="button" disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)} className="h-[25px] cursor-pointer rounded-full bg-white px-3 text-[12px] font-semibold text-[#10283f] disabled:cursor-not-allowed disabled:opacity-60">
            Next →
          </button>
        </div>
      </div>

      {customOpen && (
        <CustomThresholdModal
          initial={customVal ?? largeMin}
          onClose={() => setCustomOpen(false)}
          onApply={(mb) => {
            setLargeMin(mb);
            setCustomVal(mb);
            setCustomOpen(false);
            onToast(`Filtering files occupying > ${mb} MB`);
          }}
        />
      )}
    </section>
  );
}

export default FreeUpCard;







