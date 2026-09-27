function PageHero({ eyebrow, title, description, status }) {
  return (
    <section className="rounded-3xl border border-(--border-medium) bg-(--bg-surface) px-10 py-9 shadow-(--shadow-sm)">
      <div className="flex items-end justify-between gap-8">
        {/* Main page introduction. */}
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
            {eyebrow}
          </p>

          <h1 className="mt-3 font-(--font-serif) text-5xl font-semibold tracking-tight text-(--text-primary)">
            {title}
          </h1>

          <p className="mt-2 text-base text-(--text-secondary)">
            {description}
          </p>
        </div>

        {/* Page-specific status indicator. */}
        {status && (
          <div className="shrink-0 rounded-full border border-(--border-medium) bg-(--primary-light) px-5 py-2.5 text-sm font-medium text-(--text-primary)">
            {status}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;