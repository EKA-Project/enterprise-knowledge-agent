import { useState } from "react";
import { Zap } from "lucide-react";

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-[#c8e2f3] py-2 transition-colors duration-200 last:border-b-0">
      <dt className="text-[12px] text-[#607a91]">{label}</dt>
      <dd className="text-[12px] text-[#607a91]">{value}</dd>
    </div>
  );
}

export default function SearchIntelligencePanel({ query, stats, onInspect }) {
  const [inspecting, setInspecting] = useState(false);
  // ↑ Inspect expands extra details inside this card (no separate page needed).

  return (
    <section
      aria-label="Search intelligence"
      className="ssp-rise rounded-2xl border border-[#c8e2f3] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#b4d8ef] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-[#fdf0c4] text-[#e8590c]">
            <Zap size={17} fill="currentColor" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[14px] font-bold text-[#29445b]">Search Intelligence</h3>
            <p className="font-(family-name:--font-mono) text-[9.5px] uppercase tracking-widest text-[#f59e0b]">
              {stats.engine}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setInspecting((v) => !v);
            onInspect?.();
          }}
          aria-expanded={inspecting}
          className={`rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
            inspecting
              ? "border-(--border-subtle) bg-(--bg-surface-subtle) text-(--text-muted)"
              : "border-(--border-medium) bg-white text-(--text-primary) hover:-translate-y-0.5 hover:border-(--primary) hover:bg-(--primary-light) hover:text-(--primary) hover:shadow-sm"
          }`}
        >
          {inspecting ? "Close" : "Inspect"}
        </button>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-(--text-secondary)">
        Query <span className="font-semibold text-(--text-primary)">“{query}”</span> matched against indexed document chunks.
      </p>

      <dl className="mt-3">
        <Row label="Documents scanned" value={stats.scanned} />
        <Row label="Relevant chunks" value={stats.chunks} />
        <Row label="Top relevance" value={`${stats.topRelevance}%`} />
        <Row label="Query latency" value={`${stats.latencyMs}ms`} />
        <Row label="Model" value={stats.model} />
      </dl>

      {inspecting && (
        <div className="ssp-pop mt-3 rounded-xl border border-dashed border-[#c8e2f3] bg-[#eaf4fb] p-3">
          <p className="font-(family-name:--font-mono) text-[9.5px] uppercase tracking-widest text-[#607a91]">
            Retrieval settings
          </p>
          <dl className="mt-1">
            {stats.details.map(([label, value]) => (
              <Row key={label} label={label} value={value} />
            ))}
          </dl>
          <p className="mt-2 text-[10.5px] italic text-[#607a91]">Illustrative demo values for this prototype.</p>
        </div>
      )}
    </section>
  );
}