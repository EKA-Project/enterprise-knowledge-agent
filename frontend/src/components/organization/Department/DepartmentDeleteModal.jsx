import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../../common/Modal";
import Button from "../../common/Button";
import { CancelButton } from "../../common/ActionButtons";

const CONFIRM_WORD = "DELETE";

// Department-specific delete dialog: impact list + type DELETE to enable the button.
export default function DepartmentDeleteModal({ dept, lead, targets = [], onClose, onConfirm }) {
  const [typed, setTyped] = useState("");
  const [moveTo, setMoveTo] = useState("");
  const closeRef = useRef(() => {});
  // A department that has members or documents needs a place to move them to.
  const needsTarget = dept.memberCount > 0 || dept.documentCount > 0;
  const ready = typed === CONFIRM_WORD && (!needsTarget || Boolean(moveTo));
  const confirm = () => {
    if (!ready) return;
    onConfirm(moveTo || null);
    closeRef.current(); // exit animation, then onClose runs
  };

  const target = targets.find((d) => d.id === moveTo);
  const where = target ? target.name : "the department you choose";
  const impacts = [
    `${dept.memberCount} active member(s) will move to ${where}.`,
    `${dept.documentCount} document(s) will move there too. Department-only documents become readable by that department.`,
    lead ? `Lead Manager (${lead.name}) moves with the members and no longer leads a department.` : null,
    "The department's collection overview will be removed.",
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
            <CancelButton size="sm" onClick={close} />
            <Button variant="danger" size="sm" icon={Trash2} disabled={!ready} onClick={confirm}>
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
      <label className="mt-4 block text-[12.5px] text-(--text-secondary)">
        Move members and documents to:
        <select
          value={moveTo}
          onChange={(e) => setMoveTo(e.target.value)}
          className="mt-2 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2.5 text-[13px] text-(--text-primary) outline-none transition focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]"
        >
          <option value="">-- Select a department --</option>
          {targets.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </label>

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