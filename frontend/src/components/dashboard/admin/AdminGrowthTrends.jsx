import { useState } from "react";
import { Link } from "react-router-dom";
import BarChart from "../../charts/BarChart.jsx";
import StackedBarChart from "../../charts/StackedBarChart.jsx";
import QuestionsAnsweredChart from "../../charts/QuestionsAnsweredChart.jsx";

/*
 * ============================================================
 * KNOWLEDGE GROWTH DATA
 * ============================================================
 *
 * Total indexed documents over time.
 *
 * This data is currently local.
 * Later, it can be replaced with data received from the
 * backend/API without changing the chart structure.
 */
const documentGrowthData = [
  { label: "Apr", value: 610 },
  { label: "May", value: 760 },
  { label: "Jun", value: 890 },
  { label: "Jul", value: 1080 },
  { label: "Aug", value: 1284 },
];

/*
 * ============================================================
 * USER ENGAGEMENT DATA
 * ============================================================
 *
 * Weekly active users separated by organization role.
 *
 * employee → Employee users
 * manager  → Manager users
 * admin    → Admin users
 *
 * The three values are displayed as a stacked bar.
 */
const activeUsersData = [
  { label: "Wk 1", employee: 38, manager: 10, admin: 3 },
  { label: "Wk 2", employee: 44, manager: 12, admin: 4 },
  { label: "Wk 3", employee: 52, manager: 15, admin: 5 },
  { label: "Current", employee: 62, manager: 18, admin: 7 },
];

/*
 * ============================================================
 * DEFAULT DOCUMENT BAR
 * ============================================================
 *
 * The latest month is highlighted by default in the
 * Document Growth chart.
 */
const activeDocumentIndex = documentGrowthData.length - 1;

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
  const [hoveredUserDay, setHoveredUserDay] = useState(null);

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
        to = "/analytics"
        className = "cursor-pointer !text-[0.78rem] font-semibold text-(--primary) transition-colors hover:underline">
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
            className="rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)"
          >
            {/* ==================================================
                CARD EYEBROW
                ================================================== */}
            <p className="font-mono text-[10px] font-semibold tracking-[0.08em] text-(--text-muted)">
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
                      (index === 1 && hoveredUserDay)
                        ? "font-semibold text-[#2563eb]"
                        : "font-normal text-(--text-muted)"
                    }
                  `}
                >
                  {index === 0 && hoveredDocument
                    ? `📅 ${hoveredDocument.label}: ${hoveredDocument.value.toLocaleString()} Total Indexed Documents`
                    : index === 1 && hoveredUserDay
                      ? `📅 ${hoveredUserDay.label}: ${hoveredUserDay.employee} Emp · ${hoveredUserDay.manager} Mgr · ${hoveredUserDay.admin} Adm`
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
                <BarChart
                  data={documentGrowthData}
                  activeIndex={activeDocumentIndex}
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
                <StackedBarChart
                  data={activeUsersData}
                  onHover={setHoveredUserDay}
                />

                {/* ------------------------------------------------
                    Role legend + monthly growth
                    ------------------------------------------------ */}
                <div className="mt-3 flex items-center justify-between">
                  {/* Role legend */}
                  <div className="flex items-center gap-3">
                    {/* Employees */}
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-(--text-muted)">
                      <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
                      Emp
                    </span>

                    {/* Managers */}
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-(--text-muted)">
                      <span className="h-2 w-2 rounded-full bg-[#60a5fa]" />
                      Mgr
                    </span>

                    {/* Admins */}
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-(--text-muted)">
                      <span className="h-2 w-2 rounded-full bg-[#93c5fd]" />
                      Adm
                    </span>
                  </div>

                  {/* Monthly growth indicator */}
                  <span className="text-[11px] font-semibold text-[#2563eb]">
                    +18% MoM
                  </span>
                </div>
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
                <QuestionsAnsweredChart />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminGrowthTrends;
