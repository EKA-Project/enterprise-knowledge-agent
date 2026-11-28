// EKA-EDIT: StorageData removed. Items come from buildAllocation (same source as CapacityCard).
import { DeptIcon } from './StorageBits';
import { buildAllocation } from './storageAllocation.js';
import { formatFileSize } from '../../../utils/formatFileSize.js';
import '../../../styles/Document.css';

const FORMAT_TILE = {
  pdf: 'bg-(--status-danger-bg) text-(--status-danger)',
  docx: 'bg-(--status-info-bg) text-(--status-info)',
  csv: 'bg-(--status-success-bg) text-(--status-success)',
  md: 'bg-(--primary-light) text-(--primary)',
  txt: 'bg-(--bg-surface-subtle) text-(--text-secondary)',
};

// Department / format cards under the capacity card. Click = filter the Free up space table.
// EKA-EDIT: props are summary + departmentsById. Card key = departmentId or format enum.
function AllocationCards({ summary, departmentsById, mode, active, hoveredKey, onSelect, onHover }) {
  const isDept = mode === 'dept';
  const documents = summary?.documentCount ?? 0;

  const all = {
    key: 'ALL',
    tag: isDept ? 'All Departments' : 'All Formats',
    count: `${documents} total`,
    name: isDept ? 'All Enterprise Departments' : 'All Indexed Formats',
    sizeBytes: summary?.usedBytes ?? 0,
    share: 100,
    color: 'var(--primary)',
    softBg: 'var(--primary-light)',
  };
  const cards = [all, ...buildAllocation(summary, departmentsById, mode)];

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
                // EKA-EDIT: softBg replaces `${color}1f` (color is a CSS var now)
                <span
                  className="flex h-6 w-6 items-center justify-center rounded"
                  style={{ color: c.color, backgroundColor: c.softBg }}
                >
                  <DeptIcon department={c.department} size={10} />
                </span>
              ) : (
                <span className={`doc-mono inline-flex h-7 items-center rounded-md px-3 text-[11px] font-bold uppercase ${FORMAT_TILE[c.key] ?? 'bg-(--bg-surface-subtle) text-(--text-secondary)'}`}>
                  {c.key}
                </span>
              )}

              <span className="doc-mono rounded-md bg-(--bg-surface-subtle) px-2 py-0.5 text-[9px] text-(--text-muted)">
                {isAll
                  ? c.count
                  : isDept
                    ? `${c.count} ${c.count === 1 ? 'doc' : 'docs'}`
                    : `${c.count} ${c.count === 1 ? 'file' : 'files'}`}
              </span>
            </div>

            <p className="mt-3 text-[10px] font-semibold text-(--text-primary)">{c.name}</p>

            <div className="mt-1 flex items-end justify-between">
              {/* EKA-EDIT: size via formatFileSize ("2.4 MB"), one span */}
              <span className="doc-mono text-[20px] font-black leading-9 text-(--text-primary)">
                {formatFileSize(c.sizeBytes)}
              </span>

              <span
                className="doc-mono mb-1 rounded-md px-2 py-0.5 text-[9px] font-black"
                style={{ color: c.color, backgroundColor: c.softBg }}
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