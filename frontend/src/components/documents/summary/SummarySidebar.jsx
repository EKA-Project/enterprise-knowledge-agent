import { Link } from 'react-router-dom';
import { Zap, RefreshCw, Archive, ArchiveRestore, Link2, ArrowRight } from 'lucide-react';
import { formatStyles } from '../shared/DocumentCard';
import '../../../styles/Document.css';

const card =
  'rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)';

const actionBtn =
  'inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-(--border-medium) bg-(--bg-surface) px-3 py-1.5 text-[11px] font-semibold text-(--text-primary) transition-colors hover:bg-(--bg-surface-subtle)';

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
        <div className="flex items-start justify-between gap-3">
          <h2 className="doc-heading flex items-center gap-2 text-base font-bold text-(--text-primary)">
            {adminMode && <Zap size={14} className="shrink-0 fill-current text-[#e8801a]" />}
            AI Ingestion Telemetry
          </h2>
          {adminMode && (
            <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-600">
              ✓ Indexed
            </span>
          )}
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
            <button
              type="button"
              onClick={onReindex}
              className={`${actionBtn} group text-[#1b79a8] hover:border-[#1f718e] hover:bg-[#1f718e] hover:text-white`}
            >
              <RefreshCw size={12} className="text-sky-600 group-hover:text-white" /> Re-index Chunks
            </button>
            <button type="button" onClick={onToggleArchive} className={actionBtn}>
              {archived ? (
                <ArchiveRestore size={12} className="text-(--text-secondary)" />
              ) : (
                <Archive size={12} className="text-(--text-secondary)" />
              )}
              {archived ? 'Unarchive' : 'Archive'}
            </button>
          </div>
        )}
      </section>

      <section className={card}>
        <h2 className="doc-heading text-base font-bold text-(--text-primary)">
          <span aria-hidden="true">💡</span> Suggested Questions
        </h2>
        <div className="mt-3 space-y-2">
          {questions.map((q) => (
            <Link
              key={q}
              to="/ask-eka"
              state={{ question: q }}
              className="flex items-center justify-between gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1.5 text-xs font-semibold text-(--text-primary) transition-colors hover:bg-[#e1f0fa]"
            >
              <span>"{q}"</span>
              <ArrowRight size={12} className="shrink-0 text-(--text-muted)" />
            </Link>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section className={card}>
          <h2 className="doc-heading flex items-center gap-2 text-base font-bold text-(--text-primary)">
            <Link2 size={14} className="text-(--text-muted)" /> Related Knowledge
          </h2>
          <div className="mt-3 space-y-2">
            {related.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => onOpenRelated(d)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-[#dce8f2] bg-white px-3 py-2 text-left transition-colors hover:border-transparent hover:bg-[#e1f0fa]"
              >
                <span
                  className={`doc-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[8px] font-bold ${formatStyles[d.format] ?? 'bg-(--bg-surface) text-(--text-primary)'
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