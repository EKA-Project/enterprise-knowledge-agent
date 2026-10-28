import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DOCUMENT_MATRIX } from "./AnalyticsData";

const mono = "font-(family-name:--font-mono)";
const COLS = "grid grid-cols-[2.2fr_1.5fr_0.8fr_0.8fr] items-center gap-3";
const TYPE_STYLES = {
  PDF: "bg-(--status-failure-bg) text-(--status-failure)",
  MD: "bg-(--primary-light) text-(--accent-chip-text)",
  DOCX: "bg-[#dbeafe] text-[#1d4ed8]",
  FIG: "bg-[#ede9fe] text-[#6d28d9]",
};
// DocumentMatrix component for displaying a matrix of documents with grounding accuracy
export default function DocumentMatrix() {
    const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [inspectId, setInspectId] = useState(null);
  const rows = expanded ? DOCUMENT_MATRIX : DOCUMENT_MATRIX.slice(0, 4);

  return (
    <section className="anl-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-(family-name:--font-serif) text-[20px] font-bold text-(--text-primary)">Document Matrix</h3>
          <p className="mt-0.5 text-[11.5px] text-(--text-muted)">Grounding accuracy.</p>
        </div>
        <span className={`${mono} rounded-md bg-(--primary-light) px-2 py-0.5 text-[10px] font-semibold text-(--accent-chip-text)`}>
          Showing {rows.length} Docs
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[460px] overflow-hidden rounded-xl border border-(--border-subtle)">
          <div className={`${COLS} bg-(--bg-surface-subtle) px-4 py-2.5 ${mono} text-[9.5px] uppercase tracking-[0.12em] text-(--text-muted)`}>
            <span>Document</span>
            <span>Category</span>
            <span>Grounding</span>
            <span className="text-right">Action</span>
          </div>

          {rows.map((d) => (
            <div
              key={d.id}
              role="link"
              tabIndex={0}
              onClick={() => navigate("/documents")}
              onKeyDown={(event) => {
                if (event.target === event.currentTarget && event.key === "Enter") {
                  navigate("/documents");
                }
              }}
              className="anl-fade cursor-pointer border-t border-(--border-subtle) transition-colors hover:bg-(--primary-light)/60 focus-visible:outline-2 focus-visible:outline-(--border-focus)"
            >
              <div className={`${COLS} px-4 py-3`}>
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className={`${mono} grid size-8 shrink-0 place-items-center rounded-lg text-[9px] font-bold ${TYPE_STYLES[d.type]}`}>{d.type}</span>
                  <div className="min-w-0">
                    <p className="truncate font-(family-name:--font-serif) text-[13px] font-bold text-(--text-primary)" title={d.name}>{d.name}</p>
                    <p className="truncate text-[10.5px] text-(--text-muted)">{d.owner}</p>
                  </div>
                </div>
                <span className={`${mono} w-fit rounded-md bg-(--primary-light) px-2 py-0.5 text-[9px] font-semibold uppercase text-(--accent-chip-text)`}>{d.category}</span>
                <span className={`${mono} text-[12px] font-bold text-(--text-primary)`}>{d.grounding}</span>
                <div className="text-right">
                  <button
                    type="button"
onClick={(event) => {
  event.stopPropagation();
  setInspectId(inspectId === d.id ? null : d.id);
}}                    aria-expanded={inspectId === d.id}
                    className="rounded-full border border-(--border-subtle-nav) px-3 py-1 text-[11px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary)"
                  >
                    Inspect
                  </button>
                </div>
              </div>
              {inspectId === d.id && (
                <p className={`${mono} anl-pop mx-4 mb-3 rounded-lg bg-(--bg-surface-subtle) px-3 py-2 text-[10.5px] text-(--text-secondary)`}>
                  {d.chunks} chunks indexed • cited in {d.cited} answers • grounding {d.grounding}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full border border-(--border-subtle-nav) px-4 py-1.5 text-[12px] font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary)"
        >
          {expanded ? (
            <>Collapse Matrix <ChevronUp size={13} aria-hidden="true" /></>
          ) : (
            <>View All {DOCUMENT_MATRIX.length} Documents <ChevronDown size={13} aria-hidden="true" /></>
          )}
        </button>
      </div>
    </section>
  );
}