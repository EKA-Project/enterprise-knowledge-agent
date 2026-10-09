function MyRecentSearchConfidence({ data }) {
  // Confidence badge styles
  const confidenceStyles = {
    high: {
      label: "🟢 High Confidence",
      className: "border-[#a7f3d0] bg-[#ecfdf5] text-[#059669]",
    },
    medium: {
      label: "🟡 Medium Confidence",
      className: "border-[#fde68a] bg-[#fffbeb] text-[#d97706]",
    },
    low: {
      label: "🔴 Low Confidence",
      className: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]",
    },
  };

  return (
    <section className="mt-6 rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.75rem] shadow-(--shadow-sm)">
      {/* Section Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-sans text-[1rem] font-bold text-(--text-primary)">
            🔍 My Recent Search Confidence
          </h2>

          <p className="mt-[0.15rem] text-[0.75rem] text-(--text-muted)">
            Human-friendly grounding ratings for your recent queries.
          </p>
        </div>

        {/* View All Link */}
        <button
          type="button"
          className="shrink-0 cursor-pointer whitespace-nowrap text-[0.72rem] font-bold text-(--primary) underline transition-opacity hover:opacity-80"
        >
          View Recent Searches →
        </button>
      </div>

      {/* Recent Search List */}
      <div className="flex flex-col gap-3">
        {data.length === 0 ? (
          <p className="py-4 text-center text-sm text-(--text-muted)">
            No recent searches found.
          </p>
        ) : (
          data.slice(0, 3).map((search) => {
            const confidence =
              confidenceStyles[search.confidenceLevel] ??
              confidenceStyles.low;

            return (
              <article
                key={search.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) px-[1.1rem] py-[0.85rem]"
              >
                {/* Query and Metadata */}
                <div className="min-w-0">
                  <strong className="block text-[0.82rem] font-bold leading-snug text-(--text-primary)">
                    "{search.query}"
                  </strong>

                  <span className="mt-0.5 block text-[0.68rem] text-(--text-muted)">
                    {search.timestamp} • {search.groundingDetail}
                  </span>
                </div>

                {/* Confidence Badge */}
                <span
                  className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold ${confidence.className}`}
                >
                  {confidence.label}
                </span>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default MyRecentSearchConfidence;