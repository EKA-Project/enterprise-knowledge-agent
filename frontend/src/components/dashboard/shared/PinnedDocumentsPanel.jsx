import { useContext } from "react";
import AuthContext from "../../../context/AuthContext.jsx";
import { PINNED_DOCUMENTS_LINK } from "../../../config/documentLinks.js";
import { usePinnedDocuments } from "../../../hooks/useDashboardDocuments.js";
import { setPinned } from "../../../services/documentService.js";
import DashboardDocumentPanel from "./DashboardDocumentPanel.jsx";

// The same panel for every role. Only the admin can unpin from here; for everyone
// else the pin icon is a read-only badge.
function PinnedDocumentsPanel({ layout = "list", className = "" }) {
  const { activeRole } = useContext(AuthContext);
  const isAdmin = activeRole === "Admin";
  const { data, loading, error, reload } = usePinnedDocuments();

  // The icon is only clickable for the admin as a convenience. setPinned()
  // enforces it for real (403 for anyone else).
  const unpin = async (item) => {
    await setPinned(item.id, false);
    reload();
  };

  return (
    <DashboardDocumentPanel
      className={className}
      icon="📌"
      title="Admin–Pinned Documents"
      description={
        isAdmin
          ? "Company standards & key charters pinned for spotlight access across all dashboards."
          : "Important company standards & key charters pinned by Admin."
      }
      linkLabel={isAdmin ? "Manage Pinned →" : "View Pinned →"}
      linkTo={PINNED_DOCUMENTS_LINK}
      layout={layout}
      items={data?.items ?? []}
      loading={loading}
      error={error}
      onRetry={reload}
      itemAction="pinned"
      itemActionLabel={isAdmin ? "Unpin for everyone" : "Pinned by Admin"}
      onItemAction={isAdmin ? unpin : undefined}
      emptyMessage="No documents are pinned yet."
    />
  );
}

export default PinnedDocumentsPanel;