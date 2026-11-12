import { Save, ExternalLink } from 'lucide-react';
import { documentStorage } from '../shared/DocumentData';
import { Link } from 'react-router-dom';

// Storage pill beside the header buttons. The whole pill opens Storage Management.
// Every colour, radius, shadow and font size comes from the theme variables.
function StorageIndicator() {
  const { usedGb, totalGb } = documentStorage;
  const percent = (usedGb / totalGb) * 100;

  return (
    <Link
      to="/documents/storage"
      aria-label="Manage storage"
      className="group flex cursor-pointer items-center gap-3 rounded-(--radius-lg) border border-(--border-medium) bg-(--bg-surface-subtle) px-3 py-2 shadow-(--shadow-xs) transition-[background-color,border-color,box-shadow] duration-200 hover:border-(--primary) hover:bg-(--bg-surface) hover:shadow-(--shadow-md)"
    >
      {/* [2] Icon box */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-sm) bg-(--badge-bg) text-(--badge-text)">
        <Save size={14} />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {/* [3] Label + metric */}
          <span className="font-(family-name:--font-sans) text-(length:--font-size-sm) font-medium uppercase text-(--text-muted)">
            EKA Storage:
          </span>

          <span className="font-(family-name:--font-mono) text-(length:--font-size-sm) font-bold text-(--text-primary)">
            {usedGb} GB / {totalGb} GB
          </span>

          {/* [4] Capacity badge */}
          <span className="inline-flex items-center rounded-(--radius-pill) border border-(--badge-border) bg-(--badge-bg) px-2.5 py-0.5 text-(length:--font-size-badge) font-semibold text-(--badge-text)">
            {percent.toFixed(1)}% Capacity
          </span>

          {/* [5] Manage pill: looks like a button, the whole capsule is the link */}
          <span className="ml-1.5 inline-flex items-center gap-1.5 rounded-(--radius-pill) border border-(--border-medium) px-3 py-[3px] font-(family-name:--font-mono) text-(length:--font-size-2xs) font-semibold text-(--primary) transition-colors duration-200 group-hover:border-(--primary) group-hover:bg-(--primary) group-hover:text-(--primary-contrast)">
            Manage <ExternalLink size={12} />
          </span>
        </div>

        {/* [6] Progress track + bar */}
        <div className="mt-1.5 h-1 w-[210px] max-w-full rounded-(--radius-pill) bg-(--border-subtle)">
          <div
            className="h-full rounded-(--radius-pill) bg-(--primary)"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

export default StorageIndicator;