import { Link } from 'react-router-dom';
import { Sparkles, Pencil } from 'lucide-react';

// Searchable terms for one collection, shown as plain search pills
export default function CollectionKeywords({ keywords = [] }) {
  return (
    <section>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h3 className="kb-mono text-[0.65rem] font-semibold uppercase tracking-widest text-(--text-eyebrow)">
          Main semantic search words &amp; entities
        </h3>
        <span className="inline-flex items-center gap-1 text-xs text-(--text-muted)">
          <Sparkles size={12} /> Click any term to search
        </span>
      </div>
      <p className="mb-3 text-xs text-(--text-secondary)">
        Primary semantic concepts and neural keywords for this collection. Click any word to launch an instant semantic search.
      </p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((k, i) => (
          <Link
            key={k.term}
            to={`/semantic-search?q=${encodeURIComponent(k.term)}`}
            className={`group inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors hover:border-(--primary) ${
              i < 2
                ? 'border-(--accent-highlight) bg-(--primary-light)'
                : 'border-(--border-subtle) bg-(--bg-surface)'
            }`}
          >
            <span className="kb-mono font-medium text-(--text-primary)">#{k.term}</span>
            <span
              className={`kb-mono rounded-full px-1.5 text-[10px] text-(--text-secondary) ${
                i < 2 ? 'border border-(--accent-highlight) bg-(--bg-surface)' : 'bg-(--bg-surface-subtle)'
              }`}
            >
              {k.score}
            </span>
            <Pencil size={10} className="text-(--text-muted) group-hover:text-(--primary)" />
          </Link>
        ))}
      </div>
    </section>
  );
}