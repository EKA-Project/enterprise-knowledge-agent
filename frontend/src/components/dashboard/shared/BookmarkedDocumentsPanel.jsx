import { BOOKMARKED_DOCUMENTS_LINK } from "../../../config/documentLinks.js";
import { useBookmarkedDocuments } from "../../../hooks/useDashboardDocuments.js";
import { removeBookmark } from "../../../services/bookmarkService.js";
import DashboardDocumentPanel from "./DashboardDocumentPanel.jsx";

// Bookmarks are per user, so this panel works for any role.
function BookmarkedDocumentsPanel({ layout = "list", className = "" }) {
  const { data, loading, error, reload } = useBookmarkedDocuments();

  const unsave = async (item) => {
    await removeBookmark(item.id);
    reload();
  };

  return (
    <DashboardDocumentPanel
      className={className}
      icon="⭐"
      title="My Saved Bookmarks"
      description="Quick access to your personal bookmarked sources."
      linkLabel="View All Bookmarks →"
      linkTo={BOOKMARKED_DOCUMENTS_LINK}
      layout={layout}
      items={data?.items ?? []}
      loading={loading}
      error={error}
      onRetry={reload}
      itemAction="saved"
      itemActionLabel="Remove from bookmarks"
      onItemAction={unsave}
      emptyMessage="You haven't bookmarked any documents yet."
    />
  );
}

export default BookmarkedDocumentsPanel;