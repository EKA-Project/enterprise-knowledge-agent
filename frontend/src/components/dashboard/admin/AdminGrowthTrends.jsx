import { useState } from "react";
import { Link } from "react-router-dom";
import DocumentGrowthChart from "../../charts/DocumentGrowthChart.jsx";
import ActiveUsersChart from "../../charts/ActiveUsersChart.jsx";
import QuestionsAnsweredChart from "../../charts/QuestionsAnsweredChart.jsx";
import {
  documentGrowthData,
  activeUsersData,
  questionsData,
  questionsDefaultMetric,
} from "./adminDashboardData.js";

/*
 * ============================================================
 * CHART CARD CONFIGURATION
 * ============================================================
 *
 * Shared information used to render the three cards.
 *
 * The Questions Answered card intentionally contains only
 * the eyebrow because its own chart component handles the
 * metric/header layout.
 */
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
  },
];

/*
 * ============================================================
 * ADMIN GROWTH TRENDS
 * ============================================================
 *
 * Main section containing:
 *
 * 1. Document Growth
 * 2. Active Users
 * 3. Questions Answered
 */
function AdminGrowthTrends() {
  /*
   * Stores the document currently being hovered
   * in the Document Growth chart.
   */
  const [hoveredDocument, setHoveredDocument] = useState(null);

  /*
   * Stores the week currently being hovered
   * in the Active Users chart.
   */
  const [hoveredUserWeek, setHoveredUserWeek] = useState(null);

  return (
    <section className="mt-8">
      {/* ======================================================
          SECTION HEADER
          ====================================================== */}
      <div className="mb-[13.6px] flex items-baseline justify-between">
        <h2 className="font-serif text-[23.2px] font-bold text-(--text-primary)">
          Usage & growth trends
        </h2>

        <Link
          to="/analytics"
          className="cursor-pointer !text-[0.78rem] font-semibold text-(--primary) transition-colors hover:underline"
        >
          Detailed analytics →
        </Link>
      </div>

      {/* ======================================================
          THREE ANALYTICS CARDS
          ====================================================== */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {chartCards.map((card, index) => (
          <article
            key={card.eyebrow}
            className={`rounded-[20px] border p-6 shadow-(--shadow-sm) ${
              index === 2
                ? "border-[rgba(168,203,186,0.55)] bg-[rgba(226,240,232,0.45)] backdrop-blur-sm"
                : "border-(--border-subtle) bg-(--bg-surface)"
            }`}
          >
            {/* ==================================================
                CARD EYEBROW
                ================================================== */}
            <p
              className={`font-mono text-[10px] font-semibold tracking-[0.08em] ${
                index === 2 ? "text-[#527363]" : "text-(--text-muted)"
              }`}
            >
              {card.eyebrow}
            </p>

            {/* ==================================================
                STANDARD CARD HEADER
                ==================================================
                
                Document Growth and Active Users have their own
                title + dynamic subtitle.

                Questions Answered does not render these because
                QuestionsAnsweredChart owns its complete metric
                header.
                ================================================== */}
            {index !== 2 && (
              <>
                {/* Card title */}
                <h3 className="mt-1 font-serif text-[20px] font-bold text-(--text-primary)">
                  {card.title}
                </h3>

                {/* ------------------------------------------------
                    Dynamic chart subtitle

                    Document Growth:
                    Shows the selected document count on hover.

                    Active Users:
                    Shows the employee / manager / admin
                    breakdown on hover.
                    ------------------------------------------------ */}
                <p
                  className={`
                    mt-1 min-h-[18px] text-[12px]
                    ${
                      (index === 0 && hoveredDocument) ||
                      (index === 1 && hoveredUserWeek)
                        ? "font-semibold text-[#2563eb]"
                        : "font-normal text-(--text-muted)"
                    }
                  `}
                >
                  {index === 0 && hoveredDocument
                    ? `📅 ${hoveredDocument.label}: ${hoveredDocument.value.toLocaleString()} Total Indexed Documents`
                    : index === 1 && hoveredUserWeek
                      ? `📅 ${hoveredUserWeek.label}: ${hoveredUserWeek.employee} Emp · ${hoveredUserWeek.manager} Mgr · ${hoveredUserWeek.admin} Adm`
                      : card.subtitle}
                </p>
              </>
            )}

            {/* ==================================================
                GRAPH 1 — DOCUMENT GROWTH
                ==================================================

                Bar chart showing indexed documents over time.

                Features:
                - Latest month highlighted
                - Hover interaction
                - Dynamic document count
                - Bars scale relative to highest value
                ================================================== */}
            {index === 0 && (
              <div className="mt-5">
                <DocumentGrowthChart
                  data={documentGrowthData}
                  onHover={setHoveredDocument}
                />
              </div>
            )}

            {/* ==================================================
                GRAPH 2 — ACTIVE USERS
                ==================================================

                Stacked bar chart showing weekly active users
                divided into Employee, Manager and Admin roles.

                Features:
                - Role-based stacked bars
                - Hover interaction
                - Dynamic role breakdown
                - Role legend
                - Monthly growth indicator
                ================================================== */}
            {index === 1 && (
              <div className="mt-5">
                {/* Stacked user activity chart */}
                <ActiveUsersChart
                  data={activeUsersData}
                  onHover={setHoveredUserWeek}
                />
              </div>
            )}

            {/* ==================================================
                GRAPH 3 — QUESTIONS ANSWERED
                ==================================================

                The Questions Answered component manages its
                complete metric header, status badge and chart.

                No additional title/subtitle is rendered here
                so the layout stays aligned with the reference.
                ================================================== */}
            {index === 2 && (
              <div className="-mt-1">
                <QuestionsAnsweredChart
                  data={questionsData}
                  defaultMetric={questionsDefaultMetric}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminGrowthTrends;
