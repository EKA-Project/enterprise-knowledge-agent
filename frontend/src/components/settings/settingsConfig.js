// Options and defaults for the Settings page. Colour themes live in src/theme.js + variables.css.

export const DEFAULT_SETTINGS = {
  mascot: "orbit", answerStyle: "concise", language: "English (United States)", recommended: true,
  typography: "classic", density: "comfortable", scale: "standard",
  notifications: { digest: true, answers: true, ingestion: true, security: true },
  privacy: { saveHistory: true, retention: "90 Days", presence: true },
  admin: {
    orgName: "Northstar Studio", defaultRole: "Employee (Standard Access)", autoJoin: true, enforce2fa: true,
    uploadPermission: "All Verified Members", confidence: 85, guardrails: true,
    fallback: "Safely decline & route ticket to Department Curator",
  },
};

export const LANGUAGES = ["English (United States)", "English (United Kingdom)", "Hindi", "Spanish", "French", "German"];
export const RETENTION = ["30 Days", "90 Days", "180 Days", "1 Year", "Keep Forever"];
export const UPLOAD_PERMISSIONS = ["All Verified Members", "Managers & Admins", "Admins Only"];
export const DEFAULT_ROLES = ["Employee (Standard Access)", "Manager (Dept Lead)", "Admin (Full Access)"];
export const FALLBACKS = ["Safely decline & route ticket to Department Curator", "Answer with a low-confidence warning", "Ask a clarifying question first"];
export const ISSUE_CATEGORIES = ["Search Accuracy & Citation Error", "Interface or Display Bug", "Slow Performance", "Account & Access", "Something Else"];

export const ROLE_ACCESS = {
  Admin: { badge: "Level 3 • Full Administrator", title: "Unrestricted Organization & Governance Privileges", text: "Full access to organization controls, member management, knowledge vault policies, and audit logs.", clearance: "Level 3 — Administrator (Full Access)" },
  Manager: { badge: "Level 2 • Department Lead", title: "Scoped Department Management Privileges", text: "Manage your department's documents, members, and ingestion within your assigned scope.", clearance: "Level 2 — Manager (Department Scope)" },
  Employee: { badge: "Level 1 • Standard Member", title: "Standard Knowledge Access", text: "Search, ask, and read the knowledge your department and organization have shared with you.", clearance: "Level 1 — Employee (Standard Access)" },
};

export const INITIAL_DEVICES = [
  { id: "d1", icon: "💻", name: "Windows PC • Chrome 128 (Current Device)", where: "New Delhi, India • IP: 103.21.244.12", current: true },
  { id: "d2", icon: "📱", name: "iPhone 15 Pro • EKA Mobile App", where: "New Delhi, India • Last active 2 hours ago", current: false },
  { id: "d3", icon: "💻", name: 'MacBook Pro 16" • Safari 18.0', where: "Bengaluru, India • Last active yesterday", current: false },
];


export const TYPOGRAPHY = [
  { id: "cyber", name: "Cybernetic Neo-Futuristic", sample: "Autonomous Neural Synthesis", desc: "Curvilinear typography engineered for next-generation intelligence.", serif: "Unbounded", sans: "Sora", mono: "Martian Mono" },
  { id: "nordic", name: "Nordic Avant-Garde", sample: "Autonomous Intelligence", desc: "Streamlining corporate policies with architectural clarity.", serif: "Syne", sans: "Figtree", mono: "Martian Mono" },
  { id: "prestige", name: "Prestige Legal & Executive", sample: "Enterprise Governance & Audit", desc: "Authoritative editorial redlines for executive compliance teams.", serif: "Newsreader", sans: "Plus Jakarta Sans", mono: "Space Mono" },
  { id: "kinetic", name: "Modern Kinetic Grotesque", sample: "Dynamic Knowledge Graphs", desc: "High-density readability for fast-paced operational workflows.", serif: "Bricolage Grotesque", sans: "Manrope", mono: "JetBrains Mono" },
  { id: "arch", name: "Architectural Engineering", sample: "Vector Semantic Retrieval", desc: "Precision geometry engineered for modern data platforms.", serif: "Space Grotesk", sans: "Outfit", mono: "Space Mono" },
  { id: "artisan", name: "Artisanal High-Craft Editorial", sample: "Bespoke Enterprise Craft", desc: "Designed for refined executive reporting and presentations.", serif: "Instrument Serif", sans: "Instrument Sans", mono: "JetBrains Mono" },
  { id: "classic", name: "Classic EKA Baseline", sample: "eka. Executive Intelligence", desc: "Standard optical serif paired with Plus Jakarta Sans.", serif: "Fraunces", sans: "Plus Jakarta Sans", mono: "JetBrains Mono" },
];

export const DENSITIES = [
  { id: "comfortable", label: "Comfortable (Default Editorial Spacing)" },
  { id: "compact", label: "Compact (Tighter Spacing)" },
  { id: "spacious", label: "Spacious (Extra Breathing Room)" },
];
// root = font-size of <html>. "Standard" is empty, so the app stays exactly as it is.
export const SCALES = [
  { id: "small", label: "Small (13px Base)", root: "92.8%" },
  { id: "standard", label: "Standard (14px Base)", root: "" },
  { id: "large", label: "Large (16px Base)", root: "114.3%" },
];

// ---------- Applying fonts, density and scale (colours are handled by src/theme.js) ----------
const WEIGHTS = { "Instrument Serif": "", "Space Mono": "400;700" }; // fonts without 500 / 600
export const ALL_FONTS = TYPOGRAPHY.flatMap((t) => [t.serif, t.sans, t.mono]);

export function loadFonts(families) {
  const query = [...new Set(families)]
    .map((f) => {
      const w = f in WEIGHTS ? WEIGHTS[f] : "400;500;600;700";
      return `family=${f.replace(/ /g, "+")}${w ? `:wght@${w}` : ""}`;
    })
    .join("&");
  let link = document.getElementById("eka-appearance-fonts");
  if (!link) {
    link = Object.assign(document.createElement("link"), { id: "eka-appearance-fonts", rel: "stylesheet" });
    document.head.appendChild(link);
  }
  link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
}

const FONT_VARS = ["--font-serif", "--font-sans", "--font-mono"];

export function applyAppearance({ typography, density, scale }) {
  const root = document.documentElement;
  FONT_VARS.forEach((v) => root.style.removeProperty(v));
  const f = TYPOGRAPHY.find((t) => t.id === typography);
  if (f && f.id !== "classic") {
    loadFonts([f.serif, f.sans, f.mono]);
    root.style.setProperty("--font-serif", `"${f.serif}", Georgia, serif`);
    root.style.setProperty("--font-sans", `"${f.sans}", -apple-system, sans-serif`);
    root.style.setProperty("--font-mono", `"${f.mono}", monospace`);
  }
  root.dataset.density = density;
  root.style.fontSize = SCALES.find((s) => s.id === scale)?.root ?? "";
}

// Optional: call once in main.jsx so saved fonts, density and scale apply on every page.
export function applyStoredAppearance() {
  try {
    applyAppearance({ ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem("eka.settings") ?? "{}") });
  } catch {
    /* ignore */
  }
}