import { Briefcase, FileText, ShieldCheck, Users } from "lucide-react";

const mono = "font-(family-name:--font-mono)";

// All four numbers are calculated from the departments list, so they update live.
export default function DepartmentStatCards({ departments }) {
  const total = departments.length;
  const leads = departments.filter((d) => d.leadId).length;
  const coverage = total ? Math.round((leads / total) * 100) : 0;
  const docs = departments.reduce((sum, d) => sum + d.docs, 0);
  const people = departments.reduce((sum, d) => sum + d.members, 0);

  const cards = [
    { label: "Total departments", value: total, note: `${total} Active Unit${total === 1 ? "" : "s"}`, noteTone: "text-(--status-verified)", Icon: Briefcase, tile: "bg-[#ffedd5] border-[#fed7aa] text-[#ea580c]" },
    { label: "Designated leads", value: leads, note: `${coverage}% Coverage`, noteTone: "text-(--status-verified)", Icon: ShieldCheck, tile: "bg-[#dcfce7] border-[#bbf7d0] text-[#15803d]" },
    { label: "Scoped documents", value: docs, note: "Vector Indexed", noteTone: "text-[#d97706]", Icon: FileText, tile: "bg-[#fef3c7] border-[#fde68a] text-[#d97706]" },
    { label: "Assigned workforce", value: people, note: "Across All Units", noteTone: "text-[#7c3aed]", Icon: Users, tile: "bg-[#f3e8ff] border-[#e4ccff] text-[#7e22ce]" },
  ];

  return (
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {cards.map(({ label, value, note, noteTone, Icon, tile }, i) => (
        <article
          key={label}
          style={{ animationDelay: `${i * 60}ms` }}
            className="org-rise rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-4 shadow-(--shadow-sm) transition duration-300 hover:-translate-y-1 hover:border-(--border-medium) hover:shadow-(--shadow-md)"
                    >
          <div className="flex items-start justify-between gap-2">
            <p className={`${mono} text-[10px] uppercase tracking-[0.14em] text-(--text-muted)`}>{label}</p>
            <span className={`grid size-9 shrink-0 place-items-center rounded-xl border ${tile}`}>
              <Icon size={16} aria-hidden="true" />
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-2">
            <span key={value} className="org-fade font-(family-name:--font-serif) text-[36px] font-bold leading-none text-(--text-primary)">
              {value}
            </span>
            <span className={`text-[12px] font-semibold ${noteTone}`}>{note}</span>
          </div>
        </article>
      ))}
    </div>
  );
}