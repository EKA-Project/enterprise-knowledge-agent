import { useState } from "react";

const FALLBACK_COLOR = "#2563eb";

/**
 * data: {
 *   title, subtext, badge?, unit,
 *   items: [{ id, label, count, color?, icon?, initials?, percent? }],
 *   footer?: { label, highlight, highlightColor?, note? }
 * }
 *   icon     - emoji shown before the label
 *   initials - shows a small initials avatar instead of an emoji
 *   percent  - optional, shown after the count and in the hover text
 * Bar lengths are computed from count (top row = 100%).
 * headerAction - optional node on the right of the header (e.g. a range toggle)
 */
function RankedBarList({ data, headerAction }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { title, subtext, badge, unit = "queries", items, footer } = data;

  const max = Math.max(...items.map((item) => item.count), 1);
  const hovered = hoveredIndex !== null ? (items[hoveredIndex] ?? null) : null;
  const getColor = (item) => item.color ?? FALLBACK_COLOR;

  return (
    <section
      className="flex flex-col justify-between rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.65rem] shadow-(--shadow-sm)"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div className="min-w-0 grow basis-60">
            <h3 className="font-serif text-[1.2rem] font-bold text-(--text-primary)">
              {title}
            </h3>

            {/* Hover text adopts the hovered row's color */}
            <p
              className={`mt-1 truncate text-[0.78rem] transition-all duration-150 ${
                hovered ? "font-semibold" : "text-(--text-muted)"
              }`}
              style={{ color: hovered ? getColor(hovered) : undefined }}
            >
              {hovered
                ? `${hovered.label}: ${hovered.count} ${unit}${
                    hovered.percent !== undefined
                      ? ` (${hovered.percent}% of total)`
                      : ""
                  }`
                : subtext}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {badge && (
              <span className="rounded-full bg-(--bg-surface-subtle) px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-(--text-secondary)">
                {badge}
              </span>
            )}
            {headerAction}
          </div>
        </div>

        {/* Rows */}
        <div className="mt-4 flex flex-col gap-[0.7rem]">
          {items.map((item, index) => {
            const color = getColor(item);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-1.5 text-[0.7rem] font-semibold text-(--text-primary)">
                    {item.initials && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--accent-chip) font-mono text-[0.55rem] font-bold text-(--accent-chip-text)">
                        {item.initials}
                      </span>
                    )}
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </span>

                  <span className="font-mono text-[0.72rem] font-bold text-(--text-primary)">
                    {item.count}
                    {item.percent !== undefined && (
                      <span className="ml-1 font-normal text-(--text-muted)">
                        ({item.percent}%)
                      </span>
                    )}
                  </span>
                </div>

                <div className="h-2.25 w-full overflow-hidden rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle)">
                  <div
                    className="h-full rounded-full transition-all duration-250"
                    style={{
                      width: `${(item.count / max) * 100}%`,
                      backgroundColor: color,
                      transform: isHovered ? "scaleX(1.02)" : "scaleX(1)",
                      filter: isHovered
                        ? `drop-shadow(0 2px 8px ${color}73)`
                        : "none",
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer (only when the page provides one) */}
      {footer && (
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-(--border-subtle) pt-[0.4rem] text-[0.74rem]">
          <span className="text-(--text-muted)">
            {footer.label}{" "}
            <strong style={{ color: footer.highlightColor }}>
              {footer.highlight}
            </strong>
          </span>

          {footer.note && (
            <span className="shrink-0 text-[.68rem] font-semibold text-(--primary)">
              {footer.note}
            </span>
          )}
        </div>
      )}
    </section>
  );
}

export default RankedBarList;
