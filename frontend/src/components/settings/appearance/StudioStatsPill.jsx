import { Star } from "lucide-react";

// Count summary beside the page title: "25 Atmospheres • 11 Type Suites".
// Counts are passed in, so they always follow the registries.
export default function StudioStatsPill({ atmospheres, typeSuites }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-(--border-medium) bg-(--bg-surface) py-1 pl-1.5 pr-4 text-[12.5px]">
      <span
        aria-hidden="true"
        className="grid size-6 place-items-center rounded-full bg-(--primary-light) text-(--primary)"
      >
        <Star size={12} />
      </span>
      <span className="font-semibold text-(--text-primary)">
        {atmospheres} Atmospheres
      </span>
      <span aria-hidden="true" className="text-(--text-muted)">•</span>
      <span className="text-(--text-secondary)">{typeSuites} Type Suites</span>
    </span>
  );
}