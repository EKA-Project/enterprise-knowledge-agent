import PageHero from "../../common/PageHero.jsx";
import pageMetadata from "../../../config/pageMetadata.js";
import MetricCard from "../shared/MetricCard.jsx";
import adminMetrics from "./adminDashboardData.js";
import StorageMetric from "../shared/StorageMetric.jsx";

function AdminOverview() {
  const hero = pageMetadata.dashboard.admin;

  return (
    <div className="min-h-full p-10">
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
    </div>
  );
}

export default AdminOverview;
