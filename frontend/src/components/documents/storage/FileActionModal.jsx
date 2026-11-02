import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { TypeTile } from './StorageBits';
import '../../../styles/Document.css';

// Two-tone flame (red outer, orange inner) for the purge modal
function FlameIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        fill="#e11d2e"
      />
      <path
        d="M12 21a4 4 0 0 0 4-4c0-1.5-1-2.5-2-3.5-.4 1-1.2 1.5-2 1.5-.9 0-1.5-.6-1.5-1.5C9 14 8 15.5 8 17a4 4 0 0 0 4 4z"
        fill="#f59e0b"
      />
    </svg>
  );
}

// variant "recycle" = Stage 1 (move to bin), "purge" = permanent delete (type DELETE).
// Sizes measured on the reference video frame (modal 650 x ~527). [zoom:0.8] = 125% display scaling.
function FileActionModal({ variant, files, onClose, onConfirm }) {
  const purge = variant === 'purge';
  const [text, setText] = useState('');
  const n = files.length;
  const total = files.reduce((s, f) => s + f.sizeMb, 0);
  const ok = !purge || text === 'DELETE';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10192b]/45 p-4 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className={`[zoom:0.8] w-full max-w-[650px] rounded-[30px] bg-white px-[34px] pb-[34px] pt-[34px] shadow-2xl ${
          purge ? 'border-t-[3px] border-t-[#e5484d]' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-[18px]">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
              purge ? 'bg-[#ffe9e6] shadow-[0_4px_10px_rgba(229,72,77,0.15)]' : 'bg-[#fff1cc] text-[#b86b00]'
            }`}
          >
            {purge ? <FlameIcon size={26} /> : <Trash2 size={24} />}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {purge ? (
                <>
                  <span className="doc-mono inline-flex h-[22px] items-center rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#d9373f]">
                    Irreversible action
                  </span>
                  <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#d9373f]">Permanent purge</span>
                </>
              ) : (
                <>
                  <span className="doc-mono inline-flex h-[22px] items-center rounded-md border border-[#f7dfa8] bg-[#fff5dc] px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#c27a00]">
                    Recyclable
                  </span>
                  <span className="doc-mono text-[11px] uppercase tracking-[0.1em] text-[#7c949a]">Stage 1 of purge protocol</span>
                </>
              )}
            </div>
            <h3 className={`doc-heading mt-1 text-[26px] font-black leading-8 ${purge ? 'text-[#d9373f]' : 'text-[#10283f]'}`}>
              {purge
                ? `Permanently purge ${n} ${n === 1 ? 'file' : 'files'}?`
                : `Move ${n} ${n === 1 ? 'file' : 'files'} to Recycle Bin?`}
            </h3>
            <p className="mt-1 text-[15px] leading-[25px] text-[#44596a]">
              {purge ? (
                <>
                  This operation permanently destroys raw files, Milvus vector embeddings, and chunk metadata.{' '}
                  <strong className="font-semibold text-[#10283f]">This cannot be undone.</strong>
                </>
              ) : (
                <>
                  These documents will be unindexed from search and EKA answers immediately. They are held in the{' '}
                  <strong className="font-semibold text-[#10283f]">Recycle Bin for 30 days,</strong> where an admin can restore them at any time.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Targets */}
        <div className="mt-[22px] flex items-center justify-between">
          <span className="doc-mono text-[12px] uppercase tracking-[0.12em] text-[#7c949a]">{purge ? 'Purge targets' : 'Selected documents'}</span>
          <span className={`doc-mono text-[14px] font-bold ${purge ? 'text-[#d9373f]' : 'text-[#10283f]'}`}>
            +{total.toFixed(1)} MB storage {purge ? 'permanently purged' : 'reclaimed'}
          </span>
        </div>
        <div className="mt-6 max-h-[220px] space-y-2 overflow-y-auto rounded-2xl border border-[#cfe3f3] bg-[#e4f1fb] p-3">
          {files.map((f) => (
            <div key={f.id} className="flex h-[45px] items-center gap-3 rounded-xl bg-white pl-[13px] pr-[11px]">
              <TypeTile type={f.type} />
              <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-[#10283f]">{f.name}</span>
              <span
                className={`doc-mono inline-flex h-6 items-center rounded-md border px-3 text-[13px] font-bold ${
                  purge ? 'border-[#f6c4c3] bg-[#fff0ef] text-[#d9373f]' : 'border-[#c9def6] bg-[#eaf3fd] text-[#1b79a8]'
                }`}
              >
                {f.sizeMb.toFixed(1)} MB
              </span>
            </div>
          ))}
        </div>

        {/* Confirm input (purge only) */}
        {purge && (
          <label className="mt-[26px] block text-[15px] leading-5 text-[#44596a]">
            Type <strong className="doc-mono font-bold text-[#d9373f]">DELETE</strong> to authorize permanent destruction:
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="TYPE DELETE TO CONFIRM"
              className="doc-mono mt-2.5 h-[49px] w-full rounded-xl border-2 border-[#b9d6ec] bg-white px-[17px] text-[17px] text-[#10283f] outline-none transition-colors placeholder:text-[#7c949a] focus:border-[#e5484d]"
            />
          </label>
        )}

        {/* Actions */}
        <div className={`flex justify-end gap-2.5 border-t border-[#e3eef7] pt-4 ${purge ? 'mt-11' : 'mt-[30px]'}`}>
          <button
            type="button"
            onClick={onClose}
            className="h-[39px] cursor-pointer rounded-full border border-[#b9d6ec] bg-[#e8f1f9] px-6 text-[14px] font-semibold text-[#10283f] transition-colors hover:bg-[#dbeaf6]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!ok}
            className={`inline-flex h-[39px] cursor-pointer items-center gap-2 rounded-full px-5 text-[14px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#d9dee4] disabled:shadow-none ${
              purge ? 'bg-[#e5484d] shadow-[0_6px_16px_rgba(229,72,77,0.35)]' : 'bg-[#0a7bc4] shadow-[0_6px_16px_rgba(10,123,196,0.35)]'
            }`}
          >
            {purge ? <FlameIcon size={16} /> : <Trash2 size={14} />}
            {purge ? 'Purge Permanently' : 'Move to Recycle Bin'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileActionModal;