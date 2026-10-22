// Common mascot states: usable on ANY page (Ask EKA, Help & Support, empty
// states) and used by the poke reaction. Page-specific states live next to their
// page (e.g. components/upload/uploadMascotStates.js) and have the same shape.
//
// A state describes one whole moment of the mascot:
//   image:      image NAME ("idle", "angry"...), not a file. The registry picks
//               the file for whichever mascot (Byte / Orbit) is selected.
//   bubble:     speech-bubble text (null = no bubble). Shared by every mascot.
//   tone:       banner tint when framed: "neutral" | "error" | "success"
//   motion:     body animation class (.mascot-m-* in mascot.css)
//   particles:  floating effect from MascotParticles.jsx, or null
//   sound:      sound name from mascotSound.js (optional)
//   soundDelay: ms before the sound first plays (optional)
//   soundEvery: repeat the sound every N ms while the state lasts (optional)
//   bubbleMs:   fade the bubble out after N ms (optional, used by reactions)
//   shadow:     show the ground shadow under a jump (optional)

export const COMMON_STATES = {
  // Resting state: no bubble, no sound
  idle: {
    image: "idle",
    bubble: null,
    tone: "neutral",
    motion: "mascot-m-idle",
    particles: null,
  },

  // Waiting for an answer
  thinking: {
    image: "thinking",
    bubble: "Thinking…",
    tone: "neutral",
    motion: "mascot-m-thinking",
    particles: "bits",
    sound: "searching",
    soundEvery: 900,
  },

  // Looking through documents
  searching: {
    image: "searching",
    bubble: "Searching the knowledge base…",
    tone: "neutral",
    motion: "mascot-m-thinking",
    particles: "bits",
    sound: "searching",
    soundEvery: 900,
  },

  happy: {
    image: "happy",
    bubble: "Happy to help!",
    tone: "neutral",
    motion: "mascot-m-happy",
    particles: null,
    sound: "happy",
  },

  sad: {
    image: "sad",
    bubble: "Sorry, that didn't work",
    tone: "neutral",
    motion: "mascot-m-confused",
    particles: null,
    sound: "sad",
  },

  // ---- Poke reactions (started by usePokeReaction) ----
  poked: {
    image: "angry",
    bubble: "Okay, that's enough!",
    bubbleMs: 1600,
    tone: "neutral",
    motion: "mascot-m-angry",
    particles: "steam",
    sound: "angry",
  },
  dizzy: {
    image: "dizzy",
    bubble: "Too… many… taps…",
    bubbleMs: 1600,
    tone: "neutral",
    motion: "mascot-m-dizzy",
    particles: "stars",
    sound: "dizzy",
  },
};