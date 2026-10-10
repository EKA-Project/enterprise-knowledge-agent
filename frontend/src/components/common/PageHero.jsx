function PageHero({ eyebrow, title, description, status, actions, bare = false }) {
  // Default look is a boxed card. `bare` renders the hero straight on the
  // page background, for pages whose design has no card around the hero.
  const boxClass = bare
    ? ''
    : 'rounded-3xl border border-(--border-medium) bg-(--bg-surface) px-10 py-9 shadow-(--shadow-sm)';

  return (
    <section className={boxClass}>
      <div className="flex items-end justify-between gap-8">
        {/* Main page introduction. */}
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-(--text-eyebrow)">
            {eyebrow}
          </p>

          <h1 className="mt-3 [font-family:var(--font-serif)] text-4xl font-black tracking-tight text-(--text-primary)">
            {title}
          </h1>

          <p className="mt-2 text-sm text-(--text-secondary)">
            {description}
          </p>
        </div>

        {/* Page-specific status indicator. */}
        {status && (
          <div className="shrink-0 rounded-full border border-(--border-medium) bg-(--primary-light) px-5 py-2.5 text-sm font-medium text-(--text-primary)">
            {status}
          </div>
        )}
        {/* Free-form right-side content, e.g. buttons or small widgets. */}
        {actions && (
          <div className="flex shrink-0 items-center gap-3">{actions}</div>
        )}
      </div>
    </section>
  );
}

export default PageHero;