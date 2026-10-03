function PageHero({ eyebrow, title, description, status }) {
  return (
    <section className="rounded-3xl border border-(--border-medium) bg-(--bg-surface) px-10 py-9 shadow-(--shadow-sm)">
      <div className="flex items-end justify-between gap-8">
        {/* Main page introduction. */}
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
            {eyebrow}
          </p>

        <h1 className="mt-1 font-serif text-[39px] font-black tracking-tight text-(--text-primary)">
            {title}
          </h1>

          <p className="mt-1 text-sm text-(--text-secondary)">
            {description}
          </p>
        </div>

        {/* Page-specific status indicator. */}
        {status && (
          <div className="shrink-0 rounded-full border border-(--border-medium) bg-(--primary-light) px-3 py-2 text-[12px] font-medium text-(--text-primary)">
            {status}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;