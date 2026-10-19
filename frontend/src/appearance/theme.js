export const DEFAULT_THEME = "sky-blue";



// Single registry for the settings cards (id = data-theme value in variables.css).
// To add a theme: add its [data-theme="id"] block in variables.css, then one line here.
export const THEMES = [
  {
    id: "sky-blue",
    name: "Sky blue clarity",
    description: "Serene sky blue, soft azure & eye-comfort slate",
  },
  {
    id: "moonlight-ocean",
    name: "Moonlight Ocean",
    description: "Midnight noir, deep ocean blue & moonlight silver",
  },
  {
    id: "sunlit-paper",
    name: "Sunlit paper",
    description: "Forest pine & golden wheat",
  },
  {
    id: "lagoon-glass",
    name: "Lagoon glass",
    description: "Ocean slate & turquoise",
  },
  {
    id: "orchid-dusk",
    name: "Orchid dusk",
    description: "Royal aubergine, soft lavender & pastel plum",
  },
  {
    id: "citrus-studio",
    name: "Citrus studio",
    description: "Hunter moss & yellow lime",
  },
  {
    id: "noir-expressionist",
    name: "Noir expressionist",
    description: "Film Noir & German Expressionist",
  },
  {
    id: "space-steel",
    name: "Space steel",
    description: "Deep space navy, slate & steel",
  },
  {
    id: "executive-gold",
    name: "Executive gold",
    description: "Luxury corporate gold & dark blue",
  },
  {
    id: "nordic-sunset",
    name: "Nordic sunset",
    description: "Ocean teal, sky blue & gold amber",
  },
  {
    id: "vintage-linen",
    name: "Vintage linen",
    description: "Warm linen paper & rose mauve",
  },
  {
    id: "midnight-copper",
    name: "Midnight copper",
    description: "Celestial midnight, ivory & burnt copper",
  },
];



// Only sets the attribute. Saving is handled by appearance.js.
export function applyTheme(id) {
  const valid = THEMES.some((t) => t.id === id) ? id : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", valid);
}
