function StorageMetric() {
  const usedPercentage = 28;

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (usedPercentage / 100) * circumference;

  return (
    <div className="flex items-center gap-5">
      {/* Storage progress ring. */}
      <div className="relative h-24 w-24 shrink-0">
        <svg
          viewBox="0 0 96 96"
          className="h-full w-full -rotate-90"
        >
          {/* Background ring. */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#eeeaf5"
            strokeWidth="7"
          />

          {/* Used storage ring. */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#7e57c2"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>

        {/* Center label. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-(--text-primary)">
            28%
          </span>

          <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-(--text-muted)">
            Capacity
          </span>
        </div>
      </div>

      {/* Storage legend. */}
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#7e57c2]" />
            <span className="text-xs text-(--text-secondary)">Used</span>
          </div>

          <span className="text-xs font-semibold text-[#7e57c2]">
            14.2 GB
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d9d6df]" />
            <span className="text-xs text-(--text-secondary)">Free</span>
          </div>

          <span className="text-xs font-semibold text-(--text-secondary)">
            35.8 GB
          </span>
        </div>
      </div>
    </div>
  );
}

export default StorageMetric;