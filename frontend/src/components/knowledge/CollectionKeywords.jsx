import { Link } from 'react-router-dom';
import { Sparkles, Search } from 'lucide-react';

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
        Top terms indexed for this collection. Click one to run a semantic search.
      </p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((k) => {
          // "istio-mtls" -> "istio mtls" so it reads like a search phrase
          const label = k.term.replace(/-/g, ' ');
          return (
            <Link
              key={k.term}
              to={`/semantic-search?q=${encodeURIComponent(label)}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-(--accent-highlight)/40 bg-(--bg-surface) px-3 py-1 text-xs font-medium text-(--text-primary) transition-colors hover:border-(--primary)"
            >
              <Search size={12} className="shrink-0 text-(--text-muted)" />
              {label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}