import {
  Briefcase,
  Code,
  FileText,
  Layers,
  LayoutPanelLeft,
  Shield,
  SlidersHorizontal,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";

// Departments store KEYS (departments.colorKey / iconKey), never hex values or
// component names. That lets an admin create a department with no code deploy,
// and keeps every theme consistent. Source: data-architecture.md, section 4.1.

// colorKey -> CSS variable defined at the end of styles/variables.css
export const DEPARTMENT_COLORS = {
  violet: "var(--dept-violet)",
  indigo: "var(--dept-indigo)",
  blue: "var(--dept-blue)",
  cyan: "var(--dept-cyan)",
  emerald: "var(--dept-emerald)",
  amber: "var(--dept-amber)",
  orange: "var(--dept-orange)",
  rose: "var(--dept-rose)",
};

// iconKey -> lucide component. Keys are lucide's own kebab-case names.
export const DEPARTMENT_ICONS = {
  "sliders-horizontal": SlidersHorizontal,
  users: Users,
  "layout-panel-left": LayoutPanelLeft,
  shield: Shield,
  tag: Tag,
  "file-text": FileText,
  briefcase: Briefcase,
  code: Code,
  layers: Layers,
  "trending-up": TrendingUp,
};

const FALLBACK_COLOR = "var(--dept-neutral)";
const FALLBACK_ICON = Briefcase;

/**
 * Resolve a department's keys into what a component needs to draw it.
 * Unknown keys fall back to a neutral style instead of crashing.
 *
 * @param {string} colorKey
 * @param {string} iconKey
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