export default function DocumentSummaryPage() {
  return (
    <section className="w-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
        AI SYNTHESIS & FULL READER
      </p>

      <h2 className="mt-2 text-3xl font-bold text-(--text-primary)">
        Document Summary
      </h2>

      <p className="mt-2 text-sm text-(--text-muted)">
        Review document content, key insights, and ingestion details.
      </p>

      <div className="mt-6 min-h-44 rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-6">
        Document summary content will appear here.
      </div>
    </section>
  );
}