import { Link } from "react-router-dom";

function SemanticSearchSuggestions({ data }) {
  return (
    <section className="h-full rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.75rem] shadow-(--shadow-sm)">
      {/* Section Header */}
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-(--border-subtle) pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 font-sans text-[1rem] font-bold text-(--text-primary)">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#e0f2fe] text-[0.8rem]"
            >
              ✨
            </span>
            Semantic Search Grounding
          </h2>

          <p className="mt-[0.3rem] text-[0.75rem] text-(--text-muted)">
            Concept & intent matching across verified company sources.
          </p>
        </div>

        <Link
          to="/semantic-search"
          className="shrink-0 whitespace-nowrap text-[0.72rem] font-bold text-(--primary) underline transition-opacity hover:opacity-80"
        >
          Open Search →
        </Link>
      </div>

      {/* Semantic matches */}
      <div className="flex flex-col gap-3">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/semantic-search?q=${encodeURIComponent(item.query)}`}
              className="group/card relative flex items-center gap-3.5 overflow-hidden rounded-[14px] border border-(--border-subtle) bg-(--bg-surface) px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--doc-doc-border) hover:shadow-(--shadow-md) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary)"
            >
              {/* Left accent that appears on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-(--primary) transition-transform duration-200 group-hover/card:scale-y-100"
              />

              {/* Sparkle tile */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-linear-to-br from-[#e0f2fe] to-[#bae6fd] text-[#0284c7] ring-1 ring-inset ring-[#bae6fd] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-200 group-hover/card:scale-105 group-hover/card:rotate-6">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2c.6 4.9 2.6 8.4 8 10-5.4 1.6-7.4 5.1-8 10-.6-4.9-2.6-8.4-8-10 5.4-1.6 7.4-5.1 8-10z" />
                </svg>
              </div>

              {/* Query and mapped document */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[0.8rem] font-semibold text-(--text-primary) transition-colors duration-150 group-hover/card:text-(--primary)">
                  "{item.query}"
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-[0.7rem] text-(--text-muted)">
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[0.85rem] leading-none text-[#0284c7] transition-transform duration-200 group-hover/card:translate-x-0.5"
                  >
                    →
                  </span>
                  <span className="min-w-0 truncate">
                    Mapped to{" "}
                    <strong className="font-bold text-(--text-primary)">
                      {item.document}
                    </strong>
                  </span>
                </p>
              </div>

              {/* Match chip */}
              <span className="shrink-0 whitespace-nowrap rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-2 py-0.5 font-mono text-[0.6rem] font-bold text-[#059669]">
                {item.match}% Match
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default SemanticSearchSuggestions;
