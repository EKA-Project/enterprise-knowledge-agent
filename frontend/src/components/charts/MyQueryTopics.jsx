import { useState } from "react";

function MyQueryTopics({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      className="flex flex-col justify-between rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.65rem] shadow-(--shadow-sm)"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-[1.2rem] font-bold text-(--text-primary)">
              {data.title}
            </h3>

            <p
              className={`mt-1 truncate text-[0.78rem] transition-all duration-150 ${
                hoveredIndex !== null
                  ? "font-semibold text-[#1d4ed8]"
                  : "text-(--text-muted)"
              }`}
            >
              {hoveredIndex !== null
                ? `📂 ${data.topics[hoveredIndex].topic}: ${data.topics[hoveredIndex].count} Queries (${data.topics[hoveredIndex].percent}% of total interest)`
                : data.defaultSubtext}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-(--bg-surface-subtle) px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-(--text-secondary)">
            {data.totalBadge}
          </span>
        </div>

        {/* Topics */}
        <div className="mt-4 flex flex-col gap-[0.7rem]">
          {data.topics.map((item, index) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[0.78rem] font-semibold text-(--text-primary)">
                  {item.icon} {item.topic}
                </span>

                <span className="font-mono text-[0.72rem] font-bold text-(--text-primary)">
                  {item.count}{" "}
                  <span className="font-normal text-(--text-muted)">
                    ({item.percent}%)
                  </span>
                </span>
              </div>

              <div className="h-[9px] w-full overflow-hidden rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle)">
                <div
                  className="h-full rounded-full transition-all duration-[250ms]"
                  style={{
                    width: `${item.widthPct}%`,
                    backgroundColor: [
                      "#1d4ed8",
                      "#2563eb",
                      "#3b82f6",
                      "#60a5fa",
                      "#93c5fd",
                    ][index],
                    transform:
                      hoveredIndex === index
                        ? "scaleX(1.02)"
                        : "scaleX(1)",
                    filter:
                      hoveredIndex === index
                        ? "drop-shadow(0 2px 8px rgba(37,99,235,0.45))"
                        : "none",
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-(--border-subtle) pt-[0.4rem] text-[0.74rem]">
        <span className="text-(--text-muted)">
          Top Category:{" "}
          <strong className="text-(--text-primary)">
            {data.topCategory} ({data.topCategoryPercent}%)
          </strong>
        </span>

        <span className="shrink-0 font-semibold text-(--primary)">
          {data.accuracyMetric}
        </span>
      </div>
    </section>
  );
}

export default MyQueryTopics;