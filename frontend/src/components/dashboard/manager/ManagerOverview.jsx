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
import PinnedDocumentsPanel from "../shared/PinnedDocumentsPanel.jsx";
import ManagerQueryVelocity from "./ManagerQueryVelocity.jsx";
import ManagerTeamRoster from "./ManagerTeamRoster.jsx";
import ManagerDepartmentDocuments from "./ManagerDepartmentDocuments.jsx";
import ManagerRangeToggle, { DEFAULT_RANGE } from "./ManagerRangeToggle.jsx";
import useDepartmentKpis from "../../../hooks/useDepartmentKpis.js";
import useManagerTeam from "../../../hooks/useManagerTeam.js";
import { sumLastDays, sumPreviousDays } from "./teamMemberView.js";

// RAG health = share of department documents that are successfully indexed.
const RAG_HEALTHY_AT = 90;
const RAG_WARNING_AT = 70;

// readyCount and total come from the document service (useDepartmentKpis).
function getRagHealth(readyCount, total) {
  if (total === 0) return 100; // nothing to index, nothing unhealthy (as before)
  return Math.round((readyCount / total) * 100);
}

// Grey bar shown in place of a KPI number while it loads
function KpiSkeleton() {
  return (
    <span
      aria-label="Loading"
      className="inline-block h-8 w-16 animate-pulse rounded-md bg-(--border-subtle)"
    />
  );
}

function getRagIconColor(percent) {
  if (percent >= RAG_HEALTHY_AT) return "green";
  if (percent >= RAG_WARNING_AT) return "amber";
  return "red";
}

// Colours belong to the row position (1st to 5th), not to a person.
const USAGE_TOP_N = 5;
const QUERY_PERIOD_DAYS = 30; // the "Department Queries" card counts the last 30 days
const RANK_COLORS = ["#0284c7", "#2563eb", "#4f46e5", "#0891b2", "#0d9488"];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Builds the chart data for "Queries by Team Member". Every number is summed
// from the members' daily counts for the chosen range (7, 14 or 30 days).
function buildUsageByMember(members, range) {
  const rows = members.map((member) => ({
    member,
    count: sumLastDays(member.dailyQueries, range),
  }));

  const total = rows.reduce((sum, row) => sum + row.count, 0);
  const ranked = [...rows]
    .sort((a, b) => b.count - a.count)
    .slice(0, USAGE_TOP_N);
  const top = ranked[0];

  return {
    title: "📊 Queries by Team Member",
    subtext: "See how actively each team member is using EKA.",
    // No activity in the range: say so instead of naming a "top user" at 0
    badge:
      top && top.count > 0
        ? `Top user: ${top.member.name.split(" ")[0]} · ${top.count} queries`
        : "No activity in this period",
    unit: "queries",
    items: ranked.map(({ member, count }, index) => ({
      id: member.id,
      label: member.name,
      count,
      // Share of the whole department's queries, not just the top five
      percent: total === 0 ? 0 : Math.round((count / total) * 100),
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

  const {
    data: team,
    loading: teamLoading,
    error: teamError,
    reload: reloadTeam,
  } = useManagerTeam();
  const user = team?.user;
  const department = team?.department;
  // Memoised: a bare `?? []` is a new array every render, which would re-run
  // the useMemo calls below while the team is still loading
  const members = useMemo(() => team?.members ?? [], [team]);

  const {
    data: kpis,
    loading: kpisLoading,
    error: kpisError,
    reload: reloadKpis,
  } = useDepartmentKpis();
  // null until the numbers arrive (or when they fail), so nothing is invented
  const ragHealth = kpis
    ? getRagHealth(kpis.readyCount, kpis.documentCount)
    : null;
  const documentCountValue = kpisLoading ? (
    <KpiSkeleton />
  ) : kpis ? (
    kpis.documentCount
  ) : (
    "—"
  );
  const ragValue = kpisLoading ? (
    <KpiSkeleton />
  ) : ragHealth !== null ? (
    `${ragHealth}%`
  ) : (
    "—"
  );
  const usage = useMemo(
    () => buildUsageByMember(members, range),
    [members, range],
  );

  // Last 30 days, and the growth vs the 30 days before that (null = no earlier
  // data to compare with, so no percentage is shown rather than an invented one)
  const totalQueries = members.reduce(
    (sum, m) => sum + sumLastDays(m.dailyQueries, QUERY_PERIOD_DAYS),
    0,
  );
  const previousQueries = members.reduce(
    (sum, m) => sum + sumPreviousDays(m.dailyQueries, QUERY_PERIOD_DAYS),
    0,
  );
  const queriesGrowth =
    previousQueries === 0
      ? null
      : Math.round(
          ((totalQueries - previousQueries) / previousQueries) * 1000,
        ) / 10;

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

  if (teamLoading) {
    return (
      <p className="py-16 text-center text-sm text-(--text-muted)">
        Loading your department…
      </p>
    );
  }

  // No department means this account is not a department lead (e.g. the admin)
  if (teamError || !department) {
    return (
      <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-8 text-center">
        <p className="text-sm font-semibold text-(--text-primary)">
          {teamError
            ? "Could not load your department."
            : "No department is linked to this account."}
        </p>
        {teamError && (
          <button
            type="button"
            onClick={reloadTeam}
            className="mt-3 cursor-pointer text-xs font-semibold text-(--primary) hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <PageHero
        eyebrow="Department Lead Hub"
        title={`${getGreeting()}, ${user.name.split(" ")[0]}.`}
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
          value={documentCountValue}
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
          value={members.length}
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
          value={ragValue}
          icon={Activity}
          iconColor={ragHealth === null ? "amber" : getRagIconColor(ragHealth)}
          action={
            kpisError ? (
              <button
                type="button"
                onClick={reloadKpis}
                className="mb-1 cursor-pointer text-xs font-semibold text-(--primary) hover:underline"
              >
                Try again
              </button>
            ) : (
              ragHealth !== null &&
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
            )
          }
        />

        <MetricCard
          label="Department Queries"
          value={totalQueries}
          icon={MessageSquare}
          iconColor="purple"
          supportingText={
            queriesGrowth === null
              ? undefined
              : `${queriesGrowth >= 0 ? "+" : ""}${queriesGrowth}% vs previous 30 days`
          }
          supportingType={
            queriesGrowth !== null && queriesGrowth >= 0 ? "positive" : "muted"
          }
        />
      </section>
      {/* Query velocity chart */}
      <ManagerQueryVelocity
        members={members}
        range={range}
        onRangeChange={setRange}
      />
      {/* Two-column area: pinned docs + usage (left), team roster (right) */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* self-start: the left column keeps its natural height. It sets the row height,
            and the roster (absolute at xl) stretches to match it. Without this, the
            Pinned panel's h-full fills the stretched column and pushes Queries out. */}
        <div className="space-y-6 xl:self-start">
          <PinnedDocumentsPanel />

          <RankedBarList
            data={usage}
            headerAction={
              <ManagerRangeToggle value={range} onChange={setRange} />
            }
          />
        </div>
        {/* At xl the roster is taken out of the flow (absolute), so the LEFT column
            alone sets the row height and the roster stretches to match it. */}
        <div id="team-roster" className="relative scroll-mt-6">
          <div className="xl:absolute xl:inset-0">
            <ManagerTeamRoster
              teamMembers={members}
              currentUserId={user.id}
              department={department}
            />
          </div>
        </div>
      </div>

      {/* Department documents table */}
      <ManagerDepartmentDocuments onReindexed={reloadKpis} />
    </div>
  );
}

export default ManagerOverview;
