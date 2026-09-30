import { useState } from "react";

import BarChart from "../../charts/BarChart.jsx";

// Document growth data.
// Later, this can be replaced with data received from the backend/API.
const documentGrowthData = [
  { label: "Apr", value: 610 },
  { label: "May", value: 760 },
  { label: "Jun", value: 890 },
  { label: "Jul", value: 1080 },
  { label: "Aug", value: 1284 },
];

// The latest month is highlighted by default.
const activeDocumentIndex = documentGrowthData.length - 1;

const chartCards = [
  {
    eyebrow: "KNOWLEDGE GROWTH",
    title: "Document growth",
    subtitle: "Total indexed documents over time",
  },
  {
    eyebrow: "USER ENGAGEMENT",
    title: "Active users",
    subtitle: "Weekly active members across organization",
  },
  {
    eyebrow: "QUESTIONS ANSWERED",
    title: "Questions answered",
    subtitle: "Answers generated from the knowledge base",
  },
];

function AdminGrowthTrends() {
  // Stores the document currently being hovered.
  const [hoveredDocument, setHoveredDocument] = useState(null);

  return (
    <section className="mt-8">
      {/* Section heading */}
      <div className="mb-[13.6px] flex items-baseline justify-between">
        <h2 className="font-serif text-[23.2px] font-bold text-(--text-primary)">
          Usage & growth trends
        </h2>

        <a
          href="#"
          className="text-[13.6px] font-semibold text-(--primary) transition-all hover:underline"
        >
          Detailed analytics ›
        </a>
      </div>

      {/* Three analytics cards */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {chartCards.map((card, index) => (
          <article
            key={card.eyebrow}
            className="rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)"
          >
            {/* Small category label */}
            <p className="font-mono text-[10px] font-semibold tracking-[0.08em] text-(--text-muted)">
              {card.eyebrow}
            </p>

            {/* Chart title */}
            <h3 className="mt-1 font-serif text-[20px] font-bold text-(--text-primary)">
              {card.title}
            </h3>

            {/* 
              Document Growth:
              The subtitle changes when a bar is hovered.
              
              Default:
              "Total indexed documents"

              Hover:
              "📅 Jul: 1,080 Total indexed documents"
            */}
            <p
              className={`
    mt-1 min-h-[18px] text-[12px]
    ${
      index === 0 && hoveredDocument
        ? "font-semibold text-(--primary)"
        : "font-normal text-(--text-muted)"
    }
  `}
            >
              {index === 0 && hoveredDocument
                ? `📅 ${hoveredDocument.label}: ${hoveredDocument.value.toLocaleString()} Total Indexed Documents`
                : card.subtitle}
            </p>

            {/* Chart area */}
            {index === 0 ? (
              <div className="mt-5">
                <BarChart
                  data={documentGrowthData}
                  activeIndex={activeDocumentIndex}
                  onHover={setHoveredDocument}
                />
              </div>
            ) : (
              // The remaining charts will be added next.
              <div className="mt-5 h-[150px] border-b border-(--border-subtle)" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminGrowthTrends;
