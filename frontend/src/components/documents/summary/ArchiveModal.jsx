import { useEffect } from 'react';
import { Archive, X } from 'lucide-react';

// Archive / Unarchive confirm dialog (Oct-20 video). `archived` = current state.
function ArchiveModal({ title, archived, onClose, onConfirm }) {
  const verb = archived ? 'Unarchive' : 'Archive';
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1220]/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={`${verb} Document`}
        className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-(--bg-surface) shadow-(--shadow-lg)">
        <div className="flex items-start gap-3 px-6 pt-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--bg-surface-subtle) text-(--primary)">
            <Archive size={16} />
          </span>
          <div className="flex-1">
            <h2 className="doc-heading text-lg font-bold text-(--text-primary)">{verb} Document</h2>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-(--text-muted)">Department Management</p>
          </div>
          <button type="button" aria-label="Close dialog" onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#e1f0fa] text-(--text-secondary) transition-all duration-200 hover:rotate-90 hover:bg-red-50 hover:text-red-500 active:rotate-90">
            <X size={14} />
          </button>
        </div>

        <div className="space-y-3 px-6 py-4 text-sm text-(--text-secondary)">
          <p>Are you sure you want to {verb.toLowerCase()} <strong className="text-(--text-primary)">"{title}"</strong>?</p>
          <div className="rounded-xl bg-(--bg-surface-subtle) p-3 text-xs">
            <p className="font-semibold text-(--text-primary)">ℹ️ Department Repository Effect:</p>
            <p className="mt-0.5">
              {archived
                ? 'Unarchiving restores this document to active search retrieval and knowledge graphs.'
                : 'Archiving removes this document from active knowledge retrieval while preserving its historical record.'}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 bg-(--bg-surface-subtle) px-6 py-3">
          <button type="button" onClick={onClose}
            className="h-8 cursor-pointer rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 text-xs font-semibold text-(--text-primary)">
            Cancel
          </button>
          <button type="button" onClick={onConfirm}
            className="h-8 cursor-pointer rounded-full bg-(--primary) px-4 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover)">
            Confirm {verb}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchiveModal;