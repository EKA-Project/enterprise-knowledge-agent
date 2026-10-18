import { useState } from "react";
import { UserX } from "lucide-react";
import Modal from "./Modal.jsx";
import Badge from "./Badge.jsx";
import Button from "./Button.jsx";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * member: { name, email, title, status }
 * department: string
 * onClose: () => void
 * onConfirm: (member) => void (called when "Terminate Account" is clicked)
 */
function TerminateMemberModal({ member, department, onClose, onConfirm }) {
  const [typedName, setTypedName] = useState("");
  const firstName = member.name.split(" ")[0];
  const canConfirm =
    typedName.trim().toLowerCase() === member.name.trim().toLowerCase();

  return (
    <Modal
      size="md"
      onClose={onClose}
      icon={
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--status-failure-bg) text-(--status-failure)">
          <UserX size={20} strokeWidth={2} />
        </div>
      }
      title="Terminate Member"
      subtitle={
        <>
          Permanently disable this account in{" "}
          <strong className="font-bold">{department}</strong>
        </>
      }
      footer={(close) => (
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => {
              onConfirm?.(member);
              close();
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-(--status-danger) px-4 py-2 font-semibold text-white transition-colors enabled:hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Terminate Account
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
        {/* Member card */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-(--border-subtle) bg-(--primary-light) px-4 py-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--accent-chip) font-mono text-sm font-bold text-(--accent-chip-text)">
            {getInitials(member.name)}
          </div>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2 font-semibold text-(--text-primary)">
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

        <p className="text-sm text-(--text-primary)">
          Are you sure you want to terminate{" "}
          <strong className="font-bold">{member.name}</strong>? This removes
          them from <strong className="font-bold">{department}</strong> and
          disables their EKA account.
        </p>

        {/* Danger notice */}
        <div className="rounded-xl border border-[#fecaca] bg-(--status-failure-subtle) px-4 py-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-(--status-danger)">
            <span aria-hidden="true">⚠️</span>
            Account Termination Notice:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[0.8rem] text-(--text-secondary)">
            <li>{firstName} will lose access to EKA across all departments.</li>
            <li>Department runbooks, documents and saved searches become inaccessible.</li>
            <li>Historical search telemetry is kept for audit purposes.</li>
          </ul>
        </div>

        {/* Type-to-confirm */}
        <div>
          <label
            htmlFor="terminate-confirm"
            className="mb-1.5 block text-xs font-semibold text-(--text-secondary)"
          >
            Type <strong className="text-(--text-primary)">{member.name}</strong>{" "}
            to confirm
          </label>
          <input
            id="terminate-confirm"
            type="text"
            autoFocus
            autoComplete="off"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder={member.name}
            className="w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-(--text-muted) focus:border-(--status-danger) focus:ring-2 focus:ring-(--status-danger)/20"
          />
        </div>
      </div>
    </Modal>
  );
}

export default TerminateMemberModal;