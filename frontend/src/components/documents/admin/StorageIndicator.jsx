import { Save, ExternalLink } from 'lucide-react';
import { documentStorage } from '../shared/DocumentData';
import { Link } from 'react-router-dom';


// Storage pill beside the header buttons (reference screenshot, measured 1:1).
function StorageIndicator() {
  const { usedGb, totalGb } = documentStorage;
  const percent = (usedGb / totalGb) * 100; // 14.2 / 50 -> 28.4

  return (
    <div className="flex items-center gap-3.5 rounded-[28px] border border-[#cfe3f3] bg-[#e1f0fa] px-[18px] py-[10px]">
      {/* Icon tile 38px */}
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-[#dff3e8] text-[#8a3a8f]">
        <Save size={16} />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[13px] font-medium uppercase text-[#7c949a]">EKA Storage:</span>
          <span className="doc-mono text-[13.5px] font-bold text-(--text-primary)">
            {usedGb} GB / {totalGb} GB
          </span>
          <span className="rounded-full border border-[#bdeedb] bg-white/80 px-3 py-[3px] text-xs font-semibold text-[#0f8f63]">
            {percent.toFixed(1)}% Capacity
          </span>
          {/* Not wired yet: storage management page comes later */}
          <button
            type="button"
            className="doc-mono ml-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#bcd8ee] bg-[#cfe3f3] px-3 py-[3px] text-xs font-semibold text-[#1f718e] transition-colors hover:bg-[#bcd8ee]"
          >
            Manage <ExternalLink size={12} />
          </button>
        </div>

        {/* Usage bar: 211px track, 4px tall */}
        <div className="mt-1.5 h-1 w-[211px] max-w-full rounded-full bg-white/70">
          <div className="h-full rounded-full bg-(--primary)" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

export default StorageIndicator;