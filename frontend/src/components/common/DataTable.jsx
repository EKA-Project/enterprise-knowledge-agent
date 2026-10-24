/* ==========================================================================
   DataTable
   --------------------------------------------------------------------------
   The TABLE itself: header row, body rows, hover, empty state.
   It knows nothing about titles, buttons or pagination. Wrap it in
   <TableContainer> for the card, header and footer.

   Props:
     columns: [{
       key,       // unique id for the column
       header,    // header label
       width?,    // any CSS width, e.g. "28%" or "120px"
       align?,    // "left" (default) | "center" | "right"
       render?,   // (row) => node; defaults to row[key]
     }]
     rows:        array of objects
     getRowKey:   (row) => unique key (defaults to row.id)
     emptyMessage: text shown when rows is empty
     caption:     screen-reader-only table caption
     onRowClick:  (row) => void; makes rows clickable

   Curve: header corners use --radius-table from variables.css.
   Row hover uses --table-row-hover (falls back to --bg-surface-subtle).
   NOTE: the table uses `border-separate border-spacing-0` (not
   border-collapse) because border-radius is ignored on table cells in the
   collapsed model. For the same reason, row dividers are drawn on the <td>s
   rather than on the <tr>.
   ========================================================================== */

const ALIGN = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function DataTable({
  columns,
  rows,
  getRowKey = (row) => row.id,
  emptyMessage = "Nothing to show yet.",
  caption,
  onRowClick,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-left">
        {caption && <caption className="sr-only">{caption}</caption>}

        {/* ---- Column widths ---- */}
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>

        {/* ---- Header row ----
            Background sits on the <th>s (not the <tr>) so the first and
            last cells can carry the rounded top corners. */}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`bg-(--table-header-bg) px-4 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-(--text-secondary) first:rounded-tl-(--radius-table) last:rounded-tr-(--radius-table) ${
                  ALIGN[column.align ?? "left"]
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* ---- Body ---- */}
        <tbody>
          {rows.length === 0 ? (
            // Empty state: one cell spanning every column
            <tr>
              <td
                colSpan={columns.length}
                className="border-t border-(--border-subtle) px-3 py-6 text-center text-xs text-(--text-muted)"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={getRowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`transition-colors hover:bg-(--table-row-hover,var(--bg-surface-subtle)) ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border-t border-(--border-subtle) px-4 py-3.5 align-middle text-sm text-(--text-primary) ${
                      ALIGN[column.align ?? "left"]
                    }`}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;