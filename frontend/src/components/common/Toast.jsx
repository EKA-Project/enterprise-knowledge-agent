import { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);
  // ↑ Each toast removes itself after 3.8 seconds.

  const success = toast.tone === "success";
  const Icon = success ? CheckCircle2 : Info;

  return (
    <div
      role="status"
      className={`anl-toast pointer-events-auto flex max-w-sm items-start gap-2.5 rounded-xl px-4 py-3 text-[12.5px] font-semibold shadow-(--shadow-lg) ${
        success ? "bg-(--status-success) text-white" : "bg-(--sidebar-bg) text-(--sidebar-text)"
      }`}
    >
      <Icon size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 opacity-70 transition hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[70] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}