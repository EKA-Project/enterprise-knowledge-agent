import { useState } from "react";

/**
 * ============================================================
 * STACKED BAR CHART
 * ============================================================
 *
 * Displays role-based user activity as stacked bars.
 *
 * Each bar represents one time period.
 *
 * Bar segments:
 * - Employee → #2563eb
 * - Manager  → #60a5fa
 * - Admin    → #93c5fd
 *
 * The total number of users is displayed above each bar.
 */

function StackedBarChart({ data = [], activeIndex = null, onHover }) {
  // Tracks which bar is currently being hovered.
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /*
   * Find the largest combined value.
   *
   * This keeps all bars proportional to the highest
   * value in the dataset.
   */
  const maxValue = Math.max(
    ...data.map((item) => item.employee + item.manager + item.admin),
    1,
  );

  /*
   * Store the currently hovered item and notify
   * the parent component.
   */
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    onHover?.(data[index]);
  };

  /*
   * Reset the hover state when the pointer leaves
   * the current bar.
   */
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    onHover?.(null);
  };

  return (
    <div className="flex h-[105px] items-end justify-between border-b border-(--border-subtle) px-4 pb-[2px]">
      {data.map((item, index) => {
        /*
         * Calculate the total users for this period.
         */
        const total = item.employee + item.manager + item.admin;

        /*
         * Scale the bar height relative to
         * the highest value in the dataset.
         */
        const height = (total / maxValue) * 100;

        const isActive = index === activeIndex;
        const isHovered = index === hoveredIndex;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={item.label}
            className="relative flex h-full w-[52px] cursor-pointer flex-col items-center justify-end"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {/* ==================================================
                TOTAL VALUE
                ==================================================

                Displays the combined number directly above
                the corresponding stacked bar.
                ================================================== */}
            <span
              className={`
    absolute left-1/2 -translate-x-1/2
    whitespace-nowrap
    text-[11px] font-semibold
    transition-all duration-200
    ${isHovered || isActive ? "text-[#2563eb]" : "text-(--text-secondary)"}
  `}
              style={{
                bottom: `calc(${height}% + 26px)`,
                opacity: isDimmed ? 0.45 : 1,
                zIndex: 10,
              }}
            >
              {total}
            </span>

            {/* ==================================================
                STACKED BAR
                ==================================================

                The three segments form one continuous bar.

                Only the top of the complete bar is rounded.
                ================================================== */}
            <div
              className={`
                flex w-[44px]
                flex-col justify-end overflow-hidden
                rounded-t-[14px]
                transition-all duration-[220ms]
                ease-[cubic-bezier(0.16,1,0.3,1)]
              `}
              style={{
                height: `${height}%`,
                opacity: isDimmed ? 0.45 : 1,
                filter: isHovered
                  ? "drop-shadow(0 4px 10px rgba(37, 99, 235, 0.45))"
                  : "none",
              }}
            >
              {/* Employee segment */}
              <div
                className="bg-[#2563eb]"
                style={{
                  height: `${(item.employee / total) * 100}%`,
                }}
              />

              {/* Manager segment */}
              <div
                className="bg-[#60a5fa]"
                style={{
                  height: `${(item.manager / total) * 100}%`,
                }}
              />

              {/* Admin segment */}
              <div
                className="bg-[#93c5fd]"
                style={{
                  height: `${(item.admin / total) * 100}%`,
                }}
              />
            </div>

            {/* ==================================================
                TIME LABEL
                ================================================== */}
            <span
              className={`
                mt-2 text-center text-[0.68rem] font-semibold
                ${
                  isActive || isHovered
                    ? "text-[#2563eb]"
                    : "text-(--text-muted)"
                }
              `}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default StackedBarChart;
