import { Briefcase, Code, FileText, Layers, Pencil, ShieldCheck, Trash2, TrendingUp, Users } from "lucide-react";
import { getInitials } from "./OrganizationData";
// Tailwind class for the monospace font used in badges and labels
const ICONS = { code: Code, users: Users, layers: Layers, shield: ShieldCheck, trend: TrendingUp, file: FileText, briefcase: Briefcase };
// Tailwind classes for the department tone colors (background, border, text)
const TONES = {
  teal: "bg-[#dcf4ee] border-[#bfe8dd] text-[#0f8f7a]",
  green: "bg-[#dcfce7] border-[#bbf7d0] text-[#15803d]",
  purple: "bg-[#f3e8ff] border-[#e4ccff] text-[#7e22ce]",
  red: "bg-[#fee2e2] border-[#fecaca] text-[#dc2626]",
  amber: "bg-[#fef3c7] border-[#fde68a] text-[#d97706]",
  indigo: "bg-[#e0e7ff] border-[#c7d2fe] text-[#4f46e5]",
};
// Tailwind class for the icon buttons in the top-right corner of the card  
const iconBtn =
  "grid size-8 place-items-center rounded-lg text-(--text-muted) transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:shadow-(--shadow-sm) active:scale-90 focus-visible:outline-2 focus-visible:outline-(--border-focus)";

  // DepartmentCard
export default function DepartmentCard({ dept, lead, delay = 0, onEdit, onDelete, onReassign, onViewDocs }) {
  const Icon = ICONS[dept.icon] ?? Briefcase;
// Tailwind class for the monospace font used in badges and labels
  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="org-rise group flex flex-col rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm) transition duration-300 hover:-translate-y-1.5 hover:border-(--border-medium) hover:shadow-(--shadow-lg)">
        <div className="flex items-start gap-4">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-xl border text-[20px] transition duration-300 group-hover:scale-110 group-hover:shadow-(--shadow-md) ${TONES[dept.tone] ?? TONES.indigo}`}>
            {dept.emoji ? <span aria-hidden="true">{dept.emoji}</span> : <Icon size={20} aria-hidden="true" />}
        </span>
        <div className="min-w-0 flex-1">
      <h3
  title={dept.name}
  className="truncate text-[15px] font-bold leading-snug text-(--text-primary)"
>
  {dept.name}
</h3>
          <span className="mt-1 inline-block rounded-md border border-(--badge-border) bg-(--badge-bg) px-2 py-0.5 font-(family-name:--font-mono) text-[9.5px] font-bold uppercase tracking-wider text-(--text-secondary)">
            {dept.code}
          </span>
        </div>
        <div className="flex shrink-0 gap-0.5">
          <button type="button" onClick={onEdit} aria-label={`Edit ${dept.name}`} title="Edit" className={`${iconBtn} hover:-rotate-12 hover:bg-(--primary-light) hover:text-(--primary)`}>
            <Pencil size={16} />
          </button>
          <button type="button" onClick={onDelete} aria-label={`Delete ${dept.name}`} title="Delete"className={`${iconBtn} hover:rotate-6 hover:bg-(--status-failure-bg) hover:text-(--status-failure)`}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

<p className="mt-5 min-h-[2.75rem] line-clamp-2 text-[13px] leading-relaxed text-(--text-secondary)">
  {dept.description || "No description yet."}
</p>

<div className="group/lead mt-5 flex items-center gap-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-3 transition-colors duration-200 hover:border-(--border-medium) hover:bg-white">
          {lead ? (
          <>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--primary) text-[11px] font-bold text-(--primary-contrast)">
              {getInitials(lead.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-1.5 text-[13.5px] font-bold text-(--text-primary)">
                <span className="truncate">{lead.name}</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fef9c3] px-1.5 py-0.5 text-[9.5px] font-bold text-[#b45309]">
                  <span aria-hidden="true">👔</span> Lead
                </span>
              </p>
              <p className="truncate text-[11.5px] text-(--text-muted)">{lead.email}</p>
            </div>
          </>
        ) : (
          <p className="flex-1 text-[12.5px] italic text-(--text-muted)">No lead assigned</p>
        )}
        <button
          type="button"
          onClick={onReassign}
          className="shrink-0 rounded-full border border-(--border-medium) bg-white px-3 py-1 text-[12px] font-bold text-(--text-primary) transition-all duration-200 group-hover/lead:border-(--primary) group-hover/lead:bg-(--primary-light) group-hover/lead:text-(--primary) hover:-translate-y-0.5 hover:shadow-(--shadow-sm) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"        >
          {lead ? "Reassign" : "Assign"}
        </button>
      </div>

      <div className="mt-auto pt-8">
          <div className="flex items-center justify-between gap-3 border-t border-(--border-subtle) pt-5 text-[12px] text-(--text-muted)">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span><span aria-hidden="true">👥</span> <b className="text-(--text-primary)">{dept.members}</b> members</span>
            <span><span aria-hidden="true">📄</span> <b className="text-(--text-primary)">{dept.docs}</b> scoped docs</span>
          </div>
          <button
            type="button"
            onClick={onViewDocs}
            className="shrink-0 font-bold text-(--primary) transition hover:translate-x-0.5 hover:text-(--primary-hover) focus-visible:outline-2 focus-visible:outline-(--border-focus)"
          >
            View Docs →
          </button>
        </div>
      </div>
    </article>
  );
}