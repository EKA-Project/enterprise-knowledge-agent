import { useState } from "react";
import { Info, Lock, Mail, UserPlus } from "lucide-react";
import Modal from "./Modal.jsx";
import { CancelButton, SendInvitationButton } from "./ActionButtons.jsx";

const FORM_ID = "invite-member-form";
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const INPUT_CLASS =
  "w-full rounded-xl border border-(--border-subtle) bg-(--bg-surface) px-3 py-2 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20";

function Field({ label, hint, htmlFor, children }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <label
          htmlFor={htmlFor}
          className="text-xs font-semibold text-(--text-secondary)"
        >
          {label}
        </label>
        {hint && (
          <span className="text-[0.65rem] text-(--text-muted)">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * department: string (the manager's own department; locked, not editable)
 * onClose: () => void
 * onInvite: ({ name, email, department }) => void
 */
function InviteMemberModal({ department, onClose, onInvite }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValid = name.trim() !== "" && EMAIL_PATTERN.test(email.trim());

  const handleSend = (close) => {
    if (!isValid) return;
    onInvite?.({ name: name.trim(), email: email.trim(), department });
    close();
  };

  return (
    <Modal
      size="md"
      onClose={onClose}
      compact
      headerClassName="bg-linear-to-b from-(--primary-light) to-(--bg-surface)"
      icon={
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-subtle) bg-white text-(--primary) shadow-sm">
          <UserPlus size={20} strokeWidth={2} />
        </div>
      }
      title={<span className="text-[1.2rem]">Invite Team Member</span>}
      subtitle={
        <span className="text-[0.7rem] font-thin">
          Add a new employee to the{" "}
          <strong className="font-black">{department}</strong> team
        </span>
      }
      footer={(close) => (
        <div className="flex items-center justify-between gap-3">
          <span className="hidden items-center gap-1.5 text-[0.7rem] text-(--text-muted) sm:inline-flex">
            <Mail size={13} aria-hidden="true" />
            Instant email dispatch
          </span>
          <div className="ml-auto flex items-center gap-2">
            <CancelButton onClick={close} />
            <SendInvitationButton
              type="submit"
              form={FORM_ID}
              disabled={!isValid}
              onClick={() => handleSend(close)}
            />
          </div>
        </div>
      )}
    >
      {/* Footer button is linked via form={FORM_ID}, so Enter in a field sends too */}
      <form
        id={FORM_ID}
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        <Field label="Full Name" hint="Required" htmlFor="invite-name">
          <input
            id="invite-name"
            type="text"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. David Vance"
            className={INPUT_CLASS}
          />
        </Field>

        <Field
          label="Work Email"
          hint="Invitation recipient"
          htmlFor="invite-email"
        >
          <input
            id="invite-email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="david@company.com"
            className={INPUT_CLASS}
          />
        </Field>

        <div>
          <Field
            label="Assigned Department"
            hint={
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 text-[0.55rem] font-semibold leading-5 text-emerald-700">
                <Lock size={10} aria-hidden="true" />
                Locked • Non-Changeable
              </span>
            }
          >
            <div
              title="Locked to your department"
              className="flex items-center justify-between rounded-xl border border-(--border-subtle) bg-(--primary-light) px-3 py-2 text-[14px] font-semibold text-(--text-primary)"
            >
              <span className="truncate">{department}</span>
              <Lock
                size={14}
                className="shrink-0 text-emerald-600"
                aria-hidden="true"
              />
            </div>
          </Field>
          <p className="mt-1.5 text-[10.5px] text-(--text-muted)">
            <span aria-hidden="true">🔒</span> As a department manager, you can
            only add members to{" "}
            <strong className="font-bold">{department}</strong>. This scope is
            non-changeable.
          </p>
        </div>

        {/* Access notice */}
        <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-[#e8fff7] px-3 py-2.5 text-xs text-(--text-secondary)">
          <Info
            size={16}
            className="mt-0.5 shrink-0 text-emerald-600"
            aria-hidden="true"
          />
          <p className="text-[11.2px]">
            <strong className="font-bold text-(--text-primary)">
              Employee Access:
            </strong>{" "}
            New members join as Employees with standard permissions for{" "}
            <strong className="font-bold text-(--text-primary)">
              {department}
            </strong>{" "}
            runbooks and resources.
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default InviteMemberModal;
