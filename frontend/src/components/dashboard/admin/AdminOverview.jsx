import PageHero from "../../common/PageHero.jsx";
import MetricCard from "../shared/MetricCard.jsx";
import StorageMetric from "../shared/StorageMetric.jsx";
import AdminRecentQuestions from "./AdminRecentQuestions.jsx";
import AdminKnowledgeActivity from "./AdminKnowledgeActivity.jsx";
import AdminPinnedDocuments from "./AdminPinnedDocuments.jsx";
import pageMetadata from "../../../config/pageMetadata.js";
import adminMetrics from "./adminDashboardData.js";

function AdminOverview() {
  const hero = pageMetadata.dashboard.admin;

  return (
    <div className="min-h-full">
      {/* Hero section */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        status={hero.status}
      />

      <div className="mt-6 grid grid-cols-4 gap-5">
        {adminMetrics.map((metric) => {
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

      <div className="mt-8 grid grid-cols-[1.4fr_1fr] gap-6">
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="[font-family:var(--font-serif)] text-[1.25rem] font-bold text-(--text-primary)">
              Recent questions
            </h2>

            <button className="cursor-pointer !text-[0.78rem] font-semibold text-[#d97706] transition-colors hover:underline">
              View all ›
            </button>
          </div>

          <AdminRecentQuestions />
        </div>

        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="[font-family:var(--font-serif)] text-[1.25rem] font-bold text-(--text-primary)">
              Knowledge activity
            </h2>

            <button className="cursor-pointer !text-[0.78rem] font-semibold text-[#d97706] transition-colors hover:underline">
              All documents ›
            </button>
          </div>

          <AdminKnowledgeActivity />
        </div>
      </div>
      <AdminPinnedDocuments />
    </div>
  );
}

export default AdminOverview;
