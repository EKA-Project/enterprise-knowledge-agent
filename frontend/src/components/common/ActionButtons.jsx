import React from "react";
import {
  FileText,
  Send,
  Upload,
  UserPlus,
  UserX,
  X,
  Columns,
  Download,
  RotateCw,
  Flame,
} from "lucide-react";
import Button from "./Button";
import DiceIcon from "../icons/DiceIcon";
import TrashLidIcon from "../icons/TrashLidIcon";

/* ==========================================================================
   Core Team & Document Action Buttons
   ========================================================================== */

export function AddMemberButton(props) {
  return (
    <Button icon={UserPlus} iconChip title="Add department team member" {...props}>
      Add Member
    </Button>
  );
}

export function IngestDocumentButton(props) {
  return (
    <Button variant="solid" icon={Upload} iconChip title="Ingest a new document" {...props}>
      Ingest Document
    </Button>
  );
}

export function IngestionLibraryButton(props) {
  return (
    <Button icon={FileText} iconChip title="Open the ingestion library" {...props}>
      Ingestion Library →
    </Button>
  );
}

export function SendInvitationButton(props) {
  return (
    <Button variant="solid" icon={Send} title="Send the invitation email" {...props}>
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
    <Button variant="dangerSoft" icon={UserX} title="Remove this member from the team" {...props}>
      Remove from Team
    </Button>
  );
}

export function SurpriseMeButton({ isSurprising = false, rollCount = 0, ...props }) {
  return (
    <Button variant="surface" size="md" title="Pick a random atmosphere" {...props}>
      <DiceIcon key={rollCount} rolling={isSurprising} />
      Surprise Me
    </Button>
  );
}

/* ==========================================================================
   Dynamic Animated Delete Button (Reusable with Custom Label & Toasts)
   ========================================================================== */

export function DeleteActionButton({
  children = "Delete",
  title = "Delete item",
  toast = null,
  onToast,
  onClick,
  ...props
}) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (toast && onToast) onToast(toast);
  };

  return (
    <Button
      variant="dangerSoft"
      icon={TrashLidIcon}
      iconChip
      title={title}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}

// 1-Line Convenience Aliases
export const DeleteActiveHistoryButton = (props) => (
  <DeleteActionButton
    title="Delete all active chat history"
    toast="Active history deleted"
    {...props}
  >
    Delete Active History
  </DeleteActionButton>
);

export const EmptyRecycleBinButton = (props) => (
  <DeleteActionButton
    title="Permanently delete all files from Recycle Bin"
    toast="Recycle Bin emptied"
    {...props}
  >
    Empty Recycle Bin
  </DeleteActionButton>
);

/* ==========================================================================
   Additional EKA Companion Buttons
   ========================================================================== */

// Export Storage Audit / CSV (Storage & Users pages)
export function ExportAuditButton(props) {
  return (
    <Button icon={Download} iconChip title="Export storage audit report (CSV)" {...props}>
      Export Storage Audit
    </Button>
  );
}

// Restore Button (Recycle Bin / Archived items)
export function RestoreButton(props) {
  return (
    <Button
      variant="light"
      icon={RotateCw}
      title="Restore back to active library"
      className="hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50"
      {...props}
    >
      Restore
    </Button>
  );
}

// Purge Button (Hard permanent delete in Storage)
export function PurgeButton(props) {
  return (
    <Button variant="dangerSoft" icon={Flame} iconChip title="Permanently purge from cluster" {...props}>
      Purge
    </Button>
  );
}