import { useState } from "react";
import { MoreVertical } from "lucide-react";
import DataTable from "../../common/DataTable.jsx";
import Pagination from "../../common/Pagination.jsx";
import Badge from "../../common/Badge.jsx";
import UserViewModal from "../../organization/UserViewModal.jsx";

const PAGE_SIZE = 5;

/**
 * teamMembers: array of members
 * currentUserId: ID of the logged-in user (to hide actions on their own row)
 * department: department name
 */
function ManagerTeamRoster({ teamMembers, currentUserId, department }) {
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const totalPages = Math.ceil(teamMembers.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedMembers = teamMembers.slice(start, start + PAGE_SIZE);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const columns = [
    {
      key: "member",
      header: "Member",
      width: "35%",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--accent-chip) font-mono text-xs font-bold text-(--accent-chip-text)">
            {getInitials(row.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-(--text-primary)">
              {row.name}
            </p>
            <p className="truncate text-xs text-(--text-muted)">{row.email}</p>
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
          <p className="text-sm font-semibold text-(--text-primary)">
            {row.title}
          </p>
          <p className="text-xs text-(--text-muted)">
            {row.role === "MANAGER" ? "MANAGER" : "EMPLOYEE"}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "18%",
      render: (row) => (
        <Badge
          text={row.status}
          type={row.status === "Active" ? "success" : "warning"}
        />
      ),
    },
    {
      key: "queries",
      header: "Queries",
      width: "15%",
      align: "right",
      render: (row) => (
        <div className="text-right">
          <p className="font-semibold text-(--text-primary)">{row.queries}</p>
          <p className="text-xs text-(--text-muted)">{row.lastActive}</p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "10%",
      align: "right",
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
              <MoreVertical size={16} />
            </button>

            {openMenu === row.id && !isOwnRow && (
              <div className="absolute right-0 top-full z-10 mt-1 w-32 rounded-lg border border-(--border-subtle) bg-(--bg-surface) shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMember(row);
                    setOpenMenu(null);
                  }}
                  className="block w-full cursor-pointer px-3 py-2 text-left text-xs font-semibold text-(--primary) transition-colors hover:bg-(--bg-surface-subtle)"
                >
                  View
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // UI stub for now; wired up later
                    setOpenMenu(null);
                  }}
                  className="block w-full cursor-pointer border-t border-(--border-subtle) px-3 py-2 text-left text-xs font-semibold text-(--status-danger) transition-colors hover:bg-(--status-failure-subtle)"
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
      <section
        id="team-roster"
        className="rounded-[18px] border border-(--border-subtle) bg-(--bg-surface) shadow-(--shadow-sm)"
      >
        {/* Header */}
        <div className="border-b border-(--border-subtle) px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-(--text-primary)">
                👥 {department} Team Roster ({teamMembers.length})
              </h2>
              <p className="mt-1 text-sm text-(--text-muted)">
                Department personnel and query activity.
              </p>
            </div>

            <button
              type="button"
              className="cursor-pointer rounded-full border border-(--primary) bg-(--primary-light) px-4 py-2 text-xs font-semibold text-(--primary) transition-colors hover:bg-(--primary) hover:text-white"
            >
              + Add Member
            </button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          rows={paginatedMembers}
          getRowKey={(row) => row.id}
          caption={`${department} team members, page ${page} of ${totalPages}`}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={teamMembers.length}
          onPageChange={setPage}
          itemLabel="members"
        />
      </section>

      {/* User View Modal */}
      {selectedMember && (
        <UserViewModal
          member={selectedMember}
          department={department}
          onClose={() => setSelectedMember(null)}
          canEdit={false}
        />
      )}
    </>
  );
}

export default ManagerTeamRoster;