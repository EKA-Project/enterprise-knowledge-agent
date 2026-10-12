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
            <h3 className="font-serif text-[1.25rem] font-bold leading-[1.2] tracking-[-0.015em] text-(--text-primary)">
              {data.title}
            </h3>

            {/* Mint badge pill */}
            <span className="inline-flex items-center gap-1 rounded-full border border-[#a7f3d0] bg-[#e6f4ea] px-[0.3rem] py-[0.09rem] font-mono text-[0.6rem] font-semibold text-[#0d9488]">
              <span>{data.badgeIcon}</span>
              {data.badgeText}
            </span>
          </div>

          {/* Subtext: Uses muted text by default, turns green only on hover */}
          <p
            className={`mt-1 min-h-5 text-[0.7rem] font-light leading-5 transition-colors ${
              activePoint ? "text-[#0d9488]" : "text-(--text-muted)"
            }`}
          >
            {activePoint
              ? `📌 ${activePoint.date}: ${activePoint.value} Queries resolved (${
                  activePoint.value >= 5 ? "Peak activity" : "Normal activity"
                })`
              : data.defaultSubtext}
          </p>
        </div>

        {/* Legend: Green dot with muted label text */}
        <div className="flex items-center gap-2 font-mono text-[.68rem] text-(--text-muted)">
          <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
          <span>{data.legendLabel}</span>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative mt-2 h-40 w-full">
        {/* Sky-blue vertical guideline indicator */}
        {activePoint && (
          <div
            className="pointer-events-none absolute bottom-7 top-0 z-2 w-px bg-[#7dd3fc] opacity-80 transition-[left] duration-100"
            style={{
              left: `${(activePoint.x / 700) * 100}%`,
            }}
          />
        )}

        {/* SVG Curve */}
        <svg
          className="absolute left-0 top-0 block h-31.25 w-full overflow-visible"
          viewBox="0 0 700 125"
          preserveAspectRatio="none"
        >
          {/* Dotted grid lines */}
          <line
            x1="0"
            y1="25"
            x2="700"
            y2="25"
            stroke="var(--border-subtle)"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="65"
            x2="700"
            y2="65"
            stroke="var(--border-subtle)"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="105"
            x2="700"
            y2="105"
            stroke="var(--border-subtle)"
            strokeDasharray="4 4"
          />

          {/* Teal/Green line path */}
          <path
            d={data.svgPath}
            fill="none"
            stroke="#0d9488"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Interactive Points */}
        {data.points.map((point, index) => {
          const isHovered = index === hoveredIndex;

          return (
            <button
              key={point.date}
              type="button"
              aria-label={`${point.date}: ${point.value} queries`}
              className={`absolute z-5 cursor-pointer -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
                isHovered
                  ? "h-4 w-4 border-2 border-white bg-[#0d9488] ring-4 ring-[#0d9488]/30 shadow-md"
                  : "h-2.5 w-2.5 border-2 border-(--bg-surface) bg-[#0d9488] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
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
            className="pointer-events-none absolute z-20 rounded-lg bg-[#111827] px-2 py-1 text-left shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            style={{
              left: `${(activePoint.x / 700) * 100}%`,
              top: activePoint.y > 60 ? activePoint.y - 62 : activePoint.y + 14,
              transform:
                activePoint.x / 700 > 0.75
                  ? "translateX(-105%)"
                  : "translateX(8%)",
            }}
          >
            <div className="font-sans text-[0.72rem] font-semibold text-[#9ca3af]">
              {activePoint.date}
            </div>

            <div className="mt-0.5 font-mono text-[0.8rem] font-bold tracking-tight text-[#34d399]">
              queries : {activePoint.value}
            </div>
          </div>
        )}
      </div>

      {/* Axis labels */}
      <div className="mt-1 flex justify-between px-1 font-sans text-[0.7rem] font-semibold text-(--text-muted)">
        {data.axisLabels.map((label, idx) => (
          <span
            key={label}
            className={
              idx === data.axisLabels.length - 1
                ? "font-bold text-[#0284c7]"
                : ""
            }
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

export default LineAreaChart;
