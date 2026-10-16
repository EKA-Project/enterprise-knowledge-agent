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
  "group inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

// ---- Colour schemes: edit these to restyle every button in the app ----
const VARIANTS = {
  light:
    "border-(--border-medium) bg-white text-(--text-primary) hover:border-(--primary) hover:text-(--primary)",
  solid:
    "border-(--primary) bg-(--primary) text-white hover:bg-white hover:text-(--primary)",
};

// ---- Sizes: height + text size ----
const SIZES = {
  sm: "h-8 text-xs",
  md: "h-10 text-sm",
};

// ---- Horizontal padding (smaller on the left when an icon chip is shown) ----
const PADDING = {
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
  solid:
    "bg-white/20 text-white group-hover:bg-(--primary-light) group-hover:text-(--primary)",
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
            className={`flex items-center justify-center rounded-full ${
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