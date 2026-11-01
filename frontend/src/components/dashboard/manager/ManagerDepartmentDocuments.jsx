import { Box, Download, FileText } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import Button from "../../common/Button";
import {
  IngestDocumentButton,
  IngestionLibraryButton,
} from "../../common/ActionButtons";
import useUpload from "../../../hooks/useUpload";
import useDepartmentDocuments from "../../../hooks/useDepartmentDocuments";
import { reindexDocument } from "../../../services/documentService.js";
import ManagerDocumentRowMenu from "./ManagerDocumentRowMenu.jsx";
/* ==========================================================================
   ManagerDepartmentDocuments
   --------------------------------------------------------------------------
   Documents table for the Manager overview page. Built on the shared shell:
   this file decides the COLUMNS and what goes in each cell. The data comes
   from useDepartmentDocuments (services), one server-side page at a time.

   Columns: Document | Uploader | Size | Vector Chunks | Status | Action
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
  onOpen = (doc) => console.log("open", doc.id),
  // Placeholders until the Summary / Edit pages are wired (a teammate owns them)
  onViewDetails = (doc) => console.log("view details", doc.id),
  onEdit = (doc) => console.log("edit metadata", doc.id),
  onReindexed = () => {}, // lets the page refresh the KPI cards after a re-index
}) {
  const { openUpload, canUpload } = useUpload();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
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
      // Reload once, no polling: the row now reads "Processing…" and turns Ready
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
      key: "uploader",
      header: "Uploader",
      width: "19%",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) font-mono text-[0.65rem] font-bold text-(--text-secondary)"
          >
            {row.uploader.charAt(0).toUpperCase()}
          </span>
          <span className="whitespace-nowrap text-[0.78rem] text-(--text-secondary)">
            {row.uploader}
          </span>
        </div>
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
      width: "11%",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === "indexed" && (
            <Button
              size="xs"
              onClick={(e) => {
                e.stopPropagation(); // do not also trigger the row click
                onOpen(row);
              }}
            >
              Open →
            </Button>
          )}
          {row.status === "failed" && (
            <button
              type="button"
              disabled={busyId !== null}
              onClick={(e) => {
                e.stopPropagation();
                handleReindex(row);
              }}
              className="cursor-pointer text-[0.75rem] font-semibold text-(--status-danger) hover:underline disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busyId === row.id ? "Retrying…" : "Retry"}
            </button>
          )}
          <ManagerDocumentRowMenu
            row={row}
            reindexDisabled={row.status === "indexing" || busyId !== null}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onReindex={handleReindex}
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
          onRowClick={(row) => row.status === "indexed" && onOpen(row)}
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
      page={page}
      pageSize={pageSize}
      total={meta?.total ?? 0}
      itemLabel="documents"
      onPageChange={setPage}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1);
      }}
    >
      {body}
    </TableContainer>
  );
}

export default ManagerDepartmentDocuments;
