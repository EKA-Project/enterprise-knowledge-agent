import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ChevronDown, Droplet, RotateCcw, Trash2 } from 'lucide-react';
import { DeptPill, TypeTile } from './StorageBits';
import AnimatedBin from '../../common/ActionButtons.jsx';
import '../../../styles/Document.css';

const TH = 'doc-mono px-3 text-[11px] font-normal uppercase tracking-[0.12em] text-[#7c949a]';

// Collapsed by default. Sizes measured on the 1920px frame (card 1521 wide, header 111 tall, table head 52).
function RecycleBinSection({ items, onRestore, onPurge, onEmpty }) {
  const [open, setOpen] = useState(false);
  const empty = items.length === 0;
  const [flap, setFlap] = useState(false); // lid opens once when the bin content changes
  const prevCount = useRef(items.length);
  useEffect(() => {
    if (prevCount.current === items.length) return;
    prevCount.current = items.length;
    setFlap(true);
    const t = setTimeout(() => setFlap(false), 900);
    return () => clearTimeout(t);
  }, [items.length]);
  // Two-tone flame (red outer, orange inner) for the Purge button
  function FlameIcon({ size = 13 }) {
    return (
      <span className="flame-rise">
        <svg className="flame-svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
            fill="#e11d2e"
          />
          <path
            d="M12 21a4 4 0 0 0 4-4c0-1.5-1-2.5-2-3.5-.4 1-1.2 1.5-2 1.5-.9 0-1.5-.6-1.5-1.5C9 14 8 15.5 8 17a4 4 0 0 0 4 4z"
            fill="#f59e0b"
          />
        </svg>
      </span>
    );
  }
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#f6d5d9] bg-(--bg-surface) shadow-(--shadow-sm)">
      <div className={`flex flex-wrap items-center justify-between gap-4 px-9 py-[12px] ${open ? 'border-b border-[#f3e4e6]' : ''}`}>
        <div className="flex items-center gap-[14px]">
          <span className="bin-group relative flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-2xl border border-[#f6d5d9] bg-[#ffe9ee] text-[#e5484d]">
            <AnimatedBin size={22} open={flap} />
            <span className="absolute right-1.5 top-1 h-1.5 w-1.5 rounded-full bg-[#e5484d]" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="doc-heading text-[20px] font-black leading-8 text-[#10283f]">
                Recycle Bin / Soft-Deleted Files ({items.length})
              </h2>
              <span className="doc-mono inline-flex h-[20px] items-center rounded-full border border-[#f6c4c3] bg-[#fff0f0] px-2 text-[9px] font-bold uppercase tracking-[0.06em] text-[#d9373f]">
                30-day retention
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-[#7c949a]">
              Safe-containment holding zone. Documents staged here are purged automatically after 30 days unless restored.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="doc-mono inline-flex cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1f718e] transition-colors hover:text-[#10283f]"
        >
          View deleted files
          <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="px-9 pb-9">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3e4e6] py-[14px]">
            <p className="flex items-center gap-2.5 text-[12px] text-[#7c949a]">
              <AlertCircle size={16} className="text-[#e5484d]" />
              Soft-deleted files remain restorable for 30 days before being purged forever.
            </p>
            <button
              type="button"
              onClick={onEmpty}
              disabled={empty}
              className="bin-group inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#f0c5c9] bg-[#fff5f5] pl-2 pr-2 text-[12px] font-semibold text-[#c92525] transition-colors hover:bg-[#ffeaea] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex h-6 w-5 items-center justify-center rounded-full bg-[#fbdcdd]">
                <AnimatedBin size={14} />
              </span>
              Empty Recycle Bin
            </button>
          </div>

          <div className="mt-[15px] overflow-hidden rounded-[18px] border border-[#e3eef7] bg-white">
            <table className="w-full text-left">
              <thead className="bg-[#dcf0fd]">
                <tr className="h-[52px]">
                  <th className={`${TH} pl-5`}>Type</th>
                  <th className={TH}>Document Name</th>
                  <th className={TH}>Department</th>
                  <th className={TH}>Size</th>
                  <th className={TH}>Deleted Date</th>
                  <th className={`${TH} pr-5 text-right`}>Action</th>
                </tr>
              </thead>
              {!empty && (
                <tbody>
                  {items.map((f) => (
                    <tr key={f.id} className="border-t border-[#e3eef7]">
                      <td className="py-[18px] pl-5 pr-3"><TypeTile type={f.type} /></td>
                      <td className="px-3">
                        <p className="max-w-[330px] truncate text-[14px] font-semibold text-[#10283f]">{f.name}</p>
                        <p className="doc-mono max-w-[330px] truncate text-[11px] text-[#7c949a]">{f.file}</p>
                      </td>
                      <td className="px-3"><DeptPill name={f.dept} /></td>
                      <td className="doc-mono px-3 text-[13px] font-bold text-[#10283f]">{f.sizeMb.toFixed(1)} MB</td>
                      <td className="doc-mono px-3 text-[12px] text-[#7c949a]">{f.deleted}</td>
                      <td className="pl-3 pr-5">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => onRestore(f)} className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#cfe3f3] bg-white px-4 text-[13px] font-semibold text-[#10283f] transition-colors hover:border-[#8fd3b5] hover:bg-[#eefbf5] hover:text-[#0f8f63]">
                            <RotateCcw size={13} className="transition-transform duration-300 ease-out group-hover:-rotate-45 group-active:-rotate-360 group-active:duration-500" />
                            Restore
                          </button>
                          <button type="button" onClick={() => onPurge(f)} className="flame-group inline-flex h-9 cursor-pointer items-center gap-2.5 rounded-full border border-[#f4b4b6] bg-[#fce7e9] pl-2 pr-5 text-[14px] font-semibold text-[#d92d2d] transition-colors hover:bg-[#fbd9dc]">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f8d0d3]">
                              <FlameIcon size={18} />
                            </span>
                            Purge
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {empty && (
              <div className="py-[50px]">
                <div className="mx-auto flex h-[296px] w-full max-w-[516px] flex-col items-center rounded-3xl border border-dashed border-[#f3c4d0] bg-[linear-gradient(180deg,#fff5f8,#ffffff)] px-10 pt-[42px] text-center">
                  <span className="bin-group relative flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#f4b8bf] bg-[#ffe9ee] text-[#e5484d] shadow-[0_2px_10px_rgba(229,72,77,0.12)] transition-all duration-300 hover:border-[#c62828] hover:text-[#d9373f] hover:shadow-[0_4px_18px_rgba(220,38,38,0.3)]">
                    <AnimatedBin size={40} spark open={flap} />
                  </span>
                  <h4 className="doc-heading mt-[22px] text-[21px] font-black leading-7 text-[#10283f]">Recycle Bin is Empty</h4>
                  <p className="mt-2 max-w-[404px] text-[14px] leading-[22px] text-[#7c949a]">
                    Zero files staged. Documents removed from the library are held here safely for 30 days before being permanently purged.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default RecycleBinSection;