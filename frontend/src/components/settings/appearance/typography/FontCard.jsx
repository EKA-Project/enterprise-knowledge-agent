import { DEFAULT_TYPOGRAPHY } from "../../../../appearance/fontStudio";

// Typography pairing card: architectural numbered header, specimen with ghosted Aa watermark, 3-column spec ledger.
export default function FontCard({ font, active, onSelect, index }) {
  const isDefault = font.id === DEFAULT_TYPOGRAPHY;

  const handleClick = () => {
    if (!active) onSelect(font);
  };

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={handleClick}
      title={active ? `${font.name} applied` : `Apply ${font.name} pairing`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[12px] p-[1.15rem_1.35rem] text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) min-h-[185px] select-none ${
        active
          ? "border border-(--primary) bg-(--bg-surface) shadow-[0_0_0_1px_var(--primary),0_4px_16px_var(--primary-glow)]"
          : "border border-(--border-medium) bg-(--bg-surface) hover:border-(--text-secondary) hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] cursor-pointer"
      }`}
    >
      {/* ========== 1. HEADER: Index + Title + Badges ========== */}
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-(--border-subtle) w-full">
        <div className="flex items-baseline gap-2 min-w-0 flex-1">
          {/* Index uses global mono - lights up on hover */}
          <span className="shrink-0 font-mono text-[11px] font-bold tracking-[0.08em] text-(--text-muted) transition-colors duration-180 group-hover:text-(--primary) group-hover:opacity-100">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title uses global sans (the active UI font) */}
          <h3 className="font-sans text-[14.5px] font-bold text-(--text-primary) tracking-[-0.01em] truncate">
            {font.name}
          </h3>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isDefault && (
            <span className="rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.04em] text-(--text-muted) leading-tight">
              Default
            </span>
          )}
          {active && (
            <span className="inline-flex items-center gap-1 rounded-full border border-(--primary)/25 bg-(--primary)/12 px-2.5 py-0.5 text-[11px] font-bold text-(--primary) shadow-[0_1px_3px_rgba(0,0,0,0.03)] leading-tight">
              <span aria-hidden="true" className="text-[9px]">
                ✦
              </span>{" "}
              Applied
            </span>
          )}
        </div>
      </div>

      {/* ==========2. SPECIMEN with Ghost Watermark ========== */}
      <div className="relative mb-4 min-h-[3.2em] overflow-hidden">
        {/* Specimen uses the card's serif font - clamped to 2 lines */}
        <h2
          className="relative z-10 font-bold text-[18px] leading-tight text-(--text-primary) overflow-hidden"
          style={{
            fontFamily: `"${font.serif}", serif`,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "2.8em",
          }}
        >
          {font.sample}
        </h2>

        {/* Ghost "Aa" Watermark - anchored bottom-right, uses card's serif font */}
        <span
          aria-hidden="true"
          className={`absolute -bottom-2 -right-1 pointer-events-none select-none font-bold transition-all duration-200 ${
            active
              ? "opacity-[0.035]"
              : "opacity-[0.035] group-hover:opacity-[0.07] group-hover:-translate-y-0.5 group-hover:scale-[1.03]"
          }`}
          style={{
            fontFamily: `"${font.serif}", serif`,
            fontSize: "76px",
            lineHeight: 1,
            color: "var(--text-primary)",
          }}
        >
          Aa
        </span>
      </div>

      {/* ========== 3. 3-COLUMN SPEC LEDGER ========== */}
      <div className="border-t border-(--border-subtle) pt-3 grid grid-cols-3 gap-2.5 w-full">
        {/* Display (Heading Font) */}
        <div className="flex flex-col min-w-0">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.09em] text-(--text-muted) mb-0.5">
            Display
          </p>
          <p
            className="text-[12.5px] font-semibold text-(--text-primary) truncate leading-tight"
            style={{ fontFamily: font.serif }}
            title={font.serif}
          >
            {font.serif?.split(",")[0]?.replace(/['"]/g, "") || font.serif}
          </p>
        </div>

        {/* Interface (Body Font) */}
        <div className="flex flex-col min-w-0">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.09em] text-(--text-muted) mb-0.5">
            Interface
          </p>
          <p
            className="text-[12.5px] font-semibold text-(--text-primary) truncate leading-tight"
            style={{ fontFamily: font.sans }}
            title={font.sans}
          >
            {font.sans?.split(",")[0]?.replace(/['"]/g, "") || font.sans}
          </p>
        </div>

        {/* Mono (Code Font) */}
        <div className="flex flex-col min-w-0">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.09em] text-(--text-muted) mb-0.5">
            Mono
          </p>
          <p
            className="text-[12.5px] font-semibold text-(--text-primary) truncate leading-tight"
            style={{ fontFamily: font.mono }}
            title={font.mono}
          >
            {font.mono?.split(",")[0]?.replace(/['"]/g, "") || font.mono}
          </p>
        </div>
      </div>
    </button>
  );
}
