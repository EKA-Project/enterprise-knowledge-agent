/* ==========================================================================
   Button  (components/common/Button.jsx)
   Shared pill base with EKA 160ms timing, craft borders & active spring.
   ========================================================================== */

const BASE =
  "group inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] font-semibold transition-all duration-160 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100";

const VARIANTS = {
  // 1. Secondary Light Pill (Add Member, Compare & Redline, etc.)
  light:
    "border-(--border-medium) bg-(--bg-surface) text-(--text-primary) shadow-[var(--shadow-sm)] hover:border-(--primary) hover:bg-(--bg-surface-elevated) hover:text-(--primary) hover:shadow-[0_3px_10px_rgba(0,135,102,0.12)]",

  // High-contrast dark hover (used by Export Storage Audit)
  darkHover:
    "border-(--border-medium) bg-(--bg-surface) text-(--text-primary) shadow-[var(--shadow-sm)] hover:border-(--text-primary) hover:text-(--text-primary) hover:shadow-[0_3px_10px_rgba(0,0,0,0.08)]",

  // 2. Primary Solid Pill (Ingest Document, Send Invitation, etc.)
  solid:
    "border-white/16 bg-(--primary) text-(--primary-contrast) shadow-[0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.22)] hover:bg-(--primary-hover) hover:border-white/25 hover:shadow-[0_3px_12px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.28)]",

  // 3. Destructive Primary (Modal confirmations)
  danger:
    "border-(--status-danger) bg-(--status-danger) text-white shadow-[0_2px_6px_rgba(220,38,38,0.2)] hover:bg-[#b91c1c] hover:border-[#b91c1c] hover:shadow-[0_3px_12px_rgba(220,38,38,0.3)]",

  // 4. Soft Pill (Cancel / Close)
// In VARIANTS inside Button.jsx:
// In Button.jsx -> VARIANTS:
soft: "border-(--border-medium) bg-(--bg-surface) text-(--text-secondary) shadow-[var(--shadow-sm)] hover:border-red-400 hover:text-red-600 hover:bg-(--bg-surface) hover:shadow-[0_2px_10px_rgba(220,38,38,0.12)]",

  // 5. Danger Soft Pill (Delete History, Empty Bin, Remove from Team)
  dangerSoft:
    "border-[rgba(220,38,38,0.28)] bg-[rgba(220,38,38,0.08)] text-[#dc2626] hover:border-[rgba(220,38,38,0.52)] hover:bg-[rgba(220,38,38,0.16)] hover:text-[#b91c1c] hover:shadow-[0_2px_10px_rgba(220,38,38,0.22)]",

  // 6. Surface Pill (Surprise Me)
  surface:
    "border-(--border-medium) bg-(--bg-surface-elevated) text-(--text-primary) shadow-(--shadow-sm) hover:border-(--primary) hover:bg-(--bg-surface) hover:text-(--primary) hover:shadow-[0_4px_14px_var(--primary-glow)]",
};

// All size parameters co-located in one single lookup
const SIZES = {
  xs: {
    btn: "h-6 text-[0.7rem]",
    padding: (hasChip) => (hasChip ? "pl-1 pr-2.5" : "px-2.5"),
    chipBox: "h-5 w-5",
    iconSize: 12,
    chipIconSize: 10,
  },
  sm: {
    // EKA default compact pill
    btn: "h-8 text-xs",
    padding: (hasChip) => (hasChip ? "pl-1 pr-3" : "px-3"),
    chipBox: "h-[22px] w-[22px]",
    iconSize: 14,
    chipIconSize: 12,
  },
  md: {
    // Larger pill (e.g. Surprise Me or landing CTA)
    btn: "h-10 text-sm",
    padding: (hasChip) => (hasChip ? "pl-1.5 pr-4" : "px-4"),
    chipBox: "h-7 w-7",
    iconSize: 16,
    chipIconSize: 14,
  },
};

const CHIP_COLORS = {
  light:
    "bg-(--bg-surface-subtle) text-(--primary) group-hover:bg-[rgba(0,135,102,0.14)]",
  // ✨ Add this single line:
  darkHover:
    "bg-(--bg-surface-subtle) text-(--text-secondary) group-hover:bg-(--text-primary) group-hover:text-white",
  solid: "bg-white/20 text-white group-hover:bg-white/30",
  danger: "bg-white/20 text-white group-hover:bg-white/30",
  dangerSoft:
    "bg-[rgba(220,38,38,0.12)] text-[#dc2626] group-hover:bg-[rgba(220,38,38,0.22)]",
};

export default function Button({
  children,
  icon: Icon,
  iconChip = false,
  chipClassName = "", // <--- Allows custom chip hover (like dark chip for export or emerald for restore)
  variant = "light",
  size = "sm", // Defaults to standard EKA compact pill if omitted
  type = "button",
  className = "",
  ...rest
}) {
  const hasChip = Boolean(Icon && iconChip);
  const s = SIZES[size] ?? SIZES.sm;

  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant] ?? VARIANTS.light} ${s.btn} ${s.padding(
        hasChip,
      )} ${className}`}
      {...rest}
    >
      {Icon &&
        (iconChip ? (
          <span
            className={`flex items-center justify-center rounded-full transition-all duration-160 ease-out group-hover:translate-y-[-0.5px] group-hover:scale-108 ${
              s.chipBox
            } ${CHIP_COLORS[variant] ?? CHIP_COLORS.light}`}
          >
            <Icon size={s.chipIconSize} strokeWidth={2.2} />
          </span>
        ) : (
          <Icon size={s.iconSize} strokeWidth={2} />
        ))}
      {children}
    </button>
  );
}
