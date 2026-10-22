import { useEffect, useRef, useState } from 'react';

// Admin-only "⋯" menu on the Summary header (matches Oct-20 video).
const Item = ({ label, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium hover:bg-[#e0eef7] ${
      danger ? 'text-red-600' : 'text-(--text-primary)'
    }`}
  >
    {label}
  </button>
);

export default function SummaryKebabMenu({ onEdit, onReindex, onArchive, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const click = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', click);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', click);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const run = (fn) => () => { setOpen(false); fn?.(); };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="More actions"
        onClick={() => setOpen((o) => !o)}
       className="w-9 h-9 rounded-full bg-white grid place-items-center hover:bg-[#e1f0fa]"
      >
        <span className="flex gap-[3px]" aria-hidden="true">
          <span className="h-[4px] w-[4px] rounded-full bg-(--text-primary)" />
          <span className="h-[4px] w-[4px] rounded-full bg-(--text-primary)" />
          <span className="h-[4px] w-[4px] rounded-full bg-(--text-primary)" />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 p-1.5 rounded-xl border border-(--border) bg-white shadow-lg z-30">
          <Item label="Edit Metadata" onClick={run(onEdit)} />
          <Item label="Re-index Vector Chunks" onClick={run(onReindex)} />
          <Item label="Archive Document" onClick={run(onArchive)} />
          <div className="my-1 border-t border-(--border)" />
          <Item label="Delete Document" onClick={run(onDelete)} danger />
        </div>
      )}
    </div>
  );
}