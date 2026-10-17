import { FileText } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import Button from "../../common/Button";
import {
  IngestDocumentButton,
  IngestionLibraryButton,
} from "../../common/ActionButtons";
import useUpload from "../../../hooks/useUpload";
/* ==========================================================================
   ManagerDepartmentDocuments
   --------------------------------------------------------------------------
   Documents table for the Manager overview page. Built on the shared shell:
   this file only decides the COLUMNS and what goes in each cell.

   Columns: Document | Category / Scope | Uploader | Size | Chunks |
            Status (dot + Open pill) | Action (Edit, Re-index)
   ========================================================================== */

const DEFAULT_PAGE_SIZE = 5;

// ---- Status dot colour + accessible label, per indexing status ----
const STATUS_DOT = {
  indexed: { color: "bg-(--status-verified)", label: "Indexed" },
  indexing: { color: "bg-amber-400", label: "Indexing" },
  failed: { color: "bg-(--status-failure)", label: "Failed" },
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

// ---- Plain text action (Edit, Re-index) ----
const actionLink =
  "cursor-pointer text-[0.75rem] font-medium text-(--text-secondary) transition-colors hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-40";

function ManagerDepartmentDocuments({
  documents,
  department,
  onIngest, // optional override; by default the button opens the upload modal
  onOpenLibrary = () => console.log("open ingestion library"),
  onOpen = (doc) => console.log("open", doc.id),
  onEdit = (doc) => console.log("edit", doc.id),
  onReindex = (doc) => console.log("re-index", doc.id),
}) {
  // ---- Pagination state + current page slice ----
  const { openUpload, canUpload } = useUpload();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const startIdx = (page - 1) * pageSize;
  const paginatedDocs = documents.slice(startIdx, startIdx + pageSize);

  // Stops a click on an inner button from also triggering the row click
  const run = (fn, row) => (e) => {
    e.stopPropagation();
    fn(row);
  };

  // ---- Columns ----
  const columns = [
    {
      key: "title",
      header: "Document",
      width: "28%",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FileTypeChip type={row.type} />
          <div className="min-w-0">
            <p className="truncate font-serif text-[0.88rem] font-bold leading-tight text-(--text-primary)">
              {row.title}
            </p>
            <p className="text-[0.62rem] leading-tight text-(--text-muted)">
              {row.meta}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category / Scope",
      width: "16%",
      render: (row) => (
        <span className="inline-flex whitespace-nowrap rounded-full bg-(--accent-chip) px-2.5 py-0.5 text-[0.7rem] font-medium text-(--accent-chip-text)">
          {row.category}
        </span>
      ),
    },
    {
      key: "uploader",
      header: "Uploader",
      width: "13%",
      render: (row) => (
        <span className="whitespace-nowrap text-[0.78rem] text-(--text-secondary)">
          {row.uploader}
        </span>
      ),
    },
    {
      key: "size",
      header: "Size",
      width: "8%",
      render: (row) => (
        <span className="font-mono text-[0.72rem] text-(--text-secondary)">
          {row.size}
        </span>
      ),
    },
    {
      key: "chunks",
      header: "Chunks",
      width: "10%",
      render: (row) =>
        row.chunks > 0 ? (
          <span className="rounded-md bg-(--accent-chip) px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-(--accent-chip-text)">
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
      width: "13%",
      render: (row) => {
        const dot = STATUS_DOT[row.status] ?? STATUS_DOT.indexing;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${dot.color}`}
              title={dot.label}
            />
            <span className="sr-only">{dot.label}</span>

            {row.status === "indexed" ? (
              <Button size="xs" onClick={run(onOpen, row)}>
                Open →
              </Button>
            ) : (
              <span className="text-[0.7rem] text-(--text-muted)">
                {row.status === "indexing" ? "Processing…" : "Failed"}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Action",
      width: "12%",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className={actionLink}
            onClick={run(onEdit, row)}
          >
            Edit
          </button>
          <button
            type="button"
            className={`${actionLink} ${
              row.status === "failed" ? "text-(--status-danger)" : ""
            }`}
            disabled={row.status === "indexing"}
            onClick={run(onReindex, row)}
          >
            {row.status === "failed" ? "Retry" : "Re-index"}
          </button>
        </div>
      ),
    },
  ];

  // ---- Card + table ----
  return (
    <TableContainer
      icon={<FileText size={20} />}
      title={`${department.name} Documents (${documents.length})`}
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
      total={documents.length}
      itemLabel="documents"
      onPageChange={setPage}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1);
      }}
    >
      <DataTable
        columns={columns}
        rows={paginatedDocs}
        getRowKey={(row) => row.id}
        emptyMessage="No documents indexed for this department yet."
        onRowClick={(row) => row.status === "indexed" && onOpen(row)}
      />
    </TableContainer>
  );
}

export default ManagerDepartmentDocuments;
