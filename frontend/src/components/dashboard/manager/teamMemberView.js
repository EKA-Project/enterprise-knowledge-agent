import { formatRelativeTime } from "../../../utils/formatRelativeTime.js";

// Turns a real team member (user record + usage, from useManagerTeam) into the
// display shape that ManagerTeamRoster and UserViewModal already expect.
// UserViewModal is shared with the Organization page, so it stays untouched and
// this adapter does the translating instead. Every value is calculated here
// from stored data, never stored.

const WEEKS_SHOWN = 4;
const DAYS_PER_WEEK = 7;

const ROLE_LABEL = { admin: "Admin", manager: "Manager", employee: "Employee" };

// "12 Jan 2026". Timestamps are UTC, so format in UTC to avoid off-by-one days.
const joinedFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Total queries over the most recent `days` days.
 * @param {number[]} dailyQueries  Oldest first; the last value is today
 * @param {number} days
 */
export function sumLastDays(dailyQueries, days) {
  return dailyQueries.slice(-days).reduce((total, count) => total + count, 0);
}

/**
 * The whole department's queries per day: every member's daily count added up.
 * Same order as the inputs (oldest first, the last value is today).
 * @param {{dailyQueries: number[]}[]} members
 * @returns {number[]}
 */
export function sumDailyQueries(members) {
  const days = members[0]?.dailyQueries.length ?? 0;
  return Array.from({ length: days }, (_, day) =>
    members.reduce((total, member) => total + (member.dailyQueries[day] ?? 0), 0),
  );
}

/**
 * Total queries in the `days` days BEFORE the most recent `days` days: the
 * "previous period" that growth is measured against.
 * @param {number[]} dailyQueries  Oldest first; the last value is today
 * @param {number} days
 */
export function sumPreviousDays(dailyQueries, days) {
  return dailyQueries
    .slice(-2 * days, -days)
    .reduce((total, count) => total + count, 0);
}

// Four weekly totals, oldest first (the last one is the current week), for the
// "Personal Query Velocity" bars in the modal.
function toWeeklyQueries(dailyQueries) {
  const recent = dailyQueries.slice(-WEEKS_SHOWN * DAYS_PER_WEEK);
  return Array.from({ length: WEEKS_SHOWN }, (_, week) =>
    sumLastDays(recent.slice(week * DAYS_PER_WEEK, (week + 1) * DAYS_PER_WEEK), DAYS_PER_WEEK),
  );
}

// formatRelativeTime gives "yesterday"; the table reads better with "Yesterday"
function toLastActiveLabel(lastActiveAt) {
  const label = formatRelativeTime(lastActiveAt);
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : "Never";
}

/**
 * @param {import('../../../types/usage.js').TeamMember} member
 * @param {import('../../../types').Department} department
 */
export function toMemberView(member, department) {
  return {
    id: member.id,
    employeeCode: member.employeeCode,
    name: member.name,
    email: member.email,
    title: ROLE_LABEL[member.role], // the modal's "Role" field; there are no job titles
    status: member.status === "active" ? "Active" : "Inactive",
    isLead: department.managerId === member.id,
    queries: sumLastDays(member.dailyQueries, 30),
    searches: member.searches,
    docs: member.documentsUploaded,
    weeklyQueries: toWeeklyQueries(member.dailyQueries),
    lastActive: toLastActiveLabel(member.lastActiveAt),
    joinedDate: joinedFormat.format(new Date(member.createdAt)),
  };
}