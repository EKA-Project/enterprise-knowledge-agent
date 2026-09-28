export default function DocumentsPage() {
  return (
    <div className="px-6 py-6">
      {/* Documents page hero */}
      <section className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-(--text-eyebrow)">
            Ingestion Pipeline
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-(--text-primary)">
            Raw sources, structured.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-(--text-secondary)">
            Bring your organization&apos;s documents into EKA and make them ready
            for intelligent search and question answering.
          </p>
        </div>

        <button
          type="button"
          className="rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
        >
          + Ingest Document
        </button>
      </section>
    </div>
  );
}