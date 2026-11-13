import { useRef, useState } from "react";
import Modal from "../../common/Modal.jsx";
import Button from "../../common/Button.jsx";
import { CancelButton } from "../../common/ActionButtons.jsx";
import { DEPARTMENT_COLORS, DEPARTMENT_ICONS } from "../../../config/departmentTheme.js";

const label = "block text-[0.8rem] font-semibold text-(--text-primary)";
const field =
  "mt-1.5 w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-2 text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";
const req = <span className="text-(--status-failure)">*</span>;
const errCls = "mt-1 block text-[12px] font-medium text-(--status-failure)";

// One form used by both Create and Edit. The lead select shows only when creating.
  export default function DepartmentFormModal({ mode, initial, onClose, onSubmit }) {
  const editing = mode === "edit";
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [scope, setScope] = useState(initial?.scope ?? "");
  const [colorKey, setColorKey] = useState(initial?.colorKey ?? "slate");
  const [iconKey, setIconKey] = useState(initial?.iconKey ?? "briefcase");
  const [errors, setErrors] = useState({});
  const canSubmit = Boolean(name.trim() && code.trim() && description.trim() && scope.trim());
  const clear = (key) => setErrors((p) => ({ ...p, [key]: "" }));
  const closeRef = useRef(() => {});
  // ↑ Holds the shared close() so a successful submit also plays the exit animation.
  const submit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedCode = code.trim();
    const next = {};
    if (!trimmedName) next.name = "Department name is required.";
    if (!/^[A-Z]{2,6}$/.test(trimmedCode)) next.code = "Use 2 to 6 uppercase letters.";
    if (!description.trim()) next.description = "Description is required.";
    if (!scope.trim()) next.scope = "Scope is required.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    onSubmit({
      name: trimmedName,
      code: trimmedCode,
      description: description.trim(),
      scope: scope.trim(),
      colorKey,
      iconKey,
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
    {editing ? `${initial.name} (${initial.code})` : "Establish an organizational unit for scoped documents."}
  </span>
}
    
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="sm" className="px-1" onClick={close} />
            <Button
              variant="solid"
              size="sm"
              className="px-1"
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
            onChange={(e) => { setName(e.target.value); clear("name"); }}
            placeholder="e.g. Data Science & AI Research"
            className={field}
          />
          {errors.name && <span role="alert" className={errCls}>{errors.name}</span>}
        </label>

        <label className="block">
          <span className={label}>Department Code {req}</span>
          <input
            value={code}
            maxLength={6}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""));
              clear("code");
            }}
            placeholder="e.g. AIRES"
            className={field}
          />
          {errors.code && <span role="alert" className={errCls}>{errors.code}</span>}
        </label>
            <label className="block">
              <span className={label}>Description {req}</span>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); clear("description"); }}
                rows={3}
                placeholder="One or two sentences about the team."
                className={`${field} resize-y`}
              />
              {errors.description && <span role="alert" className={errCls}>{errors.description}</span>}
            </label>

            <label className="block">
              <span className={label}>Scope {req}</span>
              <input
                value={scope}
                onChange={(e) => { setScope(e.target.value); clear("scope"); }}
                placeholder="What kinds of documents belong here"
                className={field}
              />
              {errors.scope && <span role="alert" className={errCls}>{errors.scope}</span>}
            </label>

            <div>
              <label className="block">
                <span className={label}>Color</span>
                <select value={colorKey} onChange={(e) => setColorKey(e.target.value)} className={field}>
                  {Object.keys(DEPARTMENT_COLORS).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </label>
              <label className="block">
                <span className={label}>Icon</span>
                <select value={iconKey} onChange={(e) => setIconKey(e.target.value)} className={field}>
                  {Object.keys(DEPARTMENT_ICONS).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </label>
            </div>
      </form>
    </Modal>
  );
}