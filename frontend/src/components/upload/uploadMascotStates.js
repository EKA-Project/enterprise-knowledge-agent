// Mascot states that only make sense in the upload modal. Same shape as
// COMMON_STATES (see src/mascot/mascotStates.js). Which state is shown, and
// when, is decided by getMascotState() in UploadDocumentModal.jsx.

export const UPLOAD_MASCOT_STATES = {
  // ---- Choosing a file ----
  empty: {
    image: "hungry",
    bubble: "Feed me a document",
    tone: "neutral",
    motion: "mascot-m-hungry",
    particles: "drool",
    sound: "hungry",
    soundEvery: 3500, // grumbles again every 3.5s while waiting for a file
  },
  dragging: {
    image: "drop",
    bubble: "Drop it here!",
    tone: "neutral",
    motion: "mascot-m-eager",
    particles: null,
    sound: "drop",
  },
  ready: {
    image: "happy",
    bubble: "That looks tasty",
    tone: "neutral",
    motion: "mascot-m-happy",
    particles: null,
    sound: "eating",
  },

  // ---- File rejected ----
  invalidType: {
    image: "sad",
    bubble: "I can't digest that file type",
    tone: "error",
    motion: "mascot-m-confused",
    particles: null,
    sound: "sad",
  },
  tooLarge: {
    image: "dizzy",
    bubble: "Too big for me to swallow",
    tone: "error",
    motion: "mascot-m-confused",
    particles: null,
    sound: "sad",
  },
  emptyFile: {
    image: "hungry",
    bubble: "That file is empty",
    tone: "error",
    motion: "mascot-m-confused",
    particles: null,
    sound: "sad",
  },

  // ---- The 3 upload stages (names match `mascot` in uploadStages.js) ----
  sending: {
    image: "eating",
    bubble: "Nom nom… uploading",
    tone: "neutral",
    motion: "mascot-m-eating",
    particles: "crumbs",
    sound: "eating",
    soundEvery: 450,
  },
  chunking: {
    image: "digesting",
    bubble: "Breaking it into chunks…",
    tone: "neutral",
    motion: "mascot-m-digesting",
    particles: "bits",
    sound: "digesting",
  },
  embedding: {
    image: "thinking",
    bubble: "Building vector embeddings…",
    tone: "neutral",
    motion: "mascot-m-thinking",
    particles: "bits",
    sound: "searching",
    soundEvery: 900,
  },

  // ---- Finished ----
  success: {
    image: "uploaded",
    bubble: "Ingested! Ask me anything",
    tone: "success",
    motion: "mascot-m-victory",
    particles: "confetti",
    shadow: true,
    sound: "uploaded",
    soundDelay: 250,
  },
  failed: {
    image: "angry",
    bubble: "Something went wrong",
    tone: "error",
    motion: "mascot-m-shake",
    particles: null,
    sound: "sad",
  },
};
