export const DEFAULT_THEME = "sky-blue";



// Collections group the theme cards. `tag` is the small label in each card footer.
export const THEME_COLLECTIONS = [
  { id: "editorial", label: "Editorial & Paper", tag: "Editorial", description: "Tactile warmth, linen textures & bookish serenity" },
  { id: "oceanic", label: "Oceanic & Sky", tag: "Oceanic", description: "Abyssal depth, sky blue clarity & coastal horizons" },
  { id: "botanical", label: "Botanical & Earth", tag: "Botanical", description: "Living greens, mineral tones & quiet earth" },
  { id: "pastel", label: "Dusk & Pastels", tag: "Pastel", description: "Soft twilight hues, gentle lilacs & dawn light" },
  { id: "executive", label: "Executive & Noir", tag: "Executive", description: "Authoritative darks, metallic accents & high contrast" },
];

// Single registry for the settings cards (id = data-theme value in src/styles/themes/<collection>.css).
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
  { id: "cobalt-periwinkle", collection: "oceanic", name: "Cobalt Periwinkle", description: "Midnight indigo, ice mist & periwinkle" },
  { id: "jet-cerulean", collection: "oceanic", name: "Jet Cerulean", description: "Jet black, cerulean blue & neon rose" },

  // Editorial & Paper
  { id: "sunlit-paper", collection: "editorial", name: "Sunlit paper", description: "Forest pine & golden wheat" },
  { id: "vintage-linen", collection: "editorial", name: "Vintage linen", description: "Warm linen paper & rose mauve" },
  { id: "washi-vermilion", collection: "editorial", name: "Washi Vermilion", description: "Dark ink, calm mist washi & vermilion" },
  { id: "honey-oat", collection: "editorial", name: "Honey Oat", description: "Warm charcoal-olive, oat cream & soft honey" },
  { id: "mulberry", collection: "editorial", name: "Mulberry", description: "Plum, blush & orchid pink" },
  { id: "circadian-amber", collection: "editorial", name: "Circadian Amber", description: "Roasted walnut, warm parchment & honey amber" },
  { id: "mocha-lavender", collection: "editorial", name: "Mocha Lavender", description: "Roasted mocha, platinum silver & pale lavender" },

  // Botanical & Earth
  { id: "citrus-studio", collection: "botanical", name: "Citrus studio", description: "Hunter moss & yellow lime" },
  { id: "sage-mist", collection: "botanical", name: "Sage Mist", description: "Eucalyptus, gray-green mist & soft sage" },
  { id: "sea-glass", collection: "botanical", name: "Sea Glass", description: "Deep spruce, aqua mist & muted seafoam" },

  // Dusk & Pastels
  { id: "soft-pastels", collection: "pastel", name: "Soft Pastels", description: "Amethyst twilight, periwinkle & pastel cloud" },
  { id: "enchanted-forest", collection: "pastel", name: "Enchanted Forest", description: "Midnight forest, dusty heather & snow mist" },
  { id: "orchid-dusk", collection: "pastel", name: "Orchid dusk", description: "Royal aubergine, soft lavender & pastel plum" },
  { id: "lilac-haze", collection: "pastel", name: "Lilac Haze", description: "Dusky slate-violet, lilac mist & soft lavender" },
  { id: "peach-dawn", collection: "pastel", name: "Peach Dawn", description: "Soft slate, cream canvas, peach & dusty blue" },
  { id: "rose-quartz", collection: "pastel", name: "Rose Quartz", description: "Dusky plum-gray, blush canvas & dusty rose" },
  { id: "aubergine-marigold", collection: "pastel", name: "Aubergine Marigold", description: "Deep aubergine, ice silver & luminous marigold" },

  // Executive & Noir
  { id: "executive-gold", collection: "executive", name: "Executive gold", description: "Luxury corporate gold & dark blue" },
  { id: "noir-expressionist", collection: "executive", tag: "Noir", name: "Noir expressionist", description: "Film Noir & German Expressionist" },
  { id: "space-steel", collection: "executive", name: "Space steel", description: "Deep space navy, slate & steel" },
  { id: "midnight-copper", collection: "executive", name: "Midnight copper", description: "Celestial midnight, ivory & burnt copper" },
  { id: "night-meadow", collection: "executive", name: "Night Meadow", description: "Sculpted carbon, pewter canvas & cobalt blue" },
  { id: "rosso-corsa", collection: "executive", name: "Rosso Corsa", description: "Scuderia red, carbon black & Giallo Modena" },
  { id: "pure-white-black", collection: "executive", name: "Pure White & Black", description: "Manga ink, screentone grey & pure white" },
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
