function MetricCard({
  label,
  value,
  supportingText,
  supportingType,
  icon: Icon,
  iconColor,
  children,
}) {
  // ─────────────────────────────────────────────
  // Icon color variants
  // ─────────────────────────────────────────────

  const iconColorStyles = {
    orange: "bg-[#fff0e9] text-[#ff8a65]",
    green: "bg-[#eaf7ef] text-[#4caf50]",
    amber: "bg-[#fff6df] text-[#ffb300]",
    purple: "bg-[#f0eafb] text-[#7e57c2]",
  };

  // ─────────────────────────────────────────────
  // Supporting text color variants
  // ─────────────────────────────────────────────

  const supportingColorStyles = {
    positive: "text-(--status-success)",
    muted: "text-(--text-muted)",
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <section className="rounded-3xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      {/* ─────────────────────────────────────────
          Header: metric label and icon
      ───────────────────────────────────────── */}

      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-(--text-secondary)">
          {label}
        </p>

        {Icon && (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              iconColorStyles[iconColor]
            }`}
          >
            <Icon size={18} strokeWidth={1.8} />
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────
          Content: metric value or custom content
      ───────────────────────────────────────── */}

      <div className="mt-7 flex min-h-24 items-end pb-4">
        {children ? (
          children
        ) : (
          <div className="flex w-full items-end justify-between gap-4">
            {/* Primary metric value */}
            <p className="font-serif text-[2rem] font-bold tracking-tight text-(--text-primary)">
              {value}
            </p>

            {/* Supporting metric */}
            {supportingText && (
              <p
                className={`pb-1 text-sm font-semibold ${
                  supportingColorStyles[supportingType]
                }`}
              >
                {supportingText}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default MetricCard;
