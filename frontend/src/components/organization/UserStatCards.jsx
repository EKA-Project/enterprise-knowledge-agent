import { ShieldCheck, UserCheck, UserPlus, Users } from "lucide-react";
import { getUserStats } from "./OrganizationData";

const mono = "font-(family-name:--font-mono)";

export default function UserStatCards({ users }) {
  const s = getUserStats(users);
  const cards = [
    { label: "Total members", value: s.total, note: `${s.live} Active`, noteTone: "text-(--status-verified)", Icon: Users, tile: "bg-[#ffedd5] border-[#fed7aa] text-[#ea580c]" },
    { label: "Administrators", value: s.admins, note: "Full Control", noteTone: "text-(--status-verified)", Icon: ShieldCheck, tile: "bg-[#dcfce7] border-[#bbf7d0] text-[#15803d]" },
    { label: "Managers", value: s.managers, note: "Dept Leads", noteTone: "text-[#d97706]", Icon: UserCheck, tile: "bg-[#fef3c7] border-[#fde68a] text-[#d97706]" },
    { label: "Pending invitations", value: s.pending, note: "Awaiting setup", noteTone: "text-[#7c3aed]", Icon: UserPlus, tile: "bg-[#f3e8ff] border-[#e4ccff] text-[#7e22ce]" },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, note, noteTone, Icon, tile }, i) => (
        <article
          key={label}
          style={{ animationDelay: `${i * 60}ms` }}
          className="org-rise rounded-[20px] border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm) transition duration-300 hover:-translate-y-1 hover:border-(--border-medium) hover:shadow-(--shadow-md)"
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