function MetricCard({
  label,
  value,
  supportingText,
  supportingType,
  icon: Icon,
  iconColor,
  children,
}) {
  const iconColorStyles = {
    orange: "bg-[#fff0e9] text-[#ff8a65]",
    green: "bg-[#eaf7ef] text-[#4caf50]",
    amber: "bg-[#fff6df] text-[#ffb300]",
    purple: "bg-[#f0eafb] text-[#7e57c2]",
  };

  const supportingColorStyles = {
    positive: "text-(--status-success)",
    muted: "text-(--text-muted)",
  };

  return (
    <section className="rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      {/* Top row: metric label and icon badge. */}
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

      {/* Bottom row: primary value and supporting metric. */}
      <div className="mt-7 flex min-h-24 items-end">
        {children ? (
          children
        ) : (
          <div className="flex w-full items-end justify-between gap-4">
            <p className="[font-family:var(--font-serif)] text-[1.85rem] font-bold tracking-tight text-(--text-primary)">
              {value}
            </p>

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
