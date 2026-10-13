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

export default function SearchIntelligencePanel({ query, stats }) {
  const [inspecting, setInspecting] = useState(false);
  // ↑ Inspect expands extra details inside this card (no separate page needed).

  return (
    <section
      aria-label="Search intelligence"
className="ssp-rise rounded-2xl border border-[#c8e2f3] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#b4d8ef] hover:shadow-md"    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-[#f6dfa0] bg-[#fff4cf] text-[#f59e0b]">
  <Zap size={15} aria-hidden="true" />
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
          onClick={() => setInspecting((v) => !v)}
          aria-expanded={inspecting}
          className="rounded-full border border-(--border-subtle-nav) px-3 py-1 text-[11.5px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
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