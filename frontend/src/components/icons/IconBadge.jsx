// The one styled tile for every icon in the app (themes, collections, departments...).
//   icon  = any lucide-react icon, or a custom icon that takes the same props (size, strokeWidth)
//   tone  = "soft" (tinted tile, for cards) | "solid" (filled tile, for the hero)
//   box   = tile size in px      size = glyph size in px
// The scale-up on hover only fires when a parent element has the `group` class.
const TONES = {
  soft: "bg-(--primary-light) text-(--primary)",
  solid: "bg-(--primary) text-(--primary-contrast)",
};

export default function IconBadge({
  icon: Icon,
  tone = "soft",
  box = 22,
  size = 14,
  strokeWidth = 2,
  className = "",
}) {
  return (
    <span
      style={{ width: box, height: box }}
      className={`grid shrink-0 place-items-center rounded-[28%] transition-transform duration-200 group-hover:scale-110 ${
        TONES[tone] ?? TONES.soft
      } ${className}`}
    >
      <Icon size={size} strokeWidth={strokeWidth} />
    </span>
  );
}