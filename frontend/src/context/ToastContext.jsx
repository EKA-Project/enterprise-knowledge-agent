import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';
import Toast from '../components/common/Toast.jsx';

const ToastContext = createContext(null);

const MAX_TOASTS = 4;
const DEFAULT_MS = 4000;
const ERROR_MS = 6000;

// Access the global toast methods from any component inside ToastProvider.
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ message, description, type = 'info', duration = DEFAULT_MS }) => {
      const id = nextId.current++;

      setToasts((list) =>
        [...list, { id, message, description, type, duration }].slice(
          -MAX_TOASTS,
        ),
      );

      return id;
    },
    [],
  );

  const api = useMemo(
    () => ({
      showToast,
      dismiss,

      success: (message, options) =>
        showToast({ ...options, message, type: 'success' }),

      error: (message, options) =>
        showToast({
          duration: ERROR_MS,
          ...options,
          message,
          type: 'error',
        }),

      info: (message, options) =>
        showToast({ ...options, message, type: 'info' }),
    }),
    [showToast, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

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