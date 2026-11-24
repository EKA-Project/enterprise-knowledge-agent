import { useMemo } from "react";
import LineAreaChart from "../../charts/LineAreaChart.jsx";
import ManagerRangeToggle from "./ManagerRangeToggle.jsx";
import {
  sumDailyQueries,
  sumLastDays,
  sumPreviousDays,
} from "./teamMemberView.js";

// Department query volume per day. The range is owned by ManagerOverview, so
// this chart and "Queries by Team Member" always show the same period.
function ManagerQueryVelocity({ members, range, onRangeChange }) {
  const chartData = useMemo(() => {
    const daily = sumDailyQueries(members);
    const values = daily.slice(-range);

    // Growth = this period vs the period of the same length right before it.
    // null means there is no earlier data, so no percentage is invented.
    const total = sumLastDays(daily, range);
    const previous = sumPreviousDays(daily, range);
    const change = previous === 0 ? null : ((total - previous) / previous) * 100;
    const isUp = change === null || change >= 0;

    return {
      title: "Department Intelligence & Query Velocity",
      trend: isUp ? "up" : "down",
      badgeIcon: change === null ? "" : isUp ? "↗" : "↘",
      badgeText:
        change === null
          ? "No earlier data"
          : `${isUp ? "+" : ""}${change.toFixed(1)}% Growth`,
      legendLabel: "Queries / Day",
      unit: "queries",
      subtext: `Department query volume over last ${range} days • ${total} inquiries resolved across ${members.length} team members`,
      values,
    };
  }, [members, range]);

  return (
    <LineAreaChart
      data={chartData}
      headerAction={<ManagerRangeToggle value={range} onChange={onRangeChange} />}
    />
  );
}

export default ManagerQueryVelocity;