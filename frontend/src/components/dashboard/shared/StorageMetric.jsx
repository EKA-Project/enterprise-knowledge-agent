import { useState } from "react";

function StorageMetric() {
  // ─────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────

  const [hovered, setHovered] = useState(null);

  // ─────────────────────────────────────────────
  // Storage data
  // ─────────────────────────────────────────────

  const usedPercentage = 28;
  const freePercentage = 100 - usedPercentage;

  const usedStorage = "14.2 GB";
  const freeStorage = "35.8 GB";

  // ─────────────────────────────────────────────
  // Ring calculations
  // ─────────────────────────────────────────────

  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const usedLength = (usedPercentage / 100) * circumference;
  const freeLength = (freePercentage / 100) * circumference;

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div className="flex items-center gap-5">
      {/* ─────────────────────────────────────────
          Storage progress ring
      ───────────────────────────────────────── */}

      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
          {/* Free storage segment */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#d9d6df"
            strokeWidth={hovered === "free" ? "9" : "7"}
            strokeLinecap="round"
            strokeDasharray={`${freeLength} ${circumference}`}
            strokeDashoffset={-usedLength}
            opacity={hovered === "used" ? 0.25 : 1}
            onMouseEnter={() => setHovered("free")}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-all duration-200"
          />

          {/* Used storage segment */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#7e57c2"
            strokeWidth={hovered === "used" ? "9" : "7"}
            strokeLinecap="round"
            strokeDasharray={`${usedLength} ${circumference}`}
            strokeDashoffset="0"
            opacity={hovered === "free" ? 0.25 : 1}
            onMouseEnter={() => setHovered("used")}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-all duration-200"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-(--text-primary)">
            28%
          </span>

          <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-(--text-muted)">
            Capacity
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          Storage legend
      ───────────────────────────────────────── */}

      <div className="min-w-0 flex-1 space-y-3">
        {/* Used storage */}
        <div
          className="flex cursor-pointer items-center justify-between gap-3"
          onMouseEnter={() => setHovered("used")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#7e57c2]" />

            <span
              className={`text-xs transition-opacity duration-200 ${
                hovered === "free" ? "opacity-40" : "text-(--text-secondary)"
              }`}
            >
              Used
            </span>
          </div>

          <span
            className={`text-xs font-semibold transition-opacity duration-200 ${
              hovered === "free" ? "opacity-40" : "text-[#7e57c2]"
            }`}
          >
            {usedStorage}
          </span>
        </div>

        {/* Free storage */}
        <div
          className="flex cursor-pointer items-center justify-between gap-3"
          onMouseEnter={() => setHovered("free")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d9d6df]" />

            <span
              className={`text-xs transition-opacity duration-200 ${
                hovered === "used" ? "opacity-40" : "text-(--text-secondary)"
              }`}
            >
              Free
            </span>
          </div>

          <span
            className={`text-xs font-semibold transition-opacity duration-200 ${
              hovered === "used" ? "opacity-40" : "text-(--text-secondary)"
            }`}
          >
            {freeStorage}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StorageMetric;
