import { useState } from 'react';
import { Building2, FileText } from 'lucide-react';
import { departments, formats, storageSummary } from './StorageData';
import '../../../styles/Document.css';

// Sizes measured on the real-size frame: card 1521 x 262.
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
  `inline-flex h-[25px] cursor-pointer items-center gap-1.5 rounded-full pl-[4px] pr-[6px] text-[11px] font-bold transition-colors ${
    on ? 'bg-[#0b6a9c] text-white shadow-sm' : 'text-[#44596a] hover:text-[#10283f]'
  }`;
const iconCircle = (on) =>
  `flex h-[16px] w-[17px] items-center justify-center rounded-full ${
    on ? 'bg-white/20 text-white' : 'bg-white text-[#44596a]'
  }`;
const badge = (on) =>
  `doc-mono rounded-full px-1 py-1 text-[9px] font-bold leading-none ${
    on ? 'bg-[#56a8ca] text-white' : 'bg-[#d4e5f2] text-[#7c949a]'
  }`;
  return (
    <section className="rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) px-[17px] pb-[9px] pt-[13px] shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-4">
            <span className="doc-mono text-[30px] font-bold leading-[40px] text-[#10283f]">{usedGb} GB</span>
            <span className="doc-mono text-[13px] font-bold text-[#7c949a]">of {totalGb} GB used</span>
            <span className="doc-mono inline-flex h-[20px] items-center rounded-full border border-[#bdeedb] bg-[#edfdf5] px-1 text-[11px] font-bold text-[#0f8f63]">
              {percent}% Capacity
            </span>
          </div>
          <p className="mt-1 text-[11px] font-bold text-[#7c949a]">
            {freeGb} GB free • Encrypted tenant storage pool • Auto-indexed into Milvus vector stores
          </p>
        </div>

        {/* Stat box (467 x 68) */}
        <div className="flex gap-x-5 rounded-2xl bg-[#e1f0fa] px-[12px] py-3">
          {[
            ['Total Documents', `${documents} Ingested`],
            ['Reclaimable Space', `${reclaimableGb} GB`],
            ['Recycle Bin', `${softDeleted} Soft-deleted`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="doc-mono text-[9px] uppercase leading-3 tracking-[0.001em] text-[#7c949a]">{label}</p>
              <p className="doc-mono mt-2 text-[12px] font-bold leading-3 text-[#10283f]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[15px] flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#7c949a]">Capacity Allocation</p>
          <h3 className="doc-heading mt-2 text-[14px] font-black leading-2 text-[#10283f]">
            {isDept ? 'Department Volume Distribution' : 'File Format Volume Distribution'}
          </h3>
        </div>
        <div className="inline-flex items-center gap-0.5 rounded-full border border-[#bfe0f3] bg-[#e6f3fb] p-0.5">
          <button type="button" onClick={() => onModeChange('dept')} className={toggleBtn(isDept)}>
            <span className={iconCircle(isDept)}><Building2 size={10} /></span>
            By Department <span className={badge(isDept)}>7 Depts</span>
          </button>
          <button type="button" onClick={() => onModeChange('format')} className={toggleBtn(!isDept)}>
            <span className={iconCircle(!isDept)}><FileText size={10} /></span>
            By File Format <span className={badge(!isDept)}>5 Types</span>
          </button>
        </div>
      </div>

      {/* Allocation bar: segment width = gb / 50 GB */}
      <div className="relative mt-[19px]">
        {tip && (
          <span
            className="doc-mono pointer-events-none absolute bottom-full z-10 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#10192b] px-2.5 py-1.5 text-[11px] font-semibold text-white"
            style={{ left: `${tip.x}%` }}
          >
            {tip.text}
          </span>
        )}
        <div className="flex h-3 overflow-hidden rounded-full bg-[#e1f0fa]">
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3eef7] pt-1.5 text-[10px] text-[#7c949a]">
        <span className="inline-flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[#2563eb]" />
          Allocated: <strong className="font-medium text-[#10283f]">{usedGb} GB</strong> ({percent}%) • Hover over bar
          segments to inspect telemetry • Click cards below to filter
        </span>
        <span className="doc-mono text-[10px]">
          Available: <strong className="text-[#10283f]">{freeGb} GB</strong> ({(100 - Number(percent)).toFixed(1)}%)
        </span>
      </div>
    </section>
  );
}

export default CapacityCard;



