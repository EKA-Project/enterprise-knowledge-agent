/**
 * columns: [{
 *   key,        // unique id for the column
 *   header,     // header label
 *   width?,     // any CSS width, e.g. "28%" or "120px"
 *   align?,     // "left" (default) | "center" | "right"
 *   render?,    // (row) => node; defaults to row[key]
 * }]
 * rows: array of objects
 * getRowKey: (row) => unique key (defaults to row.id)
 * Renders only the table. Wrap it in a card and add <Pagination /> yourself.
 */
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
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-left">
        {caption && <caption className="sr-only">{caption}</caption>}

        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>

        <thead>
          <tr className="bg-(--bg-surface-subtle)">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-5 py-3 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-(--text-muted) ${
                  ALIGN[column.align ?? "left"]
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center text-sm text-(--text-muted)"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-t border-(--border-subtle) transition-colors hover:bg-(--bg-surface-subtle)/60"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-3.5 align-middle text-sm text-(--text-primary) ${
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