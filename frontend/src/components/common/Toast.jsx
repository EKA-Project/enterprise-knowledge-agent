import { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

function ToastItem({ toast, onDismiss, animationClass }) {
  useEffect(() => {
    if (!toast?.id) return;

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3800);

    return () => clearTimeout(timer);
  }, [toast?.id, onDismiss]);

  if (!toast) return null;
  // ↑ Each toast removes itself after 3.8 seconds.
  const success = toast.tone === "success";
  const Icon = success ? CheckCircle2 : Info;


  return (
    <div
      role="status"
      aria-live="polite"
      className={`${animationClass} pointer-events-auto flex max-w-sm items-start gap-2.5 rounded-xl border border-(--border-subtle) px-4 py-3 text-[12.5px] font-semibold shadow-(--shadow-lg) ${
        success
          ? "bg-(--status-success) text-white"
          : "bg-(--bg-surface) text-(--text-primary)"
      }`}
    >
      <Icon size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span className="min-w-0 flex-1 leading-snug">{toast.message}</span>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        title="Dismiss notification"
        className="shrink-0 rounded-full p-1 opacity-75 transition hover:bg-black/10 hover:opacity-100 focus-visible:outline-2"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
export default ToastItem;