// The three steps of "Start Vector Ingestion".
//
//   label / detail: text shown in the progress card
//   mascot:         which Byte state to show during this stage (see byteStates.js)
//   weight:         this stage's share of the 0-100% bar (weights add up to 100)
//   duration:       how long the SIMULATED stage takes (ms); a real backend replaces this

const RAW_STAGES = [
  {
    id: "sending",
    label: "Uploading",
    detail: "Sending your document securely…",
    mascot: "sending",
    weight: 30,
    duration: 1400,
  },
  {
    id: "chunking",
    label: "Chunking",
    detail: "Splitting it into semantic chunks…",
    mascot: "chunking",
    weight: 30,
    duration: 1400,
  },
  {
    id: "embedding",
    label: "Embedding",
    detail: "Creating vector embeddings…",
    mascot: "embedding",
    weight: 40,
    duration: 1800,
  },
];

// Adds `start`: the % where each stage begins (0, 30, 60). Computed once here
// so the hook and the progress card don't each redo the maths.
let runningTotal = 0;
export const UPLOAD_STAGES = RAW_STAGES.map((stage) => {
  const withStart = { ...stage, start: runningTotal };
  runningTotal += stage.weight;
  return withStart;
});