import { useCallback, useState } from 'react';

let toastCounter = 0;

// tone: 'dark' (default) | 'success'. ToastItem removes each toast after 3.8s on its own.
export default function useToastStack() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((message, tone = 'dark') => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev.slice(-2), { id, message, tone }]); // keep at most 3
    return id;
  }, []);

  return { toasts, push, dismiss };
}