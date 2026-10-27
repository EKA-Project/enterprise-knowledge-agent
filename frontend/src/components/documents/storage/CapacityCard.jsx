import { useState } from 'react';
import { FileText, Landmark } from 'lucide-react';
import { departments, formats, storageSummary } from './StorageData';
import '../../../styles/Document.css';

// Capacity card: big number, stat box, department/format toggle, allocation bar, footer.
function CapacityCard({ summary, mode, onModeChange, hoveredKey, onHover }) {
  const { usedMb, documents, reclaimableGb, softDeleted } = summary;
  const totalGb = storageSummary.totalGb;
  const usedGb = (usedMb / 1000).toFixed(1);
  const freeGb = ((totalGb * 1000 - usedMb) / 1000).toFixed(1);
  const percent = ((usedMb / (totalGb * 1000)) * 100).toFixed(1);
  const isDept = mode === 'dept';
  const items = isDept ? departments : formats;
  const [tip, setTip] = useState(null); // { text, x }

  let left = 0;
  const segments = items.map((f) => {
    const width = (f.gb / totalGb) * 100;
    const seg = { ...f, width, center: left + width / 2 };
    left += width;
    return seg;
  });
  const freeCenter = left + (100 - left) / 2;

  const show = (key, text, x) => {
    onHover(key);
    setTip({ text, x });
  };
  const hide = () => {
    onHover(null);
    setTip(null);
  };

  const toggleBtn = (on) =>
    `inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition-colors ${
      on ? 'bg-[#0b6fa4] text-white shadow-sm' : 'text-[#6b8296] hover:text-[#10283f]'
    }`;
  const badge = (on) =>
    `doc-mono rounded-full px-2 py-0.5 text-[10px] font-bold ${on ? 'bg-white/20 text-white' : 'bg-[#d4e5f2] text-[#7c949a]'}`;

  return (
    <section className="rounded-[24px] border border-(--border-subtle) bg-(--bg-surface) px-7 py-[22px] shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="doc-mono text-[40px] font-bold leading-none text-[#10283f]">{usedGb} GB</span>
            <span className="doc-mono text-[22px] text-[#7c949a]">of {totalGb} GB used</span>
            <span className="doc-mono inline-flex h-[29px] items-center rounded-full border border-[#bdeedb] bg-[#edfdf5] px-4 text-[12px] font-semibold text-[#0f8f63]">
              {percent}% Capacity
            </span>
          </div>
          <p className="mt-3 text-[13.5px] font-light text-[#7c949a]">
            {freeGb} GB free • Encrypted tenant storage pool • Auto-indexed into Milvus vector stores
          </p>
        </div>

        {/* Stat box (~467 x 70) */}
        <div className="grid grid-cols-3 gap-x-9 rounded-2xl bg-[#e1f0fa] px-6 py-3">
          {[
            ['Total Documents', `${documents} Ingested`],
            ['Reclaimable Space', `${reclaimableGb} GB`],
            ['Recycle Bin', `${softDeleted} Soft-deleted`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="doc-mono text-[9px] uppercase leading-3 tracking-[0.14em] text-[#7c949a]">{label}</p>
              <p className="doc-mono mt-2 text-[17px] font-bold leading-6 text-[#10283f]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="doc-mono text-[9px] uppercase tracking-[0.14em] text-[#7c949a]">Capacity Allocation</p>
          <h3 className="doc-heading mt-1 text-[18px] font-black leading-6 text-[#10283f]">
            {isDept ? 'Department Volume Distribution' : 'File Format Volume Distribution'}
          </h3>
        </div>
        <div className="inline-flex items-center rounded-full bg-[#e3f0fa] p-1">
          <button type="button" onClick={() => onModeChange('dept')} className={toggleBtn(isDept)}>
            <Landmark size={14} /> By Department <span className={badge(isDept)}>7 Depts</span>
          </button>
          <button type="button" onClick={() => onModeChange('format')} className={toggleBtn(!isDept)}>
            <FileText size={14} /> By File Format <span className={badge(!isDept)}>5 Types</span>
          </button>
        </div>
      </div>

      {/* Allocation bar: segment width = gb / 50 GB */}
      <div className="relative mt-4">
        {tip && (
          <span
            className="doc-mono pointer-events-none absolute bottom-full z-10 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#10192b] px-2.5 py-1.5 text-[11px] font-semibold text-white"
            style={{ left: `${tip.x}%` }}
          >
            {tip.text}
          </span>
        )}
        <div className="flex h-5 overflow-hidden rounded-full bg-[#e1f0fa]">
          {segments.map((s) => (
            <div
              key={s.key}
              onMouseEnter={() => show(s.key, `${s.key}: ${s.gb} GB (${s.share}% of used space)`, s.center)}
              onMouseLeave={hide}
              className="h-full cursor-pointer transition-opacity duration-150"
              style={{
                width: `${s.width}%`,
                backgroundColor: s.color,
                opacity: hoveredKey && hoveredKey !== s.key ? 0.3 : 1,
              }}
            />
          ))}
          <div
            className="h-full flex-1"
            onMouseEnter={() => show('FREE', `Free Space: ${freeGb} GB`, freeCenter)}
            onMouseLeave={hide}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3eef7] pt-3.5 text-[12px] text-[#7c949a]">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
          Allocated: <strong className="font-semibold text-[#10283f]">{usedGb} GB</strong> ({percent}%) • Hover over bar
          segments to inspect telemetry • Click cards below to filter
        </span>
        <span className="doc-mono">
          Available: <strong className="text-[#10283f]">{freeGb} GB</strong> ({(100 - Number(percent)).toFixed(1)}%)
        </span>
      </div>
    </section>
  );
}

export default CapacityCard;




