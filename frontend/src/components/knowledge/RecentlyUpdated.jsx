import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { recentUpdates, categoryThemes } from './KnowledgeData.js';
import { formatStyles } from './CollectionSourceFiles.jsx';
import SectionState, { SkeletonRows } from './SectionState.jsx';

// TODO: change this one line when the Document Summary route/ids are final
const docUrl = (docId) => `/documents/${docId}`;

// Recently Updated: latest document revisions. state = normal | loading | empty | error
export default function RecentlyUpdated({ state = 'normal', onReset }) {
  const isEmpty = state === 'empty' || recentUpdates.length === 0;

  let body;
  if (state === 'loading') {
    body = <SkeletonRows count={5} />;
  } else if (state === 'error') {
    body = (
      <div className="mt-4">
        <SectionState
          variant="error"
          title="Unable to load recent updates"
          message="Could not fetch revision history from knowledge index."
          actionLabel="Retry"
          onAction={onReset}
        />
      </div>
    );
  } else if (isEmpty) {
    body = (
      <div className="mt-4">
        <SectionState
          title="No recent updates found"
          message="Document revisions will be listed as they are uploaded or re-indexed."
          actionLabel="Reset View"
          onAction={onReset}
        />
      </div>
    );
  } else {
    body = (
      <ul className="mt-4 space-y-2">
        {recentUpdates.map((item) => (
          <li key={item.id}>
            <Link
              to={docUrl(item.docId)}
              title={`Open ${item.title}`}
              className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-(--border-subtle) bg-(--primary-light) px-3.5 py-2.5 transition-colors hover:border-(--accent-highlight) hover:bg-(--bg-surface)"
            >
              <span className={`kb-mono rounded-md px-1.5 py-0 text-[9px] font-semibold ${formatStyles[item.format]}`}>
                {item.format}
              </span>
              <span className="kb-serif min-w-0 text-[13px] font-bold text-(--text-primary)">{item.title}</span>
              <span className={`kb-mono rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${categoryThemes[item.iconTheme].icon}`}>
                {item.category}
              </span>

              <span className="ml-auto flex items-center gap-2.5">
                <span className="kb-mono text-[10px] text-(--text-muted)">{item.when}</span>
                {item.isNew && (
                  <span className="rounded-full bg-(--status-success-bg) px-1.5 py-0.5 text-[8px] font-semibold uppercase text-(--status-success)">
                    New
                  </span>
                )}
                <ArrowRight size={12} className="text-(--text-muted)" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="mt-8 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--cat-teal-bg) text-(--cat-teal)">
            <Clock size={16} />
          </span>
          <div>
            <span className="kb-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-(--primary)">
              Latest amendments
            </span>
            <h3 className="kb-serif text-lg font-bold text-(--text-primary)">Recently Updated</h3>
          </div>
        </div>
        <span className="kb-mono text-[10px] text-(--text-muted)">Top 5 verified document revisions</span>
      </div>

      {body}
    </section>
  );
}