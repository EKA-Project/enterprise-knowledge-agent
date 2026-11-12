
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { DeptPill } from './StorageBits';
import Badge from '../../common/Badge.jsx';
import DataTable from '../../common/DataTable.jsx';
import AnimatedBin, {
  RestoreButton,
  PurgeButton,
} from '../../common/ActionButtons.jsx';
import '../../../styles/Document.css';

// Collapsed by default. Sizes measured on the 1920px frame
// (card 1521 wide, header 111 tall, table head 52).
function RecycleBinSection({ items, onRestore, onPurge, onEmpty }) {
  const [open, setOpen] = useState(false);
  const empty = items.length === 0;

  const [flap, setFlap] = useState(false);
  // Lid opens once when the bin content changes.
  const prevCount = useRef(items.length);

  useEffect(() => {
    if (prevCount.current === items.length) return;

    prevCount.current = items.length;
    setFlap(true);

    const t = setTimeout(() => setFlap(false), 900);
    return () => clearTimeout(t);
  }, [items.length]);

  // Common DataTable columns.
  const columns = [
    {
      key: 'type',
      header: 'Type',
      width: '9%',
      render: (f) => <Badge format={f.type} />,
    },
    {
      key: 'name',
      header: 'Document Name',
      width: '29%',
      render: (f) => (
        <div className="min-w-0">
          <p className="max-w-[330px] truncate text-[14px] font-semibold text-[#10283f]">
            {f.name}
          </p>
          <p className="doc-mono max-w-[330px] truncate text-[11px] text-[#7c949a]">
            {f.file}
          </p>
        </div>
      ),
    },
    {
      key: 'dept',
      header: 'Department',
      width: '17%',
      render: (f) => <DeptPill name={f.dept} />,
    },
    {
      key: 'sizeMb',
      header: 'Size',
      width: '12%',
      render: (f) => (
        <span className="doc-mono text-[13px] font-bold text-[#10283f]">
          {f.sizeMb.toFixed(1)} MB
        </span>
      ),
    },
    {
      key: 'deleted',
      header: 'Deleted Date',
      width: '17%',
      render: (f) => (
        <span className="doc-mono text-[12px] text-[#7c949a]">
          {f.deleted}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      width: '16%',
      align: 'right',
      render: (f) => (
        <div className="flex justify-end gap-2">
          <RestoreButton onClick={() => onRestore(f)} />
          <PurgeButton onClick={() => onPurge(f)} />
        </div>
      ),
    },
  ];

  return (
    <section className="overflow-hidden rounded-[24px] border border-[#f6d5d9] bg-(--bg-surface) shadow-(--shadow-sm)">
      <div
        className={`flex flex-wrap items-center justify-between gap-4 px-9 py-[12px] ${
          open ? 'border-b border-[#f3e4e6]' : ''
        }`}
      >
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
              Safe-containment holding zone. Documents staged here are purged
              automatically after 30 days unless restored.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="doc-mono inline-flex cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-(--primary) transition-colors hover:text-(--text-primary)"
        >
          View deleted files
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="px-9 pb-9">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3e4e6] py-[14px]">
            <p className="flex items-center gap-2.5 text-[12px] text-[#7c949a]">
              <AlertCircle size={16} className="text-[#e5484d]" />
              Soft-deleted files remain restorable for 30 days before being
              purged forever.
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
            {!empty && (
              <DataTable
                columns={columns}
                rows={items}
                getRowKey={(f) => f.id}
                caption="Recycle Bin deleted documents"
              />
            )}

            {empty && (
              <div className="py-[50px]">
                <div className="mx-auto flex h-[296px] w-full max-w-[516px] flex-col items-center rounded-3xl border border-dashed border-[#f3c4d0] bg-[linear-gradient(180deg,#fff5f8,#ffffff)] px-10 pt-[42px] text-center">
                  <span className="bin-group relative flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#f4b8bf] bg-[#ffe9ee] text-[#e5484d] shadow-[0_2px_10px_rgba(229,72,77,0.12)] transition-all duration-300 hover:border-[#c62828] hover:text-[#d9373f] hover:shadow-[0_4px_18px_rgba(220,38,38,0.3)]">
                    <AnimatedBin size={40} spark open={flap} />
                  </span>

                  <h4 className="doc-heading mt-[22px] text-[21px] font-black leading-7 text-[#10283f]">
                    Recycle Bin is Empty
                  </h4>

                  <p className="mt-2 max-w-[404px] text-[14px] leading-[22px] text-[#7c949a]">
                    Zero files staged. Documents removed from the library are
                    held here safely for 30 days before being permanently
                    purged.
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
