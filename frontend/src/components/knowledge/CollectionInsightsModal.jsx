import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Zap } from 'lucide-react';
import { categoryThemes } from './KnowledgeData.js';
import CollectionSourceFiles from './CollectionSourceFiles.jsx';
import CollectionKeywords from './CollectionKeywords.jsx';
import CollectionPrompts from './CollectionPrompts.jsx';

// Must match the animation duration in knowledge.css (.kb-modal-*[data-closing])
const CLOSE_MS = 200;

// Collection Insights modal — opened from the "Collection Insights" pill on a
// category card. Header and footer stay fixed; only the middle part scrolls.
function CollectionInsightsModal({ category, onClose }) {
  const {
    title,
    docCount,
    iconTheme,
    insights,
    sourceFiles,
    keywords,
    prompts,
    documentCategory,
  } = category;
  const theme = categoryThemes[iconTheme];


    // Play the fade-out first, then tell the parent to unmount the modal
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);
  const closeTimer = useRef(null);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    closeTimer.current = setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);


  // Close on Escape
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  
  return (
    <div
      data-closing={closing}
      className="kb-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-(--sidebar-bg)/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} collection insights`}
        data-closing={closing}
        onClick={(event) => event.stopPropagation()}
        className="kb-modal-panel flex max-h-[90vh] w-full max-w-[44rem] flex-col overflow-hidden rounded-3xl bg-(--bg-surface) shadow-(--shadow-lg)"
      >
        {/* Header (fixed) */}
        <header className="flex shrink-0 items-start gap-3 border-b border-(--border-subtle) px-5 py-4">
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
            <h3 className="kb-serif text-lg font-bold text-(--text-primary) sm:text-xl">
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
            onClick={handleClose}
            className="kb-close-btn flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full"
          >
            <X size={14} />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="kb-scroll min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
          
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

          {sourceFiles && <CollectionSourceFiles files={sourceFiles} />}
          {keywords && <CollectionKeywords keywords={keywords} />}
          {prompts && <CollectionPrompts prompts={prompts} />}
        </div>

        {/* Footer actions (fixed) */}
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-9 border-t border-(--border-subtle) bg-(--primary-light) px-5 py-4">
          <Link
            to={`/documents?category=${encodeURIComponent(documentCategory)}`}
            className="cursor-pointer rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-(--primary-contrast) hover:bg-(--primary-hover)"
          >
            Browse Documents →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionInsightsModal;