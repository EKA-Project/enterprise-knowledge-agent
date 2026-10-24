// Isometric die used by the Surprise Me button.
// `rolling` plays the spin (CSS in variables.css). The tilt on hover comes from the
// parent button's `group` class, so it works in any <Button>.
export default function DiceIcon({ size = 16, rolling = false, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 text-(--primary) transition-transform duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[20deg] group-hover:scale-[1.15] ${
        rolling ? "dice-rolling" : ""
      } ${className}`}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
      <circle cx="12" cy="7.2" r="1.3" fill="currentColor" />
      <circle cx="7.5" cy="15.5" r="1.3" fill="currentColor" />
      <circle cx="16.5" cy="15.5" r="1.3" fill="currentColor" />
    </svg>
  );
}