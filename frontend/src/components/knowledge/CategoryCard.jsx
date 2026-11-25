import { Link, useNavigate } from 'react-router-dom';
// EKA-EDIT: theme now comes from the department's colorKey/iconKey, not KnowledgeData
import { getDepartmentTheme } from '../../config/departmentTheme.js';
import { Zap, MessageSquare } from 'lucide-react';

function CategoryCard({ category, onOpenInsights }) {
  const { title, documentCount, memberCount, colorKey, iconKey } = category;
  const { Icon, color, softBg } = getDepartmentTheme(colorKey, iconKey);
  const navigate = useNavigate();

  // Documents page, pre-filtered by department name
  const browseUrl = `/documents?category=${encodeURIComponent(title)}`;

  return (
    <article
      onClick={() => navigate(browseUrl)}
      // EKA-EDIT: top accent colour is inline now
      style={{ borderTopColor: color }}
      className="cursor-pointer rounded-3xl border border-t-2 border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm) transition-shadow hover:shadow-(--shadow-md)"
    >
      <div className="flex items-start justify-between">
        {/* EKA-EDIT: icon chip colours inline */}
        <span style={{ color, background: softBg }} className="flex h-10 w-10 items-center justify-center rounded-xl">
          <Icon size={18} />
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenInsights(category);
          }}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-[11px] font-semibold text-(--primary) transition-colors hover:border-(--primary-hover) hover:bg-(--primary-hover) hover:text-(--primary-contrast)"
        >
          <Zap size={11} className="fill-current text-[#e8801a]" />
          Collection Insights
        </button>
      </div>

      <h3 className="kb-serif mt-4 text-lg font-bold text-(--text-primary)">{title}</h3>

      <div className="mt-2 flex items-center gap-2 text-xs text-(--text-secondary)">
        <span className="kb-mono rounded-full border border-(--border-subtle) bg-(--primary-light) px-2.5 py-0.5 text-[10px]">
          {documentCount} documents
        </span>
        {/* EKA-EDIT: "verified sources" removed (blueprint), members count instead */}
        <span>• {memberCount} members</span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-(--border-subtle) pt-4">
        <Link
          to={browseUrl}
          onClick={(event) => event.stopPropagation()}
          className="text-sm font-semibold text-(--text-primary)"
        >
          Browse collection <span className="text-(--primary)">→</span>
        </Link>
        <button
          type="button"
          aria-label={`Ask EKA about ${title}`}
          onClick={(event) => event.stopPropagation()}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-(--primary-light) text-(--primary)"
        >
          <MessageSquare size={14} />
        </button>
      </div>
    </article>
  );
}

export default CategoryCard;