import { Link } from "react-router-dom";

import PageHero from "../../common/PageHero.jsx";

import MetricCard from "../shared/MetricCard.jsx";
import pageMetadata from "../../../config/pageMetadata.js";

import { employeeMetrics, velocityChartData } from "./employeeDashboardData.js";
import LineAreaChart from "../../charts/LineAreaChart.jsx";
function EmployeeOverview() {
  // ─────────────────────────────────────────────
  // Page metadata
  // ─────────────────────────────────────────────

  const hero = pageMetadata.dashboard.employee;

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div classname="min-h-full">
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
      <div className="mt-6 grid grid-cols-4 gap-5">
        {employeeMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            supportingText={metric.supportingText}
            supportingType={metric.supportingType}
            icon={metric.icon}
            iconColor={metric.iconColor}
          />
        ))}
      </div>
      {/* ─────────────────────────────────────────
          Velocity Graph
      ───────────────────────────────────────── */}
      <div className="mt-6">
        <LineAreaChart data={velocityChartData} />
      </div>
    </div>
  );
}

export default EmployeeOverview;
