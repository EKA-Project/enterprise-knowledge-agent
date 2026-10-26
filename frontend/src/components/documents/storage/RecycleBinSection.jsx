import { useState } from 'react';
import { AlertCircle, ChevronDown, RotateCcw, Droplet, Trash2 } from 'lucide-react';
import { DeptPill, TypeTile } from './StorageBits';
import '../../../styles/Document.css';

const TH = 'doc-mono px-3 py-3.5 text-[11px] font-normal uppercase tracking-[0.12em] text-[#7c949a]';

// items = bin files, newest first. Collapsed by default ("View deleted files").
function RecycleBinSection({ items, onRestore, onPurge, onEmpty }) {
  const [open, setOpen] = useState(false);
  const empty = items.length === 0;

  return (
    <section className="overflow-hidden rounded-[28px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      <div className={`flex flex-wrap items-center justify-between gap-4 px-8 py-6 ${open ? 'bg-[#fff6f6]' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="relative flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-[#ffe9e8] text-[#e5484d]">
            <Trash2 size={22} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e5484d]" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="doc-heading text-[24px] font-black leading-none text-[#10283f]">
                Recycle Bin / Soft-Deleted Files ({items.length})
              </h2>
              <span className="doc-mono rounded-md border border-[#f3c3c3] bg-[#fff0f0] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#d9373f]">
                30-day retention
              </span>
            </div>
            <p className="mt-2 text-[14px] text-[#7c949a]">
              Safe-containment holding zone. Documents staged here are purged automatically after 30 days unless restored.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="doc-mono inline-flex cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#44596a] transition-colors hover:text-[#10283f]"
        >
          View deleted files
          <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-[#f3dede] px-8 pb-8 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[13px] text-[#7c949a]">
              <AlertCircle size={14} className="text-[#e5484d]" />
              Soft-deleted files remain restorable for 30 days before being purged forever.
            </p>
            <button
              type="button"
              onClick={onEmpty}
              disabled={empty}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-5 text-[12px] font-bold text-[#d9373f] transition-opacity hover:bg-[#ffe2e1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={13} /> Empty Recycle Bin
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#e3eef7] bg-white">
            <table className="w-full text-left">
              <thead className="bg-[#e3eff9]">
                <tr>
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
                      <td className="py-4 pl-5 pr-3"><TypeTile type={f.type} /></td>
                      <td className="px-3 py-4">
                        <p className="max-w-[330px] truncate text-[14px] font-semibold text-[#10283f]">{f.name}</p>
                        <p className="doc-mono max-w-[330px] truncate text-[11px] text-[#7c949a]">{f.file}</p>
                      </td>
                      <td className="px-3 py-4"><DeptPill name={f.dept} /></td>
                      <td className="doc-mono px-3 py-4 text-[13px] font-bold text-[#10283f]">{f.sizeMb.toFixed(1)} MB</td>
                      <td className="doc-mono px-3 py-4 text-[12px] text-[#7c949a]">{f.deleted}</td>
                      <td className="py-4 pl-3 pr-5">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => onRestore(f)} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#cfe3f3] bg-white px-4 text-[12px] font-semibold text-[#10283f] transition-colors hover:border-[#8fd3b5] hover:bg-[#eefbf5] hover:text-[#0f8f63]">
                            <RotateCcw size={13} /> Restore
                          </button>
                          <button type="button" onClick={() => onPurge(f)} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-4 text-[12px] font-semibold text-[#d9373f] transition-colors hover:bg-[#ffe2e1]">
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
              <div className="px-6 py-10">
                <div className="mx-auto max-w-[340px] rounded-2xl border border-[#cdeedd] bg-[linear-gradient(180deg,#f2fcf7,#ffffff)] px-8 py-8 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dcf7ea] text-[#0f9d6b]">
                    <Trash2 size={24} />
                  </span>
                  <h4 className="doc-heading mt-4 text-[19px] font-black text-[#10283f]">Recycle Bin is Empty</h4>
                  <p className="mt-2 text-[13px] leading-5 text-[#7c949a]">
                    Zero files staged. Documents removed from the library are held here safely for 30 days before being purged permanently.
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