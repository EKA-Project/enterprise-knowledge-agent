// Mock data for the Organization page. Replace with API data later.

export const TEAM_MEMBERS = [
  { id: "m-elena", name: "Elena Rostova", email: "elena.r@northstar.studio", role: "Manager", department: "Engineering & DevOps" },
  { id: "m-jessica", name: "Jessica Taylor", email: "jessica.t@northstar.studio", role: "Manager", department: "People & HR Operations" },
  { id: "m-rachel", name: "Rachel Green", email: "rachel.g@northstar.studio", role: "Manager", department: "Product Strategy & Design" },
  { id: "m-alexander", name: "Alexander Wright", email: "alex.w@northstar.studio", role: "Admin", department: "Security & Compliance" },
  { id: "m-carlos", name: "Carlos Mendez", email: "carlos.m@northstar.studio", role: "Manager", department: "Sales & Go-To-Market" },
  { id: "m-marcus", name: "Marcus Chen", email: "marcus.c@northstar.studio", role: "Manager", department: "Engineering & DevOps" },
  { id: "m-chloe", name: "Chloe Bennet", email: "chloe.b@northstar.studio", role: "Employee", department: "Product Strategy & Design" },
  { id: "m-ethan", name: "Ethan Hunt", email: "ethan.h@northstar.studio", role: "Employee", department: "Security & Compliance" },
  { id: "m-nadia", name: "Nadia Al-Mansoori", email: "nadia.m@northstar.studio", role: "Admin", department: "Security & Compliance" },
  { id: "m-david", name: "David Vance", email: "david.v@northstar.studio", role: "Manager", department: "People & HR Operations" },
  { id: "m-maya", name: "Maya Narang", email: "maya.n@northstar.studio", role: "Employee", department: "Product Strategy & Design" },
  { id: "m-sophia", name: "Sophia Sterling", email: "sophia.s@northstar.studio", role: "Manager", department: "People & HR Operations" },
  { id: "m-liam", name: "Liam O'Connor", email: "liam.o@northstar.studio", role: "Employee", department: "Engineering & DevOps" },
  { id: "m-aisha", name: "Aisha Patel", email: "aisha.p@northstar.studio", role: "Employee", department: "Legal & Finance" },
];

export const INITIAL_DEPARTMENTS = [
  { id: "dept-eng", name: "Engineering & DevOps", code: "ENG", icon: "code", tone: "teal", emoji: "", description: "System architectures, infrastructure runbooks, CI/CD pipelines, and coding standards.", leadId: "m-elena", members: 8, docs: 11 },
  { id: "dept-hr", name: "People & HR Operations", code: "HR", icon: "users", tone: "green", emoji: "", description: "Employee handbooks, remote travel policies, compensation frameworks, and perks.", leadId: "m-jessica", members: 4, docs: 3 },
  { id: "dept-prod", name: "Product Strategy & Design", code: "PROD", icon: "layers", tone: "purple", emoji: "", description: "Roadmaps, UX design tokens, PRDs, user research synthesis, and telemetry specifications.", leadId: "m-rachel", members: 3, docs: 3 },
  { id: "dept-sec", name: "Security & Compliance", code: "SEC", icon: "shield", tone: "red", emoji: "", description: "SOC 2 Type II audit, Zero-Trust IAM, GDPR data governance, and threat modeling.", leadId: "m-alexander", members: 3, docs: 1 },
  { id: "dept-gtm", name: "Sales & Go-To-Market", code: "GTM", icon: "trend", tone: "amber", emoji: "", description: "Enterprise sales playbooks, discounting matrix, competitive battlecards, and onboarding.", leadId: "m-carlos", members: 3, docs: 1 },
  { id: "dept-legal", name: "Legal & Finance", code: "LEGAL", icon: "file", tone: "teal", emoji: "", description: "Standard MSAs, vendor procurement policies, expense thresholds, and contract clauses.", leadId: "m-jessica", members: 3, docs: 1 },
];

export const getMember = (id) => TEAM_MEMBERS.find((m) => m.id === id) ?? null;

