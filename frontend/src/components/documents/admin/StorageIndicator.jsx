import { Save } from 'lucide-react';
import { documentStorage } from '../shared/DocumentData';

// Storage usage pill shown beside the "+ Ingest Document" button.
function StorageIndicator() {
  const { usedGb, totalGb } = documentStorage;
  const percent = ((usedGb / totalGb) * 100).toFixed(1); // 14.2 / 50 = 28.4

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-(--border-medium) bg-(--bg-surface) px-4 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-(--text-primary)">
        <Save size={16} />
      </span>

      <div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="font-semibold uppercase text-(--text-muted)">EKA Storage:</span>
          <span className="doc-mono font-semibold text-(--text-primary)">
            {usedGb} GB / {totalGb} GB
          </span>
          <span className="rounded-full border border-(--border-subtle) px-2 py-0.5 text-(--text-secondary)">
            {percent}% Capacity
          </span>
        </div>

        <div className="mt-1.5 h-1 w-full rounded-full bg-(--border-subtle)">
          <div
            className="h-full rounded-full bg-(--text-primary)"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default StorageIndicator;