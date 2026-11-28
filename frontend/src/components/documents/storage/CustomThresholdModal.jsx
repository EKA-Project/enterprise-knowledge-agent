import { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import '../../../styles/Document.css';

const quick = [15, 35, 75, 150];

function CustomThresholdModal({ initial, onClose, onApply }) {
  const [value, setValue] = useState(String(initial));
  const inputRef = useRef(null);
  const valid = Number(value) > 0;

  useEffect(() => {
    inputRef.current?.select(); // video: the current value is pre-selected
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (valid) onApply(Number(value));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10192b]/45 p-4 backdrop-blur-sm" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-[549px] rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="flex items-start gap-4">
          <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-[#e1f0fa] text-[#1b79a8]">
            <Clock size={20} />
          </span>
          <div>
            <h3 className="doc-heading text-[23px] font-black leading-tight text-[#10283f]">Custom Size Threshold</h3>
            <p className="mt-1 text-[14px] leading-5 text-[#7c949a]">
              Filter and display all documents occupying space greater than your target megabyte threshold.
            </p>
          </div>
        </div>

        <label className="mt-6 block text-[13px] text-[#44596a]">
          Show documents <strong className="text-[#10283f]">greater than (&gt;)</strong>:
          <div className="mt-2 flex overflow-hidden rounded-xl border-2 border-[#1b79a8] bg-white">
            <input
              ref={inputRef}
              type="number"
              min="1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="doc-mono h-12 min-w-0 flex-1 px-4 text-[17px] text-[#10283f] outline-none"
            />
            <span className="doc-mono flex w-14 items-center justify-center border-l border-[#d6e6f2] bg-[#eef5fb] text-[12px] text-[#7c949a]">MB</span>
          </div>
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {quick.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setValue(String(q))}
              className="doc-mono h-8 cursor-pointer rounded-full border border-[#cfe3f3] bg-[#f1f8fd] px-4 text-[12px] text-[#44596a] transition-colors hover:bg-[#e1f0fa]"
            >
              &gt; {q} MB
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-[#eef4f9] pt-5">
          <button type="button" onClick={onClose} className="h-11 cursor-pointer rounded-full border border-[#cfe3f3] bg-[#eef5fb] px-6 text-[13px] font-bold text-[#10283f] hover:bg-[#e1f0fa]">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!valid}
            className="h-11 cursor-pointer rounded-full bg-[#0a7bc4] px-6 text-[13px] font-bold text-white shadow-[0_6px_16px_rgba(10,123,196,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Apply Filter ›
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomThresholdModal;