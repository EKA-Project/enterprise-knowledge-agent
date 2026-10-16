import { Mail } from "lucide-react";
import Modal from "../common/Modal.jsx";
import Badge from "../common/Badge.jsx";

/**
 * member: { id, name, email, title, role, status, queries, lastActive, joinedDate }
 * department: string
 * onClose: () => void
 * canEdit?: boolean (default false; shows Edit button for admin)
 * onEdit?: () => void (called when Edit button is clicked)
 */
function UserViewModal({ member, department, onClose, canEdit = false, onEdit }) {
  const roleLabel =
    member.role === "MANAGER" ? "Department Lead" : "Team Member";

  return (
    <Modal
      title={member.name}
      subtitle={member.email}
      onClose={onClose}
      icon={
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent-chip) font-mono text-sm font-bold text-(--accent-chip-text)">
          {member.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>
      }
      size="sm"
      footer={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-(--text-muted)" />
            <span className="text-xs text-(--text-muted)">{member.email}</span>
          </div>

          <div className="flex items-center gap-2">
            {canEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="cursor-pointer rounded-full border border-(--border-medium) px-4 py-2 text-xs font-semibold text-(--primary) transition-colors hover:bg-(--primary-light)"
              >
                Edit Account Settings →
              </button>
            )}
          </div>
        </div>
      }
    >
      {/* Member profile section */}
      <div className="rounded-lg bg-(--bg-surface-subtle) p-4">
        <h3 className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--text-eyebrow)">
          👤 Member Profile
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Department
            </p>
            <p className="mt-1 text-sm font-semibold text-(--text-primary)">
              {department}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Role
            </p>
            <p className="mt-1 text-sm font-semibold text-(--text-primary)">
              {member.title}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Status
            </p>
            <div className="mt-1">
              <Badge
                text={member.status}
                type={member.status === "Active" ? "success" : "warning"}
              />
            </div>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Joined Date
            </p>
            <p className="mt-1 text-sm font-semibold text-(--text-primary)">
              {member.joinedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Usage telemetry */}
      <div className="mt-4 rounded-lg bg-(--bg-surface-subtle) p-4">
        <h3 className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--text-eyebrow)">
          📊 Read-Only Usage Telemetry
        </h3>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Total Queries
            </p>
            <p className="mt-1 font-serif text-lg font-bold text-(--text-primary)">
              {member.queries}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Last Active
            </p>
            <p className="mt-1 text-sm font-semibold text-(--text-primary)">
              {member.lastActive}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold text-(--text-muted)">
              Role Type
            </p>
            <p className="mt-1 text-sm font-semibold text-(--text-primary)">
              {roleLabel}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UserViewModal;