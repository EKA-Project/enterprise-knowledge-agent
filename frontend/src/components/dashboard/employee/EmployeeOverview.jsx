import { Link } from "react-router-dom";

import PageHero from "../../common/PageHero.jsx";

import MetricCard from "../shared/MetricCard.jsx";
import pageMetadata from "../../../config/pageMetadata.js";

import {
  employeeMetrics,
  velocityChartData,
  myEkaUsageData,
  myQueryTopicsData,
  savedBookmarks,
  recentSearches,
} from "./employeeDashboardData.js";
import LineAreaChart from "../../charts/LineAreaChart.jsx";
import MyEkaUsageChart from "../../charts/MyEkaUsageChart.jsx";
import MyQueryTopics from "../../charts/MyQueryTopics.jsx";

import AdminPinnedDocuments from "../admin/AdminPinnedDocuments.jsx";
import MySavedBookmarks from "./MySavedBookmarks.jsx";
import MyRecentSearchConfidence from "./MyRecentSearchConfidence.jsx";
import EmployeeFaqCard from "./EmployeeFaqCard.jsx";
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
      {/* ─────────────────────────────────────────
          Usage  Graph
      ───────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-[1.15fr_1fr] gap-6 max-[900px]:grid-cols-1">
        <MyEkaUsageChart data={myEkaUsageData} />

        <MyQueryTopics data={myQueryTopicsData} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
        <AdminPinnedDocuments />
        <MySavedBookmarks data={savedBookmarks} />
      </div>

      {/* Recent Searches & Frequently Asked Questions */}
      <div className="mt-6 grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
        <MyRecentSearchConfidence data={recentSearches} />
        <EmployeeFaqCard />
      </div>
    </div>
  );
}

export default EmployeeOverview;
