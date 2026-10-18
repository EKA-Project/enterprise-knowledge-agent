import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

// Bottom-right toast. `toast` is { message, variant } or null.
// variant: 'success' (green border) | 'neutral' (plain border)
function SummaryToast({ toast, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t); // avoid closing a newer toast
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const border =
    toast.variant === 'neutral' ? 'border-(--border-medium)' : 'border-(--status-success)';

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 flex max-w-xs items-center gap-3 rounded-3xl border bg-(--bg-surface) py-2.5 pl-4 pr-3 text-xs font-medium text-(--text-primary) shadow-(--shadow-lg) ${border}`}
    >
      <CheckCircle2 size={16} className="shrink-0 text-(--text-secondary)" />
      <span>{toast.message}</span>
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