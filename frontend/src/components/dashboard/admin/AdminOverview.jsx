import { Link } from "react-router-dom";

import PageHero from "../../common/PageHero.jsx";

import MetricCard from "../shared/MetricCard.jsx";
import StorageMetric from "../shared/StorageMetric.jsx";

import AdminRecentQuestions from "./AdminRecentQuestions.jsx";
import AdminKnowledgeActivity from "./AdminKnowledgeActivity.jsx";
import AdminPinnedDocuments from "./AdminPinnedDocuments.jsx";
import AdminGrowthTrends from "./AdminGrowthTrends.jsx";

import pageMetadata from "../../../config/pageMetadata.js";
import adminMetrics from "./adminDashboardData.js";

function AdminOverview() {
  // ─────────────────────────────────────────────
  // Page metadata
  // ─────────────────────────────────────────────

  const hero = pageMetadata.dashboard.admin;

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div className="min-h-full">
      {/* ─────────────────────────────────────────
          Hero section
      ───────────────────────────────────────── */}

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        status={hero.status}
      />

      {/* ─────────────────────────────────────────
          Overview metrics
      ───────────────────────────────────────── */}

      <div className="mt-6 grid grid-cols-4 gap-5 auto-rows-45">
        {adminMetrics.map((metric) => {
          // Storage metric uses custom content.
          if (metric.label === "STORAGE CAPACITY") {
            return (
              <MetricCard
                key={metric.label}
                label={metric.label}
                icon={metric.icon}
                iconColor={metric.iconColor}
              >
                <StorageMetric />
              </MetricCard>
            );
          }

          // Standard metric card.
          return (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              supportingText={metric.supportingText}
              supportingType={metric.supportingType}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          );
        })}
      </div>

      {/* ─────────────────────────────────────────
          Recent questions & knowledge activity
      ───────────────────────────────────────── */}

      <div className="mt-8 grid grid-cols-[1.4fr_1fr] gap-6">
        {/* Recent questions */}
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-serif text-[1.25rem] font-bold text-(--text-primary)">
              Recent questions
            </h2>

            <Link
              to="/ask-eka/history"
              className="cursor-pointer text-[0.78rem]! font-semibold text-(--primary) transition-colors hover:underline"
            >
              View all ›
            </Link>
          </div>

          <AdminRecentQuestions />
        </div>

        {/* Knowledge activity */}
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-serif text-[1.25rem] font-bold text-(--text-primary)">
              Knowledge activity
            </h2>

            <Link
              to="/documents"
              className="cursor-pointer text-[0.78rem]! font-semibold text-(--primary) transition-colors hover:underline"
            >
              All documents ›
            </Link>
          </div>

          <AdminKnowledgeActivity />
        </div>
      </div>

      {/* ─────────────────────────────────────────
          Pinned documents
      ───────────────────────────────────────── */}

      <AdminPinnedDocuments />

      {/* ─────────────────────────────────────────
          Growth trends
      ───────────────────────────────────────── */}

      <AdminGrowthTrends />
    </div>
  );
}

export default AdminOverview;