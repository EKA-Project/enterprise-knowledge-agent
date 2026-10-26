import { useEffect, useState } from 'react';
import { Droplet, Trash2 } from 'lucide-react';
import { TypeTile } from './StorageBits';
import '../../../styles/Document.css';

// variant "recycle" = Stage 1 (move to bin), "purge" = permanent delete (type DELETE).
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
        className={`w-full max-w-[650px] rounded-[28px] bg-white p-8 shadow-2xl ${purge ? 'border-t-[3px] border-t-[#e5484d]' : ''}`}
      >
        <div className="flex items-start gap-4">
          <span className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl ${purge ? 'bg-[#ffe2e1] text-[#e5484d]' : 'bg-[#fff1cc] text-[#b86b00]'}`}>
            {purge ? <Droplet size={20} className="fill-current" /> : <Trash2 size={20} />}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {purge ? (
                <>
                  <span className="doc-mono rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#d9373f]">Irreversible action</span>
                  <span className="doc-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#d9373f]">Permanent purge</span>
                </>
              ) : (
                <>
                  <span className="doc-mono rounded-md border border-[#f7dfa8] bg-[#fff5dc] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#c27a00]">Recyclable</span>
                  <span className="doc-mono text-[10px] uppercase tracking-[0.08em] text-[#7c949a]">Stage 1 of purge protocol</span>
                </>
              )}
            </div>
            <h3 className={`doc-heading mt-1.5 text-[25px] font-black leading-tight ${purge ? 'text-[#d9373f]' : 'text-[#10283f]'}`}>
              {purge
                ? `Permanently purge ${n} ${n === 1 ? 'file' : 'files'}?`
                : `Move ${n} ${n === 1 ? 'file' : 'files'} to Recycle Bin?`}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[#44596a]">
              {purge ? (
                <>This operation permanently destroys raw files, Milvus vector embeddings, and chunk metadata. <strong className="text-[#10283f]">This cannot be undone.</strong></>
              ) : (
                <>These documents will be unindexed from search and EKA answers immediately. They are held in the <strong className="text-[#10283f]">Recycle Bin for 30 days,</strong> where an admin can restore them at any time.</>
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="doc-mono text-[10px] uppercase tracking-[0.1em] text-[#7c949a]">{purge ? 'Purge targets' : 'Selected documents'}</span>
          <span className={`doc-mono text-[11px] font-bold ${purge ? 'text-[#d9373f]' : 'text-[#10283f]'}`}>
            +{total.toFixed(1)} MB storage {purge ? 'permanently purged' : 'reclaimed'}
          </span>
        </div>
        <div className="mt-2 max-h-[220px] space-y-2 overflow-y-auto rounded-2xl bg-[#e4f1fb] p-2.5">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5">
              <TypeTile type={f.type} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#10283f]">{f.name}</span>
              <span className={`doc-mono rounded-md border px-2 py-0.5 text-[11px] font-bold ${purge ? 'border-[#f6c4c3] bg-[#fff0ef] text-[#d9373f]' : 'border-[#c9def6] bg-[#eaf3fd] text-[#1b79a8]'}`}>
                {f.sizeMb.toFixed(1)} MB
              </span>
            </div>
          ))}
        </div>

        {purge && (
          <label className="mt-5 block text-[13px] text-[#44596a]">
            Type <strong className="doc-mono text-[#d9373f]">DELETE</strong> to authorize permanent destruction:
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="TYPE DELETE TO CONFIRM"
              className="doc-mono mt-2 h-12 w-full rounded-xl border-2 border-[#e5484d] bg-white px-4 text-[14px] text-[#10283f] outline-none placeholder:text-[#9db0bd]"
            />
          </label>
        )}

        <div className="mt-7 flex justify-end gap-3 border-t border-[#eef4f9] pt-5">
          <button type="button" onClick={onClose} className="h-11 cursor-pointer rounded-full border border-[#cfe3f3] bg-[#eef5fb] px-6 text-[13px] font-bold text-[#10283f] hover:bg-[#e1f0fa]">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!ok}
            className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-6 text-[13px] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 ${
              purge ? 'bg-[#e5484d] shadow-[0_6px_16px_rgba(229,72,77,0.35)]' : 'bg-[#0a7bc4] shadow-[0_6px_16px_rgba(10,123,196,0.35)]'
            }`}
          >
            {purge ? <Droplet size={13} className="fill-current" /> : <Trash2 size={13} />}
            {purge ? 'Purge Permanently' : 'Move to Recycle Bin'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileActionModal;