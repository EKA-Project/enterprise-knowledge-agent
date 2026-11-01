import {
  Award,
  Briefcase,
  Building,
  Code,
  Compass,
  Cpu,
  Database,
  FileText,
  Globe,
  Layers,
  Layout,
  LayoutPanelLeft,
  Lock,
  MessageSquare,
  Server,
  Shield,
  SlidersHorizontal,
  Tag,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// Departments store KEYS (departments.colorKey / iconKey), never hex values or
// component instances. That lets an admin create a department with no code
// deploy, and keeps every theme consistent.
// Source: data-architecture.md, section 4.1.

// colorKey -> CSS variable. The hex values live ONLY in styles/variables.css
// (the "Department palette" block).
export const DEPARTMENT_COLORS = {
  // Core departments, as used in the target design
  forest: "var(--dept-forest)", // Engineering & DevOps
  emerald: "var(--dept-emerald)", // People & HR Operations
  purple: "var(--dept-purple)", // Product Strategy & Design
  crimson: "var(--dept-crimson)", // Security & Compliance
  amber: "var(--dept-amber)", // Sales & Go-To-Market
  cyan: "var(--dept-cyan)", // Legal & Finance

  // Extended palette for departments an admin creates later
  teal: "var(--dept-teal)",
  sky: "var(--dept-sky)",
  blue: "var(--dept-blue)",
  indigo: "var(--dept-indigo)",
  violet: "var(--dept-violet)",
  fuchsia: "var(--dept-fuchsia)",
  rose: "var(--dept-rose)",
  orange: "var(--dept-orange)",
  slate: "var(--dept-slate)",
};

// iconKey -> lucide component. Keys are lucide's own kebab-case names.
export const DEPARTMENT_ICONS = {
  // Core departments
  code: Code, // Engineering & DevOps
  users: Users, // People & HR Operations
  layout: Layout, // Product Strategy & Design
  "layout-panel-left": LayoutPanelLeft, // alternative Product layout icon
  shield: Shield, // Security & Compliance
  "trending-up": TrendingUp, // Sales & Go-To-Market
  "file-text": FileText, // Legal & Finance

  // Extra choices for new departments
  database: Database,
  cpu: Cpu,
  briefcase: Briefcase,
  server: Server,
  target: Target,
  "message-square": MessageSquare,
  compass: Compass,
  globe: Globe,
  building: Building,
  award: Award,
  lock: Lock,
  zap: Zap,
  layers: Layers,
  "sliders-horizontal": SlidersHorizontal,
  tag: Tag,
};

const FALLBACK_COLOR = "var(--dept-neutral)";
const FALLBACK_ICON = Briefcase;

/**
 * Resolve a department's keys into what a component needs to draw it.
 * Unknown keys fall back to a neutral style instead of crashing.
 *
 * @param {string} colorKey  e.g. "forest"
 * @param {string} iconKey   e.g. "code"
 * @returns {{Icon: import('react').ComponentType<any>, color: string, softBg: string, border: string}}
 *
 * Usage:
 *   const { Icon, color, softBg, border } = getDepartmentTheme(dept.colorKey, dept.iconKey);
 *   <span style={{ color, background: softBg, borderColor: border }}><Icon size={14} /></span>
 */
export function getDepartmentTheme(colorKey, iconKey) {
  const color = DEPARTMENT_COLORS[colorKey] ?? FALLBACK_COLOR;
  return {
    Icon: DEPARTMENT_ICONS[iconKey] ?? FALLBACK_ICON,
    color,
    softBg: `color-mix(in srgb, ${color} 14%, transparent)`,
    border: `color-mix(in srgb, ${color} 30%, transparent)`,
  };
}