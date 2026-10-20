/* ==========================================================================
   Button  (components/common/Button.jsx)
   --------------------------------------------------------------------------
   The shared BASE for every button in EKA. All EKA buttons are the same pill;
   they only differ in colour scheme, icon and label. So this file holds the
   pill + the two colour schemes. Named buttons (Add Member, Ingest Document,
   ...) live in ActionButtons.jsx and are built on top of this.

   Colour schemes (variant):
     "light" (default)  white  -> on hover: blue border + blue text
         "solid"            blue   -> on hover: white with blue text + blue border
         "danger"           red    -> on hover: darker red (destructive confirms)
     "soft"             white, blue text -> on hover: light blue fill (Cancel / Close)
     "dangerSoft"       light red -> on hover: solid red with white text

   Props:
     variant:  "light" | "solid"
     size:     "sm" (default, small and minimal) | "md"
     icon:     a lucide-react icon component, e.g. icon={UserPlus}
     iconChip: true wraps the icon in a small round chip
     children: the label
     ...rest:  passed to <button> (onClick, title, disabled, className, ...)
   ========================================================================== */

// ---- The pill shape shared by every button ----
const BASE =
  "group inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border font-semibold transition-[color,background-color,border-color,box-shadow,transform] disabled:cursor-not-allowed disabled:opacity-50";

// ---- Colour schemes: edit these to restyle every button in the app ----
const VARIANTS = {
  light:
    "border-(--border-medium) bg-white text-(--text-primary) hover:border-(--primary) hover:text-(--primary)",
  solid:
    "border-(--accent-secondary) bg-(--accent-secondary) text-white hover:border-(--primary-deep) hover:bg-(--primary-deep)",
  danger:
    "border-(--status-danger) bg-(--status-danger) text-white hover:border-[#b91c1c] hover:bg-[#b91c1c]",
  // Same look as the modal's close button: quiet at rest, reacts on hover
  soft: "border-(--border-subtle) bg-white text-(--primary) hover:border-(--primary)/40 hover:bg-(--accent-chip)",
  dangerSoft:
    "border-[#fca5a5] bg-[#fee2e2] text-(--status-danger) hover:border-(--status-danger) hover:bg-(--status-danger) hover:text-white",
  // Theme-aware elevated pill that lifts on hover (no hard-coded white, so dark themes work). Used by Surprise Me.
  surface:
    "border-(--border-medium) bg-(--bg-surface-elevated) text-(--text-primary) shadow-(--shadow-sm) hover:-translate-y-px hover:border-(--primary) hover:bg-(--bg-surface) hover:text-(--primary) hover:shadow-[0_4px_14px_var(--primary-glow)] active:translate-y-0 active:scale-[0.97]",
};
// ---- Sizes: height + text size ----
const SIZES = {
  xs: "h-6 text-[0.7rem]",
  sm: "h-8 text-xs",
  md: "h-10 text-sm",
};

// ---- Horizontal padding (smaller on the left when an icon chip is shown) ----
const PADDING = {
  xs: { plain: "px-2.5", chip: "pl-1 pr-2.5" },
  sm: { plain: "px-3", chip: "pl-1 pr-3" },
  md: { plain: "px-4", chip: "pl-1.5 pr-4" },
};

// ---- Icon sizes ----
const ICON_SIZE = { sm: 14, md: 16 };
const CHIP_ICON_SIZE = { sm: 13, md: 15 };
const CHIP_BOX = { sm: "h-6 w-6", md: "h-7 w-7" };

// ---- Icon chip colours (follow the button's hover, via `group`) ----
const CHIP_COLORS = {
  light: "bg-(--primary-light) text-(--primary)",
  solid: "bg-white/20 text-white group-hover:bg-white/30",
  danger: "bg-white/20 text-white group-hover:bg-white/30",
  dangerSoft: "bg-white text-(--status-danger)",
};

function Button({
  children,
  icon: Icon,
  iconChip = false,
  variant = "light",
  size = "sm",
  type = "button",
  className = "",
  ...rest
}) {
  const hasChip = Boolean(Icon && iconChip);

  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant] ?? VARIANTS.light} ${
        SIZES[size] ?? SIZES.sm
      } ${PADDING[size]?.[hasChip ? "chip" : "plain"] ?? PADDING.sm.plain} ${className}`}
      {...rest}
    >
      {Icon &&
        (iconChip ? (
          <span
            className={`flex items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 ${
              CHIP_BOX[size] ?? CHIP_BOX.sm
            } ${CHIP_COLORS[variant] ?? CHIP_COLORS.light}`}
          >
            <Icon size={CHIP_ICON_SIZE[size] ?? CHIP_ICON_SIZE.sm} />
          </span>
        ) : (
          <Icon size={ICON_SIZE[size] ?? ICON_SIZE.sm} />
        ))}
      {children}
    </button>
  );
}

export default Button;
