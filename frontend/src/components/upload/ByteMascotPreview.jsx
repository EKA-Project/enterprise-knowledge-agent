import { useState } from "react";
import { ByteMascot } from "./ByteMascot.jsx";
import { MASCOT_STATES } from "./uploadMascotStates.js";

// TEMPORARY: delete after checking. Do NOT commit this file.
export default function ByteMascotPreview() {
  const [state, setState] = useState("empty");

  return (
    <div className="mx-auto max-w-xl space-y-3 p-6">
      <ByteMascot state={state} />
      <div className="flex flex-wrap gap-2">
        {Object.keys(MASCOT_STATES).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setState(key)}
            className="rounded-full border border-(--border-medium) bg-white px-3 py-1 text-xs"
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}