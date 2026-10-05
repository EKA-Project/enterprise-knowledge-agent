// CitationPill — small source-citation card shown under an AI answer.
// Reusable anywhere a grounded source needs to be displayed.
export default function CitationPill({ title, meta, icon = '📄' }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl max-w-[320px]
                     bg-[var(--accent-chip)] border border-[var(--badge-border)]">
      {/* icon box */}
      <span className="w-7 h-7 rounded-lg grid place-items-center flex-shrink-0 bg-[var(--bg-surface)]">
        {icon}
      </span>

      {/* title + meta text */}
      <div>
        <p className="m-0 text-[12.5px] font-bold text-[var(--text-primary)]">{title}</p>
        <p className="m-0 mt-0.5 text-[11px] font-semibold text-[var(--accent-chip-text)]">
          {meta}
        </p>
      </div>
    </div>
  );
}