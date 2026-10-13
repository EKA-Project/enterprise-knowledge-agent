import { Link } from 'react-router-dom';
import { categoryThemes } from './KnowledgeData.js';
import { Zap, MessageSquare } from 'lucide-react';


function CategoryCard({ category, onOpenInsights }) {
  const { icon: Icon, iconTheme, title, docCount, sourceCount, documentCategory } = category;
  const theme = categoryThemes[iconTheme];

  return (
    <article
      className={`rounded-3xl border border-t-2 border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm) transition-shadow hover:shadow-(--shadow-md) ${theme.accent}`}
    >
      {/* Icon + insights pill */}
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.icon}`}>
          <Icon size={18} />
        </span>
        <button
          type="button"
          onClick={() => onOpenInsights(category)}
          className="inline-flex items-center gap-1 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--primary)"
        >
          <Zap size={11} className="text-amber-500" />
          Collection Insights
        </button>
      </div>

      <h3 className="kb-serif mt-4 text-lg font-bold text-(--text-primary)">{title}</h3>

      <div className="mt-2 flex items-center gap-2 text-xs text-(--text-secondary)">
        <span className="kb-mono rounded-full bg-(--primary-light) px-2.5 py-0.5 text-[10px]">
          {docCount} documents
        </span>
        <span>• {sourceCount} verified sources</span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-(--border-subtle) pt-4">
        {/* Opens Documents pre-filtered by this category */}
        <Link
          to={`/documents?category=${encodeURIComponent(documentCategory)}`}
          className="text-sm font-semibold text-(--text-primary)"
        >
          Browse collection <span className="text-(--primary)">→</span>
        </Link>
        <button
          type="button"
          aria-label={`Ask EKA about ${title}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)"
        >
          <MessageSquare size={14} />
        </button>
      </div>
    </article>
  );
}

export default CategoryCard;