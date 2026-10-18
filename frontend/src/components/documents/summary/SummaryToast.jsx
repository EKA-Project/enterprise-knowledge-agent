import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

// Bottom-right toast. Hides itself after `duration` ms.
function SummaryToast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t); // avoid closing a newer toast
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 flex max-w-xs items-center gap-3 rounded-full border border-(--primary) bg-(--bg-surface) py-2.5 pl-4 pr-3 text-xs font-medium text-(--text-primary) shadow-(--shadow-lg)"
    >
      <CheckCircle2 size={16} className="shrink-0 text-(--primary)" />
      <span>{message}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onClose}
        className="cursor-pointer text-(--text-muted) hover:text-(--text-primary)"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default SummaryToast;