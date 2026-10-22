// The single place that knows which mascots exist and where their images live.
// Components never build image paths: they ask for (mascotId, imageName).

// Vite loads every png under assets/mascot/<id>/ at build time.
// Keys look like "../assets/mascot/byte/idle.png".
const IMAGES = import.meta.glob("../assets/mascot/*/*.png", {
  eager: true,
  import: "default",
});

// The image-name contract: every mascot folder must contain these 19 files.
export const IMAGE_NAMES = [
  "angry", "cool", "copied", "deep", "digesting", "dizzy", "drop",
  "eating", "happy", "help", "hungry", "idle", "newThread", "sad",
  "searching", "sleep", "thinking", "uploaded", "yell",
];

// Selectable mascots. Orbit is added in step 5.
export const MASCOTS = [
  { id: "byte", name: "Byte" },
];

// Used for fresh users and for unknown or removed ids (flips to "orbit" in step 5)
export const DEFAULT_MASCOT_ID = "byte";

const imagePath = (id, imageName) => `../assets/mascot/${id}/${imageName}.png`;

// Returns the mascot entry for an id, or the default one if the id is unknown.
export function getMascot(id) {
  return (
    MASCOTS.find((m) => m.id === id) ??
    MASCOTS.find((m) => m.id === DEFAULT_MASCOT_ID)
  );
}

// Returns the image URL for (mascot, imageName).
// A missing image falls back to that mascot's idle.png instead of breaking.
export function getMascotImage(id, imageName) {
  const mascotId = getMascot(id).id;
  return (
    IMAGES[imagePath(mascotId, imageName)] ??
    IMAGES[imagePath(mascotId, "idle")]
  );
}

// All image URLs of one mascot (used to preload only the active mascot).
export function getMascotImages(id) {
  return IMAGE_NAMES.map((imageName) => getMascotImage(id, imageName));
}

// Dev-only: warn in the console if a mascot folder is missing a contract image.
if (import.meta.env.DEV) {
  for (const { id } of MASCOTS) {
    for (const imageName of IMAGE_NAMES) {
      if (!IMAGES[imagePath(id, imageName)]) {
        console.warn(`[mascot] ${id} is missing ${imageName}.png`);
      }
    }
  }
}