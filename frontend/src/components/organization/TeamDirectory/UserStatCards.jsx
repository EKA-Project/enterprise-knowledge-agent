import { ShieldCheck, UserCheck, UserX, Users } from "lucide-react";
import { getUserStats } from "../OrganizationData";

const mono = "font-(family-name:--font-mono)";

export default function UserStatCards({ users }) {
  const s = getUserStats(users);
  const cards = [
    { label: "Total members", value: s.total, note: `${s.live} Active`, noteTone: "text-(--status-verified)", Icon: Users, tile: "bg-(--primary-light) border-(--border-medium) text-(--primary)" },
    { label: "Administrators", value: s.admins, note: "Full Control", noteTone: "text-(--status-verified)", Icon: ShieldCheck, tile: "bg-(--status-success-bg) border-(--status-success)/30 text-(--status-success)" },
    { label: "Managers", value: s.managers, note: "Dept Leads", noteTone: "text-(--status-warning)", Icon: UserCheck, tile: "bg-(--status-warning-bg) border-(--status-warning)/30 text-(--status-warning)" },
    { label: "Terminated", value: s.terminated, note: "Access revoked", noteTone: "text-(--status-danger)", Icon: UserX, tile: "bg-(--status-danger-bg) border-(--status-danger)/30 text-(--status-danger)" },
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