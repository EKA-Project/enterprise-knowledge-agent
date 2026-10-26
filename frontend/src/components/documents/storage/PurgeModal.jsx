import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { formatMb } from './StorageData';
import '../../../styles/Document.css';

// Purge needs the user to type DELETE first.
function PurgeModal({ count, sizeMb, onClose, onConfirm }) {
  const [text, setText] = useState('');
  const ok = text === 'DELETE';

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (ok) onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#10192b]/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] rounded-[24px] bg-white p-7 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffe2e1] text-[#d9373f]">
            <AlertTriangle size={20} />
          </span>
          <button
            type="button"
            onClick={onClose}
            className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#e1f0fa] text-[#7c949a] transition-colors duration-200 hover:bg-[#ffe2e1] hover:text-[#d9373f]"
          >
            <X size={14} className="transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        <h3 className="mt-4 text-[20px] font-bold text-[#10283f]">Purge permanently?</h3>
        <p className="mt-2 text-[14px] leading-6 text-[#44596a]">
          {count} {count === 1 ? 'file' : 'files'} ({formatMb(sizeMb)}) will be deleted forever,
          including their vector embeddings. This cannot be undone.
        </p>

        <label className="mt-5 block text-[13px] text-[#7c949a]">
          Type <strong className="doc-mono text-[#d9373f]">DELETE</strong> to confirm
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="doc-mono mt-2 h-11 w-full rounded-xl border border-[#cfe3f3] bg-[#f4f9fd] px-4 text-[14px] text-[#10283f] outline-none focus:border-[#e5484d]"
          />
        </label>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 cursor-pointer rounded-full border border-[#cfe3f3] px-5 text-[13px] font-semibold text-[#10283f] hover:bg-[#e1f0fa]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!ok}
            className="h-10 cursor-pointer rounded-full bg-[#e5484d] px-6 text-[13px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Purge Permanently
          </button>
        </div>
      </form>
    </div>
  );
}

export default PurgeModal;