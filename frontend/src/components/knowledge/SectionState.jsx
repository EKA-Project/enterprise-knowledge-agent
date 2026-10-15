import { Clock, AlertCircle } from 'lucide-react';

// Empty / error box shown inside a Knowledge Base section when it has nothing to show.
// The action button only appears when onAction is passed (e.g. "Reset View" / "Retry").
export default function SectionState({ variant = 'empty', title, message, actionLabel, onAction }) {
  const button = onAction && (
    <button
      type="button"
      onClick={onAction}
      className="cursor-pointer rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1 text-xs font-semibold text-(--text-primary)"
    >
      {actionLabel}
    </button>
  );

  if (variant === 'error') {
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-(--status-danger)/20 bg-(--status-danger-bg) px-5 py-4"
      >
        <AlertCircle size={18} className="shrink-0 text-(--status-danger)" />
        <div className="min-w-0 flex-1 text-center">
          <p className="text-sm font-semibold text-(--status-danger)">{title}</p>
          <p className="mt-0.5 text-[11px] text-(--status-danger)">{message}</p>
        </div>
        {button}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-(--border-subtle) bg-(--primary-light) px-5 py-8 text-center">
      <Clock size={22} className="text-(--text-muted)" />
      <p className="mt-1 text-sm font-semibold text-(--text-primary)">{title}</p>
      <p className="text-[11px] text-(--text-muted)">{message}</p>
      {button && <div className="mt-3">{button}</div>}
    </div>
  );
}