import { useState } from "react";

function MyEkaUsageChart({ data }) {
  const [activeRange, setActiveRange] = useState("7");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rangeData = data[activeRange];

  const handleRangeChange = (range) => {
    setActiveRange(range);
    setHoveredIndex(null);
  };

  return (
    <section
      className="rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.65rem] shadow-(--shadow-sm)"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[1.2rem] font-bold text-(--text-primary)">
              My EKA Usage ⭐
            </h3>

            <p className="mt-1 text-[0.78rem] text-(--text-muted)">
              {rangeData.subtext}
            </p>
          </div>

          <div className="flex items-center gap-[0.2rem] rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-[0.2rem]">
            {["7", "30", "90"].map((range) => (
              <button
                key={range}
                type="button"
                className={`rounded-full px-[0.65rem] py-[0.2rem] font-mono text-[0.72rem] transition-all duration-200 ${
                  activeRange === range
                    ? "bg-(--primary) font-bold text-white"
                    : "font-semibold text-(--text-muted)"
                }`}
                onClick={() => handleRangeChange(range)}
              >
                {range} Days
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[0.85rem] flex items-center gap-[1.1rem] border-b border-(--border-subtle) pb-2 font-sans text-[0.76rem]">
          <div className="flex items-center gap-2 text-(--text-secondary)">
            <span className="h-2 w-2 rounded-full bg-(--primary)" />
            Questions
          </div>

          <div className="flex items-center gap-2 text-(--text-secondary)">
            <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
            Documents
          </div>

          <div className="flex items-center gap-2 text-(--text-secondary)">
            <span className="h-2 w-2 rounded-full bg-[#d97706]" />
            Searches
          </div>
        </div>
      </div>

      <div className="mt-4 flex h-[145px] w-full items-end justify-between gap-[0.65rem] border-b border-(--border-subtle) px-1 pb-[0.4rem] pt-2">
        {rangeData.data.map((item, index) => {
          const total = item.questions + item.documents + item.searches;

          const barHeight = (total / rangeData.maxValue) * 100;

          return (
            <div
              key={item.label}
              className="flex h-full flex-1 cursor-pointer flex-col items-center justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Total value */}
              <span className="mb-1 whitespace-nowrap font-mono text-[0.64rem] font-bold text-(--text-primary)">
                {total}
              </span>

              {/* Stacked bar */}
              <div
                className="w-full max-w-[26px] overflow-hidden rounded-[8px_8px_0_0] transition-all duration-[220ms]"
                style={{
                  height: `${barHeight}%`,
                  opacity:
                    hoveredIndex === null
                      ? index === rangeData.data.length - 1
                        ? 1
                        : 0.85
                      : hoveredIndex === index
                        ? 1
                        : 0.35,
                  filter:
                    hoveredIndex === index
                      ? "drop-shadow(0 4px 12px rgba(37,99,235,0.35))"
                      : "none",
                }}
              >
                {/* Searches */}
                <div
                  className="bg-[#d97706]"
                  style={{
                    height: `${(item.searches / total) * 100}%`,
                  }}
                  title={`Searches: ${item.searches}`}
                />

                {/* Documents */}
                <div
                  className="bg-[#2563eb]"
                  style={{
                    height: `${(item.documents / total) * 100}%`,
                  }}
                  title={`Documents: ${item.documents}`}
                />

                {/* Questions */}
                <div
                  className="bg-(--primary)"
                  style={{
                    height: `${(item.questions / total) * 100}%`,
                  }}
                  title={`Questions: ${item.questions}`}
                />
              </div>

              {/* Date / period label */}
              <span className="mt-[0.2rem] whitespace-nowrap font-sans text-[0.65rem] font-semibold text-(--text-muted)">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-3 flex items-center justify-between gap-4 font-sans text-[0.74rem] transition-colors duration-150 ${
          hoveredIndex !== null ? "text-(--primary)" : "text-(--text-muted)"
        }`}
      >
        <span>
          {hoveredIndex !== null ? (
            <>
              <strong>{rangeData.data[hoveredIndex].label}:</strong>{" "}
              {rangeData.data[hoveredIndex].questions} Questions •{" "}
              {rangeData.data[hoveredIndex].documents} Docs •{" "}
              {rangeData.data[hoveredIndex].searches} Searches
            </>
          ) : (
            rangeData.totalText
          )}
        </span>

        <span className="shrink-0 font-semibold text-(--primary)">
          +28% vs previous period
        </span>
      </div>
    </section>
  );
}

export default MyEkaUsageChart;
