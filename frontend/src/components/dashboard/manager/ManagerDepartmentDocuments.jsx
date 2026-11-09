import { Box, Download, FileText } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import Pagination from "../../common/Pagination";
import DataTable from "../../common/DataTable";
import {
  IngestDocumentButton,
  IngestionLibraryButton,
} from "../../common/ActionButtons";
import {
  ViewButton,
  EditButton,
  ReindexButton,
} from "../../common/RowIconButtons";
import useUpload from "../../../hooks/useUpload";
import useDepartmentDocuments from "../../../hooks/useDepartmentDocuments";
import { reindexDocument } from "../../../services/documentService.js";

/* ==========================================================================
   ManagerDepartmentDocuments
   --------------------------------------------------------------------------
   Documents table for the Manager overview page. This file decides the
   COLUMNS and what goes in each cell. The data comes from useDepartmentDocuments,
   one server-side page at a time.

   Columns: Document | Uploaded At | Size | Vector Chunks | Status | Action
   The Action column holds icon buttons only. Each page supplies its own handlers.
   ========================================================================== */

const DEFAULT_PAGE_SIZE = 10;
const SKELETON_ROWS = 5;

// ---- Status pill per table status (theme tokens only) ----
const STATUS_PILL = {
  indexed: {
    label: "Ready",
    className:
      "border-(--status-verified-border) bg-(--status-verified-bg) text-(--status-success)",
  },
  indexing: {
    label: "Processing",
    className:
      "border-(--status-warning)/30 bg-(--status-warning-bg) text-(--status-warning)",
  },
  failed: {
    label: "Failed",
    className:
      "border-(--status-failure-border) bg-(--status-failure-bg) text-(--status-danger)",
  },
};

// ---- File-type chip colours come from the --file-<type>-* tokens ----
const KNOWN_FILE_TYPES = ["pdf", "doc", "docx", "csv", "md", "txt", "fig"];

function FileTypeChip({ type }) {
  const key = KNOWN_FILE_TYPES.includes(type) ? type : "txt";
  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-mono text-[0.5rem] font-bold uppercase"
      style={{
        background: `var(--file-${key}-bg)`,
        color: `var(--file-${key}-color)`,
        borderColor: `var(--file-${key}-border)`,
      }}
    >
      {type}
    </span>
  );
}

// Placeholder rows while loading (same rough height as a real row)
function TableSkeleton() {
  return (
    <div className="space-y-2 px-4 py-4" aria-hidden="true">
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div
          key={index}
          className="h-14 animate-pulse rounded-xl bg-(--border-subtle)"
        />
      ))}
    </div>
  );
}

