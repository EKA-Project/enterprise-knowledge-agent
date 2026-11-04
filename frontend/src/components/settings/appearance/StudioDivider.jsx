import { Star } from "lucide-react";

// Decorative divider under the tabs: hairlines either side of a small mono pill.
export default function StudioDivider() {
  return (
    <div aria-hidden="true" className="mt-8 flex items-center gap-4">
      <span className="h-px flex-1 bg-(--border-subtle)" />
      <span className="inline-flex items-center gap-2 rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-(--text-primary)">
        <Star size={12} className="text-(--primary)" />
        Workspace Identity // Active Domain
      </span>
      <span className="h-px flex-1 bg-(--border-subtle)" />
    </div>
  );
}