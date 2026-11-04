import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";

const CONFIRM_WORD = "DELETE";

// Department-specific delete dialog: impact list + type DELETE to enable the button.
export default function DepartmentDeleteModal({ dept, lead, onClose, onConfirm }) {
  const [typed, setTyped] = useState("");
  const closeRef = useRef(() => {});
  const ready = typed === CONFIRM_WORD;

  const confirm = () => {
    if (!ready) return;
    onConfirm();
    closeRef.current(); // exit animation, then onClose runs
  };

  const impacts = [
    `${dept.members} active member(s) will lose their department assignment.`,
    `${dept.docs} document(s) will become unassigned.`,
    lead ? `Designated Lead Manager (${lead.name}) privileges will be revoked.` : null,
    "Department-scoped knowledge and telemetry will be dissolved.",
  ].filter(Boolean);

  return (
    <Modal
      title="Delete Department"
      eyebrow={<span className="text-(--status-danger)">⚠ Permanent deletion</span>}
      subtitle={<span className="font-(family-name:--font-mono) text-[11px] uppercase tracking-wider">{dept.code}</span>}
      icon={
        <span className="grid size-10 place-items-center rounded-xl bg-(--status-danger-bg) text-(--status-danger)">
          <Trash2 size={19} aria-hidden="true" />
        </span>
      }
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" onClick={close} />
            <Button variant="danger" size="md" icon={Trash2} disabled={!ready} onClick={confirm}>
              Permanently Delete
            </Button>
          </div>
        );
      }}
    >
      <p className="text-[13.5px] leading-relaxed text-(--text-secondary)">
        Are you sure you want to permanently delete the <strong className="text-(--text-primary)">&quot;{dept.name}&quot;</strong> department?
      </p>

      <div className="mt-4 rounded-xl border border-(--status-failure-border) bg-(--status-danger-bg) p-4">
        <p className="text-[12.5px] font-bold text-(--status-danger)">⚠ Irreversible Action &amp; Scope Impacts:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[12.5px] text-(--status-danger)">
          {impacts.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <label className="mt-5 block text-[12.5px] text-(--text-secondary)">
        To confirm deletion, please type{" "}
        <code className="font-(family-name:--font-mono) font-bold text-(--status-danger)">{CONFIRM_WORD}</code> below:
        <input
          autoFocus
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && confirm()}
          placeholder={`Type ${CONFIRM_WORD} to confirm`}
          className="mt-2 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2.5 font-(family-name:--font-mono) text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--status-danger) focus:shadow-[0_0_0_3px_var(--status-failure-glow)]"
        />
      </label>
    </Modal>
  );
}