import { useSyncExternalStore } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

// Small module store so a toast survives page changes (Summary -> Documents)
let toasts = [];
let nextId = 1;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export function dismissDocToast(id) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

// variant: 'success' (green) | 'neutral' (dark navy)  - both from the video
export function showDocToast(message, variant = 'success', duration = 3500) {
  const id = nextId++;
  toasts = [...toasts, { id, message, variant }];
  emit();
  setTimeout(() => dismissDocToast(id), duration);
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

// Mount once per page. Stacks toasts bottom-right, newest at the bottom.
export function DocToastHost() {
  const list = useSyncExternalStore(subscribe, () => toasts);
  if (!list.length) return null;

  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-50 flex flex-col gap-2">
      {list.map((t) => {
        const success = t.variant !== 'neutral';
        const Icon = success ? CheckCircle2 : Info;
        return (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex w-[300px] max-w-[calc(100vw-3rem)] items-center gap-3 rounded-xl py-3 pr-3 pl-4 text-xs font-medium text-white shadow-(--shadow-lg) ${
              success ? 'bg-[#0b5d45]' : 'bg-[#10192b]'
            }`}
          >
            <Icon size={16} className="shrink-0" />
            <span className="flex-1 leading-snug">{t.message}</span>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => dismissDocToast(t.id)}
              className="cursor-pointer text-white/60 hover:text-white"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}