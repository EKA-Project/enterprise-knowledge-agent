import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Search, Upload, Bell, ChevronDown } from "lucide-react";

// Information displayed in the Topbar for each application route.
const routeMetadata = {
  "/dashboard": {
    title: "Overview",
    metadata: "NORTHSTAR STUDIO / 24.11.2026",
  },
  "/ask-eka": {
    title: "Ask EKA",
    metadata: "NEURAL RAG / 100% ISOLATED",
  },
  "/knowledge-base": {
    title: "Knowledge Base",
    metadata: "INSTITUTIONAL PLAYBOOKS / 6 CATEGORIES",
  },
  "/documents": {
    title: "Documents",
    metadata: "INGESTION REPOSITORY / 24 DOCS",
  },
  "/semantic-search": {
    title: "Semantic Search",
    metadata: "CONCEPT & INTENT DISCOVERY",
  },
  "/analytics": {
    title: "Knowledge Analytics",
    metadata: "DOCUMENT INTELLIGENCE & AUDIT",
  },
  "/organization": {
    title: "User Management",
    metadata: "ORGANIZATION GOVERNANCE & RBAC",
  },
  "/settings": {
    title: "Settings",
    metadata: "NORTHSTAR STUDIO / 24.11.2026",
  },
};

const roles = [
  { name: "Admin", icon: "🛡️" },
  { name: "Manager", icon: "👔" },
  { name: "Employee", icon: "👤" },
];

function Topbar() {
  const location = useLocation();
  const [activeRole, setActiveRole] = useState("Employee");

  const currentRoute = routeMetadata[location.pathname];

  return (
    <header className="flex h-18 items-center justify-between border-b border-(--border-subtle) bg-(--bg-surface) px-8">
      {/* Route Title & Metadata */}
      <div className="flex flex-col">
        <h1 className="topbar-page-title text-[1.45rem] font-bold leading-[1.2] text-(--text-primary)">
          {currentRoute?.title}
        </h1>
        <p className="topbar-metadata text-[0.68rem] font-normal uppercase tracking-[0.08em] text-(--text-muted)">
          {currentRoute?.metadata}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="inline-flex items-center gap-0.5 rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-0.5">
          {roles.map((role) => (
            <button
              key={role.name}
              type="button"
              onClick={() => setActiveRole(role.name)}
              className={`flex cursor-pointer items-center gap-0.5 rounded-full px-2.5 py-1 transition-all duration-150 ${
                activeRole === role.name
                  ? "bg-(--primary) font-bold text-(--primary-contrast) shadow-sm"
                  : "bg-transparent font-semibold text-(--text-secondary) hover:bg-(--primary-light) hover:text-(--primary)"
              }`}
            >
              <span className="text-[10px] leading-none">{role.icon}</span>
              <span className="text-[11px]">{role.name}</span>
            </button>
          ))}
        </div>

        {/* Search control */}
        <button
          type="button"
          className="flex h-auto cursor-pointer items-center gap-1.5 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1 text-[11px] font-semibold text-(--text-primary) transition-colors duration-200 hover:border-(--primary) hover:bg-(--bg-surface-subtle) hover:text-(--primary)"
        >
          <Search size={14} strokeWidth={2} />
          <span className="text-[12px] font-bold">Search</span>
        </button>

        {/* Upload control */}
        <button
          type="button"
          className="flex h-auto cursor-pointer items-center gap-1.5 rounded-full border border-(--border-subtle) bg-(--bg-surface) px-4 py-1 text-[11px] font-semibold text-(--text-primary) transition-colors duration-200 hover:border-(--primary) hover:bg-(--bg-surface-subtle) hover:text-(--primary)"
        >
          <Upload size={14} strokeWidth={2} />
          <span className="text-[12px] font-bold">Upload</span>
        </button>

        {/* Ask EKA control */}
        <button
          type="button"
          className="flex h-auto cursor-pointer items-center gap-1.5 rounded-full border border-(--primary) bg-(--primary) px-4 py-1 text-[11px] font-semibold text-(--primary-contrast) transition-colors duration-200 hover:border-(--primary-hover) hover:bg-(--primary-hover)"
        >
          <span className="text-[12px]">+</span>
          <span className="text-[12px] font-bold">Ask EKA</span>
        </button>

        {/* Notification control */}
        <button
          type="button"
          className="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-(--text-primary) transition-colors duration-200 hover:bg-(--bg-surface-subtle) hover:text-(--primary)"
        >
          <Bell size={18} strokeWidth={2} />
          <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-(--accent-gold)" />
        </button>

        {/* User identity control */}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 border-0 bg-transparent text-(--text-muted) transition-colors duration-200 hover:text-(--text-primary)"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--accent-gold) text-[0.75rem] font-bold text-(--sidebar-active-text)">
            ER
          </span>
          <ChevronDown size={12} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;