import { Link, useNavigate } from 'react-router-dom';
import { FileText, Pencil } from 'lucide-react';
import { categoryThemes } from './KnowledgeData.js';
import { formatStyles } from './CollectionSourceFiles.jsx';

// TODO: change this one line when the Document Summary route is final
const docUrl = (docId) => `/documents/${docId}`;


// Category chip colours measured from the reference video
// (they sit on a light-blue card, so they differ a little from the dept-card tokens).
const chipStyles = {
  lavender: 'bg-[#ede7fc] text-[#6d28d9]',
  mint: 'bg-[#dbf9e5] text-[#15803d]',
  teal: 'bg-[#ccf9fc] text-[#0e7490]',
  gold: 'bg-[#fcf9e7] text-[#b45309]',
  rose: 'bg-[#ffeef1] text-[#be123c]',
};

// Top-right format badge (square tile). Unknown formats fall back to the shared style.
const badgeStyles = {
  PDF: 'bg-(--status-danger-bg) text-(--status-danger)',
  FIG: 'bg-[#f3e7ff] text-[#7e22ce]',
};

// One ranked card in Library Favorites. Whole card opens the document.
export default function FavoriteCard({ item, rank, mode }) {
  const navigate = useNavigate();
  const theme = categoryThemes[item.iconTheme];
  const url = docUrl(item.docId);
  const stop = (event) => event.stopPropagation();
  const question = `Tell me about "${item.title}"`;

  return (
    <article
      title={`Open ${item.title}`}
      onClick={() => navigate(url)}
      className="flex cursor-pointer flex-col rounded-2xl border border-(--border-subtle) bg-(--primary-light) p-5 transition-colors hover:border-(--accent-highlight) hover:bg-(--bg-surface)"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {/* White rank circle */}
          <span className="kb-mono flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-(--bg-surface) text-[9px] font-semibold text-(--primary)">
            #{rank}
          </span>
          <span
            className={`kb-mono truncate rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${
              chipStyles[item.iconTheme] ?? theme.icon
            }`}
          >
            {item.category}
          </span>
        </div>
        {/* Format badge */}
        <span
          className={`kb-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[9px] font-bold ${
            badgeStyles[item.format] ?? formatStyles[item.format]
          }`}
        >
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

      {/* Footer: separator line above the meta row */}
      <div className="mt-auto pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-(--border-subtle) pt-3">
          <span className="kb-mono inline-flex items-center gap-1 text-[9px] text-(--text-muted)">
            <FileText size={10} />
            {item.area} • {item.readTime} min read •{' '}
            {mode === 'referenced' ? `Cited ${item.cited}` : `Viewed ${item.viewed}`} times this month
          </span>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <Link
              to="/ask-eka"
              state={{ question }}
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
      </div>
    </article>
  );
}