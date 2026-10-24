import { Save, ExternalLink } from 'lucide-react';
import { documentStorage } from '../shared/DocumentData';

// Storage pill beside the header buttons (reference screenshot):
// floppy tile, "EKA STORAGE: used / total", capacity pill, Manage pill, bar below.
function StorageIndicator() {
  const { usedGb, totalGb } = documentStorage;
  const percent = (usedGb / totalGb) * 100; // 14.2 / 50 -> 28.4

  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-[#cfe3f3] bg-[#e1f0fa] px-3 py-2">
      {/* Icon tile */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dff3e8] text-[#8a3a8f]">
        <Save size={14} />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium uppercase text-[#7c949a]">EKA Storage:</span>
          <span className="doc-mono text-[11px] font-bold text-(--text-primary)">
            {usedGb} GB / {totalGb} GB
          </span>
          <span className="rounded-full border border-[#bdeedb] bg-[#edfdf7] px-2 py-0.5 text-[10px] font-semibold text-[#0f8f63]">
            {percent.toFixed(1)}% Capacity
          </span>
          {/* Not wired yet: storage management page comes later */}
          <button
            type="button"
            className="doc-mono inline-flex cursor-pointer items-center gap-1 rounded-full bg-[#cfe3f3] px-2 py-0.5 text-[10px] font-semibold text-[#1f718e] transition-colors hover:bg-[#bcd8ee]"
          >
            Manage <ExternalLink size={10} />
          </button>
        </div>

        {/* Usage bar */}
        <div className="mt-1.5 h-1 w-[210px] max-w-full rounded-full bg-white/70">
          <div className="h-full rounded-full bg-(--primary)" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

export default StorageIndicator;