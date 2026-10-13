import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

// Sample AI prompts for one collection
export default function CollectionPrompts({ prompts = [] }) {
  return (
    <section>
      <h3 className="kb-mono mb-3 text-[0.65rem] font-semibold uppercase tracking-widest text-(--text-eyebrow)">
        Sample AI prompts
      </h3>
      <div className="flex flex-col items-start gap-2">
        {prompts.map((p) => (
          <Link
            key={p}
            to={`/ask-eka?q=${encodeURIComponent(p)}`}
            className="group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-2 text-left text-xs font-semibold text-(--text-primary) transition-colors hover:border-(--accent-highlight)"
          >
            <MessageSquare size={14} className="shrink-0 text-(--cat-lavender)" />
            <span>{p}</span>
            <ArrowUpRight size={12} className="shrink-0 text-(--text-muted) group-hover:text-(--primary)" />
          </Link>
        ))}
      </div>
    </section>
  );
}