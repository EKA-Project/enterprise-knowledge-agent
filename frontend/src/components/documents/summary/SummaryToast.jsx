import { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

// Bottom-right toast. `toast` is { message, variant } or null.
// variant: 'success' (green card, video) | 'neutral' (dark navy card, video)
function SummaryToast({ toast, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t); // avoid closing a newer toast
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const success = toast.variant !== 'neutral';
  const Icon = success ? CheckCircle2 : Info;

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 flex w-[300px] max-w-[calc(100vw-3rem)] items-center gap-3 rounded-xl py-3 pl-4 pr-3 text-xs font-medium text-white shadow-(--shadow-lg) ${
        success ? 'bg-[#0b5d45]' : 'bg-[#10192b]'
      }`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onClose}
        className="cursor-pointer text-white/60 hover:text-white"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default SummaryToast;