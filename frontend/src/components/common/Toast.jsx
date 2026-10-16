import { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

function ToastItem({ toast, onDismiss, animationClass }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3800);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const success = toast.tone === "success";
  const Icon = success ? CheckCircle2 : Info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${animationClass} pointer-events-auto flex items-start gap-3 rounded-2xl border border-(--border-subtle) px-4 py-3 shadow-(--shadow-lg) ${
        success
          ? "bg-(--status-success) text-white"
          : "bg-(--bg-surface) text-(--text-primary)"
      }`}
    >
      <Icon
        size={19}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />

      <p className="min-w-0 flex-1 text-[13px] font-medium leading-relaxed">
        {toast.message}
      </p>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        title="Dismiss notification"
        className="shrink-0 rounded-full p-1 opacity-75 transition hover:bg-black/10 hover:opacity-100 focus-visible:outline-2"
      >
        <X size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function ToastStack({
  toasts = [],
  onDismiss,
  animationClass = "anl-toast",
}) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[70] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          animationClass={animationClass}
        />
      ))}
    </div>
  );
}