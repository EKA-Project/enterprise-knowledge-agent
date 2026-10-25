import { useState } from 'react';
import { storageSummary, storageFormats } from './StorageData';
import '../../../styles/Document.css';

// Capacity card: big number, stat box, segmented usage bar (hover = tooltip + dim others), legend.
// `hoveredKey` is shared with the format cards so the matching card lights up too.
function CapacityCard({ hoveredKey, onHover }) {
  const { usedGb, totalGb, freeGb, documents, reclaimableGb, softDeleted } = storageSummary;
  const percent = ((usedGb / totalGb) * 100).toFixed(1); // 28.6
  const [tip, setTip] = useState(null); // { key, x } tooltip position (% of bar)

  const showTip = (key, centerPct) => {
    onHover(key);
    setTip({ key, x: centerPct });
  };
  const hideTip = () => {
    onHover(null);
    setTip(null);
  };

  // Left edge + width of each segment as % of the 50 GB pool
  let left = 0;
  const segments = storageFormats.map((f) => {
    const width = (f.gb / totalGb) * 100;
    const seg = { ...f, width, center: left + width / 2 };
    left += width;
    return seg;
  });
  const tipFormat = tip && storageFormats.find((f) => f.key === tip.key);

  return (
    <section className="rounded-[28px] border border-(--border-subtle) bg-(--bg-surface) px-10 py-7 shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="doc-mono text-[46px] font-bold leading-none text-[#10283f]">
              {usedGb} GB
            </span>
            <span className="doc-mono text-[22px] text-[#7c949a]">of {totalGb} GB used</span>
            <span className="doc-mono rounded-full border border-[#bdeedb] bg-[#edfdf3] px-3 py-1 text-[12px] font-semibold text-[#0f8f63]">
              {percent}% Capacity
            </span>
          </div>
          <p className="mt-3 text-[13px] text-[#7c949a]">
            {freeGb} GB free • Encrypted tenant storage pool • Auto-indexed into Milvus vector stores
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-9 rounded-2xl bg-[#e1f0fa] px-6 py-4">
          {[
            ['Total Documents', `${documents} Ingested`],
            ['Reclaimable Space', `${reclaimableGb} GB`],
            ['Recycle Bin', `${softDeleted} Soft-deleted`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="doc-mono text-[10px] uppercase tracking-[0.14em] text-[#7c949a]">
                {label}
              </p>
              <p className="doc-mono mt-1.5 text-[15px] font-bold text-[#10283f]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage bar: width of each segment = format size / 50 GB */}
      <div className="relative mt-6">
        {tipFormat && (
          <span
            className="doc-mono pointer-events-none absolute bottom-full z-10 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#10192b] px-2.5 py-1.5 text-[11px] font-semibold text-white"
            style={{ left: `${tip.x}%` }}
          >
            {tipFormat.key}: {tipFormat.gb} GB ({tipFormat.share}% of used space)
          </span>
        )}
        <div className="flex h-7 overflow-hidden rounded-full bg-[#e1f0fa]">
          {segments.map((s) => (
            <div
              key={s.key}
              onMouseEnter={() => showTip(s.key, s.center)}
              onMouseLeave={hideTip}
              className="h-full cursor-pointer transition-opacity duration-150"
              style={{
                width: `${s.width}%`,
                backgroundColor: s.color,
                opacity: hoveredKey && hoveredKey !== s.key ? 0.3 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        {storageFormats.map((f) => (
          <span
            key={f.key}
            onMouseEnter={() => onHover(f.key)}
            onMouseLeave={() => onHover(null)}
            className={`doc-mono inline-flex cursor-default items-center gap-2 rounded-full border px-2.5 py-0.5 text-[12px] transition-colors ${
              hoveredKey === f.key
                ? 'border-[#cfe3f3] bg-[#e1f0fa]'
                : 'border-transparent'
            }`}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: f.color }} />
            <strong className="font-bold text-[#10283f]">{f.key}</strong>
            <span className="text-[#7c949a]">
              {f.gb} GB ({f.share}%)
            </span>
          </span>
        ))}
        <span className="doc-mono ml-auto inline-flex items-center gap-2 text-[12px] text-[#7c949a]">
          <span className="h-2 w-2 rounded-full bg-[#bcd8ee]" />
          Free Space {freeGb} GB
        </span>
      </div>
    </section>
  );
}

export default CapacityCard;