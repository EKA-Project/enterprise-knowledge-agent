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
  semanticSearches,
} from "./employeeDashboardData.js";
import LineAreaChart from "../../charts/LineAreaChart.jsx";
import MyEkaUsageChart from "../../charts/MyEkaUsageChart.jsx";
import MyQueryTopics from "../../charts/MyQueryTopics.jsx";

import { pinnedDocuments } from "../admin/adminDashboardData.js";
import EmployeeDocumentPanel from "./EmployeeDocumentPanel.jsx";
import SemanticSearchSuggestions from "./SemanticSearchSuggestions.jsx";
import EmployeeFaqCard from "./EmployeeFaqCard.jsx";
// Normalize both data sources to the same shape: { id, type, title, meta, badge? }
const pinnedDocs = pinnedDocuments.map((doc) => ({
  id: doc.title,
  type: doc.type,
  title: doc.title,
  meta: doc.meta,
  badge: "Saved",
}));

const bookmarkDocs = savedBookmarks.map((doc) => ({
  id: doc.id,
  type: doc.format,
  title: doc.title,
  meta: `${doc.category} • ${doc.pages} pages`,
}));

function EmployeeOverview() {
  // ─────────────────────────────────────────────
  // Page metadata
  // ─────────────────────────────────────────────

  const hero = pageMetadata.dashboard.employee;

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
        <EmployeeDocumentPanel
          icon="📌"
          title="Admin–Pinned Documents"
          description="Company standards & key charters pinned for spotlight access across all dashboards."
          actionLabel="Manage Pinned →"
          actionTo="/documents?category=pinned"
          itemAction="pinned"
          itemActionLabel="Pinned by Admin"
          documents={pinnedDocs}
        />

        <EmployeeDocumentPanel
          icon="⭐"
          title="My Saved Bookmarks"
          description="Quick access to your personal bookmarked sources."
          actionLabel="View All Bookmarks →"
          itemAction="saved"
          itemActionLabel="Saved to your bookmarks"
          documents={bookmarkDocs}
        />
      </div>

      {/* Recent Searches & Frequently Asked Questions */}
      <div className="mt-6 grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
        <SemanticSearchSuggestions data={semanticSearches} />
        <EmployeeFaqCard />
      </div>
    </div>
  );
}

export default EmployeeOverview;
