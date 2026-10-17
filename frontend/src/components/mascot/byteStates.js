// Every state Byte can be in, in one place.
// Each state says: which image to show, what the speech bubble says,
// and the "tone" (which tints the banner: neutral / error / success).
//
// To change the wording or swap an image later, edit this file only.

import hungry from "../../assets/mascot/byte/hungry.png";
import drop from "../../assets/mascot/byte/drop.png";
import happy from "../../assets/mascot/byte/happy.png";
import sad from "../../assets/mascot/byte/sad.png";
import dizzy from "../../assets/mascot/byte/dizzy.png";
import eating from "../../assets/mascot/byte/eating.png";
import digesting from "../../assets/mascot/byte/digesting.png";
import thinking from "../../assets/mascot/byte/thinking.png";
import uploaded from "../../assets/mascot/byte/uploaded.png";
import angry from "../../assets/mascot/byte/angry.png";
import idle from "../../assets/mascot/byte/idle.png";
// Each state now also says:
//   motion:    which body animation to play (a .byte-m-* class in variables.css)
//   particles: which particle effect floats around Byte (or null for none)
export const MASCOT_STATES = {
  // ---- Choosing a file ----
  empty: {
    image: hungry,
    bubble: "Feed me a document",
    tone: "neutral",
    motion: "byte-m-hungry",
    particles: "drool",
  },
  dragging: {
    image: drop,
    bubble: "Drop it here!",
    tone: "neutral",
    motion: "byte-m-eager",
    particles: null,
  },
  ready: {
    image: happy,
    bubble: "That looks tasty",
    tone: "neutral",
    motion: "byte-m-happy",
    particles: null,
  },

  // ---- File rejected ----
  invalidType: {
    image: sad,
    bubble: "I can't digest that file type",
    tone: "error",
    motion: "byte-m-confused",
    particles: null,
  },
  tooLarge: {
    image: dizzy,
    bubble: "Too big for me to swallow",
    tone: "error",
    motion: "byte-m-confused",
    particles: null,
  },
  emptyFile: {
    image: hungry,
    bubble: "That file is empty",
    tone: "error",
    motion: "byte-m-confused",
    particles: null,
  },

  // ---- The 3 upload stages ----
  sending: {
    image: eating,
    bubble: "Nom nom… uploading",
    tone: "neutral",
    motion: "byte-m-eating",
    particles: "crumbs",
  },
  chunking: {
    image: digesting,
    bubble: "Breaking it into chunks…",
    tone: "neutral",
    motion: "byte-m-digesting",
    particles: "bits",
  },
  embedding: {
    image: thinking,
    bubble: "Building vector embeddings…",
    tone: "neutral",
    motion: "byte-m-thinking",
    particles: "bits",
  },

  // ---- Finished ----
  success: {
    image: uploaded,
    bubble: "Ingested! Ask me anything",
    tone: "success",
    motion: "byte-m-victory",
    particles: "sparkles",
  },
  failed: {
    image: angry,
    bubble: "Something went wrong",
    tone: "error",
    motion: "byte-m-shake",
    particles: null,
  },

  // ---- Generic states (any page: Ask EKA, empty states, the poke reaction) ----
  idle: {
    image: idle,
    bubble: null,
    tone: "neutral",
    motion: "byte-m-idle",
    particles: null,
  },
  poked: {
    image: angry,
    bubble: "Hey! Don't poke me!",
    tone: "neutral",
    motion: "byte-m-shake",
    particles: null,
  },
  dizzy: {
    image: dizzy,
    bubble: "Okay okay… I'm dizzy…",
    tone: "neutral",
    motion: "byte-m-dizzy",
    particles: "stars",
  },
};
