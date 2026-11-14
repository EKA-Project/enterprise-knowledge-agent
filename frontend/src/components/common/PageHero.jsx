import React from "react";

function PageHero({
  eyebrow,
  title,
  description,
  status,
  actions,
  className = "",
}) {
  return (
    <section className={`w-full py-4 ${className}`.trim()}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        {/* Main page introduction sitting directly on the canvas */}
        <div className="min-w-0 max-w-3xl">
          {eyebrow && (
            <p
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-(--text-eyebrow)"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className="mt-1.5 text-3xl font-bold tracking-tight text-(--text-primary) sm:text-4xl md:text-[42px] md:leading-[1.12]"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-sm leading-relaxed text-(--text-secondary) sm:text-[15px]">
              {description}
            </p>
          )}
        </div>

        {/* Right side: Status indicator pill and/or action buttons */}
        {(status || actions) && (
          <div className="flex shrink-0 flex-wrap items-center gap-3 self-start sm:self-end">
            {status && (
              <div
                className="inline-flex items-center gap-2 rounded-full border border-(--border-medium) bg-(--bg-surface-elevated,var(--bg-surface)) px-3.5 py-1.5 text-xs font-medium text-(--text-secondary) transition-colors"
                style={{ fontFamily: "var(--font-sans, inherit)" }}
              >
                {status}
              </div>
            )}

            {actions && (
              <div className="flex items-center gap-2.5">{actions}</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;