import { useState } from "react";

function LineAreaChart({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activePoint = hoveredIndex !== null ? data.points[hoveredIndex] : null;

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section
      className="rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) p-[1.35rem_1.6rem] shadow-(--shadow-sm)"
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="mb-[0.85rem] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-[0.55rem]">
            <h3 className="font-serif text-[1.2rem] font-bold leading-[1.2] tracking-[-0.015em] text-(--text-primary)">
              {data.title}
            </h3>

            <span className="inline-flex items-center gap-1 rounded-full bg-(--primary-soft) px-[0.55rem] py-[0.12rem] font-mono text-[0.7rem] text-(--primary)">
              <span>{data.badgeIcon}</span>
              {data.badgeText}
            </span>
          </div>

          <p
            className={`mt-[0.2rem] min-h-5 text-[0.78rem] leading-5 transition-colors ${
              activePoint ? "text-[#10b981]" : "text-(--text-muted)"
            }`}
          >
            {activePoint
              ? `📌 ${activePoint.date}: ${activePoint.value} Queries resolved (${
                  activePoint.value >= 5 ? "Peak activity" : "Normal activity"
                })`
              : data.defaultSubtext}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 font-mono text-[0.76rem] text-(--text-muted)">
          <span className="h-2 w-2 rounded-full bg-(--primary)" />
          {data.legendLabel}
        </div>
      </div>

      {/* Graph */}
      <div className="relative mt-2 h-40 w-full">
        {/* Hover guideline */}
        {activePoint && (
          <div
            className="pointer-events-none absolute bottom-7.5 top-0 z-2 w-px bg-(--border-medium) opacity-75 transition-[left] duration-100"
            style={{
              left: `${(activePoint.x / 700) * 100}%`,
            }}
          />
        )}

        {/* SVG */}
        <svg
          className="absolute left-0 top-0 block h-31.25 w-full overflow-visible"
          viewBox="0 0 700 125"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="20"
            x2="700"
            y2="20"
            stroke="var(--border-subtle)"
            strokeDasharray="4 4"
          />

          <line
            x1="0"
            y1="60"
            x2="700"
            y2="60"
            stroke="var(--border-subtle)"
            strokeDasharray="4 4"
          />

          <line
            x1="0"
            y1="100"
            x2="700"
            y2="100"
            stroke="var(--border-medium)"
          />

          {/* Velocity curve */}
          <path
            d={data.svgPath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Interactive points */}
        {data.points.map((point, index) => {
          const isHovered = index === hoveredIndex;

          return (
            <button
              key={point.date}
              type="button"
              aria-label={`${point.date}: ${point.value} queries`}
              className={`absolute z-5 cursor-pointer -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
                isHovered
                  ? "h-3.75 w-3.75 border-2 border-white bg-(--primary) shadow-[0_0_12px_var(--primary-glow)]"
                  : "h-2.75 w-2.75 border-[2.5px] border-(--bg-surface) bg-(--primary) shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
              }`}
              style={{
                left: `${(point.x / 700) * 100}%`,
                top: `${point.y}px`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
            />
          );
        })}

        {/* Tooltip */}
        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 min-w-26.25 rounded-[9px] border border-gray-700 bg-gray-900 px-3 py-[0.45rem] shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            style={{
              left: `${(activePoint.x / 700) * 100}%`,
              top: activePoint.y > 60 ? activePoint.y - 55 : activePoint.y + 10,
              transform:
                activePoint.x / 700 > 0.75
                  ? "translateX(-115%)"
                  : "translateX(2%)",
            }}
          >
            <div className="text-[0.76rem] font-semibold leading-[1.1] text-gray-400">
              {activePoint.date}
            </div>

            <div className="mt-[0.2rem] font-mono text-[0.82rem] font-bold text-(--primary)">
              queries : {activePoint.value}
            </div>
          </div>
        )}
      </div>

      {/* Axis labels */}
      <div className="mt-[0.4rem] flex justify-between px-2 font-sans text-[0.72rem] font-semibold text-(--text-muted)">
        {data.axisLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  );
}

export default LineAreaChart;
