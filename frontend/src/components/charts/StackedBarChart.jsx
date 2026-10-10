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
 * Below the bars, a role legend and the week-over-week
 * growth indicator are rendered by this component.
 */

/*
 * Total users for one period (employee + manager + admin).
 */
const totalUsers = (d) => d.employee + d.manager + d.admin;

/*
 * Percent change between the last two periods.
 * Returns null when it can't be calculated.
 */
function getGrowthPercent(data) {
  if (data.length < 2) return null;

  const prev = totalUsers(data[data.length - 2]);
  const curr = totalUsers(data[data.length - 1]);

  if (prev === 0) return null;

  return Math.round(((curr - prev) / prev) * 100);
}

function StackedBarChart({ data = [], onHover }) {
  // Tracks which bar is currently being hovered.
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Growth between the last two periods (null if not calculable).
  const growth = getGrowthPercent(data);

  /*
   * Find the largest combined value.
   *
   * This keeps all bars proportional to the highest
   * value in the dataset.
   */
  const maxValue = Math.max(...data.map(totalUsers), 1);

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
    <div>
      {/* ==================================================
          BARS
          ================================================== */}
      <div className="flex h-[150px] items-end justify-between border-b border-(--border-subtle) px-4 pb-[2px]">
        {data.map((item, index) => {
          /*
           * Calculate the total users for this period.
           */
          const total = totalUsers(item);

          /*
           * Scale the bar height relative to
           * the highest value in the dataset.
           */
          const height = (total / maxValue) * 70;

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
                  ${isHovered ? "text-[#2563eb]" : "text-(--text-secondary)"}
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
                  flex w-11
                  flex-col justify-end overflow-hidden
                  rounded-t-[14px]
                  transition-all duration-220
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
                  ${isHovered ? "text-[#2563eb]" : "text-(--text-muted)"}
                `}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ==================================================
          ROLE LEGEND + GROWTH INDICATOR
          ================================================== */}
      <div className="mt-3 flex items-center justify-between">
        {/* Role legend */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-(--text-muted)">
            <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
            Emp
          </span>

          <span className="flex items-center gap-1.5 text-[10px] font-medium text-(--text-muted)">
            <span className="h-2 w-2 rounded-full bg-[#60a5fa]" />
            Mgr
          </span>

          <span className="flex items-center gap-1.5 text-[10px] font-medium text-(--text-muted)">
            <span className="h-2 w-2 rounded-full bg-[#93c5fd]" />
            Adm
          </span>
        </div>

        {/* Week-over-week growth indicator */}
        {growth !== null && (
          <span
            className={`text-[11px] font-semibold ${
              growth >= 0 ? "text-[#2563eb]" : "text-red-500"
            }`}
          >
            {growth > 0 ? "+" : ""}
            {growth}% vs last week
          </span>
        )}
      </div>
    </div>
  );
}

export default StackedBarChart;