import { useState } from "react";

// Department colors
// Change a department's color here to update its entire hover experience.
const TOPIC_COLORS = {
  "HR Policies": "#7c3aed", // Violet
  Finance: "#0d9488", // Teal
  Engineering: "#2563eb", // Blue
  "Company Policies": "#ea580c", // Orange
  Benefits: "#db2777", // Pink
};

function MyQueryTopics({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Get the color assigned to a topic using its department name.
  // Unlisted departments receive a neutral blue fallback.
  const getTopicColor = (topic) => TOPIC_COLORS[topic] ?? "#2563eb";

  // Resolve the currently hovered topic and its assigned color.
  const hoveredTopic = hoveredIndex !== null ? data.topics[hoveredIndex] : null;

  const hoveredColor = hoveredTopic
    ? getTopicColor(hoveredTopic.topic)
    : undefined;

  return (
    <section
      className="flex flex-col justify-between rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.65rem] shadow-(--shadow-sm)"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Main content */}
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-[1.2rem] font-bold text-(--text-primary)">
              {data.title}
            </h3>

            {/* Hover text adopts the hovered department's color */}
            <p
              className={`mt-1 truncate text-[0.78rem] transition-all duration-150 ${
                hoveredTopic ? "font-semibold" : "text-(--text-muted)"
              }`}
              style={{
                color: hoveredColor,
              }}
            >
              {hoveredTopic
                ? `📂 ${hoveredTopic.topic}: ${hoveredTopic.count} Queries (${hoveredTopic.percent}% of total interest)`
                : data.defaultSubtext}
            </p>
          </div>

          {/* Total queries badge */}
          <span className="shrink-0 rounded-full bg-(--bg-surface-subtle) px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-(--text-secondary)">
            {data.totalBadge}
          </span>
        </div>

        {/* Department topics and query distribution */}
        <div className="mt-4 flex flex-col gap-[0.7rem]">
          {data.topics.map((item, index) => {
            // Each department uses its own configured color.
            const topicColor = getTopicColor(item.topic);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Department name and query count */}
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[0.7rem] font-semibold text-(--text-primary)">
                    {item.icon} {item.topic}
                  </span>

                  <span className="font-mono text-[0.72rem] font-bold text-(--text-primary)">
                    {item.count}{" "}
                    <span className="font-normal text-(--text-muted)">
                      ({item.percent}%)
                    </span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2.25 w-full overflow-hidden rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle)">
                  <div
                    className="h-full rounded-full transition-all duration-250"
                    style={{
                      width: `${item.widthPct}%`,
                      backgroundColor: topicColor,

                      // Slightly emphasize the bar on hover.
                      transform: isHovered ? "scaleX(1.02)" : "scaleX(1)",
                      filter: isHovered
                        ? `drop-shadow(0 2px 8px ${topicColor}73)`
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

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-(--border-subtle) pt-[0.4rem] text-[0.74rem]">
        <span className="text-(--text-muted)">
          Top Category:{" "}
          <strong style={{ color: getTopicColor(data.topCategory) }}>
            {data.topCategory} ({data.topCategoryPercent}%)
          </strong>
        </span>

        <span className="text-[.68rem] shrink-0 font-semibold text-(--primary)">
          {data.accuracyMetric}
        </span>
      </div>
    </section>
  );
}

export default MyQueryTopics;
