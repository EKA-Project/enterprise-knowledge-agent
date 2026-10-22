// The list of mascots, and the only place that knows where their images live.
// Components ask for (mascotId, imageName) and never write a path.
//
// To add a mascot: put a folder in src/assets/mascot/<id>/ with the 19 PNGs
// listed in IMAGE_NAMES, then add one line to MASCOTS below.

// Vite finds every mascot PNG at build time (this is why we use glob, not 38 imports)
const IMAGES = import.meta.glob("../assets/mascot/*/*.png", {
  eager: true,
  import: "default",
});

// The file names every mascot must provide (without .png). This is the contract.
export const IMAGE_NAMES = [
  "angry", "cool", "copied", "deep", "digesting", "dizzy", "drop",
  "eating", "happy", "help", "hungry", "idle", "newThread", "sad",
  "searching", "sleep", "thinking", "uploaded", "yell",
];

export const MASCOTS = [
  { id: "byte", name: "Byte" },
  // orbit is added in step 5
];

export const DEFAULT_MASCOT_ID = "byte";

const imagePath = (id, imageName) => `../assets/mascot/${id}/${imageName}.png`;

// Unknown id (for example a stale saved value)? Fall back to the default mascot.
export function getMascot(id) {
  return (
    MASCOTS.find((m) => m.id === id) ??
    MASCOTS.find((m) => m.id === DEFAULT_MASCOT_ID)
  );
}

// URL of one image. If a file is missing, show that mascot's idle image instead.
export function getMascotImage(id, imageName) {
  const mascotId = getMascot(id).id;
  return (
    IMAGES[imagePath(mascotId, imageName)] ??
    IMAGES[imagePath(mascotId, "idle")]
  );
}

// All image URLs of one mascot (used to preload them)
export function getMascotImages(id) {
  return IMAGE_NAMES.map((imageName) => getMascotImage(id, imageName));
}

// Development only: warn if a registered mascot is missing a file from the contract
if (import.meta.env.DEV) {
  for (const { id } of MASCOTS) {
    for (const imageName of IMAGE_NAMES) {
      if (!IMAGES[imagePath(id, imageName)]) {
        console.warn(`[mascot] ${id} is missing ${imageName}.png`);
      }
    }
  }
}