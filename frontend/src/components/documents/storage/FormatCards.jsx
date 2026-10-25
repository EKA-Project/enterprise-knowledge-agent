import { storageSummary, storageFormats } from './StorageData';
import '../../../styles/Document.css';

const allCard = {
  key: 'ALL',
  label: 'All Formats',
  gb: storageSummary.usedGb,
  files: storageSummary.documents,
  share: 100,
  color: '#1b79a8',
  tile: 'bg-white text-[#10283f] border border-[#cfe3f3]',
};

// Six format cards. `active` = selected card (ALL by default), `hoveredKey` = linked to bar hover.
function FormatCards({ active, hoveredKey, onSelect, onHover }) {
  const cards = [allCard, ...storageFormats];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((c) => {
        const isActive = active === c.key;
        const isLinked = hoveredKey === c.key;
        return (
          <button
            key={c.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(c.key)}
            onMouseEnter={() => onHover(c.key === 'ALL' ? null : c.key)}
            onMouseLeave={() => onHover(null)}
            className={`flex h-[145px] cursor-pointer flex-col rounded-[18px] border-2 bg-white px-5 py-4 text-left transition-colors ${
              isActive
                ? 'border-[#1b79a8] shadow-[0_0_0_3px_rgba(31,113,142,0.15)]'
                : isLinked
                  ? 'border-[#7fc3e0]'
                  : 'border-[#e3eef7] hover:border-[#bcd8ee]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`doc-mono rounded-md px-2 py-0.5 text-[11px] font-bold uppercase ${c.tile}`}
              >
                {c.key === 'ALL' ? 'All Formats' : c.key}
              </span>
              <span className="doc-mono text-[11px] text-[#7c949a]">
                {c.key === 'ALL' ? `${c.files} total` : `${c.files} files`}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="doc-mono text-[24px] font-bold leading-none text-[#10283f]">
                {c.gb} GB
              </span>
              <span className="doc-mono text-[11px] text-[#7c949a]">
                {c.key === 'ALL' ? '100%' : `${c.share}%`}
              </span>
            </div>

            <div className="mt-auto h-1 rounded-full bg-[#e1f0fa]">
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

export default FormatCards;