import { Clock, AlertCircle } from 'lucide-react';

// Skeleton rows (Recently Updated loading)
export function SkeletonRows({ count = 5 }) {
  return (
    <ul className="mt-4 space-y-2" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex animate-pulse items-center justify-between rounded-xl bg-(--primary-light) px-4 py-3">
          <span className="h-2 w-1/3 rounded bg-(--bg-surface)" />
          <span className="h-2 w-10 rounded bg-(--bg-surface)" />
        </li>
      ))}
    </ul>
  );
}

// Skeleton cards (Library Favorites / Glossary loading)
export function SkeletonCards({ count = 4, heightClass = 'h-32' }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse space-y-3 rounded-2xl bg-(--primary-light) p-5 ${heightClass}`}>
          <span className="block h-2.5 w-1/4 rounded bg-(--bg-surface)" />
          <span className="block h-2.5 w-3/4 rounded bg-(--bg-surface)" />
          <span className="block h-2.5 w-1/2 rounded bg-(--bg-surface)" />
        </div>
      ))}
    </div>
  );
}

// Empty / error box shown inside a Knowledge Base section.
// The action button only appears when onAction is passed ("Reset View", "Retry"...).
export default function SectionState({ variant = 'empty', icon: Icon = Clock, title, message, actionLabel, onAction }) {
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
      <Icon size={22} className="text-(--text-muted)" />
      <p className="mt-1 text-sm font-semibold text-(--text-primary)">{title}</p>
      <p className="text-[11px] text-(--text-muted)">{message}</p>
      {button && <div className="mt-3">{button}</div>}
    </div>
  );
}