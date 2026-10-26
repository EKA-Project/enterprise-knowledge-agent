import { formatMb } from './StorageData';
import '../../../styles/Document.css';

// Floating bar at the bottom: shows only while something is ticked.
function BulkActionBar({ count, reclaimMb, onRecycle, onPurge, onDisarm }) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-6 rounded-full bg-[#10192b] py-3 pl-7 pr-3 shadow-2xl">
      <div>
        <span className="doc-mono block text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          {count} {count === 1 ? 'file' : 'files'} selected
        </span>
        <span className="doc-mono mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3ddc97]">
          ▲ {formatMb(reclaimMb)} reclaimable
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRecycle}
          className="doc-mono h-10 cursor-pointer rounded-full bg-white/10 px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/20"
        >
          To Recycle Bin
        </button>
        <button
          type="button"
          onClick={onPurge}
          className="doc-mono h-10 cursor-pointer rounded-full bg-[#e5484d] px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#d13a3f]"
        >
          Purge Permanently
        </button>
        <button
          type="button"
          onClick={onDisarm}
          className="doc-mono h-10 cursor-pointer rounded-full px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
        >
          Disarm
        </button>
      </div>
    </div>
  );
}

export default BulkActionBar;