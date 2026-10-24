import { useMemo, useState } from 'react';
import { FileText } from 'lucide-react';
import { libraryFavorites } from './KnowledgeData.js';
import FavoriteCard from './FavoriteCard.jsx';
import SectionState, { SkeletonCards } from './SectionState.jsx';

const modes = [
  { id: 'referenced', label: 'Most Referenced' },
  { id: 'viewed', label: 'Most Viewed' },
];

// Library Favorites: top document per department. state = normal | loading | empty | error
export default function LibraryFavorites({ state = 'normal', onReset }) {
  const [mode, setMode] = useState('referenced');

  // "Most Referenced" keeps the design order; "Most Viewed" sorts by view count.
  const items = useMemo(
    () =>
      mode === 'viewed'
        ? [...libraryFavorites].sort((a, b) => b.viewed - a.viewed)
        : libraryFavorites,
    [mode],
  );

  let body;
  if (state === 'loading') {
    body = <SkeletonCards count={4} heightClass="h-44" />;
  } else if (state === 'error') {
    body = (
      <div className="mt-4">
        <SectionState
          variant="error"
          title="Unable to rank library favorites"
          message="A transient telemetry aggregation error occurred."
          actionLabel="Retry"
          onAction={onReset}
        />
      </div>
    );
  } else if (state === 'empty' || items.length === 0) {
    body = (
      <div className="mt-4">
        <SectionState
          title="No favorite documents recorded"
          message="Usage analytics will appear once team members begin referencing library files."
          actionLabel="Reset View"
          onAction={onReset}
        />
      </div>
    );
  } else {
    body = (
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <FavoriteCard key={item.id} item={item} rank={index + 1} mode={mode} />
        ))}
      </div>
    );
  }

  return (
    <section className="relative mt-8 overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      {/* Thin gradient accent along the top edge */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-(--cat-teal) to-(--cat-lavender)" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--border-subtle) pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--cat-mint-bg) text-(--cat-mint)">
            <FileText size={16} />
          </span>
          <div>
            <span className="kb-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-(--primary)">
              What people rely on
            </span>
            <h3 className="kb-serif text-lg font-bold text-(--text-primary)">Library Favorites</h3>
            <p className="text-[11px] text-(--text-muted)">
              The most used document from each of the top departments.
            </p>
          </div>
        </div>

        <div className="flex rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-0.5">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold ${
                mode === m.id ? 'bg-(--primary) text-(--primary-contrast)' : 'text-(--text-secondary)'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {body}
    </section>
  );
}