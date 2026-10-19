import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import { CancelButton } from "./ActionButtons";

// Danger dialog: the red button stays disabled until the exact word is typed.
export default function TypedConfirmModal({ title, subtitle, impactsTitle, impacts = [], confirmWord, confirmLabel, onConfirm, onClose }) {
  const [typed, setTyped] = useState("");
  const closeRef = useRef(() => {});
  const ready = typed === confirmWord;

  const confirm = () => {
    if (!ready) return;
    onConfirm();
    closeRef.current();
  };

  return (
    <Modal
      tone="danger"
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      title={<span className="text-(--status-danger)">{title}</span>}
      subtitle={subtitle}
      icon={
        <span className="grid size-10 place-items-center rounded-xl bg-[#fecaca]/60 text-(--status-danger)">
          <Trash2 size={18} aria-hidden="true" />
        </span>
      }
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" icon={null} onClick={close} />
            <Button variant="danger" size="md" icon={Trash2} disabled={!ready} onClick={confirm}>{confirmLabel}</Button>
          </div>
        );
      }}
    >
      <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) p-4">
        <p className="text-[13px] font-bold text-(--text-primary)">{impactsTitle}</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[12.5px] text-(--text-secondary)">
          {impacts.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      </div>
      <label className="mt-5 block text-[12.5px] text-(--text-secondary)">
        <span className="flex items-center justify-between">
          <span>To confirm, type</span>
          <code className="rounded bg-(--status-danger-bg) px-2 py-0.5 font-mono text-[11px] font-bold text-(--status-danger)">{confirmWord}</code>
          <span>below:</span>
        </span>
        <input
          autoFocus
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && confirm()}
          placeholder={`Type ${confirmWord}`}
          className="mt-2 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2.5 font-mono text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--status-danger) focus:shadow-[0_0_0_3px_var(--status-failure-glow)]"
        />
      </label>
    </Modal>
  );
}