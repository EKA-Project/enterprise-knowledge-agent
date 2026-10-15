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

// Documents, team size, queries and RAG health are derived from the arrays
// below in the UI. Only the growth figure is a standalone mock value.
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
  {
    id: "u-elena",
    name: "Elena Rostova",
    email: "elena.r@northstar.studio",
    title: "Department Lead",
    role: "MANAGER",
    status: "Active",
    queries: 92,
    lastActive: "45 mins ago",
    isLead: true,
  },
  {
    id: "u-marcus",
    name: "Marcus Chen",
    email: "marcus.c@northstar.studio",
    title: "Team Specialist",
    role: "EMPLOYEE",
    status: "Active",
    queries: 38,
    lastActive: "Yesterday",
  },
  {
    id: "u-liam",
    name: "Liam O'Connor",
    email: "liam.o@northstar.studio",
    title: "Team Specialist",
    role: "EMPLOYEE",
    status: "Active",
    queries: 110,
    lastActive: "15 mins ago",
  },
  {
    id: "u-vikram",
    name: "Vikram Shah",
    email: "vikram.s@northstar.studio",
    title: "Team Specialist",
    role: "EMPLOYEE",
    status: "Active",
    queries: 45,
    lastActive: "3 hours ago",
  },
  {
    id: "u-tariq",
    name: "Tariq Al-Hassan",
    email: "tariq.h@northstar.studio",
    title: "Team Specialist",
    role: "EMPLOYEE",
    status: "Active",
    queries: 86,
    lastActive: "5 hours ago",
  },
  {
    id: "u-maya",
    name: "Maya Lin",
    email: "maya.l@northstar.studio",
    title: "Platform Engineer",
    role: "EMPLOYEE",
    status: "Active",
    queries: 94,
    lastActive: "1 hour ago",
  },
  {
    id: "u-priya",
    name: "Priya Sharma",
    email: "priya.s@northstar.studio",
    title: "DevOps Engineer",
    role: "EMPLOYEE",
    status: "Active",
    queries: 88,
    lastActive: "2 hours ago",
  },
  {
    id: "u-noah",
    name: "Noah Becker",
    email: "noah.b@northstar.studio",
    title: "Site Reliability Engineer",
    role: "EMPLOYEE",
    status: "Away",
    queries: 35,
    lastActive: "2 days ago",
  },
  {
    id: "u-sofia",
    name: "Sofia Alvarez",
    email: "sofia.a@northstar.studio",
    title: "QA Engineer",
    role: "EMPLOYEE",
    status: "Active",
    queries: 45,
    lastActive: "Yesterday",
  },
];

// ── Department documents ────────────────────
// status: "indexed" | "indexing" | "failed"
export const departmentDocuments = [
  {
    id: "d1",
    title: "eka_departments_2026-10-12",
    type: "csv",
    category: "Engineering & DevOps",
    uploader: "Maya Narang",
    size: "1 KB",
    chunks: 12,
    status: "indexed",
    meta: "1 min read • 1 page",
  },
  {
    id: "d2",
    title: "Final_chatArchitecture",
    type: "txt",
    category: "Engineering & DevOps",
    uploader: "Maya Narang",
    size: "10 KB",
    chunks: 18,
    status: "indexed",
    meta: "4 min read • 7 pages",
  },
  {
    id: "d3",
    title: "Incident Response Runbook",
    type: "pdf",
    category: "Engineering & DevOps",
    uploader: "Liam O'Connor",
    size: "2.1 MB",
    chunks: 64,
    status: "indexed",
    meta: "12 min read • 18 pages",
  },
  {
    id: "d4",
    title: "CI/CD Pipeline Playbook",
    type: "md",
    category: "Engineering & DevOps",
    uploader: "Priya Sharma",
    size: "48 KB",
    chunks: 27,
    status: "indexed",
    meta: "6 min read • 9 pages",
  },
  {
    id: "d5",
    title: "Kubernetes Cluster Standards",
    type: "pdf",
    category: "Engineering & DevOps",
    uploader: "Tariq Al-Hassan",
    size: "3.4 MB",
    chunks: 0,
    status: "indexing",
    meta: "Processing…",
  },
  {
    id: "d6",
    title: "On-call Rotation Handbook",
    type: "docx",
    category: "Engineering & DevOps",
    uploader: "Elena Rostova",
    size: "820 KB",
    chunks: 31,
    status: "indexed",
    meta: "8 min read • 11 pages",
  },
  {
    id: "d7",
    title: "Service Level Objectives 2026",
    type: "pdf",
    category: "Engineering & DevOps",
    uploader: "Noah Becker",
    size: "1.2 MB",
    chunks: 22,
    status: "indexed",
    meta: "5 min read • 7 pages",
  },
  {
    id: "d8",
    title: "Database Migration Checklist",
    type: "md",
    category: "Engineering & DevOps",
    uploader: "Vikram Shah",
    size: "16 KB",
    chunks: 0,
    status: "failed",
    meta: "Indexing failed",
  },
  {
    id: "d9",
    title: "Security Review Template",
    type: "docx",
    category: "Engineering & DevOps",
    uploader: "Sofia Alvarez",
    size: "310 KB",
    chunks: 14,
    status: "indexed",
    meta: "3 min read • 4 pages",
  },
  {
    id: "d10",
    title: "Observability Dashboard Guide",
    type: "pdf",
    category: "Engineering & DevOps",
    uploader: "Marcus Chen",
    size: "2.6 MB",
    chunks: 41,
    status: "indexed",
    meta: "9 min read • 14 pages",
  },
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