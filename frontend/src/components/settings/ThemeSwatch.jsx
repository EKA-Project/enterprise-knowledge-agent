// Three-block colour bar (Sidebar, Canvas, Accent) for any theme.
// The tokens are defined in variables.css; data-theme on the bar makes them resolve to THAT theme's
// colours, so a swatch can't drift from the real theme.
const TOKENS = ["--theme-swatch-1", "--theme-swatch-2", "--theme-swatch-3"];

export default function ThemeSwatch({ themeId, className = "h-9 rounded-lg" }) {
  return (
    <span data-theme={themeId} className={`flex overflow-hidden ${className}`}>
      {TOKENS.map((token) => (
        <span key={token} className="flex-1" style={{ backgroundColor: `var(${token})` }} />
      ))}
    </span>
  );
}