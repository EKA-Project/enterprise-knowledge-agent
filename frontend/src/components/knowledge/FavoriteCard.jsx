import { Link, useNavigate } from 'react-router-dom';
import { FileText, Pencil } from 'lucide-react';
import { categoryThemes } from './KnowledgeData.js';
import { formatStyles } from './CollectionSourceFiles.jsx';

// TODO: change this one line when the Document Summary route is final
const docUrl = (docId) => `/documents/${docId}`;

// One ranked card in Library Favorites. Whole card opens the document.
export default function FavoriteCard({ item, rank, mode }) {
  const navigate = useNavigate();
  const theme = categoryThemes[item.iconTheme];
  const url = docUrl(item.docId);
  const stop = (event) => event.stopPropagation();

  return (
    <article
      title={`Open ${item.title}`}
      onClick={() => navigate(url)}
      className="flex cursor-pointer flex-col rounded-2xl border border-(--border-subtle) bg-(--primary-light) p-5 transition-colors hover:border-(--accent-highlight) hover:bg-(--bg-surface)"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="kb-mono text-[10px] font-semibold text-(--text-muted)">#{rank}</span>
          <span className={`kb-mono truncate rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${theme.icon}`}>
            {item.category}
          </span>
        </div>
        <span className={`kb-mono rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${formatStyles[item.format]}`}>
          {item.format}
        </span>
      </div>

      <h4 className="kb-serif mt-3 text-[15px] font-bold leading-snug text-(--text-primary)">{item.title}</h4>
      <p className="mt-2 text-xs leading-relaxed text-(--text-secondary)">{item.description}</p>

      <ul className="mt-3 space-y-1.5">
        {item.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-[11px] leading-snug text-(--text-secondary)">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-(--primary)" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
        <span className="kb-mono inline-flex items-center gap-1 text-[9px] text-(--text-muted)">
          <FileText size={10} />
          {item.area} • {item.readTime} min read •{' '}
          {mode === 'referenced' ? `Cited ${item.cited}` : `Viewed ${item.viewed}`} times this month
        </span>
        <div className="flex items-center gap-3 text-[11px] font-medium">
          <Link
            to={`/ask-eka?q=${encodeURIComponent(`Tell me about "${item.title}"`)}`}
            onClick={stop}
            className="inline-flex items-center gap-1 text-(--text-secondary) hover:text-(--primary)"
          >
            Ask EKA <Pencil size={9} className="text-(--text-muted)" />
          </Link>
          <Link to={url} onClick={stop} className="font-semibold text-(--primary)">
            Open →
          </Link>
        </div>
      </div>
    </article>
  );
}