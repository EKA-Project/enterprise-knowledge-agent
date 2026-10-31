import { departments, formats } from './StorageData';
import { DeptIcon } from './StorageBits';
import '../../../styles/Document.css';

const FORMAT_TILE = {
  PDF: 'bg-[#fde2e1] text-[#d9373f]',
  DOCX: 'bg-[#e3ecfc] text-[#3b6fd4]',
  CSV: 'bg-[#dcf7ea] text-[#0f9d6b]',
  MD: 'bg-[#e6e9ff] text-[#5461d6]',
  TXT: 'bg-[#eef1f4] text-[#6b7f8f]',
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
    color: '#1381b7',
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
          className={`flex h-[144px] cursor-pointer flex-col rounded-[20px] border-2 border-t-[4px] bg-white p-[12px] text-left transition-colors ${
              isActive ? 'border-[#1b79a8] shadow-[0_0_0_3px_rgba(27,121,168,0.12)]' : isLinked ? '' : 'border-[#e8f1f8] hover:border-[#bcd8ee]'
            }`}
          >
            <div className="flex items-center justify-between">
              {isAll ? (
                <span className="doc-mono rounded-md border border-[#cfe3f3] bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#10283f]">
                  {c.tag}
                </span>
              ) : isDept ? (
                <span className="flex h-6 w-6 items-center justify-center rounded " style={{ color: c.color, backgroundColor: `${c.color}1f` }}>
                  <DeptIcon name={c.key} size={10} />
                </span>
              ) : (
                <span className={`doc-mono inline-flex h-7 items-center rounded-md px-3 text-[11px] font-bold uppercase ${FORMAT_TILE[c.key]}`}>
                  {c.key}
                </span>
              )}
              <span className={`doc-mono text-[9px] rounded-md bg-[#eef4f9] px-2 py-0.5 text-[#7c949a] ${!isAll && isDept ? 'rounded-md bg-[#eef4f9] px-2 py-0.5' : ''}`}>
                {isAll ? c.count : isDept ? `${c.docs} ${c.docs === 1 ? 'doc' : 'docs'}` : `${c.files} files`}
              </span>
            </div>

            <p className="mt-3 text-[10px] font-semibold text-[#10283f]">{isAll || isDept ? c.name ?? c.key : c.label}</p>

            <div className="mt-1 flex items-end justify-between">
              <span className="doc-mono text-[20px] font-black leading-9 text-[#10283f]">
                {c.gb.toFixed(1)}
                <span className="ml-1 text-[11px] font-black text-[#7c949a]">GB</span>
              </span>
              <span
                className="doc-mono mb-1 rounded-md px-2 py-0.5 text-[9px] font-black"
                style={isAll ? { color: '#1b79a8', backgroundColor: '#e1f0fa' } : { color: c.color, backgroundColor: `${c.color}1f` }}
              >
                {c.share}%
              </span>
            </div>

            <div className="mt-2.5 h-1 rounded-full bg-[#e8f0f6]">
              <div className="h-full rounded-full" style={{ width: `${c.share}%`, backgroundColor: c.color }} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default AllocationCards;