import { useMemo, useState } from "react";
import LineAreaChart from "../../charts/LineAreaChart.jsx";
import { queryVelocity, teamMembers } from "./managerDashboardData.js";

const RANGES = [7, 14, 30];
const DEFAULT_RANGE = 14;

const sum = (numbers) => numbers.reduce((total, n) => total + n, 0);

function RangeToggle({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Chart date range"
      className="inline-flex items-center rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-1"
    >
      {RANGES.map((range) => {
        const isActive = range === value;

        return (
          <button
            key={range}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(range)}
            className={`cursor-pointer rounded-full px-3 py-1 font-mono text-[0.68rem] font-semibold transition-colors ${
              isActive
                ? "bg-(--primary) text-(--primary-contrast) shadow-(--shadow-sm)"
                : "text-(--text-muted) hover:text-(--text-primary)"
            }`}
          >
            {range} Days
          </button>
        );
      })}
    </div>
  );
}

function ManagerQueryVelocity() {
  const [range, setRange] = useState(DEFAULT_RANGE);

  const chartData = useMemo(() => {
    const values = queryVelocity.slice(-range);

    // Growth = most recent half of the window vs the half before it.
    const half = Math.floor(values.length / 2);
    const earlier = sum(values.slice(0, half));
    const recent = sum(values.slice(-half));
    const change = earlier === 0 ? 0 : ((recent - earlier) / earlier) * 100;
    const isUp = change >= 0;

    return {
      title: "Department Intelligence & Query Velocity",
      trend: isUp ? "up" : "down",
      badgeIcon: isUp ? "↗" : "↘",
      badgeText: `${isUp ? "+" : ""}${change.toFixed(1)}% Growth`,
      legendLabel: "Queries / Day",
      unit: "queries",
      subtext: `Department query volume over last ${range} days • ${sum(values)} inquiries resolved across ${teamMembers.length} team members`,
      values,
    };
  }, [range]);

  return (
    <LineAreaChart
      data={chartData}
      headerAction={<RangeToggle value={range} onChange={setRange} />}
    />
  );
}

export default ManagerQueryVelocity;
