export const RANGES = [7, 14, 30];
export const DEFAULT_RANGE = 14;

function ManagerRangeToggle({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Date range"
      className="inline-flex items-center rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-1"
    >
      {RANGES.map((range) => {
        const isActive = range === value;

        return (
          <button
            key={range}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(range)}
            className={`cursor-pointer rounded-full px-3 py-1 font-mono text-[0.68rem] font-semibold transition-colors ${
              isActive
                ? "bg-(--primary) text-(--primary-contrast) shadow-(--shadow-sm)"
                : "text-(--text-muted) hover:text-(--text-primary)"
            }`}
          >
            {range} Days
          </button>
        );
      })}
    </div>
  );
}

export default ManagerRangeToggle;