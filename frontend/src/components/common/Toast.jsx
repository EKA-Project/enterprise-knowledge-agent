import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import "../../styles/toast.css";

// Keep in sync with the exit animation in styles/toast.css
const EXIT_MS = 150;

// Icon, chip colours and accessibility role per toast type.
// Errors use role="alert" so screen readers announce them immediately.
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

/**
 * message: string (the main line)
 * description?: string (a quieter second line)
 * type?: "success" | "error" | "info" (default "info")
 * duration?: ms before it dismisses itself; 0 = stays until closed
 * onDismiss: () => void (called after the exit animation; the provider removes it)
 *
 * Hovering or focusing a toast pauses its timer, so it never vanishes
 * while someone is reading it.
 */
function Toast({ message, description, type = "info", duration, onDismiss }) {
  const [closing, setClosing] = useState(false);
  const [paused, setPaused] = useState(false);
  const exitTimer = useRef(null);
  const onDismissRef = useRef(onDismiss);
  const config = TYPES[type] ?? TYPES.info;
  const Icon = config.icon;

  // Always call the latest onDismiss
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  // Play the exit animation, then tell the provider to remove us
  const close = useCallback(() => {
    if (exitTimer.current) return; // already closing
    setClosing(true);
    exitTimer.current = setTimeout(() => onDismissRef.current(), EXIT_MS);
  }, []);

  // Auto-dismiss, unless paused or duration is 0
  useEffect(() => {
    if (!duration || paused) return;
    const id = setTimeout(close, duration);
    return () => clearTimeout(id);
  }, [duration, paused, close]);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  return (
    <div
      role={config.role}
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
        <Icon size={17} />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[0.8rem] font-semibold text-(--text-primary)">
          {message}
        </p>
        {description && (
          <p className="mt-0.5 text-xs text-(--text-secondary)">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;