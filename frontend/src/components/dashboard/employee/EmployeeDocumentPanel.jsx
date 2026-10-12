import { Link } from "react-router-dom";
import DocumentListItem from "../../common/DocumentListItem.jsx";

const ACTION_CLASS =
  "shrink-0 whitespace-nowrap !text-[0.82rem] font-semibold text-(--primary) transition-colors hover:underline";

function EmployeeDocumentPanel({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  documents,
}) {
  return (
    <section className="h-full rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)">
      {/* Header */}
      <div className="border-b border-(--border-subtle) px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 [font-family:var(--font-sans)] text-[1rem] font-bold text-(--text-primary)">
            <span aria-hidden="true">{icon}</span>
            {title}
          </h2>

          {actionTo ? (
            <Link to={actionTo} className={ACTION_CLASS}>
              {actionLabel}
            </Link>
          ) : (
            <button type="button" className={`cursor-pointer ${ACTION_CLASS}`}>
              {actionLabel}
            </button>
          )}
        </div>

        <p className="mt-1 text-[0.75rem] text-(--text-muted)">{description}</p>
      </div>

      {/* Document rows */}
      <div className="flex flex-col gap-3 p-6">
        {documents.map((doc) => (
          <DocumentListItem
            key={doc.id}
            type={doc.type}
            title={doc.title}
            meta={doc.meta}
            badge={doc.badge}
          />
        ))}
      </div>
    </section>
  );
}

export default EmployeeDocumentPanel;
