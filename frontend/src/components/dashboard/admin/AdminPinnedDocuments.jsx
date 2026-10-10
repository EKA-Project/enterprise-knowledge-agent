import { Link } from "react-router-dom";
import { pinnedDocuments } from "./adminDashboardData.js";

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
          <article
            key={document.title}
            className="cursor-pointer rounded-[14px] border border-(--border-medium) bg-(--bg-surface) px-4 py-3.5 transition-all duration-200 hover:-translate-y-px hover:shadow-(--shadow-sm)"
          >
            <div className="flex items-center gap-3">
              {/* PDF type */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#fff0f3] text-[0.65rem] font-bold text-[#e11d48]">
                {document.type}
              </div>

              {/* Document information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="[font-family:var(--font-serif)] min-w-0 truncate text-[0.88rem] font-bold text-(--text-primary)">
                    {document.title}
                  </h3>

                  <span className="shrink-0 rounded-[4px] bg-(--accent-chip) px-2 py-0.5 text-[0.65rem] font-semibold text-(--accent-chip-text)">
                    Pinned
                  </span>
                </div>

                <p className="mt-1 text-[0.76rem] leading-relaxed text-(--text-muted)">
                  {document.meta}
                </p>
              </div>

              {/* Arrow */}
              <span className="shrink-0 text-[0.95rem] font-bold text-(--text-primary)">
                →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminPinnedDocuments;
