import { useState } from "react";
import { FileText, Send, Upload, UserPlus, UserX, X } from "lucide-react";
import Button from "./Button";
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

export function SurpriseMeButton({ onClick, ...props }) {
  // Each click changes the icon's key, so the spin restarts even on rapid clicks.
  const [rolls, setRolls] = useState(0);
  return (
    <Button
      variant="surface"
      size="md"
      title="Pick a random atmosphere"
      onClick={(e) => {
        setRolls((n) => n + 1);
        onClick?.(e);
      }}
      {...props}
    >
      <DiceIcon key={rolls} rolling={rolls > 0} />
      Surprise Me
    </Button>
  );
}
