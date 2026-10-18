import { useCallback, useEffect, useRef, useState } from "react";
import { UPLOAD_STAGES } from "./uploadStages.js";

const TICK_MS = 50; // how often the progress bar advances
const HOLD_AT = 98; // progress waits here until the real work has finished
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * onSubmit: (payload) => Promise   (supplied by the page; rejects on failure)
 *
 * Returns:
 *   phase:      "idle" | "uploading" | "success" | "error"
 *   stageIndex: which stage is running (0, 1, 2)
 *   stage:      that stage's config object
 *   progress:   0-100
 *   error:      message string when phase === "error"
 *   start(payload): begin ingestion
 *   reset():        back to idle (e.g. for "Upload another")
 */
function useUploadPipeline(onSubmit) {
  const [phase, setPhase] = useState("idle");
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const runId = useRef(0); // bumping this cancels any run still in flight
  const running = useRef(false); // blocks double-starts (double click = double upload)

  // Always call the latest onSubmit without making `start` change every render
  const onSubmitRef = useRef(onSubmit);
  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  // If the modal closes mid-run, stop updating state on a component that's gone
  useEffect(() => () => {
    runId.current += 1;
  }, []);

  const reset = useCallback(() => {
    runId.current += 1;
    running.current = false;
    setPhase("idle");
    setStageIndex(0);
    setProgress(0);
    setError(null);
  }, []);

  const start = useCallback(async (payload) => {
    if (running.current) return;
    running.current = true;

    const myRun = ++runId.current;
    const isCurrent = () => runId.current === myRun;

    setPhase("uploading");
    setStageIndex(0);
    setProgress(0);
    setError(null);

    // Kick off the REAL work straight away; we only look at its result later.
    // Promise.resolve().then(...) also catches an onSubmit that throws instantly.
    const outcome = { done: false, error: null };
    Promise.resolve()
      .then(() => onSubmitRef.current(payload))
      .then(() => {
        outcome.done = true;
      })
      .catch((err) => {
        outcome.error = err ?? new Error("Upload failed");
      });

    // Play the stages one after another, advancing the bar a little every tick
    let stopped = false;
    for (let i = 0; i < UPLOAD_STAGES.length && !stopped; i++) {
      const stage = UPLOAD_STAGES[i];
      setStageIndex(i);

      const steps = Math.max(1, Math.round(stage.duration / TICK_MS));
      for (let s = 1; s <= steps; s++) {
        await sleep(TICK_MS);
        if (!isCurrent()) return; // reset or unmounted: abandon quietly
        if (outcome.error) {
          stopped = true; // real work failed: stop on this stage
          break;
        }
        setProgress(Math.min(HOLD_AT, stage.start + (stage.weight * s) / steps));
      }
    }

    // Animation finished but the real work hasn't: hold here until it does
    while (!outcome.done && !outcome.error) {
      await sleep(100);
      if (!isCurrent()) return;
    }

    running.current = false;
    if (outcome.error) {
      setError(outcome.error.message || "Something went wrong while ingesting this document.");
      setPhase("error");
    } else {
      setProgress(100);
      setPhase("success");
    }
  }, []);

  return {
    phase,
    stageIndex,
    stage: UPLOAD_STAGES[stageIndex],
    progress,
    error,
    start,
    reset,
  };
}

export default useUploadPipeline;