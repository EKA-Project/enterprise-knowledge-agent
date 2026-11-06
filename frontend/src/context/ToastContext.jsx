import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/common/Toast.jsx";

const ToastContext = createContext(null);

const MAX_TOASTS = 4; // the oldest is dropped when a fifth arrives
const DEFAULT_MS = 4000;
const ERROR_MS = 6000; // errors stay a little longer

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ message, description, type = "info", duration = DEFAULT_MS }) => {
      const id = nextId.current++;
      setToasts((list) =>
        [...list, { id, message, description, type, duration }].slice(-MAX_TOASTS),
      );
      return id;
    },
    [],
  );

  // Stable object, so components using useToast() don't re-render on every toast
  const api = useMemo(
    () => ({
      showToast,
      dismiss,
      success: (message, options) =>
        showToast({ ...options, message, type: "success" }),
      error: (message, options) =>
        showToast({ duration: ERROR_MS, ...options, message, type: "error" }),
      info: (message, options) =>
        showToast({ ...options, message, type: "info" }),
    }),
    [showToast, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Bottom-right stack. z-60 puts it ABOVE modals (the modal overlay is z-50).
          pointer-events-none lets clicks pass through the empty space around toasts.
          To centre it: replace `right-4` with `left-1/2 -translate-x-1/2`. */}
      {createPortal(
        <div
          role="region"
          aria-label="Notifications"
          className="pointer-events-none fixed right-4 bottom-4 z-60 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onDismiss={() => dismiss(toast.id)}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export default ToastContext;