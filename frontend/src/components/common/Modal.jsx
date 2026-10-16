import { useId } from "react";
import { X } from "lucide-react";
import ModalOverlay from "./ModalOverlay.jsx";

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

/**
 * title: node (string or JSX, e.g. a name plus a badge)
 * subtitle?: node
 * eyebrow?: node (small label row above the title, e.g. a section name + badge)
 * icon?: node (icon tile / avatar shown left of the title)
 * onClose: () => void
 * size?: "sm" | "md" | "lg" | "xl" (default "md")
 * children: node (the body; this is the only part that scrolls)
 * footer?: node (omit it and no footer band is drawn)
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
  children,
  footer,
  closeOnClickOutside = true,
  closeOnEsc = true,
}) {
  const titleId = useId();

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
          <div className="flex shrink-0 items-center gap-4 border-b border-(--border-subtle) bg-(--bg-surface) px-6 py-5">
            {icon && <div className="shrink-0">{icon}</div>}

            <div className="min-w-0 flex-1">
              {eyebrow && (
                <div className="mb-1 flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--text-eyebrow)">
                  {eyebrow}
                </div>
              )}

              <h2
                id={titleId}
                className="font-serif text-[1.25rem] font-bold text-(--text-primary)"
              >
                {title}
              </h2>

              {subtitle && (
                <p className="mt-1 text-sm text-(--text-secondary)">
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
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--border-subtle) bg-(--primary-light) text-(--primary) transition-all duration-200 hover:-rotate-90 hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-(--status-danger)"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Body: the only part that scrolls */}
          <div className="modal-scroll min-h-0 flex-1 overflow-y-auto px-6 py-5">
            {children}
          </div>

          {/* Footer: fixed, only drawn when a footer is passed */}
          {footer && (
            <div className="shrink-0 border-t border-(--border-subtle) bg-(--primary-light) px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      )}
    </ModalOverlay>
  );
}

export default Modal;