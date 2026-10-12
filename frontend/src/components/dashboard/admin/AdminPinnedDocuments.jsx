import { Link } from "react-router-dom";
import { pinnedDocuments } from "./adminDashboardData.js";
import DocumentListItem from "../../common/DocumentListItem.jsx";

function AdminPinnedDocuments() {
  return (
    <section className="mt-6 rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      {/* Section header */}
      <div className="border-b border-(--border-subtle) px-6 py-[1.25rem]">
        <div className="flex items-center justify-between">
          <h2 className="[font-family:var(--font-sans)] text-[1rem] font-bold text-(--text-primary)">
            📌 Admin–Pinned Documents
          </h2>

          <Link
            to="/documents?category=pinned"
            className="!text-[0.72rem] font-semibold text-(--primary) transition-colors hover:underline"
          >
            Manage Pinned →
          </Link>
        </div>

        <p className="mt-1 text-[0.75rem] text-(--text-muted)">
          Company standards & key charters pinned for spotlight access across
          all dashboards.
        </p>
      </div>

      {/* Pinned document cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 p-6">
        {pinnedDocuments.map((document) => (
          <DocumentListItem
            key={document.title}
            type={document.type}
            title={document.title}
            meta={document.meta}
            badge="Pinned"
          />
        ))}
      </div>
    </section>
  );
}

export default AdminPinnedDocuments;
