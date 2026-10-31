// Mock data for the Manager (Department Lead) overview. Frontend only.
// TODO: replace the manager object with the logged-in user (useAuth) later.

export const manager = {
  id: "u-elena",
  firstName: "Elena",
  fullName: "Elena Rostova",
  email: "elena.r@northstar.studio",
};

export const department = {
  id: "eng-dev",
  name: "Engineering & DevOps",
  code: "ENG-DEV",
};

// Team size and queries are derived from the arrays below in the UI. Documents
// and RAG health come from the document service (useDepartmentKpis). Only the
// growth figure is a standalone mock value.
export const departmentKpis = {
  queriesGrowth: 14.2, // % vs previous period
};

// ── Query velocity ──────────────────────────
// One 30-day series (oldest -> today) summing to the department query total.
// The 7 and 14-day views are slices taken from the end of this array.
export const queryVelocity = [
  14, 16, 15, 18, 20, 17, 13, 15, 19, 21, 18, 22, 20, 16, 17, 22, 19, 24, 21,
  15, 17, 18, 26, 31, 28, 29, 31, 32, 28, 31,
];

// ── Team roster ─────────────────────────────
export const teamMembers = [
  { id: "u-elena", name: "Elena Rostova", email: "elena.r@northstar.studio", title: "Department Lead", role: "MANAGER", status: "Active", queries: 92, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "45 mins ago", joinedDate: "12 Jan 2024", isLead: true },
  { id: "u-marcus", name: "Marcus Chen", email: "marcus.c@northstar.studio", title: "Team Specialist", role: "EMPLOYEE", status: "Active", queries: 38, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "Yesterday", joinedDate: "3 Mar 2024" },
  { id: "u-liam", name: "Liam O'Connor", email: "liam.o@northstar.studio", title: "Team Specialist", role: "EMPLOYEE", status: "Active", queries: 110, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "15 mins ago", joinedDate: "8 Feb 2024" },
  { id: "u-vikram", name: "Vikram Shah", email: "vikram.s@northstar.studio", title: "Team Specialist", role: "EMPLOYEE", status: "Active", queries: 45, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "3 hours ago", joinedDate: "19 Apr 2024" },
  { id: "u-tariq", name: "Tariq Al-Hassan", email: "tariq.h@northstar.studio", title: "Team Specialist", role: "EMPLOYEE", status: "Active", queries: 86, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "5 hours ago", joinedDate: "25 May 2024" },
  { id: "u-maya", name: "Maya Lin", email: "maya.l@northstar.studio", title: "Platform Engineer", role: "EMPLOYEE", status: "Active", queries: 94, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "1 hour ago", joinedDate: "10 Jan 2024" },
  { id: "u-priya", name: "Priya Sharma", email: "priya.s@northstar.studio", title: "DevOps Engineer", role: "EMPLOYEE", status: "Active", queries: 88, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "2 hours ago", joinedDate: "17 Jun 2024" },
  { id: "u-noah", name: "Noah Becker", email: "noah.b@northstar.studio", title: "Site Reliability Engineer", role: "EMPLOYEE", status: "Away", queries: 35, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "2 days ago", joinedDate: "22 Jul 2024" },
  { id: "u-sofia", name: "Sofia Alvarez", email: "sofia.a@northstar.studio", title: "QA Engineer", role: "EMPLOYEE", status: "Active", queries: 45, searches: 42, docs: 19, weeklyQueries: [12, 24, 35, 42], lastActive: "Yesterday", joinedDate: "9 Aug 2024" },
];


// ── Queries per member for the 7 and 14-day ranges ──
// The 30-day figure is each member's `queries` value in teamMembers.
export const memberQueries = {
  7: {
    "u-elena": 30, "u-marcus": 13, "u-liam": 36, "u-vikram": 15, "u-tariq": 29,
    "u-maya": 32, "u-priya": 29, "u-noah": 11, "u-sofia": 15,
  },
  14: {
    "u-elena": 51, "u-marcus": 21, "u-liam": 61, "u-vikram": 25, "u-tariq": 48,
    "u-maya": 52, "u-priya": 49, "u-noah": 19, "u-sofia": 24,
  },
};