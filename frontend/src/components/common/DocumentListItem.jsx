const TYPE_STYLES = {
  PDF: "bg-[#fff0f3] text-[#e11d48]",
  DOCX: "bg-[#eff6ff] text-[#2563eb]",
  XLSX: "bg-[#ecfdf5] text-[#059669]",
  PPTX: "bg-[#fff7ed] text-[#ea580c]",
};

const DEFAULT_TYPE_STYLE = "bg-(--bg-surface-subtle) text-(--text-primary)";

function DocumentListItem({ type, title, meta, badge, onClick }) {
  const typeStyle = TYPE_STYLES[type?.toUpperCase()] ?? DEFAULT_TYPE_STYLE;

  return (
    <article
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-(--border-medium) bg-(--bg-surface) px-4 py-3.5 transition-all duration-200 hover:-translate-y-px hover:shadow-(--shadow-sm)"
    >
      {/* File type */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[0.65rem] font-bold uppercase ${typeStyle}`}
      >
        {type}
      </div>

      {/* Title & meta */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="[font-family:var(--font-serif)] min-w-0 truncate text-[0.88rem] font-bold text-(--text-primary)">
            {title}
          </h3>

          {badge && (
            <span className="shrink-0 rounded-[4px] bg-(--accent-chip) px-2 py-0.5 text-[0.65rem] font-semibold text-(--accent-chip-text)">
              {badge}
            </span>
          )}
        </div>

        <p className="mt-1 text-[0.76rem] leading-relaxed text-(--text-muted)">
          {meta}
        </p>
      </div>

      {/* Arrow */}
      <span className="shrink-0 text-[0.95rem] font-bold text-(--text-primary)">
        →
      </span>
    </article>
  );
}

export default DocumentListItem;