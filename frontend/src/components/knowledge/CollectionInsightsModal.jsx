import { useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import { categoryThemes } from './KnowledgeData.js';

// Collection Insights modal — opened from the "Collection Insights" pill on a
// category card. Step 2 builds the shell (header + overview); source files,
// keywords and footer actions are added in the next steps.
function CollectionInsightsModal({ category, onClose }) {
  const { title, docCount, iconTheme, insights } = category;
  const theme = categoryThemes[iconTheme];

  // Close on Escape
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--sidebar-bg)/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} collection insights`}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-[44rem] flex-col overflow-y-auto rounded-3xl bg-(--bg-surface) shadow-(--shadow-lg)"
      >
        {/* Header */}
        <header className="flex items-start gap-3 border-b border-(--border-subtle) px-5 py-4">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}>
            <Zap size={16} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="kb-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-(--primary)">
                Collection Insights
              </span>
              <span className="rounded-full bg-(--status-success-bg) px-2 py-0.5 text-[9px] font-semibold uppercase text-(--status-success)">
                Live Repository
              </span>
            </div>
            <h3 className="kb-serif text-xl font-bold text-(--text-primary)">
              {title} — Collection Insights
            </h3>
            <p className="mt-0.5 text-xs text-(--text-muted)">
              {docCount} Active Documents
              {insights?.domainLead && ` • Domain Lead: ${insights.domainLead}`}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--bg-surface-subtle) text-(--text-secondary)"
          >
            <X size={14} />
          </button>
        </header>

        <div className="space-y-5 px-5 py-5">
          {/* Collection overview */}
          <section className="rounded-2xl border-l-[3px] border-l-(--accent-highlight) bg-(--bg-surface-subtle) p-4">
            <div className="flex items-center justify-between">
              <span className="kb-mono text-[10px] uppercase tracking-[0.12em] text-(--text-secondary)">
                Collection Overview
              </span>
              <span className="kb-mono text-[10px] text-(--text-muted)">
                {insights?.updatedLabel}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-(--text-primary)">
              {insights?.overview ?? 'No overview available yet.'}
            </p>
          </section>

          {/* Step 3: source files list  |  Step 4: keywords, prompts, footer */}
        </div>
      </div>
    </div>
  );
}

export default CollectionInsightsModal;