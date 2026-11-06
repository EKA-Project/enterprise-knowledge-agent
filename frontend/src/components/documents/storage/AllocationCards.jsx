
import { departments, formats } from './StorageData';
import { DeptIcon } from './StorageBits';
import '../../../styles/Document.css';

const FORMAT_TILE = {
  PDF: 'bg-(--status-danger-bg) text-(--status-danger)',
  DOCX: 'bg-(--status-info-bg) text-(--status-info)',
  CSV: 'bg-(--status-success-bg) text-(--status-success)',
  MD: 'bg-(--primary-light) text-(--primary)',
  TXT: 'bg-(--bg-surface-subtle) text-(--text-secondary)',
};

// Department / format cards under the capacity card. Click = filter the Free up space table.
function AllocationCards({ mode, active, hoveredKey, usedGb, documents, onSelect, onHover }) {
  const isDept = mode === 'dept';
  const all = {
    key: 'ALL',
    tag: isDept ? 'All Departments' : 'All Formats',
    count: `${documents} total`,
    name: isDept ? 'All Enterprise Departments' : 'All Indexed Formats',
    gb: Number(usedGb),
    share: 100,
    color: 'var(--primary)',
  };
  const cards = [all, ...(isDept ? departments : formats)];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => {
        const isAll = c.key === 'ALL';
        const isActive = active === c.key;
        const isLinked = hoveredKey === c.key && !isActive;

        return (
          <button
            key={c.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(c.key)}
            onMouseEnter={() => onHover(isAll ? null : c.key)}
            onMouseLeave={() => onHover(null)}
            style={isLinked ? { borderColor: c.color } : undefined}
            className={`flex h-[144px] cursor-pointer flex-col rounded-[20px] border-2 border-t-[4px] bg-(--bg-surface) p-[12px] text-left transition-colors ${
              isActive
                ? 'border-(--primary) shadow-(--shadow-md)'
                : isLinked
                  ? ''
                  : 'border-(--border-subtle) hover:border-(--border-medium)'
            }`}
          >
            <div className="flex items-center justify-between">
              {isAll ? (
                <span className="doc-mono rounded-md border border-(--border-medium) bg-(--bg-surface) px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-(--text-primary)">
                  {c.tag}
                </span>
              ) : isDept ? (
                <span
                  className="flex h-6 w-6 items-center justify-center rounded"
                  style={{ color: c.color, backgroundColor: `${c.color}1f` }}
                >
                  <DeptIcon name={c.key} size={10} />
                </span>
              ) : (
                <span className={`doc-mono inline-flex h-7 items-center rounded-md px-3 text-[11px] font-bold uppercase ${FORMAT_TILE[c.key] ?? 'bg-(--bg-surface-subtle) text-(--text-secondary)'}`}>
                  {c.key}
                </span>
              )}

              <span className="doc-mono rounded-md bg-(--bg-surface-subtle) px-2 py-0.5 text-[9px] text-(--text-muted)">
                {isAll ? c.count : isDept ? `${c.docs} ${c.docs === 1 ? 'doc' : 'docs'}` : `${c.files} files`}
              </span>
            </div>

            <p className="mt-3 text-[10px] font-semibold text-(--text-primary)">
              {isAll || isDept ? c.name ?? c.key : c.label}
            </p>

            <div className="mt-1 flex items-end justify-between">
              <span className="doc-mono text-[20px] font-black leading-9 text-(--text-primary)">
                {c.gb.toFixed(1)}
                <span className="ml-1 text-[11px] font-black text-(--text-muted)">GB</span>
              </span>

              <span
                className="doc-mono mb-1 rounded-md px-2 py-0.5 text-[9px] font-black"
                style={
                  isAll
                    ? { color: 'var(--primary)', backgroundColor: 'var(--primary-light)' }
                    : { color: c.color, backgroundColor: `${c.color}1f` }
                }
              >
                {c.share}%
              </span>
            </div>

            <div className="mt-2.5 h-1 rounded-full bg-(--bg-surface-subtle)">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.share}%`, backgroundColor: c.color }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default AllocationCards;
