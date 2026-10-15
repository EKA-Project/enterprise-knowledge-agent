import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * title: string
 * subtitle?: string
 * onClose: () => void
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
          className={`w-full ${sizes[size]} rounded-2xl bg-(--bg-surface) shadow-lg`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-(--border-subtle) px-6 py-4">
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

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="ml-2 shrink-0 rounded-full p-1 text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-4">
            {children}
          </div>

          {/* Footer (optional) */}
          {footer && (
            <div className="border-t border-(--border-subtle) bg-(--bg-surface-subtle) px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;