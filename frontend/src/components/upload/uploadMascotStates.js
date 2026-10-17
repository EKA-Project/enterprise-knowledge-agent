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

export const MASCOT_STATES = {
  // ---- Choosing a file ----
  empty: { image: hungry, bubble: "Feed me a document", tone: "neutral" },
  dragging: { image: drop, bubble: "Drop it here!", tone: "neutral" },
  ready: { image: happy, bubble: "That looks tasty", tone: "neutral" },

  // ---- File rejected (these match the codes from validateFile) ----
  invalidType: { image: sad, bubble: "I can't digest that file type", tone: "error" },
  tooLarge: { image: dizzy, bubble: "Too big for me to swallow", tone: "error" },
  emptyFile: { image: hungry, bubble: "That file is empty", tone: "error" },

  // ---- The 3 upload stages ----
  sending: { image: eating, bubble: "Nom nom… uploading", tone: "neutral" },
  chunking: { image: digesting, bubble: "Breaking it into chunks…", tone: "neutral" },
  embedding: { image: thinking, bubble: "Building vector embeddings…", tone: "neutral" },

  // ---- Finished ----
  success: { image: uploaded, bubble: "Ingested! Ask me anything", tone: "success" },
  failed: { image: angry, bubble: "Something went wrong", tone: "error" },
};