import { useRef, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";

const label = "block font-(family-name:--font-mono) text-[10.5px] uppercase tracking-[0.12em] text-(--text-secondary)";

export default function DepartmentAssignLeadModal({ dept, currentLead, members = [], onClose, onConfirm }) {
  const [selected, setSelected] = useState(currentLead?.id ?? "");
  const closeRef = useRef(() => {});
  const canConfirm = selected && selected !== currentLead?.id;

  const confirm = () => {
    if (!canConfirm) return;
    onConfirm(selected);
    closeRef.current(); // exit animation, then onClose runs
  };

  return (
    <Modal
      title="Assign Department Lead"
      subtitle={dept.name}
      icon={<span className="grid size-10 place-items-center rounded-xl bg-(--primary-light) text-[20px]">👔</span>}
      size="md"
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" onClick={close} />
            <Button variant="solid" size="md" disabled={!canConfirm} onClick={confirm}>
              Confirm Manager Assignment
            </Button>
          </div>
        );
      }}
    >
      <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) px-4 py-3">
        <p className="font-(family-name:--font-mono) text-[10px] uppercase tracking-wider text-(--text-muted)">
          Current lead: <span className="font-bold text-(--text-primary)">{currentLead?.name ?? "Unassigned"}</span>
        </p>
        {currentLead && <p className="mt-0.5 text-[11.5px] text-(--text-muted)">{currentLead.email}</p>}
      </div>

      <label className="mt-4 block">
        <span className={label}>Select designated manager</span>
        <select
          autoFocus
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2.5 text-[13px] text-(--text-primary) outline-none transition focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]"
        >
          <option value="">-- Select Team Member as Manager --</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.role}) — {m.department}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-[11px] text-(--text-muted)">
          The assigned manager gains scoped upload &amp; management rights over this department&apos;s documents.
        </span>
      </label>
    </Modal>
  );
}