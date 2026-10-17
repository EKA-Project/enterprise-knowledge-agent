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
