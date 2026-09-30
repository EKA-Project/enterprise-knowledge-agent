import { useState } from "react";

/**
 * ============================================================
 * QUESTIONS ANSWERED CHART
 * ============================================================
 *
 * Displays question-answer activity over time.
 *
 * Features:
 * - Overall answer rate
 * - Total query count
 * - Status badge
 * - Daily activity bars
 * - Hover interaction
 * - Dynamic hover metric
 * - Date range labels
 *
 * The data is kept separate from the visual structure so it
 * can later be replaced with backend/API data.
 */

const questionsData = [
  { label: "Nov 01", value: 34, answerRate: 74, queries: 142 },
  { label: "Nov 03", value: 52, answerRate: 78, queries: 186 },
  { label: "Nov 05", value: 42, answerRate: 80, queries: 210 },
  { label: "Nov 07", value: 48, answerRate: 77, queries: 174 },
  { label: "Nov 09", value: 45, answerRate: 79, queries: 198 },
  { label: "Nov 11", value: 57, answerRate: 82, queries: 224 },
  { label: "Nov 13", value: 54, answerRate: 80, queries: 205 },
  { label: "Nov 15", value: 66, answerRate: 83, queries: 241 },
  { label: "Nov 17", value: 55, answerRate: 78, queries: 217 },
  { label: "Nov 19", value: 61, answerRate: 76, queries: 232 },
  { label: "Nov 21", value: 65, answerRate: 65, queries: 342 },
  { label: "Nov 24", value: 73, answerRate: 81, queries: 258 },
];

/**
 * Default card metric shown before hover.
 */
const defaultMetric = {
  answerRate: 81,
  queries: "4,820",
};

function QuestionsAnsweredChart() {
  /*
   * Nov 21 is highlighted initially so the component
   * matches the reference screenshot.
   */
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /*
   * Find the largest bar value so every bar scales
   * proportionally.
   */
  const maxValue = Math.max(
    ...questionsData.map((item) => item.value),
    1
  );

  /*
   * Use the default overall metric when there is no
   * active hover state.
   */
  const hoveredItem =
    hoveredIndex !== null ? questionsData[hoveredIndex] : null;

  const displayedAnswerRate = hoveredItem
    ? hoveredItem.answerRate
    : defaultMetric.answerRate;

  const displayedQueryText = hoveredItem
    ? `${hoveredItem.label}: ${hoveredItem.queries} queries`
    : `${defaultMetric.queries} queries`;

  return (
    <div>
      {/* ======================================================
          METRIC HEADER
          ====================================================== */}
      <div className="mt-3 flex items-start justify-between">
        {/* Answer percentage + dynamic query information */}
        <div className="flex items-baseline gap-2">
          {/* Answer percentage */}
          <span className="font-serif text-[30px] font-bold leading-none text-[#173f35]">
            {displayedAnswerRate}
          </span>

          {/* Percentage symbol */}
          <span className="font-serif text-[14px] font-medium text-[#173f35]">
            %
          </span>

          {/* Dynamic query information */}
          <span className="ml-1 whitespace-nowrap font-mono text-[11px] text-(--text-secondary)">
            ({displayedQueryText})
          </span>
        </div>

        {/* Status badge */}
        <span className="rounded-full bg-[#dceee6] px-4 py-1.5 text-[11px] font-semibold text-[#315f4f]">
          on track
        </span>
      </div>

      {/* ======================================================
          ACTIVITY BAR CHART
          ====================================================== */}
      <div className="mt-5">
        <div className="flex h-[140px] items-end gap-[10px] border-b border-[#a8d2bf] px-2">
          {questionsData.map((item, index) => {
            /*
             * Scale each bar relative to the highest value.
             */
            const height = (item.value / maxValue) * 50;

            const isHovered = index === hoveredIndex;

            /*
             * Keep the bars in different soft green shades.
             *
             * The hovered bar becomes the darkest green.
             */
            const barColor = isHovered
              ? "#173f35"
              : index % 3 === 0
                ? "#d2e5dc"
                : index % 3 === 1
                  ? "#b5d3c5"
                  : "#9fc4b3";

            return (
              <div
                key={item.label}
                className="relative flex h-full flex-1 cursor-pointer items-end justify-center"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* ==================================================
                    HOVERED BAR VALUE
                    ================================================== */}
                {isHovered && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-[#173f35]"
                    style={{
                      bottom: `calc(${height}% + 7px)`,
                    }}
                  >
                    {item.answerRate}
                  </span>
                )}

                {/* ==================================================
                    BAR
                    ================================================== */}
                <div
                  className="w-full max-w-[23px] rounded-t-[5px] transition-all duration-200"
                  style={{
                    height: `${height}%`,
                    backgroundColor: barColor,
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
          <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-(--text-secondary)">
            NOV 01
          </span>

          <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-(--text-secondary)">
            NOV 24
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAnsweredChart;