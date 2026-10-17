import { Building2, Users } from "lucide-react";

const TABS = [
  { id: "departments", label: "Departments & Managers", Icon: Building2 },
  { id: "directory", label: "Team Directory", Icon: Users },
];

export default function OrganizationTabs({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Organization view"
      className="inline-flex items-center gap-0.5 rounded-full border border-(--border-subtle-nav)/60 bg-(--bg-surface-subtle) p-0.5"
    >
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
  value === id
    ? "bg-(--primary) text-(--primary-contrast) shadow-sm"
    : "text-(--text-muted) hover:bg-(--bg-surface) hover:text-(--primary)"
}`}
        >
          <Icon size={13} aria-hidden="true" /> {label}
        </button>
      ))}
    </div>
  );
}