// Read-only capsule that shows the active typography pairing in its own fonts.
// It uses the --font-serif / --font-sans / --font-mono variables that applyFonts()
// sets on <html>. These always hold the active pairing, so the pill can never
// drift from what the app is actually using, and no font names are hardcoded here.
export default function TypographySpecimenPill({ typography }) {
  // Each chip shows the font's name, drawn in that same font (via its slot's class).
  const chips = [
    { slot: "font-serif", name: typography.serif },
    { slot: "font-sans", name: typography.sans },
    { slot: "font-mono", name: typography.mono },
  ];

  return (
    <div className="inline-flex w-fit items-center gap-2.5 whitespace-nowrap rounded-full border border-(--border-medium) bg-(--bg-surface) py-1 pl-1.5 pr-4 shadow-(--shadow-sm)">
      {/* "Aa" in the heading font; primary/primary-contrast stay readable on every theme */}
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-md bg-linear-to-br from-(--primary) to-(--primary-deep) font-serif text-[12px] font-bold leading-none text-(--primary-contrast)"
      >
        Aa
      </span>

      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-(--primary)">
        Typography:
      </span>

      {/* Pairing name in the heading font */}
      <span className="font-serif text-[13px] font-bold text-(--text-primary)">
        {typography.name}
      </span>

      {chips.map(({ slot, name }) => (
        <span key={slot} className="contents">
          <span
            aria-hidden="true"
            className="select-none text-xs text-(--text-muted)"
          >
            •
          </span>
          <span
            className={`${slot} rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) px-2 py-0.5 text-[11px] font-medium leading-none text-(--text-secondary)`}
          >
            {name}
          </span>
        </span>
      ))}
    </div>
  );
}