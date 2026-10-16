import { MoreVertical, Users } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import UserViewModal from "../../common/UserViewModal";
import DestructiveModal from "../../common/DestructiveModal";
import Badge from "../../common/Badge";

const PAGE_SIZE = 5;

function ManagerTeamRoster({ teamMembers, currentUserId, department, onAddMember }) {
  const [page, setPage] = useState(1);
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
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginatedMembers = teamMembers.slice(startIdx, endIdx);

  const columns = [
    {
      key: "member",
      header: "Member",
      width: "40%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--accent-chip) font-mono text-[0.55rem] font-bold text-(--accent-chip-text)">
            {getInitials(row.name)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <p className="truncate text-xs font-semibold text-(--text-primary)">
                {row.name}
              </p>
              {row.isLead && (
                <Badge text="Lead" type="warning" size="sm" />
              )}
            </div>
            <p className="truncate text-[0.65rem] text-(--text-muted)">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "title",
      header: "Role",
      width: "20%",
      render: (row) => (
        <div>
          <p className="text-[0.75rem] font-semibold text-(--text-primary)">
            {row.title}
          </p>
          <p className="text-[0.6rem] text-(--text-muted)">
            {row.role === "MANAGER" ? "MANAGER" : "EMPLOYEE"}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      render: (row) => (
        <Badge
          text={row.status}
          type={row.status === "Active" ? "success" : "warning"}
          size="sm"
        />
      ),
    },
    {
      key: "queries",
      header: "Queries",
      width: "18%",
      render: (row) => (
        <div>
          <p className="text-[0.75rem] font-semibold text-(--text-primary)">
            {row.queries} queries
          </p>
          <p className="text-[0.6rem] text-(--text-muted)">
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
              onClick={() =>
                setOpenMenu(openMenu === row.id ? null : row.id)
              }
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
        pageSize={PAGE_SIZE}
        total={teamMembers.length}
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          // Reset to page 1 when changing page size
          setPage(1);
        }}
      >
        <DataTable
          columns={columns}
          rows={paginatedMembers}
          getRowKey={(row) => row.id}
          emptyMessage="No team members yet."
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