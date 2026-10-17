// Byte's sound effects: tiny 8-bit sounds generated with the Web Audio API
// (no audio files). Ported from the original EKA mascot.js.

const STORAGE_KEY = "eka_mascot_sound"; // same key as the original build; "false" = muted
const MASTER_VOLUME = 0.8; // overall loudness. The original played at 1.0; lower this if it's still too loud

/* ==========================================================================
   On/off setting (remembered, shared by every mascot on the page)
   ========================================================================== */

function readSetting() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "false"; // on unless explicitly muted
  } catch {
    return true; // storage blocked: default to on
  }
}

let soundOn = readSetting();
const listeners = new Set();

export const isSoundOn = () => soundOn;

export function setSoundOn(value) {
  soundOn = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
  } catch {
    /* ignore: the setting just won't be remembered */
  }
  listeners.forEach((notify) => notify());
}

// For React's useSyncExternalStore: lets components re-render when the setting changes
export function subscribeSound(notify) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

/* ==========================================================================
   Audio context (created lazily, so it only starts after the user has interacted)
   ========================================================================== */

let ctx = null;
let master = null; // every sound goes through this one volume knob

function getContext() {
  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null; // very old browser: stay silent
    ctx = new AudioContextClass();
    master = ctx.createGain();
    master.gain.value = MASTER_VOLUME;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
    return null; // not running yet: skip this sound rather than play it late
  }
  return ctx;
}

/* ==========================================================================
   Building blocks
   ========================================================================== */

// One note: an oscillator with a quick fade-out. Every sound is made of these.
//   offset = seconds from now, level = loudness of this note
function tone(freq, type, duration, offset = 0, level = 0.14) {
  const audio = getContext();
  if (!audio) return;
  const t = audio.currentTime + offset;
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(level, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + duration);
  osc.onended = () => {
    osc.disconnect(); // free the nodes once the note is over
    gain.disconnect();
  };
}

// A note that slides from one pitch to another. `fade` lets the volume
// outlast the slide slightly (the sad sound needs that).
function glide(type, fromHz, toHz, duration, offset = 0, level = 0.12, fade = duration) {
  const audio = getContext();
  if (!audio) return;
  const t = audio.currentTime + offset;
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(fromHz, t);
  osc.frequency.exponentialRampToValueAtTime(toHz, t + duration);
  gain.gain.setValueAtTime(level, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + fade);

  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + fade);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

// Angry: a buzzing saw plus a lower square that sinks, sharing one volume envelope
function angryBuzz() {
  const audio = getContext();
  if (!audio) return;
  const t = audio.currentTime;
  const saw = audio.createOscillator();
  const square = audio.createOscillator();
  const gain = audio.createGain();

  saw.type = "sawtooth";
  saw.frequency.setValueAtTime(260, t);
  saw.frequency.exponentialRampToValueAtTime(120, t + 0.18);

  square.type = "square";
  square.frequency.setValueAtTime(180, t + 0.08);
  square.frequency.exponentialRampToValueAtTime(75, t + 0.32);

  gain.gain.setValueAtTime(0.24, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

  saw.connect(gain);
  square.connect(gain);
  gain.connect(master);

  saw.start(t);
  saw.stop(t + 0.2);
  square.start(t + 0.08);
  square.stop(t + 0.35);
  square.onended = () => {
    saw.disconnect();
    square.disconnect();
    gain.disconnect();
  };
}

/* ==========================================================================
   The sounds (names are used by the `sound` field in byteStates.js)
   ========================================================================== */

const SOUNDS = {
  // Tap on Byte
  poke() {
    tone(520, "square", 0.07, 0, 0.12);
    tone(780, "square", 0.09, 0.07, 0.12);
  },

  // Cheerful chime (also the confirmation when you un-mute)
  happy() {
    tone(523.25, "triangle", 0.08, 0, 0.18); // C5
    tone(659.25, "triangle", 0.08, 0.08, 0.18); // E5
    tone(783.99, "triangle", 0.08, 0.16, 0.18); // G5
    tone(1046.5, "square", 0.2, 0.24, 0.16); // C6
  },

  // Waiting for a file: low tummy rumble
  hungry() {
    glide("triangle", 120, 95, 0.35, 0, 0.12);
  },

  // File hovering over the drop zone
  drop() {
    tone(659.25, "triangle", 0.08, 0, 0.16);
    tone(880.0, "square", 0.12, 0.06, 0.14);
  },

  // One munch
  eating() {
    tone(330, "square", 0.05, 0, 0.14);
    tone(220, "square", 0.06, 0.05, 0.12);
  },

  // Chunking
  digesting() {
    tone(392.0, "sine", 0.15, 0, 0.14);
    tone(523.25, "triangle", 0.22, 0.12, 0.14);
  },

  // Embedding: two soft blips
  searching() {
    tone(784, "triangle", 0.08, 0, 0.12);
    tone(1046.5, "triangle", 0.09, 0.1, 0.1);
  },

  // Success fanfare (C5 E5 G5 B5 C6)
  uploaded() {
    tone(523.25, "triangle", 0.08, 0, 0.18);
    tone(659.25, "triangle", 0.08, 0.07, 0.18);
    tone(783.99, "triangle", 0.08, 0.14, 0.2);
    tone(987.77, "square", 0.1, 0.21, 0.18);
    tone(1046.5, "square", 0.28, 0.29, 0.22);
  },

  // Rejected file / failed upload: mournful descending notes
  sad() {
    tone(440.0, "triangle", 0.18, 0, 0.2);
    tone(392.0, "triangle", 0.18, 0.16, 0.2);
    tone(349.23, "triangle", 0.22, 0.32, 0.22);
    glide("triangle", 293.66, 220.0, 0.35, 0.5, 0.22, 0.38);
  },

  angry: angryBuzz,

  // Too many taps: a wobbling four-note sequence
  dizzy() {
    tone(440, "sawtooth", 0.08, 0, 0.14);
    tone(370, "sawtooth", 0.09, 0.08, 0.15);
    tone(493.88, "sawtooth", 0.09, 0.17, 0.15);
    tone(329.63, "sawtooth", 0.16, 0.26, 0.14);
  },
};

/* ==========================================================================
   The one function the rest of the app calls
   ========================================================================== */

export function playByteSound(name) {
  if (!soundOn) return; // muted
  if (document.visibilityState === "hidden") return; // nobody is looking at this tab
  const play = SOUNDS[name];
  if (!play) return;
  try {
    play();
  } catch (error) {
    console.warn("[byte-sound]", error); // a sound problem must never break the UI
  }
}