import DocumentContent from '../shared/DocumentContent.jsx';

function AdminDocument() {

  return (
    <>
      {/* Admin-specific document header */}
      <section className="mb-6 flex items-end justify-between gap-8">
        <div>
          <p className="doc-mono text-xs font-semibold uppercase tracking-[0.16em] text-(--text-eyebrow)">
            Ingestion Repository / 6 Docs
          </p>

          <h1 className="doc-heading mt-2 text-4xl font-bold text-(--text-primary)">
            Raw sources, structured.
          </h1>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Every playbook, compliance standard, and contract that feeds EKA&apos;s intelligence.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="rounded-full border border-(--border-medium) bg-(--bg-surface) px-5 py-2.5 text-xs font-semibold text-(--text-primary)">
            EKA STORAGE: 14.2 GB / 50 GB
            <span className="ml-2 text-(--text-muted)">28.4% Capacity</span>
          </div>

          <button
            type="button"
            className="rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
          >
            + Ingest Document
          </button>
        </div>
      </section>

      {/* Admin-only document health overview */}
      <section className="mb-6 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[10px] border-(--primary)">
            <span className="font-serif text-2xl font-black text-(--text-primary)">
              92%
            </span>
          </div>

          <div className="min-w-[210px]">
            <h2 className="doc-heading text-lg font-bold text-(--text-primary)">
              Document Health Overview
            </h2>
            <p className="mt-2 font-mono text-xs text-(--text-primary)">
              92% Healthy
            </p>
            <p className="mt-2 text-xs leading-5 text-(--text-secondary)">
              Real-time ingestion &amp; health telemetry across 578 total repository files
            </p>
          </div>

          <div className="grid flex-1 grid-cols-4 gap-3">
            <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4">
              <p className="text-xs font-semibold text-(--text-secondary)">Indexed</p>
              <p className="mt-2 text-2xl font-black text-(--text-primary)">531</p>
              <p className="mt-1 text-[10px] text-(--text-muted)">92%</p>
            </div>

            <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4">
              <p className="text-xs font-semibold text-(--text-secondary)">Processing</p>
              <p className="mt-2 text-2xl font-black text-(--text-primary)">23</p>
              <p className="mt-1 text-[10px] text-(--text-muted)">4%</p>
            </div>

            <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4">
              <p className="text-xs font-semibold text-(--text-secondary)">Outdated</p>
              <p className="mt-2 text-2xl font-black text-(--text-primary)">10</p>
              <p className="mt-1 text-[10px] text-(--text-muted)">2%</p>
            </div>

            <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4">
              <p className="text-xs font-semibold text-(--text-secondary)">Failed</p>
              <p className="mt-2 text-2xl font-black text-(--text-primary)">14</p>
              <p className="mt-1 text-[10px] text-(--text-muted)">2%</p>
            </div>
          </div>
        </div>
      </section>

      <DocumentContent adminMode />
    </>
  );
}
export default AdminDocument;