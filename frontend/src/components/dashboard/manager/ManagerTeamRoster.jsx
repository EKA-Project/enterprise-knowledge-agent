import { KeyRound, MoreVertical } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import { AddMemberButton } from "../../common/ActionButtons";
import UserViewModal from "../../common/UserViewModal";
import RemoveMemberModal from "../../common/RemoveMemberModal";

const DEFAULT_PAGE_SIZE = 5;

function ManagerTeamRoster({
  teamMembers,
  currentUserId,
  department,
  onAddMember = () => console.log("add member"),
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [openMenu, setOpenMenu] = useState(null); // { row, top, right }

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Paginate
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedMembers = teamMembers.slice(startIdx, endIdx);

  const columns = [
    {
      key: "member",
      header: "Member",
      width: "36%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div
            className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full font-mono text-[0.5rem] font-bold ${
              row.id === currentUserId
                ? "bg-(--primary) text-white"
                : "border border-(--primary)/20 bg-(--accent-chip) text-(--accent-chip-text)"
            }`}
          >
            {getInitials(row.name)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[0.77rem] font-semibold leading-tight text-(--text-primary)">
                {row.name}
              </p>
              {row.isLead && (
                <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[0.55rem] font-semibold leading-4 text-amber-700">
                  <KeyRound size={9} />
                  Lead
                </span>
              )}
            </div>
            <p className="truncate text-[0.6rem] leading-tight text-(--text-muted)">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "title",
      header: "Role",
      width: "24%",
      render: (row) => (
        <div>
          <p className="whitespace-nowrap text-[0.77rem] font-semibold leading-tight text-(--text-primary)">
            {row.title}
          </p>
          <p className="font-mono text-[0.55rem] uppercase leading-tight tracking-wider text-(--text-muted)">
            {row.role}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "13%",
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full border px-1.5 text-[0.55rem] font-semibold leading-4 ${
            row.status === "Active"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "queries",
      header: "Queries",
      width: "17%",
      render: (row) => (
        <div>
          <p className="whitespace-nowrap text-[0.72rem] leading-tight text-(--text-muted)">
            <span className="font-mono font-bold text-(--text-primary)">
              {row.queries}
            </span>{" "}
            queries
          </p>
          <p className="font-mono text-[0.55rem] leading-tight text-(--text-muted)">
            {row.lastActive}
          </p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "10%",
      align: "center",
      render: (row) => {
        if (row.id === currentUserId) return null;

        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              setOpenMenu(
                openMenu?.row.id === row.id
                  ? null
                  : {
                      row,
                      top: rect.bottom + 4,
                      right: window.innerWidth - rect.right,
                    },
              );
            }}
            className="cursor-pointer rounded p-1 text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
            aria-label="Open actions menu"
          >
            <MoreVertical size={14} />
          </button>
        );
      },
    },
  ];

  return (
    <>
      <TableContainer
        icon={<span aria-hidden="true">👥</span>}
        title={`${department.name} Team Roster (${teamMembers.length})`}
        subtitle="Department personnel and query activity."
        actions={<AddMemberButton onClick={onAddMember} />}
        page={page}
        pageSize={pageSize}
        total={teamMembers.length}
        itemLabel="members"
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
      >
        <DataTable
          columns={columns}
          rows={paginatedMembers}
          getRowKey={(row) => row.id}
          emptyMessage="No team members yet."
          onRowClick={(row) => setSelectedMember(row)}
        />
      </TableContainer>

      {openMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpenMenu(null)}
          />
          <div
            className="fixed z-50 w-40 overflow-hidden rounded-lg border border-(--border-subtle) bg-(--bg-surface) shadow-md"
            style={{ top: openMenu.top, right: openMenu.right }}
          >
            <button
              type="button"
              onClick={() => {
                console.log("View clicked:", openMenu.row);
                setSelectedMember(openMenu.row);
                setOpenMenu(null);
              }}
              className="block w-full cursor-pointer px-3 py-1.5 text-left text-[0.75rem] font-semibold text-(--primary) transition-colors hover:bg-(--bg-surface-subtle)"
            >
              View
            </button>
            <button
              type="button"
              onClick={() => {
                setMemberToRemove(openMenu.row);
                setOpenMenu(null);
              }}
              className="block w-full cursor-pointer border-t border-(--border-subtle) px-3 py-1.5 text-left text-[0.75rem] font-semibold text-(--status-danger) transition-colors hover:bg-(--status-failure-subtle)"
            >
              Remove from Team
            </button>
          </div>
        </>
      )}

      {selectedMember && (
        <UserViewModal
          member={selectedMember}
          department={department.name}
          onClose={() => setSelectedMember(null)}
          canEdit={false}
        />
      )}

      {memberToRemove && (
        <RemoveMemberModal
          member={memberToRemove}
          department={department.name}
          onClose={() => setMemberToRemove(null)}
          onConfirm={(member) => {
            console.log("Remove:", member.id);
          }}
        />
      )}
    </>
  );
}

export default ManagerTeamRoster;
