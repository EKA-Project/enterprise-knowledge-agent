import { Link } from 'react-router-dom';
import { Zap, RefreshCw, Archive, ArchiveRestore, Link2, ArrowRight } from 'lucide-react';
import '../../../styles/Document.css';
import Badge from '../../common/Badge.jsx';

// Format badge colours come from the theme's --doc-* variables.
const docBadge = {
  PDF: 'border-(--doc-pdf-border) bg-(--doc-pdf-bg) text-(--doc-pdf-color)',
  DOC: 'border-(--doc-doc-border) bg-(--doc-doc-bg) text-(--doc-doc-color)',
  DOCX: 'border-(--doc-docx-border) bg-(--doc-docx-bg) text-(--doc-docx-color)',
  CSV: 'border-(--doc-csv-border) bg-(--doc-csv-bg) text-(--doc-csv-color)',
  MD: 'border-(--doc-md-border) bg-(--doc-md-bg) text-(--doc-md-color)',
  TXT: 'border-(--doc-txt-border) bg-(--doc-txt-bg) text-(--doc-txt-color)',
  FIG: 'border-(--doc-fig-border) bg-(--doc-fig-bg) text-(--doc-fig-color)',
};

const card =
  'rounded-[28px] border border-(--border-subtle) bg-(--bg-surface) p-7 shadow-(--shadow-sm)';

// Action buttons (spec: .doc-summary-action-btn)
const sideBtnBase =
  'group inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-(--radius-pill) border-[1.5px] px-3 py-1.5 text-[11px] font-semibold active:translate-y-0';

const sideIcon =
  'transition-transform duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]';

const reindexBtn =
  `${sideBtnBase} border-[rgba(0,135,102,0.35)] bg-[var(--bg-surface-elevated,var(--bg-surface))] text-(--primary) [transition:all_0.2s_cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1.5px] hover:border-(--primary) hover:bg-(--primary) hover:text-(--primary-contrast) hover:shadow-[0_4px_12px_rgba(0,135,102,0.22)] active:scale-[0.97]`;

const archiveBtn =
  `${sideBtnBase} border-[rgba(217,119,6,0.32)] bg-[var(--bg-surface-elevated,var(--bg-surface))] text-(--text-secondary) [transition:all_0.28s_cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[2.5px] hover:scale-[1.02] hover:border-[#d97706] hover:bg-[linear-gradient(135deg,rgba(254,243,199,0.95),rgba(253,230,138,0.7))] hover:text-[#92400e] hover:shadow-[0_6px_18px_rgba(217,119,6,0.22),0_0_0_2px_rgba(245,158,11,0.16)] active:scale-[0.96] active:shadow-[0_2px_6px_rgba(217,119,6,0.12)]`;

const unarchiveBtn =
  `${sideBtnBase} border-[#10b981] bg-[#f0fdf4] text-[#047857] [transition:all_0.28s_cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[2.5px] hover:scale-[1.02] hover:border-[#059669] hover:bg-[linear-gradient(135deg,#10b981_0%,#059669_100%)] hover:text-white hover:shadow-[0_6px_18px_rgba(16,185,129,0.28),0_0_0_2px_rgba(16,185,129,0.2)] active:scale-[0.96]`;

// Right column: ingestion telemetry (+ admin actions) and suggested questions.
function SummarySidebar({
  telemetry, questions, adminMode, archived, onReindex, onToggleArchive,
  related = [], onOpenRelated,
}) {
  const rows = [
    ['Vector Chunks', telemetry.vectorChunks],
    ['Total Pages', telemetry.totalPages],
    ['Encryption', telemetry.encryption, true],
    ['Tenant Model Isolation', telemetry.tenantIsolation, true],
    ['Index Latency', telemetry.indexLatency],
  ];

  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
      <section className={card}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="doc-heading flex items-center gap-2 text-base font-bold text-(--text-primary)">
            <Zap size={14} className="shrink-0 fill-current text-[#e8801a]" />
            AI Ingestion Telemetry
          </h2>

          <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-600">
            ✓ Indexed
          </span>
        </div>

        <dl className="mt-3">
          {rows.map(([label, value, good]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 border-b border-(--border-subtle) py-2.5 text-xs last:border-b-0"
            >
              <dt className="text-(--text-muted)">{label}</dt>
              <dd
                // Admin sees neutral values, other roles see green on the two security rows
                className={`doc-mono font-semibold ${good && !adminMode ? 'text-(--status-success)' : 'text-(--text-primary)'
                  }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {adminMode && (
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={onReindex} className={reindexBtn}>
              <RefreshCw size={12} className={`${sideIcon} group-hover:rotate-180`} /> Re-index Chunks
            </button>

            <button
              type="button"
              onClick={onToggleArchive}
              className={archived ? unarchiveBtn : archiveBtn}
            >
              {archived ? (
                <ArchiveRestore
                  size={12}
                  className={`${sideIcon} group-hover:-translate-y-0.5 group-hover:rotate-[8deg] group-hover:scale-[1.22]`}
                />
              ) : (
                <Archive
                  size={12}
                  className={`${sideIcon} group-hover:-translate-y-0.5 group-hover:-rotate-[8deg] group-hover:scale-[1.22]`}
                />
              )}
              {archived ? 'Unarchive' : 'Archive'}
            </button>
          </div>
        )}
      </section>

           <section className={card}>
        <h2 className="font-(family-name:--font-serif) text-base font-bold text-(--text-primary)">
          <span aria-hidden="true">💡</span> Suggested Questions
        </h2>
        <div className="mt-3 space-y-2">
          {questions.map((q) => (
            <Link
              key={q}
              to="/ask-eka"
              state={{ question: q }}
              className="flex items-center justify-between gap-2 rounded-(--radius-pill) border border-(--border-subtle) bg-(--bg-surface-subtle) px-4 py-1.5 text-xs font-semibold text-(--text-primary) [transition:background-color_var(--transition-fast),border-color_var(--transition-fast)] hover:border-(--border-medium) hover:bg-(--bg-surface)"
            >
              <span>"{q}"</span>
              <ArrowRight size={12} className="shrink-0 text-(--text-muted)" />
            </Link>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section className={card}>
          <h2 className="flex items-center gap-2 font-(family-name:--font-serif) text-base font-bold text-(--text-primary)">
            <Link2 size={14} className="text-(--text-muted)" /> Related Knowledge
          </h2>
          <div className="mt-3 space-y-2">
            {related.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => onOpenRelated(d)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-(--radius-md) border border-(--border-subtle) bg-(--bg-surface-subtle) px-3 py-2 text-left [transition:background-color_var(--transition-fast),border-color_var(--transition-fast)] hover:border-(--border-medium) hover:bg-(--bg-surface)"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-(--radius-sm) border font-(family-name:--font-mono) text-[8px] font-bold ${
                    docBadge[d.format] ?? 'border-(--border-subtle) bg-(--bg-surface) text-(--text-primary)'
                  }`}
                >
                  {d.format}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-(--text-primary)">{d.title}</span>
                <ArrowRight size={12} className="shrink-0 text-(--text-muted)" />
              </button>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}

export default SummarySidebar;