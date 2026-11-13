import { formatDate } from "../../utils/formatDate.js";
// Helpers for the Organization page. The data comes from the services.

export const getInitials = (name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

// "Data Science & AI Research" -> "DSAR"
export const deriveCode = (name) =>
  name.split(/[^A-Za-z0-9]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 4).toUpperCase() || "DEPT";

// Builds the CSV text used by the Export Structure CSV button.
export function buildStructureCsv(departments, getLead) {
    const rows = [
    ["Department", "Code", "Lead", "Lead email", "Members", "Scoped docs"],
    ...departments.map((d) => {
      const lead = getLead(d.managerId);
      return [d.name, d.code, lead?.name ?? "Unassigned", lead?.email ?? "", d.memberCount, d.documentCount];
    }),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}
// =====================  TEAM DIRECTORY  =====================

// Stored enum -> label shown in the UI. The filter lists are built from these maps.
export const ROLE_LABELS = { admin: "Admin", manager: "Manager", employee: "Employee" };
export const STATUS_LABELS = { active: "Active", inactive: "Terminated" };

export const USER_ROLES = [ROLE_LABELS.manager, ROLE_LABELS.employee];
export const USER_STATUSES = Object.values(STATUS_LABELS);

// Short labels used by the Invite dialog (the video shows "Engineering", "HR / Ops"...).
export const DEPT_SHORT_LABELS = {
  "Engineering & DevOps": "Engineering",
  "People & HR Operations": "HR / Ops",
  "Security & Compliance": "Security",
  "Product Strategy & Design": "Product",
  "Sales & Go-To-Market": "Sales",
  "Legal & Finance": "Legal",
};


// Numbers for the four stat cards. "live" = everyone who is not suspended or terminated.
export function getUserStats(users) {
  return {
    total: users.length,
    live: users.filter((u) => u.status === STATUS_LABELS.active).length,
    admins: users.filter((u) => u.role === ROLE_LABELS.admin).length,
    managers: users.filter((u) => u.role === ROLE_LABELS.manager).length,
    pending: 0, // there is no "invited" state in the data model
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
    ["Name", "Email", "Department", "Role", "Status", "Last active"],
    ...users.map((u) => [u.name, u.email, u.department, u.role, u.status, u.lastActive]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

const NO_DATA = "—"; // shown where the data model has no value (no department, last active)

// Turns a service user into the row shape the directory components read.
// Names are looked up by id; last active has no data, so it shows a dash.
export function toUserRow(user, departments) {
  const department = departments.find((d) => d.id === user.departmentId);
  const led = departments.find((d) => d.managerId === user.id);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    department: department?.name ?? NO_DATA, // the admin has no department
    role: ROLE_LABELS[user.role],
    status: STATUS_LABELS[user.status],
    lastActive: NO_DATA,
    joined: formatDate(user.createdAt),
    leadOf: led?.name ?? null,
    telemetry: null,
  };
}