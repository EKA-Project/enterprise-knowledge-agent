import { useState } from "react";

/**
 * ============================================================
 * QUESTIONS ANSWERED CHART
 * ============================================================
 *
 * Displays question-answer activity over time.
 *
 * Features:
 * - Overall answer rate + total query count
 * - Status badge
 * - 4-tier green bars (each bar has a `tier` from 1 to 4)
 * - Hover: active bar turns dark pine with a glow,
 *   all other bars dim to 45% opacity
 * - Leaving the chart resets everything
 *
 * The data is kept separate from the visual structure so it
 * can later be replaced with backend/API data.
 */

/*
 * Bar colors by tier.
 * 1 = Soft Mint, 2 = Medium Sage, 3 = Forest Green, 4 = Deep Emerald
 */
const TIER_COLORS = {
  1: "#a4cbb7",
  2: "#6ca88b",
  3: "#588b70",
  4: "#3d7a5d",
};

const ACTIVE_BAR_COLOR = "#163830";

const questionsData = [
  { label: "Nov 01", value: 34, answerRate: 74, queries: 142, tier: 1 },
  { label: "Nov 03", value: 52, answerRate: 78, queries: 186, tier: 3 },
  { label: "Nov 05", value: 42, answerRate: 80, queries: 210, tier: 1 },
  { label: "Nov 07", value: 48, answerRate: 77, queries: 174, tier: 2 },
  { label: "Nov 09", value: 45, answerRate: 79, queries: 198, tier: 2 },
  { label: "Nov 11", value: 57, answerRate: 82, queries: 224, tier: 3 },
  { label: "Nov 13", value: 54, answerRate: 80, queries: 205, tier: 2 },
  { label: "Nov 15", value: 66, answerRate: 83, queries: 241, tier: 4 },
  { label: "Nov 17", value: 55, answerRate: 78, queries: 217, tier: 2 },
  { label: "Nov 19", value: 61, answerRate: 76, queries: 232, tier: 4 },
  { label: "Nov 21", value: 65, answerRate: 65, queries: 342, tier: 3 },
  { label: "Nov 24", value: 73, answerRate: 81, queries: 258, tier: 4 },
];

/**
 * Default card metric shown when nothing is hovered.
 */
const defaultMetric = {
  answerRate: 81,
  queries: "4,820",
};

function QuestionsAnsweredChart() {
  // Index of the bar currently hovered (null = none).
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /*
   * Largest bar value, so every bar scales proportionally.
   */
  const maxValue = Math.max(...questionsData.map((item) => item.value), 1);

  const hoveredItem =
    hoveredIndex !== null ? questionsData[hoveredIndex] : null;

  const displayedAnswerRate = hoveredItem
    ? hoveredItem.answerRate
    : defaultMetric.answerRate;

  const displayedQueryText = hoveredItem
    ? `${hoveredItem.label}: ${hoveredItem.queries} queries`
    : `${defaultMetric.queries} queries`;

  return (
    <div onMouseLeave={() => setHoveredIndex(null)}>
      {/* ======================================================
          METRIC HEADER
          ====================================================== */}
      <div className="mt-3 flex items-start justify-between">
        <div className="flex items-baseline gap-2">
          {/* Answer percentage */}
          <span className="font-serif text-[30px] font-bold leading-none text-[#14352b]">
            {displayedAnswerRate}
          </span>

          {/* Percent symbol */}
          <span className="font-serif text-[14px] font-medium text-[#3f6d57]">
            %
          </span>

          {/* Query info: muted when idle, dark + bold on hover */}
          <span
            className={`ml-1 whitespace-nowrap font-mono text-[11px] transition-colors duration-200 ${
              hoveredItem
                ? "font-bold text-[#163830]"
                : "font-normal text-[#527363]"
            }`}
          >
            ({displayedQueryText})
          </span>
        </div>

        {/* Status badge */}
        <span className="rounded-full bg-[#d6eae0] px-4 py-1.5 text-[11px] font-semibold text-[#254a39]">
          on track
        </span>
      </div>

      {/* ======================================================
          ACTIVITY BAR CHART
          ====================================================== */}
      <div className="mt-5">
        <div className="flex h-[170px] items-end gap-[10px] border-b-[1.2px] border-[#b8d7c7] px-2">
          {questionsData.map((item, index) => {
            const height = (item.value / maxValue) * 65;

            const isHovered = index === hoveredIndex;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <div
                key={item.label}
                className="relative flex h-full flex-1 cursor-pointer items-end justify-center"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Floating value above the active bar */}
                {isHovered && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-[#163830]"
                    style={{ bottom: `calc(${height}% + 7px)` }}
                  >
                    {item.answerRate}
                  </span>
                )}

                {/* Bar */}
                <div
                  className="w-full max-w-[23px] rounded-t-[5px] transition-all duration-200"
                  style={{
                    height: `${height}%`,
                    backgroundColor: isHovered
                      ? ACTIVE_BAR_COLOR
                      : TIER_COLORS[item.tier],
                    opacity: isDimmed ? 0.45 : 1,
                    filter: isHovered
                      ? "drop-shadow(0 4px 10px rgba(22, 56, 48, 0.35))"
                      : "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ======================================================
            DATE RANGE
            ====================================================== */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-[#527363]">
            NOV 01
          </span>

          <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-[#527363]">
            NOV 24
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAnsweredChart;
