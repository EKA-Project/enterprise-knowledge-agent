export const DEFAULT_THEME = "sky-blue";



// Collections group the theme cards. `tag` is the small label in each card footer.
export const THEME_COLLECTIONS = [
  { id: "editorial", label: "Editorial & Paper", emoji: "📜", tag: "Editorial" },
  { id: "oceanic", label: "Oceanic & Sky", emoji: "🌊", tag: "Oceanic" },
  { id: "botanical", label: "Botanical & Earth", emoji: "🌿", tag: "Botanical" },
  { id: "pastel", label: "Dusk & Pastels", emoji: "✨", tag: "Pastel" },
  { id: "executive", label: "Executive & Noir", emoji: "🏛️", tag: "Executive" },
];

// Single registry for the settings cards (id = data-theme value in variables.css).
// To add a theme: add its [data-theme="id"] block in src/styles/themes/<collection>.css, then one entry here
// with a `collection` id from THEME_COLLECTIONS. Optional `tag` overrides the card's footer label.
// Array order = the order of the "All Atmospheres" view.
export const THEMES = [
  // Oceanic & Sky
  { id: "sky-blue", collection: "oceanic", name: "Sky blue clarity", description: "Serene sky blue, soft azure & eye-comfort slate" },
  { id: "deep-sea", collection: "oceanic", name: "Deep Sea", description: "Abyssal navy, foggy dusk & arctic white" },
  { id: "moonlight-ocean", collection: "oceanic", name: "Moonlight Ocean", description: "Midnight noir, deep ocean blue & moonlight silver" },
  { id: "lagoon-glass", collection: "oceanic", name: "Lagoon glass", description: "Ocean slate & turquoise" },
  { id: "nordic-sunset", collection: "oceanic", name: "Nordic sunset", description: "Ocean teal, sky blue & gold amber" },
  { id: "coastal-crimson", collection: "oceanic", name: "Coastal Crimson", description: "Oxford navy, honeydew canvas & imperial crimson" },

  // Editorial & Paper
  { id: "sunlit-paper", collection: "editorial", name: "Sunlit paper", description: "Forest pine & golden wheat" },
  { id: "vintage-linen", collection: "editorial", name: "Vintage linen", description: "Warm linen paper & rose mauve" },
  { id: "washi-vermilion", collection: "editorial", name: "Washi Vermilion", description: "Dark ink, calm mist washi & vermilion" },
  { id: "honey-oat", collection: "editorial", name: "Honey Oat", description: "Warm charcoal-olive, oat cream & soft honey" },
  { id: "mulberry", collection: "editorial", name: "Mulberry", description: "Plum, blush & orchid pink" },

  // Botanical & Earth
  { id: "citrus-studio", collection: "botanical", name: "Citrus studio", description: "Hunter moss & yellow lime" },
  { id: "sage-mist", collection: "botanical", name: "Sage Mist", description: "Eucalyptus, gray-green mist & soft sage" },
  { id: "sea-glass", collection: "botanical", name: "Sea Glass", description: "Deep spruce, aqua mist & muted seafoam" },
  { id: "night-meadow", collection: "botanical", name: "Night Meadow", description: "True dark graphite green & pistachio" },

  // Dusk & Pastels
  { id: "soft-pastels", collection: "pastel", name: "Soft Pastels", description: "Amethyst twilight, periwinkle & pastel cloud" },
  { id: "enchanted-forest", collection: "pastel", name: "Enchanted Forest", description: "Midnight forest, dusty heather & snow mist" },
  { id: "orchid-dusk", collection: "pastel", name: "Orchid dusk", description: "Royal aubergine, soft lavender & pastel plum" },
  { id: "lilac-haze", collection: "pastel", name: "Lilac Haze", description: "Dusky slate-violet, lilac mist & soft lavender" },
  { id: "peach-dawn", collection: "pastel", name: "Peach Dawn", description: "Soft slate, cream canvas, peach & dusty blue" },
  { id: "rose-quartz", collection: "pastel", name: "Rose Quartz", description: "Dusky plum-gray, blush canvas & dusty rose" },

  // Executive & Noir
  { id: "executive-gold", collection: "executive", name: "Executive gold", description: "Luxury corporate gold & dark blue" },
  { id: "noir-expressionist", collection: "executive", tag: "Noir", name: "Noir expressionist", description: "Film Noir & German Expressionist" },
  { id: "space-steel", collection: "executive", name: "Space steel", description: "Deep space navy, slate & steel" },
  { id: "midnight-copper", collection: "executive", name: "Midnight copper", description: "Celestial midnight, ivory & burnt copper" },
];

// Counts and tags come from the data, so the UI can never drift from the registry.
export const collectionCount = (id) => THEMES.filter((t) => t.collection === id).length;
export const themeTag = (t) =>
  t.tag ?? THEME_COLLECTIONS.find((c) => c.id === t.collection)?.tag ?? "";



// Only sets the attribute. Saving is handled by appearance.js.
export function applyTheme(id) {
  const valid = THEMES.some((t) => t.id === id) ? id : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", valid);
}
