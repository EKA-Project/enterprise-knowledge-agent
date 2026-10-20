import { Zap, ChevronRight } from 'lucide-react';
import '../../../styles/Document.css';

const card =
  'rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)';
const eyebrow = 'doc-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-(--primary)';

// Left column of the AI Document Summary tab. Receives data only via props.
function AiSummaryTab({ doc, onReadPage, onSearchTag }) {
  return (
    <div className="space-y-6">
      <section className={`${card} border-l-[3px] border-l-(--primary)`}>
        <p className={eyebrow}>AI Executive Synthesis</p>
        <h2 className="doc-heading mt-2 text-xl font-bold text-(--text-primary)">
          Executive TL;DR Summary
        </h2>
        <p className="mt-2 text-sm leading-6 text-(--text-secondary)">{doc.executiveSummary}</p>
      </section>

      <section className={card}>
        <h2 className="doc-heading text-lg font-bold text-(--text-primary)">
          Key Insights &amp; Critical Takeaways
        </h2>
        <ul className="mt-4 space-y-3">
          {doc.keyInsights.map((text) => (
            <li key={text} className="flex items-start gap-3 text-sm text-(--text-secondary)">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--primary)" />
              {text}
            </li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className="doc-heading text-lg font-bold text-(--text-primary)">
          Extracted Entities &amp; Knowledge Tags
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {doc.entities.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSearchTag(tag)}
              className="cursor-pointer rounded-full border border-(--border-subtle) bg-(--bg-surface) px-3 py-1 text-[11px] font-medium text-(--text-secondary) transition-colors hover:border-(--primary) hover:text-(--primary)"
            >
              # {tag}
            </button>
          ))}
        </div>
      </section>

      <section className={card}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={eyebrow}>AI Section Analysis</p>
            <h2 className="doc-heading mt-1 text-xl font-bold text-(--text-primary)">
              Section-by-Section Synthesis
            </h2>
          </div>
          <p className="doc-mono text-[9px] uppercase tracking-widest text-(--text-muted)">
            {doc.sections.length} sections analyzed
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {doc.sections.map((s) => (
            <article key={s.id} className="rounded-3xl bg-(--bg-surface-subtle) p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="doc-mono text-[9px] uppercase tracking-widest text-(--primary)">
                    Section {s.id} Summary
                  </p>
                  <h3 className="doc-heading mt-1 text-base font-bold text-(--text-primary)">
                    {s.id}. {s.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => onReadPage(s.page)}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-(--bg-surface) px-3 py-1 text-[11px] font-medium text-(--text-primary) shadow-(--shadow-sm) transition-colors hover:bg-(--primary-light)"
                >
                  Read Full Page {s.page} <ChevronRight size={11} />
                </button>
              </div>

              <p className="mt-2 text-[13px] leading-5 text-(--text-secondary)">{s.summary}</p>

              {s.keywords?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.keywords.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center gap-1.5 rounded-full bg-(--bg-surface) px-3 py-1 text-[11px] text-(--text-secondary)"
                    >
                      <Zap size={10} className="text-(--status-warning)" />
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AiSummaryTab;