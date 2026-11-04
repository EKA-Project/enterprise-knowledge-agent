// Three-block colour bar (Sidebar, Canvas, Accent) for any theme.
// The tokens are defined in variables.css; data-theme on the bar makes them resolve to THAT theme's
// colours, so a swatch can't drift from the real theme.
// shine = a light sweep across the bar when a parent with the `group` class is hovered.
const TOKENS = ["--theme-swatch-1", "--theme-swatch-2", "--theme-swatch-3"];

export default function ThemeSwatch({ themeId, className = "h-9 rounded-lg", shine = false }) {
  return (
    <span data-theme={themeId} className={`relative flex overflow-hidden ${className}`}>
      {TOKENS.map((token) => (
        <span key={token} className="flex-1" style={{ backgroundColor: `var(${token})` }} />
      ))}
      {shine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent transition-none motion-safe:group-hover:translate-x-[550%] motion-safe:group-hover:transition-transform motion-safe:group-hover:duration-700 motion-safe:group-hover:ease-out"
        />
      )}
    </span>
  );
}