export const getInitials = (name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

// "Data Science & AI Research" -> "DSAR"
export const deriveCode = (name) =>
  name.split(/[^A-Za-z0-9]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 4).toUpperCase() || "DEPT";

// Builds the CSV text used by the Export Structure CSV button.
export function buildStructureCsv(departments) {
  const rows = [
    ["Department", "Code", "Lead", "Lead email", "Members", "Scoped docs"],
    ...departments.map((d) => {
      const lead = getMember(d.leadId);
      return [d.name, d.code, lead?.name ?? "Unassigned", lead?.email ?? "", d.members, d.docs];
    }),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}
// =====================  TEAM DIRECTORY  =====================

export const ACCESS_LEVELS = ["Basic", "Restricted", "Admin"];
export const USER_ROLES = ["Admin", "Manager", "Employee"];
export const USER_STATUSES = ["Active", "Invited", "Suspended", "Terminated"];

// Short labels used by the Invite dialog (the video shows "Engineering", "HR / Ops"...).
export const DEPT_SHORT_LABELS = {
  "Engineering & DevOps": "Engineering",
  "People & HR Operations": "HR / Ops",
  "Security & Compliance": "Security",
  "Product Strategy & Design": "Product",
  "Sales & Go-To-Market": "Sales",
  "Legal & Finance": "Legal",
};

// [id, name, email, department, role, access, status, lastActive, joined, leadOf]
const SEED = [
  ["u1", "David Vance", "david.vance@northstar.studio", "People & HR Operations", "Manager", "Basic", "Active", "10 mins ago", "15 Jan 2024", "People & HR Operations"],
  ["u2", "Elena Rostova", "elena.r@northstar.studio", "Engineering & DevOps", "Manager", "Restricted", "Active", "45 mins ago", "03 Mar 2023", "Engineering & DevOps"],
  ["u3", "Sophia Sterling", "sophia.s@northstar.studio", "People & HR Operations", "Manager", "Basic", "Active", "2 hours ago", "21 Jun 2023", "People & HR Operations"],
  ["u4", "Nadia Al-Mansoor", "nadia.m@northstar.studio", "Security & Compliance", "Admin", "Admin", "Active", "5 hours ago", "09 Nov 2022", null],
  ["u5", "Marcus Chen", "marcus.c@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Active", "Yesterday", "14 Feb 2024", null],
  ["u6", "Liam O'Connor", "liam.o@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Active", "15 mins ago", "02 May 2024", null],
  ["u7", "Aisha Patel", "aisha.p@northstar.studio", "Product Strategy & Design", "Employee", "Basic", "Active", "30 mins ago", "18 Jul 2024", null],
  ["u8", "Carlos Mendez", "carlos.m@northstar.studio", "Sales & Go-To-Market", "Manager", "Basic", "Active", "1 hour ago", "11 Sep 2023", "Sales & Go-To-Market"],
  ["u9", "Jessica Taylor", "jessica.t@northstar.studio", "Legal & Finance", "Admin", "Admin", "Active", "2 hours ago", "05 Jan 2023", null],
  ["u10", "Vikram Shah", "vikram.s@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Active", "3 hours ago", "27 Aug 2024", null],
  ["u11", "Hannah Abbott", "hannah.a@northstar.studio", "People & HR Operations", "Employee", "Basic", "Invited", "Not signed in yet", "10 Oct 2026", null],
  ["u12", "Tariq Al-Hassan", "tariq.a@northstar.studio", "Engineering & DevOps", "Employee", "Restricted", "Invited", "Not signed in yet", "11 Oct 2026", null],
  ["u13", "Rachel Green", "rachel.g@northstar.studio", "Product Strategy & Design", "Manager", "Basic", "Active", "Yesterday", "19 Apr 2023", "Product Strategy & Design"],
  ["u14", "Alexander Wright", "alex.w@northstar.studio", "Security & Compliance", "Manager", "Admin", "Active", "Yesterday", "30 Oct 2022", "Security & Compliance"],
  ["u15", "Zoe Kravitz", "zoe.k@northstar.studio", "Legal & Finance", "Employee", "Restricted", "Suspended", "3 days ago", "08 Dec 2023", null],
  ["u16", "Kenji Sato", "kenji.s@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Active", "Yesterday", "22 Mar 2024", null],
  ["u17", "Chloe Bennet", "chloe.b@northstar.studio", "Product Strategy & Design", "Employee", "Basic", "Active", "2 days ago", "13 Jun 2024", null],
  ["u18", "Gabriel Santos", "gabriel.s@northstar.studio", "Sales & Go-To-Market", "Employee", "Basic", "Active", "2 days ago", "04 Feb 2025", null],
  ["u19", "Olivia Wilde", "olivia.w@northstar.studio", "Legal & Finance", "Employee", "Basic", "Invited", "Not signed in yet", "12 Oct 2026", null],
  ["u20", "Ethan Hunt", "ethan.h@northstar.studio", "Security & Compliance", "Employee", "Restricted", "Active", "3 days ago", "16 May 2024", null],
  ["u21", "Maya Lin", "maya.l@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Active", "4 days ago", "01 Jul 2024", null],
  ["u22", "Samuel L. Jackson", "samuel.j@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Terminated", "1 month ago", "20 Jan 2023", null],
  ["u23", "Priya Sharma", "priya.s@northstar.studio", "Engineering & DevOps", "Employee", "Basic", "Active", "5 days ago", "09 Sep 2024", null],
  ["u24", "Lucas Scott", "lucas.s@northstar.studio", "Sales & Go-To-Market", "Employee", "Basic", "Active", "6 days ago", "25 Nov 2024", null],
];

export const INITIAL_USERS = SEED.map(([id, name, email, department, role, access, status, lastActive, joined, leadOf]) => ({
  id, name, email, department, role, access, status, lastActive, joined, leadOf,
  telemetry: id === "u1" ? { total: 184, docs: 42, searches: 112, weeks: [12, 24, 35, 42] } : null,
}));

// Numbers for the four stat cards. "live" = everyone who is not suspended or terminated.
export function getUserStats(users) {
  return {
    total: users.length,
    live: users.filter((u) => u.status === "Active" || u.status === "Invited").length,
    admins: users.filter((u) => u.role === "Admin").length,
    managers: users.filter((u) => u.role === "Manager").length,
    pending: users.filter((u) => u.status === "Invited").length,
  };
}

// Demo usage numbers for the View dialog (David Vance has fixed values, others are derived from the name).
export function getTelemetry(user) {
  if (user.telemetry) return user.telemetry;
  const seed = [...user.name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const w1 = 8 + (seed % 9);
  const w2 = w1 + 6 + (seed % 7);
  const w3 = w2 + 4 + (seed % 8);
  const w4 = w3 + 3 + (seed % 9);
  return { total: (w1 + w2 + w3 + w4) * 2 + (seed % 20), docs: Math.round(w4 * 0.9), searches: Math.round(w4 * 2.6), weeks: [w1, w2, w3, w4] };
}

// Builds the CSV text used by the Export Directory CSV button.
export function buildUsersCsv(users) {
  const rows = [
    ["Name", "Email", "Department", "Role", "Access level", "Status", "Last active"],
    ...users.map((u) => [u.name, u.email, u.department, u.role, u.access, u.status, u.lastActive]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}