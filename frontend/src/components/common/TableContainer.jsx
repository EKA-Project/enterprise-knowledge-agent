/* ==========================================================================
   TableContainer
   --------------------------------------------------------------------------
   The CARD around a table: header (icon, title, subtitle, actions) and a
   body. The table goes in as children. The footer is a slot, so each page
   passes its own <Pagination /> (or nothing).

   Usage:
     <TableContainer
       icon={<span aria-hidden="true">👥</span>}
       title="Engineering Team Roster (9)"
       subtitle="Department personnel and query activity."
       actions={<AddMemberButton onClick={onAddMember} />}
       footer={<Pagination page={page} pageSize={5} total={9} onPageChange={setPage} itemLabel="members" />}
     >
       <DataTable columns={columns} rows={rows} />
     </TableContainer>

   fillHeight: stretches the card to its parent's height. The body grows to
   fill the space and the footer stays at the bottom. The body never scrolls.
   ========================================================================== */

function TableContainer({
  icon,
  title,
  subtitle,
  actions, // right side of the header, usually buttons
  footer, // usually <Pagination />
  fillHeight = false,
  children,
}) {
  return (
    <div
      className={`overflow-hidden rounded-(--radius-table) border border-(--border-subtle) bg-(--bg-surface) shadow-sm ${
        fillHeight ? "flex h-full flex-col" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between gap-4 border-b border-(--border-subtle) bg-(--bg-surface) px-7 py-5">
        <div>
          <div className="flex items-center gap-2">
            {icon && <span className="shrink-0 text-(--primary)">{icon}</span>}
            <h3 className="text-[1.1rem] font-bold leading-tight text-(--text-primary)">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="mt-1 text-[0.8rem] text-(--text-muted)">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>

      {/* ================= BODY ================= */}
      <div className={`overflow-x-hidden ${fillHeight ? "min-h-0 flex-1" : ""}`}>
        {children}
      </div>

      {/* ================= FOOTER (page decides) ================= */}
      {footer}
    </div>
  );
}

export default TableContainer;