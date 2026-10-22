import { useEffect } from 'react';
import { Trash2, X } from 'lucide-react';

// Delete confirmation (reference screenshot): red top edge, "Ingestion Purge Notice".
function DeleteModal({ doc, onClose, onConfirm }) {
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
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Delete Document"
        className="w-full max-w-[460px] overflow-hidden rounded-2xl border-t-4 border-t-red-600 bg-(--bg-surface) shadow-(--shadow-lg)"
      >
        <div className="flex items-start gap-3 px-6 pt-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fee2e3] text-red-600">
            <Trash2 size={18} />
          </span>
          <div className="flex-1">
            <h2 className="doc-heading text-lg font-bold text-(--text-primary)">Delete Document</h2>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7c949a]">Department Confirmation</p>
          </div>
          <button type="button" aria-label="Close dialog" onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#e1f0fa] text-(--text-secondary) transition-all duration-200 hover:rotate-90 hover:bg-red-50 hover:text-red-500 active:rotate-90">
            <X size={14} />
          </button>
        </div>

        <div className="space-y-3 px-6 py-4 text-sm text-(--text-secondary)">
          <p>
            Are you sure you want to delete{' '}
            <strong className="text-(--text-primary)">"{doc.title}"</strong>?
          </p>
          <div className="rounded-xl border border-[#cfe3f3] bg-[#e1f0fa] p-3 text-xs">
            <p className="font-bold text-red-600">⚠️ Ingestion Purge Notice:</p>
            <ul className="mt-1.5 space-y-1">
              <li>• Raw document file (<code className="doc-mono rounded bg-white/70 px-1">{doc.format}</code>, {doc.size}) will be deleted.</li>
              <li>• <strong className="text-(--text-primary)">{doc.chunks} vector chunks</strong> will be purged from the index.</li>
              <li>• AI grounded answers referencing this document will be invalidated.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 bg-[#e1f0fa] px-6 py-3">
          <button type="button" onClick={onClose} className="h-9 cursor-pointer rounded-full border border-[#cfe3f3] bg-white px-4 text-xs font-semibold text-(--text-primary)">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-5 text-xs font-bold text-white shadow-md hover:bg-red-700">
            <Trash2 size={13} /> Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;