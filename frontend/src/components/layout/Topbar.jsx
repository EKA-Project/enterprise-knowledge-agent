import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Search, UserRound, UsersRound, ShieldCheck } from "lucide-react";

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
  { name: "Employee", icon: UserRound },
  { name: "Manager", icon: UsersRound },
  { name: "Admin", icon: ShieldCheck },
];

function Topbar() {
  const location = useLocation();
  const [activeRole, setActiveRole] = useState("Employee");

  // Find metadata for the currently active route.
  const currentRoute = routeMetadata[location.pathname];

  return (
    <header className="flex h-18 items-center justify-between border-b border-slate-200 bg-[#f5f5f7] px-8">
      {/* 
      Left side of the Topbar.

      This section contains information about the current route.
      Because the values come from `currentRoute`, this content
      changes when the user navigates to another application page.
    */}
      <div className="flex flex-col">
        <h1 className="topbar-page-title text-[1.45rem] font-bold leading-[1.2] text-slate-900">
          {currentRoute?.title}
        </h1>
        <p className="topbar-metadata text-[0.68rem] font-normal uppercase tracking-[0.08em] text-slate-500">
          {currentRoute?.metadata}
        </p>
      </div>

      {/*
      Right side of the Topbar.

      These controls belong to the persistent application shell,
      not to an individual page rendered by <Outlet />.

      We will gradually add the role selector, search, upload,
      Ask EKA, notifications, and user menu here in later steps.
    */}
      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="inline-flex items-center gap-0.5 rounded-full border border-slate-300 bg-white p-0.5">
          {roles.map((role) => {
            const RoleIcon = role.icon;

            return (
              <button
                key={role.name}
                type="button"
                onClick={() => setActiveRole(role.name)}
                className={`flex cursor-pointer items-center justify-center gap-1 rounded-full border-0 px-2 py-1 text-[0.68rem] font-semibold leading-none transition-all duration-200 ease-out ${activeRole === role.name ? "bg-slate-900 font-bold text-white" : "bg-transparent text-slate-500"}`}
              >
                <RoleIcon size={11} strokeWidth={2} />
                {role.name}
              </button>
            );
          })}
        </div>

        {/* Search control */}
        <button
          type="button"
          className="flex h-7 cursor-pointer items-center gap-1.5 rounded-full border border-slate-900 bg-white px-4 text-[0.75rem] font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-50"
        >
          <Search size={14} strokeWidth={2} />
          <span>Search</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
