import { useId } from "react";
import { X } from "lucide-react";
import ModalOverlay from "./ModalOverlay.jsx";

const sizes = {
  sm: "max-w-sm", // 384px
  md: "max-w-lg", // 512px
  lg: "max-w-2xl", // 672px
  xl: "max-w-4xl", // 896px
};

// Spacing and text sizes for the two densities
const density = {
  regular: {
    header: "gap-4 px-6 py-5",
    title: "text-[1.25rem]",
    subtitle: "mt-1 text-sm",
    close: "h-9 w-9",
    closeIcon: 18,
    body: "px-6 py-5",
    footer: "px-6 py-4",
  },
  compact: {
    header: "gap-3 px-5 py-3.5",
    title: "text-base",
    subtitle: "mt-0.5 text-xs",
    close: "h-8 w-8",
    closeIcon: 16,
    body: "px-5 py-4",
    footer: "px-5 py-3",
  },
};

/**
 * title: node (string or JSX, e.g. a name plus a badge)
 * subtitle?: node
 * eyebrow?: node (small label row above the title, e.g. a section name + badge)
 * icon?: node (icon tile / avatar shown left of the title)
 * onClose: () => void
 * size?: "sm" | "md" | "lg" | "xl" (default "md")
 * compact?: boolean (smaller header, padding and text; default false)
 * children: node (the body; this is the only part that scrolls)
 * footer?: node | (close) => node (omit it and no footer band is drawn;
 *   use the function form so a Cancel/Close button gets the exit animation)
 * closeOnClickOutside?: boolean (default true)
 * closeOnEsc?: boolean (default true)
 */
function Modal({
  title,
  subtitle,
  eyebrow,
  icon,
  onClose,
  size = "md",
  compact = false,
  children,
  footer,
  closeOnClickOutside = true,
  closeOnEsc = true,
}) {
  const titleId = useId();
  const d = compact ? density.compact : density.regular;

  return (
    <ModalOverlay
      onClose={onClose}
      closeOnClickOutside={closeOnClickOutside}
      closeOnEsc={closeOnEsc}
    >
      {(close) => (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`modal-card flex max-h-[calc(100dvh-2rem)] w-full ${sizes[size]} flex-col overflow-hidden rounded-3xl bg-(--bg-surface) shadow-lg`}
        >
          {/* Header: fixed */}
          <div
            className={`flex shrink-0 items-center border-b border-(--border-subtle) bg-(--bg-surface) ${d.header}`}
          >
            {icon && <div className="shrink-0">{icon}</div>}

            <div className="min-w-0 flex-1">
              {eyebrow && (
                <div className="mb-1 flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--text-eyebrow)">
                  {eyebrow}
                </div>
              )}

              <h2
                id={titleId}
                className={`font-serif font-bold text-(--text-primary) ${d.title}`}
              >
                {title}
              </h2>

              {subtitle && (
                <p className={`text-(--text-secondary) ${d.subtitle}`}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Close button: turns red + rotates on hover */}
            <button
              type="button"
              onClick={close}
              aria-label="Close dialog"
              title="Close dialog"
              className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--border-subtle) bg-(--primary-light) text-(--primary) transition-all duration-200 hover:-rotate-90 hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-(--status-danger) ${d.close}`}
            >
              <X size={d.closeIcon} strokeWidth={2} />
            </button>
          </div>

          {/* Body: the only part that scrolls */}
          <div className={`modal-scroll min-h-0 flex-1 overflow-y-auto ${d.body}`}>
            {children}
          </div>

          {/* Footer: fixed, only drawn when a footer is passed */}
          {footer && (
            <div
              className={`shrink-0 border-t border-(--border-subtle) bg-(--primary-light) ${d.footer}`}
            >
              {typeof footer === "function" ? footer(close) : footer}
            </div>
          )}
        </div>
      )}
    </ModalOverlay>
  );
}

export default Modal;