function MySavedBookmarks({ data }) {
  return (
    <section className="mt-6 rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.75rem] shadow-(--shadow-sm)">
      {/* Section Header */}
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-(--primary) pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-[0.4rem] font-sans text-[1rem] font-bold text-(--text-primary)">
            ⭐ My Saved Bookmarks
          </h2>

          <p className="mt-[0.15rem] text-[0.75rem] text-(--text-muted)">
            Quick access to your personal bookmarked sources.
          </p>
        </div>

        {/* View All Link */}
        <button
          type="button"
          className="shrink-0 cursor-pointer whitespace-nowrap text-[0.72rem] font-bold text-(--primary) underline"
        >
          View All Bookmarks →
        </button>
      </div>

      {/* Saved Bookmark List */}
      <div className="flex flex-col gap-3">
        {data.map((document) => (
          <article
            key={document.id}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-[14px] border border-(--border-subtle) bg-(--bg-surface) p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-(--border-medium) hover:shadow-(--shadow-md)"
          >
            {/* Document Information */}
            <div className="flex min-w-0 items-center gap-3">
              {/* File Format Badge */}
              <span className="shrink-0 rounded-[10px] border border-(--border-subtle) bg-(--bg-surface-subtle) px-2 py-1 font-mono text-[0.72rem] font-bold uppercase text-(--text-primary)">
                {document.format}
              </span>

              {/* Title & Metadata */}
              <div className="min-w-0">
                <strong className="block text-[0.78rem] font-bold text-(--text-primary)">
                  {document.title}
                </strong>

                <span className="text-[0.68rem] text-(--text-muted)">
                  {document.category} • {document.pages} pages
                </span>
              </div>
            </div>

            {/* Navigation Arrow */}
            <span className="shrink-0 text-[0.78rem] font-bold text-(--primary)">
              →
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MySavedBookmarks;
