import { useState } from "react";
import { UserX } from "lucide-react";
import Modal from "./Modal.jsx";
import Badge from "./Badge.jsx";
import { CancelButton, RemoveFromTeamButton } from "./ActionButtons.jsx";

/* ==========================================================================
   RemoveMemberModal  (components/common/RemoveMemberModal.jsx)
   --------------------------------------------------------------------------
   Confirmation dialog for removing a member from a department team.
   The "Remove from Team" button stays disabled until the user types the
   member's full name exactly (type-to-confirm pattern).

   Layout (top to bottom):
     1. Header   -> icon tile, title, subtitle, close button  (from <Modal>)
     2. Body     -> member card, confirm prompt, scope notice, name input
     3. Footer   -> Cancel + Remove from Team buttons          (from <Modal>)

   Sizing comes from Modal.jsx:
     size="confirm"    -> max-w-[490px]
     spacing="roomy"   -> header / body / footer padding for this dialog
   ========================================================================== */

/* ---------- Helpers ---------- */

// Builds up to two initials from a full name: "Marcus Chen" -> "MC"
function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ---------- NoticeItem ----------
   One bullet row inside the "Department Scope Notice" box.
   Uses a small red dot instead of a text bullet so it aligns with the
   first line of text even when the item wraps to two lines. */
function NoticeItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      {/* Red dot bullet */}
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--status-danger)"
      />
      <span>{children}</span>
    </li>
  );
}

/**
 * member: { name, email, title, status }
 * department: string
 * onClose: () => void
 * onConfirm: (member) => void (called when "Remove from Team" is clicked)
 */
function RemoveMemberModal({ member, department, onClose, onConfirm }) {
  /* ---------- State & derived values ---------- */
  const [confirmText, setConfirmText] = useState(""); // what the user has typed
  const firstName = member.name.split(" ")[0]; // used in the notice text
  const canConfirm = confirmText.trim() === member.name; // enables the button

  // Runs on "Remove from Team" click. Guarded so it can never fire while
  // the name doesn't match. `close` plays the modal's exit animation.
  const handleConfirm = (close) => {
    if (!canConfirm) return;
    onConfirm?.(member);
    close();
  };

  return (
    <Modal
      size="confirm"
      spacing="roomy"
      onClose={onClose}
      /* ---------- Header: icon tile ---------- */
      icon={
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] border-[#fecdd3] bg-(--status-failure-bg) text-(--status-failure) shadow-[0_2px_6px_rgb(225_29_72/0.12)]">
          <UserX size={22} strokeWidth={2.2} />
        </div>
      }
      /* ---------- Header: title & subtitle ---------- */
      title="Remove Team Member"
      subtitle={
        <>
          Unassign this member from{" "}
          <strong className="font-bold">{department}</strong>
        </>
      }
      /* ---------- Footer: action buttons (do not restyle here) ---------- */
      footer={(close) => (
        <div className="flex items-center justify-end gap-2.5">
          <CancelButton onClick={close} />
          <RemoveFromTeamButton
            disabled={!canConfirm}
            onClick={() => handleConfirm(close)}
          />
        </div>
      )}
    >
      {/* ======================= BODY ======================= */}
      <div className="space-y-[17.6px]">
        {/* ---------- 1. Member card ----------
            Light-blue card: square avatar with initials, name + status
            badge, and "title • email" line. */}
        <div className="flex items-center gap-[15.2px] rounded-[14px] border-[1.5px] border-[#bae6fd] bg-[#ecf8ff] px-[18.4px] py-[15.2px]">
          {/* Avatar (44px rounded square with initials) */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-(--primary) font-mono text-[0.92rem] font-bold text-white shadow-[0_2px_6px_rgb(0_0_0/0.08)]">
            {getInitials(member.name)}
          </div>

          {/* Name, status badge, role and email */}
          <div className="min-w-0">
            {/* Name + status badge.
                The *: selectors shrink the shared <Badge> to fit this row. */}
            <p className="flex flex-wrap items-center gap-2 text-[0.9rem] font-bold text-(--text-primary)">
              {member.name}
              <span className="inline-flex *:px-[7.8px]! *:py-0.5! *:text-[0.58rem]! *:leading-none!">
                <Badge
                  text={member.status}
                  type={member.status === "Active" ? "success" : "warning"}
                />
              </span>
            </p>

            {/* Role • email (truncates if too long) */}
            <p className="mt-[3px] truncate text-[0.68rem] text-(--text-secondary)">
              {member.title} • {member.email}
            </p>
          </div>
        </div>

        {/* ---------- 2. Confirmation prompt ----------
            Plain sentence asking the user to confirm the removal. */}
        <p className="text-[0.82rem] leading-[1.55] text-(--text-secondary)">
          Are you sure you want to remove{" "}
          <strong className="font-bold text-(--text-primary)">
            {member.name}
          </strong>{" "}
          from the{" "}
          <strong className="font-bold text-(--text-primary)">
            {department}
          </strong>{" "}
          team?
        </p>

        {/* ---------- 3. Department scope notice ----------
            Soft-red warning box listing what removal does and doesn't do. */}
        <div className="rounded-xl border-[1.5px] border-[#ffbfc6] bg-[#FFF5F5] px-[18.4px] py-3">
          {/* Notice heading */}
          <p className="mb-1.5 flex items-center gap-1.5 text-[0.85rem] font-bold text-(--status-danger-light)">
            <span aria-hidden="true">⚠️</span>
            Department Scope Notice:
          </p>

          {/* Notice bullets */}
          <ul className="space-y-1 pl-0.5 text-[12px] leading-[1.55] text-(--text-secondary)">
            <NoticeItem>
              <strong className="font-bold text-(--text-primary)">
                {firstName}
              </strong>{" "}
              will be unassigned from{" "}
              <strong className="font-bold text-(--text-primary)">
                {department}
              </strong>{" "}
              roster.
            </NoticeItem>
            <NoticeItem>
              Scoped access to department runbooks and documents will be
              revoked.
            </NoticeItem>
            <NoticeItem>
              User account and history remain preserved in Organization
              Directory.
            </NoticeItem>
          </ul>
        </div>

        {/* ---------- 4. Type-to-confirm input ----------
            Label with the member's name in a mono chip, then the text field.
            The footer button unlocks only when the typed value matches. */}
        <div className="pt-0.5">
          {/* Label with name chip */}
          <label
            htmlFor="confirm-member-name"
            className="mb-1.5 block text-[0.8rem] font-semibold text-(--text-secondary)"
          >
            Type{" "}
            <code className="rounded bg-[#f1f5f9] px-[5px] py-px font-mono text-(--text-primary)">
              {member.name}
            </code>{" "}
            to confirm:
          </label>

          {/* Input (44px tall, red border + glow, auto-focused on open) */}
          <input
            id="confirm-member-name"
            type="text"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type member name exactly"
            className="h-11 w-full rounded-[10px] border-[1.5px] border-(--status-danger) bg-white px-[15.2px] text-[0.88rem] text-(--text-primary) shadow-[0_0_0_3px_rgb(225_29_72/0.15)] outline-none transition placeholder:text-slate-400"
          />
        </div>
      </div>
    </Modal>
  );
}

export default RemoveMemberModal;