// Options and defaults for the Settings page (everything except appearance).
// Appearance (theme, fonts, density, scale) lives in src/appearance/.

// ---------- Defaults ----------
export const DEFAULT_SETTINGS = {
  answerStyle: "concise", language: "English (United States)", recommended: true,
  notifications: { digest: true, answers: true, ingestion: true, security: true },
  privacy: { saveHistory: true, retention: "90 Days", presence: true },
  admin: {
    orgName: "Northstar Studio", defaultRole: "Employee (Standard Access)", autoJoin: true, enforce2fa: true,
    uploadPermission: "All Verified Members", confidence: 85, guardrails: true,
    fallback: "Safely decline & route ticket to Department Curator",
  },
};

// ---------- Dropdown options ----------
export const LANGUAGES = ["English (United States)", "English (United Kingdom)", "Hindi", "Spanish", "French", "German"];
export const RETENTION = ["30 Days", "90 Days", "180 Days", "1 Year", "Keep Forever"];
export const UPLOAD_PERMISSIONS = ["All Verified Members", "Managers & Admins", "Admins Only"];
export const DEFAULT_ROLES = ["Employee (Standard Access)", "Manager (Dept Lead)", "Admin (Full Access)"];
export const FALLBACKS = ["Safely decline & route ticket to Department Curator", "Answer with a low-confidence warning", "Ask a clarifying question first"];
export const ISSUE_CATEGORIES = ["Search Accuracy & Citation Error", "Interface or Display Bug", "Slow Performance", "Account & Access", "Something Else"];

// ---------- Roles ----------
export const ROLE_ACCESS = {
  Admin: { badge: "Level 3 • Full Administrator", title: "Unrestricted Organization & Governance Privileges", text: "Full access to organization controls, member management, knowledge vault policies, and audit logs.", clearance: "Level 3 — Administrator (Full Access)" },
  Manager: { badge: "Level 2 • Department Lead", title: "Scoped Department Management Privileges", text: "Manage your department's documents, members, and ingestion within your assigned scope.", clearance: "Level 2 — Manager (Department Scope)" },
  Employee: { badge: "Level 1 • Standard Member", title: "Standard Knowledge Access", text: "Search, ask, and read the knowledge your department and organization have shared with you.", clearance: "Level 1 — Employee (Standard Access)" },
};

// ---------- Devices (mock data) ----------
export const INITIAL_DEVICES = [
  { id: "d1", icon: "💻", name: "Windows PC • Chrome 128 (Current Device)", where: "New Delhi, India • IP: 103.21.244.12", current: true },
  { id: "d2", icon: "📱", name: "iPhone 15 Pro • EKA Mobile App", where: "New Delhi, India • Last active 2 hours ago", current: false },
  { id: "d3", icon: "💻", name: 'MacBook Pro 16" • Safari 18.0', where: "Bengaluru, India • Last active yesterday", current: false },
];