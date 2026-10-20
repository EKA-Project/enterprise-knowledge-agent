export const DEFAULT_TYPOGRAPHY = "classic";

// serif = heading slot, sans = body slot, mono = code slot.
// Slots are roles, not categories: "reading" uses a sans heading with a serif body on purpose.
// lineHeight (optional) is applied to <body> when that pairing is active.
const PAIRINGS = [
  {
    id: "cyber",
    name: "Cybernetic Neo-Futuristic",
    sample: "Autonomous Neural Synthesis",
    desc: "Curvilinear typography engineered for next-generation intelligence.",
    serif: "Unbounded",
    sans: "Sora",
    mono: "Martian Mono",
  },
  {
    id: "nordic",
    name: "Nordic Avant-Garde",
    sample: "Autonomous Intelligence",
    desc: "Streamlining corporate policies with architectural clarity.",
    serif: "Syne",
    sans: "Figtree",
    mono: "Martian Mono",
  },
  {
    id: "prestige",
    name: "Prestige Legal & Executive",
    sample: "Enterprise Governance & Audit",
    desc: "Authoritative editorial redlines for executive compliance teams.",
    serif: "Newsreader",
    sans: "Plus Jakarta Sans",
    mono: "Space Mono",
  },
  {
    id: "kinetic",
    name: "Modern Kinetic Grotesque",
    sample: "Dynamic Knowledge Graphs",
    desc: "High-density readability for fast-paced operational workflows.",
    serif: "Bricolage Grotesque",
    sans: "Manrope",
    mono: "JetBrains Mono",
  },
  {
    id: "arch",
    name: "Architectural Engineering",
    sample: "Vector Semantic Retrieval",
    desc: "Precision geometry engineered for modern data platforms.",
    serif: "Space Grotesk",
    sans: "Outfit",
    mono: "Space Mono",
  },
  {
    id: "artisan",
    name: "Artisanal High-Craft Editorial",
    sample: "Bespoke Enterprise Craft",
    desc: "Designed for refined executive reporting and presentations.",
    serif: "Instrument Serif",
    sans: "Instrument Sans",
    mono: "JetBrains Mono",
  },
  {
    id: "classic",
    name: "Classic EKA Baseline",
    sample: "eka. Executive Intelligence",
    desc: "Standard optical serif paired with Plus Jakarta Sans.",
    serif: "Fraunces",
    sans: "Plus Jakarta Sans",
    mono: "JetBrains Mono",
  },
  {
    id: "swiss",
    name: "Neutral Swiss Precision",
    sample: "Clear Answers, Fast",
    desc: "One neutral family for dense tables and long sessions.",
    serif: "Geist",
    sans: "Geist",
    mono: "Geist Mono",
  },
  {
    id: "reading",
    name: "Long-Form Reading Room",
    sample: "Notes from the Archive",
    desc: "A serif reading face for long answers and documents.",
    serif: "Hanken Grotesk",
    sans: "Literata",
    mono: "IBM Plex Mono",
    lineHeight: "1.6",
  },
  {
    id: "soft",
    name: "Soft Rounded Clarity",
    sample: "Friendly Knowledge, Easy Reading",
    desc: "Reading-first letterforms with a soft, approachable tone.",
    serif: "Lexend",
    sans: "Nunito Sans",
    mono: "DM Mono",
  },
  {
    id: "newsroom",
    name: "Newsroom Slab Authority",
    sample: "Compliance Brief, Reviewed",
    desc: "Sturdy slab headlines with a calm, trustworthy body.",
    serif: "Zilla Slab",
    sans: "Source Sans 3",
    mono: "Source Code Pro",
  },
];

// ---------- Collections ----------
// `tag` is the small label on each card. Pairings missing from the map fall back to "modern".
export const FONT_COLLECTIONS = [
  { id: "editorial", label: "Editorial Serif", tag: "Serif" },
  { id: "modern", label: "Modern Sans & Neo", tag: "Sans" },
];

const COLLECTION_OF = {
  prestige: "editorial",
  artisan: "editorial",
  classic: "editorial",
  reading: "editorial",
  newsroom: "editorial",
  // cyber, nordic, kinetic, arch, swiss, soft -> "modern" (the fallback)
};

export const TYPOGRAPHY = PAIRINGS.map((p) => ({
  ...p,
  collection: COLLECTION_OF[p.id] ?? "modern",
}));

export const fontCollectionCount = (id) =>
  TYPOGRAPHY.filter((t) => t.collection === id).length;
export const fontTag = (t) =>
  FONT_COLLECTIONS.find((c) => c.id === t.collection)?.tag ?? "";

export const ALL_FONTS = TYPOGRAPHY.flatMap((t) => [t.serif, t.sans, t.mono]);

// ---------- Loading (Google Fonts) ----------
// Only fonts that lack some of 400/500/600/700 need an entry.
// A family asking for a weight it doesn't have makes Google reject the WHOLE request.
const WEIGHTS = {
  "Instrument Serif": "", // regular only
  "Space Mono": "400;700",
  "DM Mono": "400;500",
};

// Each caller gets its own <link>, so loading previews never replaces the active fonts.
export function loadFonts(families, linkId) {
  const query = [...new Set(families)]
    .map((f) => {
      const w = f in WEIGHTS ? WEIGHTS[f] : "400;500;600;700";
      return `family=${f.replace(/ /g, "+")}${w ? `:wght@${w}` : ""}`;
    })
    .join("&");
  let link = document.getElementById(linkId);
  if (!link) {
    link = Object.assign(document.createElement("link"), {
      id: linkId,
      rel: "stylesheet",
    });
    document.head.appendChild(link);
  }
  link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
}

// ---------- Applying ----------
// Fallback depends on the face itself, not the slot it sits in.
const SERIF_FACES = new Set([
  "Fraunces",
  "Newsreader",
  "Instrument Serif",
  "Literata",
  "Zilla Slab",
]);
const stack = (family, mono = false) => {
  if (mono) return `"${family}", monospace`;
  return SERIF_FACES.has(family)
    ? `"${family}", Georgia, serif`
    : `"${family}", -apple-system, "Segoe UI", sans-serif`;
};

// Always sets the three variables from the chosen pairing (Classic is not a special case).
export function applyFonts(id) {
  const f =
    TYPOGRAPHY.find((t) => t.id === id) ??
    TYPOGRAPHY.find((t) => t.id === DEFAULT_TYPOGRAPHY);
  loadFonts([f.serif, f.sans, f.mono], "eka-active-fonts");
  const root = document.documentElement;
  root.style.setProperty("--font-serif", stack(f.serif));
  root.style.setProperty("--font-sans", stack(f.sans));
  root.style.setProperty("--font-mono", stack(f.mono, true));
  if (document.body) document.body.style.lineHeight = f.lineHeight ?? "";
}
