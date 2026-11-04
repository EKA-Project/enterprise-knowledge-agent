// Header for the Appearance page and its sections:
// eyebrow, title, description, then a hairline with a short accent segment on it.
//   level = "page" (large title at the top) | "section" (the blocks below it)
//   aside = pill at the right of the title
//   meta  = pill under the description, e.g. "Showing 5 of 25 atmospheres"
// Space ABOVE the header is the parent's job (pass className), so the first header sits flush.
const LEVELS = {
  page: { title: "text-[30px]", description: "text-[15px]", gap: "mb-8" },
  section: { title: "text-[22px]", description: "text-[13px]", gap: "mb-6" },
};

export default function AppearanceHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  aside,
  meta,
  level = "section",
  className = "",
}) {
  const size = LEVELS[level] ?? LEVELS.section;

  return (
    <div className={`${size.gap} ${className}`}>
      <div className="relative border-b border-(--border-subtle) pb-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-(--primary)">
              {Icon && <Icon size={14} aria-hidden="true" />}
              {eyebrow}
            </p>
            <h3
              className={`mt-1.5 font-serif font-bold leading-tight text-(--text-primary) ${size.title}`}
            >
              {title}
            </h3>
          </div>
          {aside}
        </div>

        {description && (
          <p className={`mt-2 text-(--text-secondary) ${size.description}`}>
            {description}
          </p>
        )}
        {meta && <div className="mt-3">{meta}</div>}

        {/* Short accent segment, sitting on top of the hairline */}
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-0.5 w-24 rounded-full bg-(--primary)"
        />
      </div>
    </div>
  );
}