import { KeyRound, MoreVertical, Users } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import UserViewModal from "../../common/UserViewModal";
import DestructiveModal from "../../common/DestructiveModal";
import Badge from "../../common/Badge";

const DEFAULT_PAGE_SIZE = 5;

function ManagerTeamRoster({
  teamMembers,
  currentUserId,
  department,
  onAddMember,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

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
      width: "38%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[0.45rem] font-bold ${
              row.id === currentUserId
                ? "bg-(--primary) text-white"
                : "border border-(--primary)/20 bg-(--accent-chip) text-(--accent-chip-text)"
            }`}
          >
            {getInitials(row.name)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[0.7rem] font-semibold leading-tight text-(--text-primary)">
                {row.name}
              </p>
              {row.isLead && (
                <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[0.5rem] font-semibold leading-4 text-amber-700">
                  <KeyRound size={8} />
                  Lead
                </span>
              )}
            </div>
            <p className="truncate text-[0.55rem] leading-tight text-(--text-muted)">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "title",
      header: "Role",
      width: "22%",
      render: (row) => (
        <div>
          <p className="text-[0.7rem] font-semibold leading-tight text-(--text-primary)">
            {row.title}
          </p>
          <p className="font-mono text-[0.5rem] uppercase leading-tight tracking-wider text-(--text-muted)">
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
          className={`inline-flex items-center rounded-full border px-1.5 text-[0.5rem] font-semibold leading-4 ${
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
          <p className="text-[0.65rem] leading-tight text-(--text-muted)">
            <span className="font-mono font-bold text-(--text-primary)">
              {row.queries}
            </span>{" "}
            queries
          </p>
          <p className="font-mono text-[0.5rem] leading-tight text-(--text-muted)">
            {row.lastActive}
          </p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "7%",
      align: "center",
      render: (row) => {
        const isOwnRow = row.id === currentUserId;

        return (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
              className="cursor-pointer rounded p-1 text-(--text-muted) transition-colors hover:bg-(--bg-surface-subtle) hover:text-(--text-primary)"
              aria-label="Open actions menu"
            >
              <MoreVertical size={14} />
            </button>

            {openMenu === row.id && !isOwnRow && (
              <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-(--border-subtle) bg-(--bg-surface) shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMember(row);
                    setOpenMenu(null);
                  }}
                  className="block w-full cursor-pointer px-3 py-1.5 text-left text-[0.75rem] font-semibold text-(--primary) transition-colors hover:bg-(--bg-surface-subtle)"
                >
                  View
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMemberToRemove(row);
                    setOpenMenu(null);
                  }}
                  className="block w-full cursor-pointer border-t border-(--border-subtle) px-3 py-1.5 text-left text-[0.75rem] font-semibold text-(--status-danger) transition-colors hover:bg-(--status-failure-subtle)"
                >
                  Remove from Team
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <TableContainer
        icon={<Users size={20} />}
        title="Team Roster"
        subtitle={`${teamMembers.length} members in ${department.name}`}
        buttons={[
          {
            label: "Add Member",
            icon: null,
            onClick: onAddMember,
            variant: "primary",
          },
        ]}
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
          onRowClick={(row) => console.log("open view modal for", row.id)}
        />
      </TableContainer>

      {selectedMember && (
        <UserViewModal
          member={selectedMember}
          department={department}
          onClose={() => setSelectedMember(null)}
          canEdit={false}
        />
      )}

      {memberToRemove && (
        <DestructiveModal
          title="Remove from Team"
          message={`Are you sure you want to remove ${memberToRemove.name} from ${department.name}?`}
          onConfirm={() => {
            console.log("Remove:", memberToRemove.id);
            setMemberToRemove(null);
          }}
          onCancel={() => setMemberToRemove(null)}
          confirmLabel="Remove"
          confirmTone="danger"
        />
      )}
    </>
  );
}

export default ManagerTeamRoster;
