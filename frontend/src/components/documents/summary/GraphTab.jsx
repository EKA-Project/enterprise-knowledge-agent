import { formatStyles } from '../shared/DocumentCard';
import '../../../styles/Document.css';

const section =
  'rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)';
const item =
  'block w-full cursor-pointer rounded-3xl border border-(--border-subtle) bg-(--bg-surface) text-left transition-shadow hover:shadow-(--shadow-md)';

// Connected Knowledge Graph tab: linked KB articles + sister documents.
// Navigation is handled by the parent through callbacks.
function GraphTab({ articles, sisters, onOpenArticle, onOpenDocument }) {
  return (
    <div className="space-y-6">
      <section className={section}>
        <h2 className="doc-heading text-lg font-bold text-(--text-primary)">
          Connected Knowledge Articles
        </h2>
        <div className="mt-4 space-y-3">
          {articles.map((a) => (
            <button key={a.id} type="button" onClick={() => onOpenArticle(a)} className={`${item} p-6`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="doc-heading text-[15px] font-bold text-(--text-primary)">
                  {a.title}
                </h3>
                {a.verified && (
                  <span className="shrink-0 rounded-full bg-(--status-verified-bg) px-3 py-0.5 text-[10px] font-semibold text-(--status-success)">
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] leading-5 text-(--text-secondary)">{a.excerpt}</p>
            </button>
          ))}
        </div>
      </section>

      <section className={section}>
        <h2 className="doc-heading text-lg font-bold text-(--text-primary)">Sister Documents</h2>
        <div className="mt-4 space-y-3">
          {sisters.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onOpenDocument(d)}
              // min-h copies the tall cards seen in the reference video
              className={`${item} flex min-h-56 items-start gap-3 p-6`}
            >
              <span
                className={`doc-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[9px] font-bold ${
                  formatStyles[d.format] ?? 'bg-(--bg-surface-subtle) text-(--text-primary)'
                }`}
              >
                {d.format}
              </span>
              <div className="min-w-0">
                <h3 className="doc-heading text-[15px] font-bold leading-5 text-(--text-primary)">
                  {d.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-(--text-muted)">
                  {d.category} • {d.author}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GraphTab;