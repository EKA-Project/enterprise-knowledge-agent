import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  FileText,
  MessageSquare,
  RotateCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHero from "../../common/PageHero.jsx";
import RankedBarList from "../../charts/RankedBarList.jsx";
import MetricCard from "../shared/MetricCard.jsx";
import AdminPinnedDocuments from "../admin/AdminPinnedDocuments.jsx";
import ManagerQueryVelocity from "./ManagerQueryVelocity.jsx";
import ManagerTeamRoster from "./ManagerTeamRoster.jsx";
import ManagerRangeToggle, { DEFAULT_RANGE } from "./ManagerRangeToggle.jsx";
import {
  department,
  departmentDocuments,
  departmentKpis,
  manager,
  memberQueries,
  teamMembers,
} from "./managerDashboardData.js";

// RAG health = share of department documents that are successfully indexed.
const RAG_HEALTHY_AT = 90;
const RAG_WARNING_AT = 70;

function getRagHealth(documents) {
  if (documents.length === 0) return 100;
  const indexed = documents.filter((doc) => doc.status === "indexed").length;
  return Math.round((indexed / documents.length) * 100);
}

function getRagIconColor(percent) {
  if (percent >= RAG_HEALTHY_AT) return "green";
  if (percent >= RAG_WARNING_AT) return "amber";
  return "red";
}

// Colours belong to the row position (1st to 5th), not to a person.
const USAGE_TOP_N = 5;
const RANK_COLORS = ["#0284c7", "#2563eb", "#4f46e5", "#0891b2", "#0d9488"];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Builds the chart data for "Queries by Team Member".
// 30 days uses the roster total; 7 and 14 days come from memberQueries.
function buildUsageByMember(range) {
  const rows = teamMembers.map((member) => ({
    member,
    count: range === 30 ? member.queries : memberQueries[range][member.id],
  }));

  const total = rows.reduce((sum, row) => sum + row.count, 0);
  const ranked = [...rows]
    .sort((a, b) => b.count - a.count)
    .slice(0, USAGE_TOP_N);
  const top = ranked[0];

  return {
    title: "📊 Queries by Team Member",
    subtext: "See how actively each team member is using EKA.",
    badge: `Top user: ${top.member.name.split(" ")[0]} · ${top.count} queries`,
    unit: "queries",
    items: ranked.map(({ member, count }, index) => ({
      id: member.id,
      label: member.name,
      count,
      percent: Math.round((count / total) * 100),
      initials: getInitials(member.name),
      color: RANK_COLORS[index],
    })),
  };
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function ManagerOverview() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [range, setRange] = useState(DEFAULT_RANGE);

  const ragHealth = getRagHealth(departmentDocuments);
  const usage = useMemo(() => buildUsageByMember(range), [range]);
  const totalQueries = teamMembers.reduce((sum, m) => sum + m.queries, 0);

  // UI-only for now; real re-indexing comes with the backend.
  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => setIsRetrying(false), 1200);
  };

  const scrollToRoster = () => {
    document
      .getElementById("team-roster")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <PageHero
        eyebrow="Department Lead Hub"
        title={`${getGreeting()}, ${manager.firstName}.`}
        description={`Here is the knowledge telemetry, ingestion health, and team management workspace for ${department.name}.`}
        status={
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={14} strokeWidth={2} />
            Department Lead • {department.name}
            <span className="rounded-full border border-(--match-score-border) bg-(--match-score-bg) px-2 py-0.5 font-mono text-[10px] font-semibold text-(--match-score-text)">
              {department.code}
            </span>
          </span>
        }
      />

      {/* KPI cards */}
      <section
        aria-label="Department key metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <MetricCard
          label="Department Documents"
          value={departmentDocuments.length}
          icon={FileText}
          iconColor="amber"
          action={
            <Link
              to="/documents"
              className="inline-flex items-center gap-1 pb-1 text-xs font-semibold text-(--status-success) hover:underline"
            >
              Manage Docs <ArrowRight size={12} />
            </Link>
          }
        />

        <MetricCard
          label="Department Team"
          value={teamMembers.length}
          icon={Users}
          iconColor="orange"
          action={
            <button
              type="button"
              onClick={scrollToRoster}
              className="inline-flex cursor-pointer items-center gap-1 pb-1 text-xs font-semibold text-(--status-success) hover:underline"
            >
              Manage Team <ArrowDown size={12} />
            </button>
          }
        />

        <MetricCard
          label="RAG Health"
          value={`${ragHealth}%`}
          icon={Activity}
          iconColor={getRagIconColor(ragHealth)}
          action={
            ragHealth < RAG_HEALTHY_AT && (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="mb-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-(--border-medium) px-2.5 py-1 text-xs font-semibold text-(--primary) transition-colors hover:bg-(--primary-light) disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RotateCw
                  size={12}
                  className={isRetrying ? "animate-spin" : ""}
                />
                {isRetrying ? "Retrying" : "Retry"}
              </button>
            )
          }
        />

        <MetricCard
          label="Department Queries"
          value={totalQueries}
          icon={MessageSquare}
          iconColor="purple"
          supportingText={`+${departmentKpis.queriesGrowth}% growth`}
          supportingType="positive"
        />
      </section>

      {/* Query velocity chart */}
      <ManagerQueryVelocity range={range} onRangeChange={setRange} />

      {/* Two-column area: pinned docs + usage (left), team roster (right) */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <AdminPinnedDocuments
            className=""
            title="📌 Admin-Pinned Documents"
            description="Admin-pinned documents relevant to your department."
            linkTo="/documents?category=pinned"
            linkLabel="View All →"
          />

          <RankedBarList
            data={usage}
            headerAction={
              <ManagerRangeToggle value={range} onChange={setRange} />
            }
          />
        </div>
        <div id="team-roster" className="scroll-mt-6">
          <ManagerTeamRoster
            teamMembers={teamMembers}
            currentUserId={manager.id}
            department={department}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagerOverview;
