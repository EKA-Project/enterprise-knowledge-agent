import { AlertIcon } from './ChatIcons';

// message: readable error text. actionLabel / onAction: e.g. "Resend" or "Reload".
export default function ErrorBubble({ message, actionLabel, onAction }) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] px-5 py-3 text-[12.5px] font-semibold text-[var(--status-danger)]"
    >
      <p className="m-0 flex items-center gap-2">
        <AlertIcon size={15} /> {message}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 cursor-pointer rounded-full border border-[var(--status-danger)] bg-[var(--bg-surface)] px-3.5 py-1 text-[12px] font-bold text-[var(--status-danger)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--status-danger)] hover:text-[var(--primary-contrast)] active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}