import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * title: string
 * subtitle?: string
 * onClose: () => void
 * icon?: node (rendered in a colored circle on the left of the header)
 * size?: "sm" | "md" | "lg" (default "md")
 * children: node (the content)
 * footer?: node (buttons, etc.)
 * closeOnClickOutside?: boolean (default true)
 * closeOnEsc?: boolean (default true)
 */
function Modal({
  title,
  subtitle,
  onClose,
  icon,
  size = "md",
  children,
  footer,
  closeOnClickOutside = true,
  closeOnEsc = true,
}) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  // Handle Esc key
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onClose]);

  // Scroll lock
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (closeOnClickOutside && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="presentation"
      >
        <div
          className={`flex w-full ${sizes[size]} flex-col rounded-2xl bg-(--bg-surface) shadow-lg`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header with light blue background */}
          <div className="flex items-start gap-4 border-b border-(--border-subtle) bg-(--primary-light) px-6 py-5">
            {/* Icon (optional) */}
            {icon && <div className="shrink-0">{icon}</div>}

            {/* Title and subtitle */}
            <div className="min-w-0 flex-1">
              <h2
                id="modal-title"
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
              onClick={onClose}
              aria-label="Close modal"
              className="ml-2 shrink-0 rounded-full p-2 text-(--text-muted) transition-all duration-200 hover:-rotate-90 hover:bg-[#fee2e2] hover:text-(--status-danger)"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Content with custom scrollbar */}
          <style>{`
            #modal-scroll-area::-webkit-scrollbar {
              width: 8px;
            }
            #modal-scroll-area::-webkit-scrollbar-track {
              background: transparent;
            }
            #modal-scroll-area::-webkit-scrollbar-thumb {
              background: var(--border-subtle);
              border-radius: 4px;
            }
            #modal-scroll-area::-webkit-scrollbar-thumb:hover {
              background: var(--border-medium);
            }
          `}</style>

          <div
            id="modal-scroll-area"
            className="max-h-[calc(100vh-300px)] flex-1 overflow-y-auto px-6 py-4"
          >
            {children}
          </div>

          {/* Footer with light blue background (matching header) */}
          {footer && (
            <div className="border-t border-(--border-subtle) bg-(--primary-light) px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;