function ManagerDepartmentDocuments({
  onIngest, // optional override; by default the button opens the upload modal
  onOpenLibrary = () => console.log("open ingestion library"),
  // Placeholders until the Summary / Edit pages are wired (a teammate owns them)
  onView = (doc) => console.log("view", doc.id),
  onEdit = (doc) => console.log("edit metadata", doc.id),
  onReindexed = () => {}, // lets the page refresh the KPI cards after a re-index
}) {
  const { openUpload, canUpload } = useUpload();
  const [page, setPage] = useState(1);
  const pageSize = DEFAULT_PAGE_SIZE;
  const { data, loading, error, reload } = useDepartmentDocuments(
    page,
    pageSize,
  );

  // Re-index / Retry. One call at a time (busyId); a refused call (403, 409)
  // shows its message above the table.
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState(null);

  async function handleReindex(row) {
    if (busyId) return; // ignore a second click while one call is running
    setActionError(null);
    setBusyId(row.id);
    try {
      await reindexDocument(row.id);
      // Reload once, no polling: the row now reads "Processing" and turns Ready
      // on a later refresh (the mock pipeline needs about 1.5 s).
      reload();
      onReindexed();
    } catch (err) {
      setActionError(
        err.message || "Could not re-index this document. Please try again.",
      );
    } finally {
      setBusyId(null);
    }
  }

  // useApi clears `data` on every refetch, so remember the title and total from the
  // last answer. Otherwise the title and footer would jump on each page change.
  // (Setting state during render is React's pattern for "adjust state to new data".)
  const [meta, setMeta] = useState(null);
  if (
    data &&
    (meta?.total !== data.total || meta?.departmentName !== data.departmentName)
  ) {
    setMeta({ departmentName: data.departmentName, total: data.total });
  }

  const title = meta
    ? `${meta.departmentName ?? "Department"} Documents (${meta.total})`
    : "Department Documents";

  // ---- Columns ----
  const columns = [
    {
      key: "title",
      header: "Document",
      width: "35%",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FileTypeChip type={row.type} />
          <div className="min-w-0">
            <p className="truncate font-serif text-[0.88rem] font-bold leading-tight text-(--text-primary)">
              {row.title}
            </p>
            {row.meta && (
              <p className="text-[0.62rem] leading-tight text-(--text-muted)">
                {row.meta}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "uploadedAt",
      header: "Uploaded At",
      width: "15%",
      render: (row) => (
        <span className="whitespace-nowrap font-mono text-[0.72rem] text-(--text-secondary)">
          {row.uploadedAt}
        </span>
      ),
    },
    {
      key: "size",
      header: "Size",
      width: "11%",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.72rem] text-(--text-secondary)">
          <Download size={12} aria-hidden="true" />
          {row.size}
        </span>
      ),
    },
    {
      key: "chunks",
      header: "Vector Chunks",
      width: "15%",
      render: (row) =>
        row.chunks > 0 ? (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-(--border-subtle) bg-(--bg-surface) px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-(--text-secondary)">
            <Box size={11} aria-hidden="true" />
            {row.chunks} chunks
          </span>
        ) : (
          <span className="font-mono text-[0.72rem] text-(--text-muted)">
            —
          </span>
        ),
    },
    {
      key: "status",
      header: "Status",
      width: "9%",
      render: (row) => {
        const pill = STATUS_PILL[row.status] ?? STATUS_PILL.indexing;
        return (
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold ${pill.className}`}
          >
            {pill.label}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Action",
      width: "15%",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <ViewButton onClick={() => onView(row)} />
          <EditButton onClick={() => onEdit(row)} />
          <ReindexButton
            failed={row.status === "failed"}
            loading={busyId === row.id}
            disabled={row.status === "indexing" || busyId !== null}
            onClick={() => handleReindex(row)}
          />
        </div>
      ),
    },
  ];

  // ---- Body: skeleton, error or the table ----
  let body;
  if (loading) {
    body = <TableSkeleton />;
  } else if (error) {
    body = (
      <div role="alert" className="flex flex-col items-start gap-2 px-7 py-6">
        <p className="text-[0.82rem] text-(--status-danger)">
          Couldn&apos;t load the department documents.
        </p>
        <button
          type="button"
          onClick={reload}
          className="cursor-pointer text-[0.78rem] font-semibold text-(--primary) hover:underline"
        >
          Try again
        </button>
      </div>
    );
  } else {
    body = (
      <>
        {actionError && (
          <p
            role="alert"
            className="border-b border-(--border-subtle) px-7 py-3 text-[0.78rem] text-(--status-danger)"
          >
            {actionError}
          </p>
        )}
        <DataTable
          columns={columns}
          rows={data.items}
          getRowKey={(row) => row.id}
          emptyMessage="No documents indexed for this department yet."
          onRowClick={(row) => onView(row)}
        />
      </>
    );
  }

  return (
    <TableContainer
      icon={<FileText size={20} />}
      title={title}
      subtitle="Scoped documents and playbooks indexed into your department's vector space."
      actions={
        <>
          <IngestDocumentButton
            onClick={onIngest ?? openUpload}
            disabled={!canUpload}
          />
          <IngestionLibraryButton onClick={onOpenLibrary} />
        </>
      }
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={meta?.total ?? 0}
          itemLabel="documents"
          onPageChange={setPage}
        />
      }
    >
      {body}
    </TableContainer>
  );
}

export default ManagerDepartmentDocuments;
