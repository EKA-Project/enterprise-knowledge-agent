import { storageSummary, storageFormats } from './StorageData';
import '../../../styles/Document.css';

const allCard = {
  key: 'ALL',
  gb: storageSummary.usedGb,
  files: storageSummary.documents,
  share: 100,
  color: '#1381b7',
  tile: 'border border-[#cfe3f3] bg-white text-[#10283f]',
};

// Six format cards (240 x 136, gap 16). `active` = selected card (ALL by default),
// `hoveredKey` = linked to the usage bar hover.
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
            className={`flex h-[13px] cursor-pointer flex-col rounded-[18px] border-2 px-5 py-5 text-left transition-colors ${
              isActive
                ? 'border-[#1b79a8] bg-[#e0f1fd]'
                : isLinked
                  ? 'border-[#7fc3e0] bg-white'
                  : 'border-[#e8f1f8] bg-white hover:border-[#bcd8ee]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`doc-mono inline-flex h-7 items-center rounded-md px-3 text-[12px] font-bold uppercase ${c.tile}`}
              >
                {c.key === 'ALL' ? 'All Formats' : c.key}
              </span>
              <span className="doc-mono text-[13px] text-[#7c949a]">
                {c.key === 'ALL' ? `${c.files} total` : `${c.files} files`}
              </span>
            </div>

            <div className="mt-[15px] flex items-baseline justify-between">
              <span className="doc-mono text-[25px] font-bold leading-[30px] text-[#10283f]">
                {c.gb} GB
              </span>
              <span className="doc-mono text-[12px] text-[#7c949a]">{c.share}%</span>
            </div>

            <div className="mt-auto h-1.5 rounded-full bg-[#e1f0fa]">
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