// Shared building blocks for every Settings tab.

// White card with a serif title, description and a divider.
export default function SettingsPanel({ title, description, badge, className = "", children }) {
  return (
    <section className={`set-rise rounded-[24px] border border-(--border-subtle) bg-(--bg-surface) p-8 shadow-(--shadow-sm) ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-serif text-[24px] font-bold leading-tight text-(--text-primary)">{title}</h3>
        {badge}
      </div>
      <p className="mt-1 text-[12.5px] text-(--text-muted)">{description}</p>
      <div className="mb-6 mt-5 border-t border-(--border-medium)/70" />
      {children}
    </section>
  );
}

// A titled block inside a panel, separated from the previous one by a line.
export function SubSection({ title, description, first = false, aside, children }) {
  return (
    <div className={first ? "" : "mt-8 border-t border-(--border-subtle) pt-8"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="flex flex-wrap items-center gap-2 font-serif text-[18px] font-bold text-(--text-primary)">{title}</h4>
          {description && <p className="mt-1 text-[12px] text-(--text-secondary)">{description}</p>}
        </div>
        {aside}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

// Tinted row: title and description on the left, a control on the right.
export function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-(--bg-surface-subtle) px-5 py-4 transition duration-200 hover:shadow-(--shadow-sm)">
      <div className="min-w-0">
        <p className="text-[14px] font-bold text-(--text-primary)">{title}</p>
        {description && <p className="mt-1 text-[12px] text-(--text-muted)">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// Selectable card with a radio dot (mascot and answer style).
export function RadioCard({ selected, onSelect, title, description, badge, image, dotSide = "right" }) {
  const dot = (
    <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 transition duration-200 ${selected ? "border-(--primary)" : "border-(--text-muted)"}`}>
      <span className={`size-2.5 rounded-full bg-(--primary) transition duration-200 ${selected ? "scale-100" : "scale-0"}`} />
    </span>
  );
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-sm) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
        selected ? "border-(--primary) bg-(--bg-surface-subtle)" : "border-(--border-subtle) bg-(--bg-surface) hover:border-(--border-medium)"
      }`}
    >
      {dotSide === "left" && dot}
      {image && <img src={image} alt="" className="size-12 shrink-0 object-contain" />}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[14px] font-bold text-(--text-primary)">
          {title}
          {badge && selected && <span className="rounded-full border border-(--status-success) bg-(--status-success-bg) px-2 py-0.5 text-[10px] font-semibold text-(--status-success)">{badge}</span>}
        </span>
        <span className="mt-1 block text-[12.5px] text-(--text-muted)">{description}</span>
      </span>
      {dotSide === "right" && <span className="self-center">{dot}</span>}
    </button>
  );
}