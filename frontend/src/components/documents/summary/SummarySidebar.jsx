import { Link } from 'react-router-dom';
import '../../../styles/Document.css';

const card =
  'rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)';

// Right column: ingestion telemetry + suggested questions (sticky on desktop).
function SummarySidebar({ telemetry, questions }) {
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
        <h2 className="doc-heading text-base font-bold text-(--text-primary)">
          AI Ingestion Telemetry
        </h2>
        <dl className="mt-3">
          {rows.map(([label, value, good]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 border-b border-(--border-subtle) py-2.5 text-xs last:border-b-0"
            >
              <dt className="text-(--text-muted)">{label}</dt>
              <dd
                className={`doc-mono font-semibold ${
                  good ? 'text-(--status-success)' : 'text-(--text-primary)'
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
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
              className="block rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1.5 text-xs text-(--text-secondary) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
            >
              “{q}”
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default SummarySidebar;