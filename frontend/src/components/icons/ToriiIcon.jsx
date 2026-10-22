// Torii gate for Washi Vermilion (lucide has no equivalent).
// Same props as a lucide icon, so it drops straight into <IconBadge icon={ToriiIcon} />.
export default function ToriiIcon({ size = 24, strokeWidth = 2, className = "", ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <line x1="2" y1="4" x2="22" y2="4" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="7" y1="4" x2="7" y2="21" />
      <line x1="17" y1="4" x2="17" y2="21" />
      <line x1="4" y1="13" x2="7" y2="13" />
      <line x1="17" y1="13" x2="20" y2="13" />
    </svg>
  );
}