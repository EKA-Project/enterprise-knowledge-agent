import { useLocation } from "react-router-dom";

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

function Topbar() {
  const location = useLocation();

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
      <div>{/* Topbar controls will be added here later. */}</div>
    </header>
  );
}

export default Topbar;
