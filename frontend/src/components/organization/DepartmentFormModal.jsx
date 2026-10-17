import { useRef, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";
import { deriveCode } from "./OrganizationData";

const label = "block font-(family-name:--font-mono) text-[10.5px] uppercase tracking-[0.12em] text-(--text-secondary)";
const field =
  "mt-1.5 w-full rounded-lg border border-(--border-medium) bg-(--bg-surface) px-3 py-2.5 text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";

// One form used by both Create and Edit. The lead select shows only when creating.
export default function DepartmentFormModal({ mode, members = [], initial, onClose, onSubmit }) {
  const editing = mode === "edit";
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "");
  const [leadId, setLeadId] = useState(initial?.leadId ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [error, setError] = useState("");
  const closeRef = useRef(() => {});
  // ↑ Holds the shared close() so a successful submit also plays the exit animation.

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Department name is required.");
      return;
    }
    onSubmit({
      name: trimmed,
      code: code.trim() || deriveCode(trimmed),
      emoji: Array.from(emoji.trim())[0] ?? "",
      leadId,
      description: description.trim(),
    });
    closeRef.current();
  };

  return (
    <Modal
      title={editing ? "Edit Department" : "Create New Department"}
      subtitle={editing ? `${initial.name} (${initial.code})` : "Establish an organizational unit with scoped manager privileges."}
      icon={
        <span className="grid size-10 place-items-center rounded-xl bg-(--primary-light) text-[20px]">
          {editing ? "✏️" : "🏢"}
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
            <Button variant="solid" size="md" type="submit" form="department-form">
              {editing ? "Save Department" : "+ Create Department"}
            </Button>
          </div>
        );
      }}
    >
      <form id="department-form" onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className={label}>Department name <span className="text-(--status-failure)">*</span></span>
          <input
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g. Data Science & AI Research"
            className={field}
          />
          {error && <span role="alert" className="mt-1 block text-[12px] font-medium text-(--status-failure)">{error}</span>}
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className={label}>Department code / prefix</span>
            <input
              value={code}
              maxLength={10}
              onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))}
              placeholder="e.g. AI-RES"
              className={`${field} font-(family-name:--font-mono)`}
            />
          </label>
          <label className="block">
            <span className={label}>Icon emoji</span>
            <input value={emoji} maxLength={8} onChange={(e) => setEmoji(e.target.value)} placeholder="🔬" className={field} />
          </label>
        </div>

        {!editing && (
          <label className="block">
            <span className={label}>Department lead (designated manager)</span>
            <select value={leadId} onChange={(e) => setLeadId(e.target.value)} className={field}>
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
        )}

        <label className="block">
          <span className={label}>{editing ? "Description" : "Description & scope"}</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Brief scope of responsibilities and knowledge scope..."
            className={`${field} resize-y`}
          />
        </label>
      </form>
    </Modal>
  );
}