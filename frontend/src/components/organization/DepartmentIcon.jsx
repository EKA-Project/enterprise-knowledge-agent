import { Briefcase, Code, FileText, Layers, ShieldCheck, TrendingUp, Users } from "lucide-react";

const ICONS = { code: Code, users: Users, layers: Layers, shield: ShieldCheck, trend: TrendingUp, file: FileText, briefcase: Briefcase };
const TONES = {
  teal: "bg-[#dcf4ee] border-[#bfe8dd] text-[#0f8f7a]",
  green: "bg-[#dcfce7] border-[#bbf7d0] text-[#15803d]",
  purple: "bg-[#f3e8ff] border-[#e4ccff] text-[#7e22ce]",
  red: "bg-[#fee2e2] border-[#fecaca] text-[#dc2626]",
  amber: "bg-[#fef3c7] border-[#fde68a] text-[#d97706]",
  indigo: "bg-[#e0e7ff] border-[#c7d2fe] text-[#4f46e5]",
};

// Small tinted tile with the department icon (used in the directory table).
export default function DepartmentIcon({ icon, tone }) {
  const Icon = ICONS[icon] ?? Briefcase;
  return (
    <span className={`grid size-6 shrink-0 place-items-center rounded-md border ${TONES[tone] ?? TONES.indigo}`}>
      <Icon size={13} aria-hidden="true" />
    </span>
  );
}