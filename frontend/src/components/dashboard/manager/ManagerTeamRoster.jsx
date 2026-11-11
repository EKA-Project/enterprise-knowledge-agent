import { Copy, KeyRound } from "lucide-react";
import { useState } from "react";
import TableContainer from "../../common/TableContainer";
import DataTable from "../../common/DataTable";
import Pagination from "../../common/Pagination";

// All 14 button exports from your new ActionButtons module
import {
  IngestDocumentButton,
  AddMemberButton,
  CompareRedlineButton,
  IngestionLibraryButton,
  ExportAuditButton,
  RestoreButton,
  PurgeButton,
  DeleteActionButton,
  EmptyRecycleBinButton,
  DeleteActiveHistoryButton,
  SendInvitationButton,
  CancelButton,
  RemoveFromTeamButton,
  SurpriseMeButton,
  DoneButton,
} from "../../common/ActionButtons";

import { ViewButton, RemoveButton } from "../../common/RowIconButtons";
import UserViewModal from "../../common/UserViewModal";
import InviteMemberModal from "../../common/InviteMemberModal";
import RemoveMemberModal from "../../common/RemoveMemberModal";

const ROSTER_PAGE_SIZE = 10;

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ManagerTeamRoster({
  teamMembers,
  currentUserId,
  department,
  onInviteMember = (invite) => console.log("invite member:", invite),
}) {
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // States to test animated / interactive buttons
  const [isSurprising, setIsSurprising] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  const handleSurpriseTest = () => {
    setIsSurprising(true);
    setRollCount((c) => c + 1);
    setTimeout(() => setIsSurprising(false), 800);
  };

  async function copyEmployeeCode(member) {
    try {
      await navigator.clipboard.writeText(member.employeeCode);
      setCopiedId(member.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // Clipboard blocked on non-secure context
    }
  }

  const pageRows = teamMembers.slice(
    (page - 1) * ROSTER_PAGE_SIZE,
    page * ROSTER_PAGE_SIZE,
  );

  const columns = [
    {
      key: "member",
      header: "Member",
      width: "30%",
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
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-[0.55rem] font-semibold leading-4 text-amber-700">
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
      width: "22%",
      render: (row) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            copyEmployeeCode(row);
          }}
          title="Copy Emp ID"
          className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-(--border-subtle) bg-(--bg-surface) px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-(--text-secondary) transition-colors hover:border-(--primary) hover:text-(--primary)"
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
          <p className="whitespace-nowrap font-mono text-[0.55rem] leading-tight text-(--text-muted)">
            {row.lastActive}
          </p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "20%",
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
      {/* ============================================================== */}
      {/* 🧪 ALL ACTION BUTTONS TEST BENCH                               */}
      {/* ============================================================== */}
      <div className="mb-4 space-y-4 rounded-xl border border-dashed border-sky-400 bg-sky-50/50 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-900">
            Action Buttons Test Bench
          </p>
          <p className="text-[0.7rem] text-sky-700">
            Hover over buttons to test micro-animations (dipping download, spinning restore, flying send, tilting warning, spinning X).
          </p>
        </div>

        {/* Section 1: Core Primary */}
        <div>
          <p className="mb-1.5 font-mono text-[0.65rem] font-bold text-sky-800">
            SECTION 1: Core Primary Actions
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <IngestDocumentButton onClick={() => console.log("Ingest clicked")} />
            <AddMemberButton onClick={() => setIsInviteOpen(true)} />
            <CompareRedlineButton onClick={() => console.log("Compare clicked")} />
            <IngestionLibraryButton onClick={() => console.log("Library clicked")} />
          </div>
        </div>

        {/* Section 2: Storage & Retention */}
        <div>
          <p className="mb-1.5 font-mono text-[0.65rem] font-bold text-sky-800">
            SECTION 2: Storage & Retention
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <ExportAuditButton onClick={() => console.log("Export Audit CSV clicked")} />
            <RestoreButton onClick={() => console.log("Restore clicked")} />
            <PurgeButton onClick={() => alert("Permanent purge triggered!")} />
          </div>
        </div>

        {/* Section 3: Animated Deletes */}
        <div>
          <p className="mb-1.5 font-mono text-[0.65rem] font-bold text-sky-800">
            SECTION 3: Reusable Animated Delete Actions
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <DeleteActionButton
              toast="Item permanently removed"
              onToast={(msg) => alert(`Toast: ${msg}`)}
              onClick={() => console.log("Custom Delete clicked")}
            >
              Delete Item
            </DeleteActionButton>
            <EmptyRecycleBinButton onToast={(msg) => alert(`Toast: ${msg}`)} />
            <DeleteActiveHistoryButton onToast={(msg) => alert(`Toast: ${msg}`)} />
          </div>
        </div>

        {/* Section 4: Modals, Forms & Appearance */}
        <div>
          <p className="mb-1.5 font-mono text-[0.65rem] font-bold text-sky-800">
            SECTION 4: Modals, Forms & Appearance
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <SendInvitationButton onClick={() => console.log("Send Invitation clicked")} />
            <CancelButton onClick={() => console.log("Cancel clicked")} />
            <RemoveFromTeamButton onClick={() => console.log("Remove Team clicked")} />
            <SurpriseMeButton
              isSurprising={isSurprising}
              rollCount={rollCount}
              onClick={handleSurpriseTest}
            />
            <DoneButton onClick={() => console.log("Cancel clicked")} />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* Table Container                                                */}
      {/* ============================================================== */}
      <TableContainer
        icon={<span aria-hidden="true">👥</span>}
        title={`${department.name} Team Roster (${teamMembers.length})`}
        subtitle="Department personnel and query activity."
        actions={<AddMemberButton onClick={() => setIsInviteOpen(true)} />}
        fillHeight
        footer={
          <Pagination
            page={page}
            pageSize={ROSTER_PAGE_SIZE}
            total={teamMembers.length}
            itemLabel="members"
            onPageChange={setPage}
          />
        }
      >
        <DataTable
          columns={columns}
          rows={pageRows}
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