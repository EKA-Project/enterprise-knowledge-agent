
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
    chip: "bg-(--status-success-bg) text-(--status-success)",
    role: "status",
  },
  error: {
    icon: AlertCircle,
    chip: "bg-(--status-danger-bg) text-(--status-danger)",
    role: "alert",
  },
  info: {
    icon: Info,
    chip: "bg-(--status-info-bg) text-(--status-info)",
    role: "status",
  },
};

// New shared Toast component used by the toast provider.
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
    if (!duration || paused) return;

    const timer = setTimeout(close, duration);
    return () => clearTimeout(timer);
  }, [duration, paused, close]);

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
      className="toast pointer-events-auto flex items-start gap-3 rounded-2xl border border-(--border-subtle) bg-white p-3 shadow-lg"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.chip}`}
      >
        <Icon size={17} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[0.8rem] font-semibold text-(--text-primary)">
          {message}
        </p>

        {description && (
          <p className="mt-0.5 text-xs text-(--text-secondary)">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

// Legacy ToastStack used by OrganizationPage and other existing pages.
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
