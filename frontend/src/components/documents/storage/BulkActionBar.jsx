import { Droplet, Trash2 } from 'lucide-react';
import '../../../styles/Document.css';

// Floating bar, centred over the content area (not the whole window), like the video.
function BulkActionBar({ count, reclaimMb, onRecycle, onPurge, onDisarm }) {
  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-40 flex justify-center lg:left-[300px]">
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0e1a2c] p-3 shadow-2xl">
        <div className="flex items-center gap-4 rounded-xl bg-[#16263b] px-4 py-2">
          <span className="doc-mono text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-white">
            {count} {count === 1 ? 'file' : 'files'}<br />selected
          </span>
        </div>
        <span className="doc-mono px-1 text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#33c6c9]">
          ▲ {reclaimMb.toFixed(1)} MB<br />reclaimable
        </span>
        <button
          type="button"
          onClick={onRecycle}
          className="doc-mono flex h-11 cursor-pointer items-center gap-2.5 rounded-xl bg-[#2563eb] px-4 text-left text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-white transition-colors hover:bg-[#1d4fd0]"
        >
          <Trash2 size={13} />
          <span>Move to<br />Recycle Bin</span>
        </button>
        <button
          type="button"
          onClick={onPurge}
          className="doc-mono flex h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-[#7a2630] bg-[#3a1620] px-4 text-left text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-[#ff9aa0] transition-colors hover:bg-[#4a1b27]"
        >
          <Droplet size={13} className="fill-current text-[#f5b83d]" />
          <span>Purge<br />Permanently</span>
        </button>
        <button
          type="button"
          onClick={onDisarm}
          className="doc-mono cursor-pointer px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
        >
          Disarm
        </button>
      </div>
    </div>
  );
}

export default BulkActionBar;