import { FileText, Send, Upload, UserPlus, UserX, X } from "lucide-react";
import Button from "./Button";
import '../../styles/Document.css';
import DiceIcon from "../icons/DiceIcon";

/* ==========================================================================
   ActionButtons  (components/common/ActionButtons.jsx)
   --------------------------------------------------------------------------
   Named buttons for actions that appear in more than one place. Each one
   fixes its own label, icon, colour scheme and tooltip, so a page just does:

       <AddMemberButton onClick={handleAdd} />

   Every button forwards its props to <Button>, so a page can still override
   anything (onClick, title, size, disabled, ...).

   To add a new one, copy a block below and change the label, icon, variant.
   Anything used on only one page can just use <Button> directly instead.
   ========================================================================== */

export function AddMemberButton(props) {
  return (
    <Button
      icon={UserPlus}
      iconChip
      title="Add department team member"
      {...props}
    >
      Add Member
    </Button>
  );
}

export function IngestDocumentButton(props) {
  return (
    <Button
      variant="solid"
      icon={Upload}
      iconChip
      title="Ingest a new document"
      {...props}
    >
      Ingest Document
    </Button>
  );
}

export function IngestionLibraryButton(props) {
  return (
    <Button
      icon={FileText}
      iconChip
      title="Open the ingestion library"
      {...props}
    >
      Ingestion Library →
    </Button>
  );
}

export function SendInvitationButton(props) {
  return (
    <Button
      variant="solid"
      icon={Send}
      title="Send the invitation email"
      {...props}
    >
      Send Invitation
    </Button>
  );
}

export function CancelButton(props) {
  return (
    <Button variant="soft" icon={X} title="Cancel" {...props}>
      Cancel
    </Button>
  );
}

export function RemoveFromTeamButton(props) {
  return (
    <Button
      variant="dangerSoft"
      icon={UserX}
      title="Remove this member from the team"
      {...props}
    >
      Remove from Team
    </Button>
  );
}


/**
 * Animated trash can (lid lifts from its left hinge, icon tilts).
 * size?: number (px, default 24)
 * spark?: boolean (fixed "+" beside the icon, does NOT move with the lid)
 * open?: boolean (force the lid open, e.g. right after a delete)
 * Hover: put the class "bin-group" on any parent (the card, button or circle)
 * and the lid lifts while that parent is hovered.
 */
export default function AnimatedBin({ size = 24, spark = false, open = false, className = '' }) {
  return (
    <span
      className={`relative inline-flex shrink-0 ${open ? 'bin-open' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="bin-svg overflow-visible"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="bin-lid">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </g>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>

      {spark && (
        <svg
          className="absolute"
          style={{ left: size * 0.75, top: -size * 0.125, width: size / 4, height: size / 4 }}
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M6.5 1.5v4M4.5 3.5h4" />
          <circle cx="3" cy="5.5" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      )}
    </span>
  );
}
export function SurpriseMeButton({ isSurprising = false, rollCount = 0, ...props }) {
  // The spin state comes from SurpriseContext; the key restarts it on rapid clicks.
  return (
    <Button
      variant="surface"
      size="md"
      title="Pick a random atmosphere"
      {...props}
    >
      <DiceIcon key={rollCount} rolling={isSurprising} />
      Surprise Me
    </Button>
  );
}
