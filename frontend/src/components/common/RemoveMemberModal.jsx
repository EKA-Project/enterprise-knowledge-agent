import { UserX } from "lucide-react";
import Modal from "./Modal.jsx";
import Badge from "./Badge.jsx";
import { CancelButton, RemoveFromTeamButton } from "./ActionButtons.jsx";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function NoticeItem({ children }) {
  return (
    <li className="flex gap-1.5">
      <span aria-hidden="true">•</span>
      <span>{children}</span>
    </li>
  );
}

/**
 * member: { name, email, title, status }
 * department: string
 * onClose: () => void
 * onConfirm: (member) => void (called when "Remove from Team" is clicked)
 */
function RemoveMemberModal({ member, department, onClose, onConfirm }) {
  const firstName = member.name.split(" ")[0];

  return (
    <Modal
      size="md"
      onClose={onClose}
      icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#fecaca] bg-(--status-failure-bg) text-(--status-failure)">
          <UserX size={22} strokeWidth={2} />
        </div>
      }
      title="Remove Team Member"
      subtitle={
        <>
          Revoke departmental membership from{" "}
          <strong className="font-bold">{department}</strong>
        </>
      }
      footer={(close) => (
        <div className="flex items-center justify-end gap-2">
          <CancelButton onClick={close} />
          <RemoveFromTeamButton
            onClick={() => {
              onConfirm?.(member);
              close();
            }}
          />
        </div>
      )}
    >
      <div className="space-y-3">
        {/* Member card */}
        <div className="flex items-center gap-3 rounded-xl border border-(--border-subtle) bg-(--primary-light) px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--primary) font-mono text-xs font-bold text-white">
            {getInitials(member.name)}
          </div>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-(--text-primary)">
              {member.name}
              <span className="inline-flex *:px-2! *:py-0! *:text-[0.65rem]! *:leading-5!">
                <Badge
                  text={member.status}
                  type={member.status === "Active" ? "success" : "warning"}
                />
              </span>
            </p>
            <p className="truncate text-xs text-(--text-secondary)">
              {member.title} • {member.email}
            </p>
          </div>
        </div>

        <p className="text-sm text-(--text-secondary)">
          Are you sure you want to remove{" "}
          <strong className="font-bold text-(--text-primary)">
            {member.name}
          </strong>{" "}
          from the{" "}
          <strong className="font-bold text-(--text-primary)">
            {department}
          </strong>{" "}
          roster?
        </p>

        {/* Scope notice */}
        <div className="rounded-xl border border-[#fecaca] bg-(--status-failure-subtle) px-4 py-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-(--status-danger)">
            <span aria-hidden="true">⚠️</span>
            Department Scope Notice:
          </p>
          <ul className="space-y-0.5 text-xs text-(--text-secondary)">
            <NoticeItem>
              {firstName} will be unassigned from the{" "}
              <strong className="font-bold text-(--text-primary)">
                {department}
              </strong>{" "}
              team.
            </NoticeItem>
            <NoticeItem>
              Scoped access to department runbooks and documents will be
              revoked.
            </NoticeItem>
            <NoticeItem>
              User account and historical search telemetry remain preserved.
            </NoticeItem>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default RemoveMemberModal;
