export const DEFAULT_THEME = "sky-blue";
const STORAGE_KEY = "eka-theme";

// Single source of truth for the settings cards (id = data-theme value)
export const THEMES = [
  { id: "sky-blue", name: "Sky blue clarity" },
  { id: "moonlight-ocean", name: "Moonlight Ocean" },
  { id: "sunlit-paper", name: "Sunlit paper" },
  { id: "lagoon-glass", name: "Lagoon glass" },
  { id: "orchid-dusk", name: "Orchid dusk" },
  { id: "citrus-studio", name: "Citrus studio" },
  { id: "noir-expressionist", name: "Noir expressionist" },
  { id: "space-steel", name: "Space steel" },
  { id: "executive-gold", name: "Executive gold" },
  { id: "nordic-sunset", name: "Nordic sunset" },
  { id: "vintage-linen", name: "Vintage linen" },
  { id: "midnight-copper", name: "Midnight copper" },
];

export function getSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return THEMES.some((t) => t.id === saved) ? saved : DEFAULT_THEME;
}

// Call this when a settings card is clicked: applies AND saves the theme.
export function applyTheme(name) {
  const id = THEMES.some((t) => t.id === name) ? name : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", id);
  localStorage.setItem(STORAGE_KEY, id);
}

// Runs once on app load, before React renders (no flash of the wrong theme).
applyTheme(getSavedTheme());