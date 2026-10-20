// One place for every theme icon. Styled once (ThemeIconBadge), used everywhere.
// To add a theme icon: add an entry keyed by the theme id from theme.js.
// 24x24 grid, stroke-based, uses currentColor so the badge decides the colour.

const ICONS = {
  // ---- Oceanic & Sky ----
  "sky-blue": <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  "deep-sea": (
    <>
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="22" x2="12" y2="8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </>
  ),
  "moonlight-ocean": <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  "lagoon-glass": <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  "nordic-sunset": (
    <>
      <path d="M12 10V2" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </>
  ),
  "coastal-crimson": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),

  // ---- Editorial & Paper ----
  "sunlit-paper": (
    <>
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </>
  ),
  "vintage-linen": (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  "washi-vermilion": (
    <>
      <line x1="2" y1="4" x2="22" y2="4" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="7" y1="4" x2="7" y2="21" />
      <line x1="17" y1="4" x2="17" y2="21" />
      <line x1="4" y1="13" x2="7" y2="13" />
      <line x1="17" y1="13" x2="20" y2="13" />
    </>
  ),
  "honey-oat": (
    <>
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
      <path d="M12 11l8-4.5" />
      <path d="M12 11v9" />
      <path d="M12 11L4 6.5" />
    </>
  ),
  mulberry: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="15" cy="9" r="3.2" />
      <circle cx="12" cy="14" r="3.2" />
      <circle cx="12" cy="18.5" r="2.2" />
      <path d="M12 2v4" />
    </>
  ),
  "circadian-amber": (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),

  // ---- Botanical & Earth ----
  "citrus-studio": (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <line x1="12" y1="6" x2="12" y2="18" />
      <line x1="6.8" y1="9" x2="17.2" y2="15" />
      <line x1="6.8" y1="15" x2="17.2" y2="9" />
    </>
  ),
  "sage-mist": (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  "sea-glass": (
    <>
      <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="12" y1="22" x2="8" y2="9" />
      <line x1="12" y1="22" x2="16" y2="9" />
    </>
  ),
  "night-meadow": (
    <>
      <path d="M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4z" />
      <path d="M12 22a4 4 0 0 0 4-4c0-3-4-6-4-6s-4 3-4 6a4 4 0 0 0 4 4z" />
      <path d="M2 12a4 4 0 0 0 4 4c3 0 6-4 6-4s-3-4-6-4a4 4 0 0 0-4 4z" />
      <path d="M22 12a4 4 0 0 0-4-4c-3 0-6 4-6 4s3 4 6 4a4 4 0 0 0 4-4z" />
    </>
  ),

  // ---- Dusk & Pastels ----
  "soft-pastels": (
    <>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="m19 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    </>
  ),
  "enchanted-forest": (
    <>
      <polygon points="12 2 19 20 5 20 12 2" />
      <line x1="12" y1="20" x2="12" y2="23" />
      <line x1="9" y1="23" x2="15" y2="23" />
    </>
  ),
  "orchid-dusk": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3c-1.5 0-3 1.5-3 3.5 0 2.5 3 5.5 3 5.5s3-3 3-5.5C15 4.5 13.5 3 12 3z" />
      <path d="M12 21c-1.5 0-3-1.5-3-3.5 0-2.5 3-5.5 3-5.5s3 3 3 5.5c0 2-1.5 3.5-3 3.5z" />
      <path d="M3 12c0-1.5 1.5-3 3.5-3 2.5 0 5.5 3 5.5 3s-3 3-5.5 3C4.5 15 3 13.5 3 12z" />
      <path d="M21 12c0-1.5-1.5-3-3.5-3-2.5 0-5.5 3-5.5 3s3 3 5.5 3c2 0 3.5-1.5 3.5-3z" />
    </>
  ),
  "lilac-haze": (
    <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
  ),
  "peach-dawn": (
    <>
      <path d="M12 2v4" />
      <path d="m4.93 5.93 2.83 2.83" />
      <path d="M2 13h4" />
      <path d="M18 13h4" />
      <path d="m16.24 8.76 2.83-2.83" />
      <path d="M20 18H4" />
      <path d="M17 18a5 5 0 0 0-10 0" />
    </>
  ),
  "rose-quartz": (
    <>
      <polygon points="12 2 21 8.5 21 15.5 12 22 3 15.5 3 8.5 12 2" />
      <polyline points="3 8.5 12 15.5 21 8.5" />
    </>
  ),

  // ---- Executive & Noir ----
  "executive-gold": <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />,
  "noir-expressionist": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
    </>
  ),
  "space-steel": (
    <>
      <circle cx="12" cy="12" r="6" />
      <path d="M2 12c1.5 5 10.5 7 17 4 3-1.5 3-4 1-5.5s-7.5-2-12-1" />
    </>
  ),
  "midnight-copper": (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  "rosso-corsa": (
    <>
      <path d="M12 14v-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      <line x1="12" y1="14" x2="16" y2="10" />
    </>
  ),
};

// Shown for any theme id without an entry above, so a new theme never renders a blank badge.
const FALLBACK = <circle cx="12" cy="12" r="9" />;

export function ThemeIcon({ id, size = 14, className = "" }) {
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
      className={className}
    >
      {ICONS[id] ?? FALLBACK}
    </svg>
  );
}

// The rounded tile around the icon: styled here once, used on cards, the hero, anywhere.
//   tone "soft"  = tinted tile (cards)      tone "solid" = filled tile (hero)
//   box = tile size in px, icon = glyph size in px
// The scale-up on hover only fires when the parent card has the `group` class.
const TONES = {
  soft: "bg-(--primary-light) text-(--primary)",
  solid: "bg-(--primary) text-(--primary-contrast)",
};

export default function ThemeIconBadge({ id, tone = "soft", box = 22, icon = 14 }) {
  return (
    <span
      style={{ width: box, height: box }}
      className={`grid shrink-0 place-items-center rounded-[28%] transition-transform duration-200 group-hover:scale-110 ${TONES[tone] ?? TONES.soft}`}
    >
      <ThemeIcon id={id} size={icon} />
    </span>
  );
}