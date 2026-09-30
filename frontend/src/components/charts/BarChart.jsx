import { useMemo, useState } from "react";

/**
 * BarChart Component
 *
 * Renders an interactive bar chart scaled relative to the highest data point.
 *
 * @param {Array<{ label: string, value: number }>} props.data - Array of data points.
 * @param {number|null} [props.activeIndex=null] - Index of a pre-selected/active bar.
 * @param {function} [props.onHover] - Callback receiving the hovered item, or null on leave.
 */
function BarChart({ data = [], activeIndex = null, onHover }) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  // Track which bar is actively hovered by user
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // ---------------------------------------------------------------------------
  // Computations
  // ---------------------------------------------------------------------------

  // Compute maximum value for relative bar heights; memoized to prevent recalculation on hover
  const maxValue = useMemo(() => {
    if (!data.length) return 1;
    return Math.max(...data.map((item) => item.value), 1);
  }, [data]);

  // ---------------------------------------------------------------------------
  // Event Handlers
  // ---------------------------------------------------------------------------

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    onHover?.(data[index]);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    onHover?.(null);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex h-[150px] items-end justify-center gap-6 border-b border-(--border-subtle) pb-[2px]">
      {data.map((item, index) => {
        // Derive visual states
        const height = (item.value / maxValue) * 100;
        const isActive = index === activeIndex;
        const isHovered = index === hoveredIndex;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={item.label}
            className="relative flex h-full flex-1 flex-col justify-end"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Scaled Bar */}
            <div
              className={`
    relative
    w-[85%] self-center rounded-t-[14px]
    transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]
    ${isHovered || isActive ? "bg-(--primary)" : "bg-(--border-medium)"}
  `}
              style={{
                height: `${height}%`,
                opacity: isDimmed ? 0.45 : 1,
                filter: isHovered
                  ? "drop-shadow(0 4px 12px var(--primary-glow))"
                  : "none",
              }}
            >
              {/* Value sits directly above its own bar */}
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-(--text-secondary)">
                {item.value.toLocaleString()}
              </span>
            </div>

            {/* Bottom Category Label */}
            <span
              className={`
                mt-2 text-center text-[0.76rem] font-semibold
                ${isActive || isHovered ? "text-(--primary)" : "text-(--text-muted)"}
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

export default BarChart;
