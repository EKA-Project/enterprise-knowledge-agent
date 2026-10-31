import { useRef, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";
import { deriveCode } from "./OrganizationData";

const label = "block text-[0.8rem] font-semibold text-(--text-primary)";
const field =
  "mt-1.5 w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-2 text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";
const req = <span className="text-(--status-failure)">*</span>;
const errCls = "mt-1 block text-[12px] font-medium text-(--status-failure)";

// One form used by both Create and Edit. The lead select shows only when creating.
export default function DepartmentFormModal({ mode, members = [], initial, onClose, onSubmit }) {
  const editing = mode === "edit";
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "");
  const [leadId, setLeadId] = useState(initial?.leadId ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [errors, setErrors] = useState({});
  const canSubmit = Boolean(name.trim() && code.trim() && (editing || leadId));
  const clear = (key) => setErrors((p) => ({ ...p, [key]: "" }));
  const closeRef = useRef(() => {});
  // ↑ Holds the shared close() so a successful submit also plays the exit animation.
const submit = (e) => {
  e.preventDefault();
  const trimmedName = name.trim();
  const trimmedCode = code.trim();
  const next = {};
  if (!trimmedName) next.name = "Department name is required.";
  if (!trimmedCode) next.code = "Department code is required.";
  if (!editing && !leadId) next.lead = "Select a department lead.";
  if (Object.keys(next).length) {
    setErrors(next);
    return;
  }
  onSubmit({
    name: trimmedName,
    code: trimmedCode,
    emoji: Array.from(emoji.trim())[0] ?? "",
    leadId,
    description: description.trim(),
  });
  closeRef.current();
};
  return (
    <Modal
      title={
        <span className="flex items-center gap-2">
          <span aria-hidden="true">{editing ? "✏️" : "🏢"}</span>
          {editing ? "Edit Department" : "Create New Department"}
        </span>
      }
      subtitle={
  <span className="whitespace-nowrap text-xs text-(--text-muted)">
    {editing ? `${initial.name} (${initial.code})` : "Establish an organizational unit with scoped manager privileges."}
  </span>
}
    
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" className="px-2!" onClick={close} />
            <Button
              variant="solid"
              size="md"
              className="px-3!"
              type="submit"
              form="department-form"
              disabled={!canSubmit}
            >
          {editing ? "Save Department" : "+ Create Department"}
        </Button>
          </div>
        );
      }}
    >
      <form id="department-form" onSubmit={submit} className="space-y-4">
        <label className="block">
  <span className={label}>Department Name {req}</span>
  <input
    autoFocus
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      clear("name");
    }}
    placeholder="e.g. Data Science & AI Research"
    className={field}
  />
  {errors.name && <span role="alert" className={errCls}>{errors.name}</span>}
</label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
  <span className={label}>Department Code / Prefix {req}</span>
  <input
    value={code}
    maxLength={10}
    onChange={(e) => {
      setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""));
      clear("code");
    }}
    placeholder="e.g. AI-RES"
    className={field}
  />
  {errors.code && <span role="alert" className={errCls}>{errors.code}</span>}
</label>
          <label className="block">
            <span className={label}>Icon emoji</span>
            <input value={emoji} maxLength={8} onChange={(e) => setEmoji(e.target.value)} placeholder="🔬" className={field} />
          </label>
        </div>

        {!editing && (
          <label className="block">
  <span className={label}>Department Lead (Designated Manager) {req}</span>
  <select
    value={leadId}
    onChange={(e) => {
      setLeadId(e.target.value);
      clear("lead");
    }}
    className={field}
  >
    <option value="">-- Select Team Member as Manager --</option>
    {members.map((m) => (
      <option key={m.id} value={m.id}>
        {m.name} ({m.role}) — {m.department}
      </option>
    ))}
  </select>
  {errors.lead && <span role="alert" className={errCls}>{errors.lead}</span>}
  <span className="mt-1.5 block text-xs text-(--text-muted)">
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