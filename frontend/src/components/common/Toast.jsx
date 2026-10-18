
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import "../../styles/toast.css";

const EXIT_MS = 150;

const TYPES = {
  success: {
    icon: CheckCircle2,
    color: "text-[#4ade80]",
    bar: "bg-[#4ade80]",
    role: "status",
  },
  error: {
    icon: AlertCircle,
    color: "text-[#f87171]",
    bar: "bg-[#f87171]",
    role: "alert",
  },
  info: {
    icon: Info,
    color: "text-(--accent-highlight)",
    bar: "bg-(--accent-highlight)",
    role: "status",
  },
};

// New shared Toast component used by ToastProvider.
export function Toast({
  message,
  description,
  type = "info",
  duration,
  onDismiss,
}) {
  const [closing, setClosing] = useState(false);
  const [paused, setPaused] = useState(false);
  const exitTimer = useRef(null);
  const onDismissRef = useRef(onDismiss);

  const config = TYPES[type] ?? TYPES.info;
  const Icon = config.icon;

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  const close = useCallback(() => {
    if (exitTimer.current) return;

    setClosing(true);
    exitTimer.current = setTimeout(() => {
      onDismissRef.current?.();
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    return () => clearTimeout(exitTimer.current);
  }, []);

  return (
    <div
      role={config.role}
      aria-live={config.role === "alert" ? "assertive" : "polite"}
      data-closing={closing || undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="toast group pointer-events-auto relative flex w-fit max-w-full items-start gap-2.5 self-end overflow-hidden rounded-2xl border border-(--sidebar-border) bg-(--sidebar-bg) py-2.5 pr-3 pl-3.5 font-sans shadow-[0_10px_30px_rgba(8,32,53,0.35)]"
    >
      <Icon
        size={16}
        strokeWidth={2.25}
        className={`mt-px shrink-0 ${config.color}`}
        aria-hidden="true"
      />

      <div className="min-w-0 pr-1">
        <p className="font-serif text-[0.85rem] leading-snug font-bold text-(--sidebar-text)">
          {message}
        </p>

        {description && (
          <p className="mt-0.5 text-[0.72rem] leading-snug font-medium text-(--sidebar-text-muted)">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="-mr-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--sidebar-text-muted) opacity-50 transition hover:bg-(--sidebar-hover-bg) hover:text-(--sidebar-text) group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <X size={12} aria-hidden="true" />
      </button>

      {duration > 0 && (
        <span
          aria-hidden="true"
          onAnimationEnd={close}
          style={{
            "--toast-ms": `${duration}ms`,
            animationPlayState: paused ? "paused" : "running",
          }}
          className={`toast-bar absolute inset-x-0 bottom-0 h-0.5 origin-left ${config.bar}`}
        />
      )}
    </div>
  );
}

// Legacy ToastStack used by OrganizationPage.
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
  if (toasts.length === 0) return null;

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
