import { useRef, useState } from "react";
import { UserX } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";

// The video does not show this dialog, so it follows the shared modal system and the
// delete-department pattern: type the member's full name to enable the red button.
export default function UserTerminateModal({ user, onClose, onConfirm }) {
  const [typed, setTyped] = useState("");
  const closeRef = useRef(() => {});
  const ready = typed.trim().toLowerCase() === user.name.toLowerCase();

  const confirm = () => {
    if (!ready) return;
    onConfirm();
    closeRef.current();
  };

  return (
    <Modal
      title="Terminate Account"
      eyebrow={<span className="text-(--status-danger)">⚠ Access revocation</span>}
      subtitle={user.email}
      icon={
        <span className="grid size-10 place-items-center rounded-xl bg-(--status-danger-bg) text-(--status-danger)">
          <UserX size={19} aria-hidden="true" />
        </span>
      }
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" icon={null} onClick={close} />
            <Button variant="danger" size="md" disabled={!ready} onClick={confirm}>Terminate Account</Button>
          </div>
        );
      }}
    >
      <p className="text-[13.5px] leading-relaxed text-(--text-secondary)">
        Terminate <strong className="text-(--text-primary)">{user.name}</strong>&apos;s account? Their access is revoked immediately.
      </p>

      <div className="mt-4 rounded-xl border border-(--status-failure-border) bg-(--status-danger-bg) p-4">
        <p className="text-[12.5px] font-bold text-(--status-danger)">What happens:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[12.5px] text-(--status-danger)">
          <li>Sign-in and all knowledge access are disabled.</li>
          <li>Documents they uploaded stay in the repository.</li>
          <li>An administrator can re-activate the account later.</li>
        </ul>
      </div>

      <label className="mt-5 block text-[12.5px] text-(--text-secondary)">
        To confirm, type the member&apos;s full name:{" "}
        <code className="font-(family-name:--font-mono) font-bold text-(--status-danger)">{user.name}</code>
        <input
          autoFocus
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && confirm()}
          placeholder="Type full name to confirm"
          className="mt-2 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2.5 text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--status-danger) focus:shadow-[0_0_0_3px_var(--status-failure-glow)]"
        />
      </label>
    </Modal>
  );
}