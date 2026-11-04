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
//     //   pokeReaction: how tapping behaves WHILE IN THIS state (optional), handled by
//               usePokeReaction: { soft, hard, taps, withinMs }. A slow tap plays
//               the `soft` state; `taps` taps inside `withinMs` play `hard`.

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

  // Help & Support page
  help: {
    image: "help",
    bubble: "Need a hand?",
    tone: "neutral",
    motion: "mascot-m-eager",
    particles: null,
  },

  // Deep research mode: like "thinking", but a longer job
  deep: {
    image: "deep",
    bubble: "Digging deep…",
    tone: "neutral",
    motion: "mascot-m-thinking",
    particles: "bits",
    sound: "searching",
    soundEvery: 900,
  },

  // ---- Short moments: the page shows one, then goes back to its normal state.
  // bubbleMs fades the bubble so the animation stays visible. Replay the same
  // state with Mascot's `replayKey` prop. ----
  newThread: {
    image: "newThread",
    bubble: "Fresh thread, fresh start!",
    bubbleMs: 1600,
    tone: "neutral",
    motion: "mascot-m-happy",
    particles: null,
    sound: "drop",
  },
  copied: {
    image: "copied",
    bubble: "Copied!",
    bubbleMs: 1200,
    tone: "neutral",
    motion: "mascot-m-happy",
    particles: null,
    sound: "poke",
  },
  cool: {
    image: "cool",
    bubble: "Nice one!",
    bubbleMs: 1600,
    tone: "neutral",
    motion: "mascot-m-happy",
    particles: null,
    sound: "happy",
  },

  // Long idle: the page switches to this after a quiet spell
  sleep: {
    image: "sleep",
    bubble: "Zzz… tap to wake me",
    tone: "neutral",
    motion: "mascot-m-idle",
    particles: null,
    // A slow tap grumbles; 3 quick taps inside 1s wake it up angrily.
    // Change `taps` to 2 if a double-tap should be enough.
    pokeReaction: { soft: "grumble", hard: "yell", taps: 3, withinMs: 1000 },
  },

  // A slow tap on a sleeping mascot: it mumbles and stays asleep
  grumble: {
    image: "sleep",
    bubble: "Five more seconds…",
    bubbleMs: 1300,
    tone: "neutral",
    motion: "mascot-m-idle",
    particles: null,
    sound: "grumble",
  },

  // Poked quickly while asleep (started by usePokeReaction, see pokeReaction above)
  yell: {
    image: "yell",
    bubble: "HEY! I was sleeping!",
    bubbleMs: 2000, // bubble fades so the animation stays visible
    tone: "neutral",
    motion: "mascot-m-shake", // existing motion for now, see the note below
    particles: null,
    sound: "yell",
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
