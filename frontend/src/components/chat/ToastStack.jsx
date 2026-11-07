// Adjust this path to wherever your common folder is relative to this file.
import ToastItem from '../common/Toast.jsx';

export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          animationClass="chat-toast-in" // slide-in keyframes live in chat.css
        />
      ))}
    </div>
  );
}