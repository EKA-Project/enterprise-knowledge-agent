
import { Save, ExternalLink } from 'lucide-react';
import { documentStorage } from '../shared/DocumentData';
import { Link } from 'react-router-dom';
import Badge from '../../common/Badge.jsx';

// Storage pill beside the header buttons.
function StorageIndicator() {
  const { usedGb, totalGb } = documentStorage;
  const percent = (usedGb / totalGb) * 100;

  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-(--border-subtle) bg-(--bg-surface) px-3 py-2">
      {/* Icon tile */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
        <Save size={14} />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium uppercase text-(--text-muted)">
            EKA Storage:
          </span>

          <span className="doc-mono text-[11px] font-bold text-(--text-primary)">
            {usedGb} GB / {totalGb} GB
          </span>

<Badge
  text={`${percent.toFixed(1)}% Capacity`}
  type="success"
  size="sm"
/>

          {/* Not wired yet: storage management page comes later */}
          <Link
            to="/documents/storage"
            className="doc-mono ml-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-(--border-subtle) bg-(--primary-light) px-3 py-[3px] text-xs font-semibold text-(--primary) transition-colors hover:bg-(--primary-hover) hover:text-(--primary-contrast)"
          >
            Manage <ExternalLink size={12} />
          </Link>
        </div>

        {/* Usage bar */}
        <div className="mt-1.5 h-1 w-[210px] max-w-full rounded-full bg-(--bg-surface-subtle)">
          <div
            className="h-full rounded-full bg-(--primary)"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default StorageIndicator;
