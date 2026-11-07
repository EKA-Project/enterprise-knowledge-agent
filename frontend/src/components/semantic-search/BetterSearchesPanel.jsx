import { Lightbulb, Copy, ArrowRight } from "lucide-react";
export default function BetterSearchesPanel({ tips, onTry, onCopy }) {
  return (
    <section
      aria-label="Better searches"
      className="ssp-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)"
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[14px] font-bold text-(--text-primary)">
          <Lightbulb size={14} aria-hidden="true" /> Better searches
        </h3>
        <span className="rounded-full border border-[#b7ead8] bg-[#e3f7ee] px-2 py-0.5 font-(family-name:--font-mono) text-[9px] font-bold uppercase tracking-widest text-[#278567]">
          Click to try
        </span>
      </div>

      <div className="mt-3 space-y-3">
        {tips.map((tip) => (
<div
  key={tip.id}
  className="rounded-xl border border-dashed border-[#c8e2f3] bg-[#e0eff9] p-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#a9d5ef] hover:bg-[#d5eafa] hover:shadow-sm"
>            <div className="flex items-start justify-between gap-2">
              <h4 className="text-[12.5px] font-bold leading-snug text-(--text-primary)">{tip.title}</h4>
              <span className="shrink-0 rounded-md border border-(--border-medium) bg-(--bg-surface) px-1.5 py-0.5 font-(family-name:--font-mono) text-[8.5px] font-bold uppercase tracking-wider text-(--text-secondary)">
                {tip.tag}
              </span>
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-(--text-muted)">{tip.description}</p>

            <div className="mt-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onTry(tip.example)}
className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border border-dashed border-[#c8e2f3] bg-white px-2.5 py-1.5 text-left text-[#29445b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#8bcaf0] hover:bg-[#f3faff] hover:shadow-sm active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68b8e8]"              >
                <span className="truncate font-(family-name:--font-mono) text-[10.5px] font-semibold">
                  Try: “{tip.example}”
                </span>
                <ArrowRight size={12} className="shrink-0" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onCopy(tip.example)}
                aria-label="Copy example"
                title="Copy example"
className="grid size-7 shrink-0 place-items-center rounded-lg border border-[#c8e2f3] bg-white text-[#56718b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#8bcaf0] hover:bg-[#f3faff] hover:text-[#29445b] hover:shadow-sm active:scale-95 focus-visible:outline-2 focus-visible:outline-[#68b8e8]"              >
                <Copy size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}