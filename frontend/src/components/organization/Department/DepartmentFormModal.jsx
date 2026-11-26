import { useRef, useState } from "react";
import { Building2, Check, Pencil } from "lucide-react";
import Modal from "../../common/Modal.jsx";
import Button from "../../common/Button.jsx";
import { CancelButton } from "../../common/ActionButtons.jsx";
import { DEPARTMENT_COLORS, DEPARTMENT_ICONS, getDepartmentTheme } from "../../../config/departmentTheme.js";

const label = "block text-[0.8rem] font-semibold text-(--text-primary)";
const field =
  "mt-1.5 w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3.5 py-2 text-[13px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";
const req = <span className="text-(--status-failure)">*</span>;
const errCls = "mt-1 block text-[12px] font-medium text-(--status-failure)";

// A numbered, tinted card for each part of the form
function Section({ number, title, aside, children }) {
  return (
    <section className="rounded-2xl border border-(--border-subtle) bg-(--primary-light) p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-(--text-eyebrow)">
          {number}. {title}
        </h3>
        {aside && <span className="font-mono text-[0.6rem] text-(--text-muted)">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

// Reads a department colour's hex from the theme (no hard-coded hex values)
const hexOf = (key) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--dept-${key}`).trim().toUpperCase();

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
    // Live preview data: the same resolver the department cards use
  const { Icon: PreviewIcon, color, softBg, border } = getDepartmentTheme(colorKey, iconKey);
  const iconKeys = Object.keys(DEPARTMENT_ICONS);
  const colorKeys = Object.keys(DEPARTMENT_COLORS);
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
      icon={
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-subtle) bg-(--bg-surface) text-(--primary) shadow-sm">
          {editing ? <Pencil size={18} /> : <Building2 size={18} />}
        </div>
      }
      title={editing ? "Edit Department" : "Create New Department"}
      subtitle={
        editing
          ? "Update department details, visual branding theme, and management scope."
          : "Establish an organizational unit for scoped documents."
      }
    
      size="lg"
      spacing="compact"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton onClick={close} />
            <Button
              variant="solid"
              size="sm"
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
      <form id="department-form" onSubmit={submit} className="space-y-3">
        <Section number={1} title="Department Identity">
          <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
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
          </div>
        </Section>
        <Section number={2} title="Visual Branding & Theme" aside="Icon + Accent Color">
          {/* Live preview: updates as you pick an icon or colour */}
          <div className="flex items-center gap-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-3">
            <span
              style={{ color, background: softBg, borderColor: border }}
              className="grid size-10 shrink-0 place-items-center rounded-xl border"
            >
              <PreviewIcon size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold text-(--text-primary)">
                {name.trim() || "Department name"}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-(--text-muted)">
                <span className="rounded-md border border-(--badge-border) bg-(--badge-bg) px-1.5 font-mono text-[10px] font-bold text-(--text-secondary)">
                  {code || "CODE"}
                </span>
                Live Preview
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] uppercase tracking-wider text-(--text-muted)">Theme</p>
              <p className="font-mono text-[12px] font-bold text-(--text-primary)">{hexOf(colorKey)}</p>
            </div>
          </div>

          {/* Icon grid */}
          <p className={`${label} mt-4`}>Department Icon</p>
          <div
            role="radiogroup"
            aria-label="Department icon"
            className="mt-2 grid max-h-[132px] grid-cols-7 gap-2 overflow-y-auto pr-1"
          >
            {iconKeys.map((k) => {
              const Ico = DEPARTMENT_ICONS[k];
              const selected = k === iconKey;
              return (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  title={k}
                  onClick={() => setIconKey(k)}
                  className={`flex cursor-pointer flex-col items-center gap-0.5 rounded-lg border px-1 py-1.5 text-[9px] font-semibold transition hover:-translate-y-0.5 ${
                    selected
                      ? "border-(--primary) bg-(--primary-light) text-(--primary)"
                      : "border-(--border-subtle) bg-(--bg-surface) text-(--text-muted) hover:border-(--primary) hover:text-(--primary)"
                  }`}
                >
                  <Ico size={16} />
                  <span className="w-full truncate text-center">{k}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 flex justify-between text-[10.5px] text-(--text-muted)">
            <span>Select official department vector glyph</span>
            <span>{iconKeys.length} curated icons</span>
          </p>

          {/* Accent colour swatches */}
          <p className={`${label} mt-3`}>Department Accent Color</p>
          <div role="radiogroup"
            aria-label="Department accent color"
            className="mt-2 grid grid-cols-6 gap-1.5 sm:grid-cols-11">
            {colorKeys.map((k) => {
              const selected = k === colorKey;
              return (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={k}
                  title={`${k} (${hexOf(k)})`}
                  onClick={() => setColorKey(k)}
                  style={{ background: DEPARTMENT_COLORS[k] }}
                  className={`grid size-6 cursor-pointer place-items-center rounded-full text-(--primary-contrast) transition hover:scale-110 ${
                    selected ? "ring-2 ring-(--text-primary) ring-offset-2 ring-offset-(--primary-light)" : ""
                  }`}
                >
                  {selected && <Check size={12} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </Section>

        <Section number={3} title="Governance & Scope">
          <div className="space-y-4">
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
          </div>
        </Section>
      </form>
    </Modal>
  );
}