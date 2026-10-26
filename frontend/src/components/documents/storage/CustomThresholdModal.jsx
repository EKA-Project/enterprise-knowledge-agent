import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import '../../../styles/Document.css';

const quick = [15, 35, 75, 150];

// Custom size threshold (Step 3). Apply gives a number of MB to the parent.
function CustomThresholdModal({ initial, onClose, onApply }) {
  const [value, setValue] = useState(String(initial ?? ''));
  const valid = Number(value) > 0;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (valid) onApply(Number(value));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#10192b]/45 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] rounded-[24px] bg-white p-7 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[20px] font-bold text-[#10283f]">Custom size filter</h3>
            <p className="mt-1 text-[13px] text-[#7c949a]">Show files larger than this size.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#e1f0fa] text-[#7c949a] transition-colors duration-200 hover:bg-[#ffe2e1] hover:text-[#d9373f]"
          >
            <X size={14} className="transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="doc-mono text-[16px] font-bold text-[#10283f]">&gt;</span>
          <input
            autoFocus
            type="number"
            min="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="doc-mono h-11 w-full rounded-xl border border-[#cfe3f3] bg-[#f4f9fd] px-4 text-[15px] text-[#10283f] outline-none focus:border-[#1b79a8]"
          />
          <span className="doc-mono text-[14px] text-[#7c949a]">MB</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quick.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setValue(String(q))}
              className="doc-mono h-8 cursor-pointer rounded-full border border-[#cfe3f3] bg-white px-4 text-[12px] font-semibold text-[#10283f] transition-colors hover:bg-[#e1f0fa]"
            >
              &gt;{q} MB
            </button>
          ))}
        </div>

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
            disabled={!valid}
            className="h-10 cursor-pointer rounded-full bg-[#153830] px-6 text-[13px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Apply Filter →
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomThresholdModal;