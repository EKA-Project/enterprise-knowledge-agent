import { Copy, KeyRound } from "lucide-react";
import { ViewButton, RemoveButton } from "../../common/RowIconButtons";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import { AddMemberButton } from "../../common/ActionButtons";
import UserViewModal from "../../common/UserViewModal";
import InviteMemberModal from "../../common/InviteMemberModal";
import RemoveMemberModal from "../../common/RemoveMemberModal";

const DEFAULT_PAGE_SIZE = 10;

function ManagerTeamRoster({
  teamMembers,
  currentUserId,
  department,
  onInviteMember = (invite) => console.log("invite member:", invite),
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [copiedId, setCopiedId] = useState(null); // member whose Emp ID was just copied

  // Copies the Emp ID and shows "Copied" on that chip for 1.5 seconds
  async function copyEmployeeCode(member) {
    try {
      await navigator.clipboard.writeText(member.employeeCode);
      setCopiedId(member.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // Clipboard can be blocked (for example on a non-secure page). The code stays visible.
    }
  }

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
            className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full font-mono text-[0.5rem] font-bold ${
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
      key: "employeeCode",
      header: "Emp ID",
      width: "24%",
      render: (row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // keep the click away from the row (it opens the user view)
            copyEmployeeCode(row);
          }}
          title="Copy Emp ID"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-(--border-subtle) bg-(--bg-surface) px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-(--text-secondary) transition-colors hover:border-(--primary) hover:text-(--primary)"
        >
          {copiedId === row.id ? "Copied" : row.employeeCode}
          {copiedId !== row.id && <Copy size={11} aria-hidden="true" />}
        </button>
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
      width: "15%",
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
      width: "12%",
      align: "center",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <ViewButton
            label={`View ${row.name}`}
            onClick={() => setSelectedMember(row)}
          />
          {row.id !== currentUserId && (
            <RemoveButton
              label={`Remove ${row.name} from team`}
              onClick={() => setMemberToRemove(row)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <TableContainer
        icon={<span aria-hidden="true">👥</span>}
        title={`${department.name} Team Roster (${teamMembers.length})`}
        subtitle="Department personnel and query activity."
        actions={<AddMemberButton onClick={() => setIsInviteOpen(true)} />}
        page={page}
        pageSize={pageSize}
        total={teamMembers.length}
        itemLabel="members"
        fillHeight
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


      {isInviteOpen && (
        <InviteMemberModal
          department={department.name}
          onClose={() => setIsInviteOpen(false)}
          onInvite={onInviteMember}
        />
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
