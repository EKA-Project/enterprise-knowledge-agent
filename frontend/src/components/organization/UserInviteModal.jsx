import { useRef, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { CancelButton } from "../common/ActionButtons";
import { ACCESS_LEVELS, DEPT_SHORT_LABELS, USER_ROLES } from "./OrganizationData";

const label = "block text-[13.5px] font-semibold text-(--text-primary)";
const field =
  "mt-2 w-full rounded-xl border border-(--border-medium) bg-(--bg-surface) px-4 py-3 text-[14px] text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--border-focus) focus:bg-(--primary-light)/40 focus:shadow-[0_0_0_3px_var(--primary-glow)]";

export default function UserInviteModal({ departmentNames, existingEmails, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(departmentNames[0] ?? "");
  const [role, setRole] = useState("Employee");
  const [access, setAccess] = useState("Basic");
  const [errors, setErrors] = useState({});
  const closeRef = useRef(() => {});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!name.trim()) next.name = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Enter a valid work email.";
    else if (existingEmails.includes(email.trim().toLowerCase())) next.email = "A member with this email already exists.";
    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({ name: name.trim(), email: email.trim(), department, role, access });
    closeRef.current();
  };

  const Error = ({ text }) => (text ? <span role="alert" className="mt-1 block text-[12px] font-medium text-(--status-failure)">{text}</span> : null);

  return (
    <Modal
      title="Invite New Member"
      size="md"
      closeOnClickOutside={false}
      onClose={onClose}
      footer={(close) => {
        closeRef.current = close;
        return (
          <div className="flex justify-end gap-3">
            <CancelButton size="md" icon={null} onClick={close} />
            <Button variant="solid" size="md" type="submit" form="invite-form">Send Invitation</Button>
          </div>
        );
      }}
    >
      <form id="invite-form" onSubmit={submit} className="space-y-5" noValidate>
        <label className="block">
          <span className={label}>Full Name</span>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. David Vance" className={field} />
          <Error text={errors.name} />
        </label>

        <label className="block">
          <span className={label}>Work Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="david@company.com" className={field} />
          <Error text={errors.email} />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className={label}>Department</span>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className={field}>
              {departmentNames.map((n) => <option key={n} value={n}>{DEPT_SHORT_LABELS[n] ?? n}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={label}>Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={field}>
              {USER_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
        </div>

        <label className="block">
          <span className={label}>Access Level</span>
          <select value={access} onChange={(e) => setAccess(e.target.value)} className={field}>
            {ACCESS_LEVELS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </form>
    </Modal>
  );
}