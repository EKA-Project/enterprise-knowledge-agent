
import { useEffect, useRef, useState } from 'react';
import {
  Pencil,
  RefreshCw,
  Archive,
  ArchiveRestore,
  Trash2,
} from 'lucide-react';

// Admin-only "⋯" menu on the Summary header (matches Oct-20 video).
const Item = ({ label, onClick, danger, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
   className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-xs font-medium hover:bg-(--bg-surface-subtle) ${
  danger ? 'text-(--status-error)' : 'text-(--text-primary)'
}`}
  >
    <Icon size={14} />
    {label}
  </button>
);

export default function SummaryKebabMenu({
  circleClass = '',
  archived = false,
  onEdit,
  onReindex,
  onArchive,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;

    const click = (e) =>
      ref.current &&
      !ref.current.contains(e.target) &&
      setOpen(false);

    const key = (e) => e.key === 'Escape' && setOpen(false);

    document.addEventListener('mousedown', click);
    document.addEventListener('keydown', key);

    return () => {
      document.removeEventListener('mousedown', click);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const run = (fn) => () => {
    setOpen(false);
    fn?.();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="More actions"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${circleClass} text-(--text-primary)`}
      >
        <span className="flex gap-[3px]" aria-hidden="true">
          <span className="h-[4px] w-[4px] rounded-full bg-current" />
          <span className="h-[4px] w-[4px] rounded-full bg-current" />
          <span className="h-[4px] w-[4px] rounded-full bg-current" />
        </span>
      </button>

      {open && (
       <div className="absolute right-0 mt-2 w-52 p-1.5 rounded-xl border border-(--border) bg-(--bg-surface) shadow-lg z-30">
          <Item
            label="Edit Metadata"
            icon={Pencil}
            onClick={run(onEdit)}
          />

          <Item
            label="Re-index Vector Chunks"
            icon={RefreshCw}
            onClick={run(onReindex)}
          />

          <Item
            label={archived ? 'Unarchive Document' : 'Archive Document'}
            icon={archived ? ArchiveRestore : Archive}
            onClick={run(onArchive)}
          />

          <div className="my-1 border-t border-(--border)" />

          <Item
            label="Delete Document"
            icon={Trash2}
            onClick={run(onDelete)}
            danger
          />
        </div>
      )}
    </div>
  );
}
