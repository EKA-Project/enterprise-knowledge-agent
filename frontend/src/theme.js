export const DEFAULT_THEME = "vintage-linen";
const STORAGE_KEY = "eka-theme";

// TEMPORARY: while false, DEFAULT_THEME always wins (no saved theme is read).
// Your friend sets this to true when the Appearance settings page is live.
const USE_SAVED_THEME = false;
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
  if (!USE_SAVED_THEME) return DEFAULT_THEME;
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
// Sets the attribute only. It does NOT save, so only a user's click in
// settings ever writes to localStorage.
document.documentElement.setAttribute("data-theme", getSavedTheme());