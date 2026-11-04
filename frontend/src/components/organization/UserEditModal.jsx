import { useRef, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";
import { ACCESS_LEVELS, getInitials } from "./OrganizationData";

const label = "text-[13.5px] font-semibold text-(--text-primary)";
const hint = "text-[11px] text-(--text-muted)";
const field =
  "mt-2 w-full rounded-xl border border-(--border-medium) bg-(--bg-surface) px-4 py-3 text-[14px] text-(--text-primary) outline-none transition focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)]";

const ROLE_OPTIONS = [
  ["Employee", "Employee (Regular Member)"],
  ["Manager", "Manager (Dept Lead)"],
  ["Admin", "Administrator (Full Organizational)"],
];
const STATUS_OPTIONS = [
  ["Active", "Active (Access Enabled)"],
  ["Suspended", "Suspended (Temporary Freeze)"],
  ["Terminated", "Terminated (Access Revoked)"],
];

export default function UserEditModal({ user, departmentNames, onClose, onSubmit }) {
  const [department, setDepartment] = useState(user.department);
  const [role, setRole] = useState(user.role);
  const [access, setAccess] = useState(user.access);
  const [status, setStatus] = useState(user.status);
  const closeRef = useRef(() => {});

  // A member who has not signed in yet keeps an "Invited" option until their status is changed.
  const statusOptions = user.status === "Invited" ? [["Invited", "Invited (Awaiting setup)"], ...STATUS_OPTIONS] : STATUS_OPTIONS;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ department, role, access, status });
    closeRef.current();
  };

  return (
    <Modal
      title="Edit User Account"
      subtitle="Modify editable account settings and access levels."
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" icon={null} onClick={close} />
            <Button variant="solid" size="md" type="submit" form="edit-user-form">Save Changes</Button>
          </div>
        );
      }}
    >
      <form id="edit-user-form" onSubmit={submit} className="space-y-5">
        <div className="flex items-center gap-3 rounded-xl border border-(--border-subtle) bg-(--bg-surface-subtle) px-4 py-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#dcf1ec] text-[12px] font-bold text-[#2b8aa0]">
            {getInitials(user.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-(--text-primary)">{user.name} (Read-only)</p>
            <p className="truncate text-[12px] text-(--text-muted)">{user.email}</p>
          </div>
        </div>

        <label className="block">
          <span className={label}>Department</span>
          <select autoFocus value={department} onChange={(e) => setDepartment(e.target.value)} className={field}>
            {departmentNames.map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between">
            <span className={label}>Role</span>
            <span className={hint}>(Defines administrative privileges)</span>
          </span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={field}>
            {ROLE_OPTIONS.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between">
            <span className={label}>Access Level</span>
            <span className={hint}>(Basic, Restricted, Admin)</span>
          </span>
          <select value={access} onChange={(e) => setAccess(e.target.value)} className={field}>
            {ACCESS_LEVELS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>

        <label className="block">
          <span className={label}>Account Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={field}>
            {statusOptions.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
          </select>
        </label>
      </form>
    </Modal>
  );
}