import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ChevronDown, Droplet, RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import { DeptPill, TypeTile } from './StorageBits';
import '../../../styles/Document.css';

const TH = 'doc-mono px-3 text-[11px] font-normal uppercase tracking-[0.12em] text-[#7c949a]';
// Trash can with a separate lid, so the lid can lift (see .bin-lid in Document.css)
function BinIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g className="bin-lid">
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </g>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
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

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#f6d5d9] bg-(--bg-surface) shadow-(--shadow-sm)">
      <div className={`flex flex-wrap items-center justify-between gap-4 px-9 py-[25px] ${open ? 'border-b border-[#f3e4e6]' : ''}`}>
        <div className="flex items-center gap-[14px]">
          <span className={`bin-group relative flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-[#f6d5d9] bg-[#ffe9ee] text-[#e5484d] ${flap ? 'bin-open' : ''}`}>
            <BinIcon size={24} />
            <span className="absolute right-1.5 top-1 h-1.5 w-1.5 rounded-full bg-[#e5484d]" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="doc-heading text-[24px] font-black leading-8 text-[#10283f]">
                Recycle Bin / Soft-Deleted Files ({items.length})
              </h2>
              <span className="doc-mono inline-flex h-[22px] items-center rounded-full border border-[#f6c4c3] bg-[#fff0f0] px-3 text-[10px] font-bold uppercase tracking-[0.06em] text-[#d9373f]">
                30-day retention
              </span>
            </div>
            <p className="mt-0.5 text-[14px] text-[#7c949a]">
              Safe-containment holding zone. Documents staged here are purged automatically after 30 days unless restored.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="doc-mono inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1f718e] transition-colors hover:text-[#10283f]"
        >
          View deleted files
          <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="px-9 pb-9">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3e4e6] py-[14px]">
            <p className="flex items-center gap-2.5 text-[14px] text-[#7c949a]">
              <AlertCircle size={16} className="text-[#e5484d]" />
              Soft-deleted files remain restorable for 30 days before being purged forever.
            </p>
            <button
              type="button"
              onClick={onEmpty}
              disabled={empty}
              className="inline-flex h-[39px] cursor-pointer items-center gap-2 rounded-full border border-[#f9d3df] bg-[#fff3f8] px-5 text-[14px] font-semibold text-[#d9373f] transition-colors hover:bg-[#ffe2e1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={14} /> Empty Recycle Bin
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
                          <button type="button" onClick={() => onRestore(f)} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#cfe3f3] bg-white px-4 text-[13px] font-semibold text-[#10283f] transition-colors hover:border-[#8fd3b5] hover:bg-[#eefbf5] hover:text-[#0f8f63]">
                            <RotateCcw size={13} /> Restore
                          </button>
                          <button type="button" onClick={() => onPurge(f)} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-4 text-[13px] font-semibold text-[#d9373f] transition-colors hover:bg-[#ffe2e1]">
                            <Droplet size={13} className="fill-current" /> Purge
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
                <div className={`group bin-group mx-auto flex h-[296px] w-full max-w-[516px] cursor-pointer flex-col items-center rounded-3xl border border-dashed border-[#f3c4d0] bg-[linear-gradient(180deg,#fff5f8,#ffffff)] px-10 pt-[42px] text-center transition-colors duration-300 hover:border-[#eba3b4] hover:bg-[linear-gradient(180deg,#ffe6ed,#fff3f7)] ${flap ? 'bin-open' : ''}`}>
                  <span className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#f6c4cf] bg-[#ffe9ee] text-[#e5484d] transition-all duration-300 group-hover:border-[#e5484d] group-hover:shadow-[0_0_0_6px_rgba(229,72,77,0.12)]">
                    <BinIcon size={36} />
                    <Sparkles size={12} className="absolute right-3 top-3 text-[#e5484d]" />
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







