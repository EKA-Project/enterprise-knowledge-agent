import DocumentListItem from "../../common/DocumentListItem.jsx";
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
          <DocumentListItem
            key={document.id}
            type={document.format}
            title={document.title}
            meta={`${document.category} • ${document.pages} pages`}
          />
        ))}
      </div>
    </section>
  );
}

export default MySavedBookmarks;
