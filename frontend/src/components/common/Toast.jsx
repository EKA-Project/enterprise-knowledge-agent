import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import "../../styles/toast.css";

/* ==========================================================================
   Toast  (components/common/Toast.jsx)
   --------------------------------------------------------------------------
   One notification card. The ToastProvider (context/ToastContext.jsx) owns
   the list and the stack position; this file only draws a single toast.

   Look: deep midnight card (same as the sidebar), serif message, sans
   description, small coloured icon, countdown line along the bottom.

   Props:
     message      string   the main line
     description  string   optional quieter second line
     type         "success" | "error" | "info"   (default "info")
     duration     ms before it closes itself; 0 = stays until closed
     onDismiss    () => void   called after the exit animation (provider removes it)
   ========================================================================== */

/* ---------- Settings ---------- */

// Keep in sync with the exit animation in styles/toast.css
const EXIT_MS = 150;

// Icon, icon colour, countdown-line colour and accessibility role per type.
// The colours are brighter tints so they stay readable on the dark card.
// Errors use role="alert" so screen readers announce them immediately.
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

function Toast({ message, description, type = "info", duration, onDismiss }) {
  /* ---------- State and refs ---------- */
  const [closing, setClosing] = useState(false); // true while the exit animation plays
  const exitTimer = useRef(null);
  const onDismissRef = useRef(onDismiss);

  const config = TYPES[type] ?? TYPES.info;
  const Icon = config.icon;

  /* ---------- Closing ---------- */

  // Always call the latest onDismiss, even if the provider re-rendered meanwhile
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  // Play the exit animation, then ask the provider to remove this toast.
  // Called by the X button AND by the countdown line when it finishes.
  const close = useCallback(() => {
    if (exitTimer.current) return; // already closing
    setClosing(true);
    exitTimer.current = setTimeout(() => onDismissRef.current(), EXIT_MS);
  }, []);

  // Don't leave a timer behind if the toast is removed early
  useEffect(() => () => clearTimeout(exitTimer.current), []);

  /* ---------- Layout ---------- */
  return (
    <div
      role={config.role}
      data-closing={closing || undefined}
      className="toast group pointer-events-auto relative flex w-fit max-w-full items-start gap-2.5 self-end overflow-hidden rounded-2xl border border-(--sidebar-border) bg-(--sidebar-bg) py-2.5 pr-3 pl-3.5 font-sans shadow-[0_10px_30px_rgba(8,32,53,0.35)]"
    >
      {/* Small coloured icon (no chip, for a lighter look) */}
      <Icon
        size={16}
        strokeWidth={2.25}
        className={`mt-px shrink-0 ${config.color}`}
      />

      {/* Text: serif message (like the modal titles), sans description */}
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

      {/* Close button: faint until the toast is hovered or focused */}
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="-mr-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--sidebar-text-muted) opacity-50 transition hover:bg-(--sidebar-hover-bg) hover:text-(--sidebar-text) group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <X size={12} />
      </button>

      {/* Countdown line along the bottom edge. It shrinks over `duration`;
          when the animation ends, the toast closes. duration = 0 means the toast
          stays until closed, so no line is drawn. */}
      {duration > 0 && (
        <span
          aria-hidden="true"
          onAnimationEnd={close}
          style={{ "--toast-ms": `${duration}ms` }}
          className={`toast-bar absolute inset-x-0 bottom-0 h-0.5 origin-left ${config.bar}`}
        />
      )}
    </div>
  );
}

export default Toast;