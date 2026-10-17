import { Database } from 'lucide-react';
import { documentStorage } from '../shared/DocumentData';



// Ring geometry (SVG viewBox is 40 x 40)
const RADIUS = 16;
const STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Round storage pill shown beside the header buttons:
// progress ring around an icon, then "STORAGE · 14.2GB" and "28% of 50GB used".
function StorageIndicator() {
  const { usedGb, totalGb } = documentStorage;
  const percent = Math.round((usedGb / totalGb) * 100); // 14.2 / 50 -> 28
  const arc = (percent / 100) * CIRCUMFERENCE;
  
  return (
    <div className="flex items-center gap-3 rounded-full border border-(--border-subtle) bg-(--bg-surface) py-1 pl-1 pr-5">
      <div className="relative h-8 w-8 shrink-0">
        <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden="true">
          {/* track */}
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            style={{ stroke: 'var(--border-subtle)' }}
          />
          {/* used share */}
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${CIRCUMFERENCE - arc}`}
            style={{ stroke: 'var(--primary)' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-(--text-primary)">
          <Database size={12} />
        </span>
      </div>

      <div className="doc-mono leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-(--text-muted)">
          Storage · <span className="text-(--text-primary)">{usedGb}GB</span>
        </p>
        <p className="text-[9px] text-(--text-muted)">
          {percent}% of {totalGb}GB used
        </p>
      </div>
    </div>
  );
}

export default StorageIndicator;