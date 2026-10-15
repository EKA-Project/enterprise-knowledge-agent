import { AlertTriangle } from "lucide-react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

/**
 * title: string
 * message: string (can include line breaks or be a node)
 * onConfirm: () => void
 * onCancel: () => void
 * confirmLabel?: string (default "Delete")
 * confirmTone?: "danger" | "warning" (default "danger")
 * isLoading?: boolean (disables the confirm button)
 * size?: "sm" | "md" | "lg" (default "sm")
 */
function DestructiveModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
  confirmTone = "danger",
  isLoading = false,
  size = "sm",
}) {
  const confirmButtonClass =
    confirmTone === "danger"
      ? "bg-(--status-danger) text-white hover:bg-[#b91c1c]"
      : "bg-(--status-warning) text-white hover:bg-[#a16207]";

  return (
    <Modal
      title={title}
      onClose={onCancel}
      icon={
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--status-failure-bg) text-(--status-failure)">
          <AlertTriangle size={20} strokeWidth={2} />
        </div>
      }
      size={size}
      closeOnClickOutside={false}
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-[10px] px-4 py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${confirmButtonClass}`}
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {confirmLabel}ing…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      }
    >
      <div className="flex gap-3">
        <div className="shrink-0 rounded-full bg-(--status-failure-bg) p-2.5 text-(--status-failure)">
          <AlertTriangle size={20} strokeWidth={2} />
        </div>

        <div className="flex-1">
          <p className="text-sm text-(--text-primary)">{message}</p>
        </div>
      </div>
    </Modal>
  );
}

export default DestructiveModal;
