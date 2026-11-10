import {
  Upload,
  UserPlus,
  Columns,
  Download,
  FileText,
  Send,
  RotateCw,
  Flame,
  UserX,
  Database ,
  X,
} from "lucide-react";
import Button from "./Button";
import DiceIcon from "../icons/DiceIcon";
import TrashLidIcon from "../icons/TrashLidIcon";

/* ==========================================================================
   Micro-Animated Icons (Respond automatically to button hover)
   ========================================================================== */

// Micro-animation: Database stacks lift slightly on hover
const AnimatedDatabaseIcon = ({ size, className = "" }) => (
  <Database
    size={size}
    className={`transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 ${className}`}
  />
);
// Download arrow dips downward into device tray
const DippingDownloadIcon = ({ size, className = "" }) => (
  <Download
    size={size}
    className={`transition-transform duration-200 ease-out group-hover:translate-y-0.5 ${className}`}
  />
);

// Paper airplane takes flight forward & upward
const FlyingSendIcon = ({ size, className = "" }) => (
  <Send
    size={size}
    className={`transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:-rotate-12 ${className}`}
  />
);

// Rewind icon spins counter-clockwise on hover
const RewindIcon = ({ size, className = "" }) => (
  <RotateCw
    size={size}
    className={`transition-transform duration-300 ease-out group-hover:-rotate-180 group-hover:scale-105 ${className}`}
  />
);


// Warning icon tilts and scales backward
const WarningUserXIcon = ({ size, className = "" }) => (
  <UserX
    size={size}
    className={`transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-12 ${className}`}
  />
);

// Dismiss / Cancel 'X' spins 90 degrees

// Bolder, punchy cross with smooth spring rotation
const SpinXIcon = ({ size, className = "" }) => (
  <X
    size={size}
    strokeWidth={2.6}
    className={`transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-90 group-hover:scale-110 ${className}`}
  />
);

/* ==========================================================================
   SECTION 1: Core Primary Actions (Most Frequently Used Across App)
   ========================================================================== */

/**
 * Primary Ingest Action (Solid Green Pill)
 * Where to use:
 *   - Documents Header (pages/DocumentsPage.jsx)
 *   - Manager Dashboard Header (components/dashboard/manager/ManagerOverview.jsx)
 *   - Global Action Bar
 */
export function IngestDocumentButton(props) {
  return (
    <Button
      variant="solid"
      icon={Upload}
      iconChip
      title="Ingest a new document into EKA knowledge base"
      {...props}
    >
      Ingest Document
    </Button>
  );
}

/**
 * Add Team Member Action (Light Pill)
 * Where to use:
 *   - Organization / Team Roster (components/dashboard/manager/ManagerTeamRoster.jsx)
 *   - User Directory Table Header (components/organization/UserDirectoryTable.jsx)
 */
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

/**
 * Compare & Redline Companion Pill (Light Pill)
 * Where to use:
 *   - Documents Header right next to Ingest button (pages/DocumentsPage.jsx)
 *   - Document Summary Header (pages/DocumentSummaryPage.jsx)
 */
export function CompareRedlineButton(props) {
  return (
    <Button
      icon={Columns}
      iconChip
      title="Compare two documents and highlight redline diffs"
      {...props}
    >
      Compare &amp; Redline
    </Button>
  );
}

/**
 * Ingestion Repository Link Button (Light Pill)
 * Where to use:
 *   - Employee & Manager Overview cards to quickly jump to repository
 */
export function IngestionLibraryButton(props) {
  return (
    <Button
      icon={FileText}
      iconChip
      title="Open the ingestion repository"
      {...props}
    >
      Ingestion Library →
    </Button>
  );
}

/* ==========================================================================
   SECTION 2: Storage & Retention Actions
   ========================================================================== */

/**
 * Export Storage / Audit CSV (Light Pill with Dark Chip Inversion on Hover)
 * Where to use:
 *   - Storage Overview Header (components/documents/admin/StorageIndicator.jsx)
 *   - Analytics Export Toolbar (components/analytics/IngestionAuditPanel.jsx)
 */
export function ExportAuditButton(props) {
  return (
    <Button
      variant="darkHover"
      icon={DippingDownloadIcon}
      iconChip
      title="Export storage audit report (CSV)"
      {...props}
    >
      Export Storage Audit
    </Button>
  );
}

/**
 * Restore Document (Emerald Green Hover with 360° Rewind Spin)
 * Where to use:
 *   - Recycle Bin Table Rows (pages/Storage.jsx)
 *   - Archived Document Details / Summary Sidebar (components/documents/summary/SummarySidebar.jsx)
 */
export function RestoreButton(props) {
  return (
    <Button
      variant="light"
      icon={RewindIcon}
      title="Restore back to active library"
      className="text-(--text-secondary) hover:border-emerald-700/50 hover:bg-emerald-700/10 hover:text-emerald-700 hover:shadow-[0_2px_8px_rgba(4,120,87,0.14)]"
      {...props}
    >
      Restore
    </Button>
  );
}

/**
 * Permanent Purge Action (Danger Soft with Flame Icon)
 * Where to use:
 *   - Recycle Bin row actions for permanent deletion
 *   - Storage Cleanup Tab actions
 */
export function PurgeButton(props) {
  return (
    <Button
      variant="dangerSoft"
      icon={Flame}
      iconChip
      title="Permanently purge from cluster"
      {...props}
    >
      Purge
    </Button>
  );
}

/* ==========================================================================
   SECTION 3: Reusable Animated Delete Actions (Spring Lifting Trash Lid)
   ========================================================================== */

/**
 * Master Delete / Trash Action Button
 * Dynamically accepts label text, title, and toast message.
 *
 * Usage:
 *   <DeleteActionButton onClick={handleDelete} toast="Thread deleted">
 *     Delete Thread
 *   </DeleteActionButton>
 */
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

/**
 * Empty Recycle Bin Action
 * Where to use: Recycle Bin Tab Header toolbar
 */
export const EmptyRecycleBinButton = (props) => (
  <DeleteActionButton
    title="Permanently delete all files from Recycle Bin"
    toast="Recycle Bin emptied successfully"
    {...props}
  >
    Empty Recycle Bin
  </DeleteActionButton>
);

/**
 * Delete Active Chat History Action
 * Where to use: Chat Sidebar & Chat History page toolbar
 */
export const DeleteActiveHistoryButton = (props) => (
  <DeleteActionButton
    title="Delete all active chat history"
    toast="Active chat history deleted"
    {...props}
  >
    Delete Active History
  </DeleteActionButton>
);

/* ==========================================================================
   SECTION 4: Modals, Form Submissions & Appearance
   ========================================================================== */

/**
 * Send Invitation Action (Solid Pill with Flying Paper Airplane)
 * Where to use: Inside InviteMemberModal.jsx and UserInviteModal.jsx
 */
export function SendInvitationButton(props) {
  return (
    <Button
      variant="solid"
      icon={FlyingSendIcon}
      title="Send the invitation email"
      {...props}
    >
      Send Invitation
    </Button>
  );
}

/**
 * Cancel / Dismiss Action (Soft Pill with 90° Spinning X)
 * Where to use: Footer of all confirmation modals and drawer sheets
 */
export function CancelButton(props) {
  return (
    <Button variant="soft" icon={SpinXIcon} title="Cancel" {...props}>
      Cancel
    </Button>
  );
}

/**
 * Remove Member Action (Danger Soft with Tilting User Warning Icon)
 * Where to use: RemoveMemberModal.jsx and User Management action menus
 */
export function RemoveFromTeamButton(props) {
  return (
    <Button
      variant="dangerSoft"
      icon={WarningUserXIcon}
      iconChip
      title="Remove this member from the team"
      {...props}
    >
      Remove from Team
    </Button>
  );
}

/**
 * Randomize Atmosphere Action (Surface Pill with Rolling Dice)
 * Where to use: Appearance Studio & Topbar Theme Randomizer
 */
export function SurpriseMeButton({ isSurprising = false, rollCount = 0, ...props }) {
  return (
    <Button
      variant="surface"
      size="md"
      title="Pick a random editorial atmosphere"
      {...props}
    >
      <DiceIcon key={rollCount} rolling={isSurprising} />
      Surprise Me
    </Button>
  );
}

/**
 * Start Vector Ingestion Action (Solid Primary Pill)
 * Where to use:
 *   - Ingestion / Document Upload Modal submit CTA (components/modals/UploadDocumentModal.jsx)
 *   - Pipeline Re-index trigger
 */
export function StartVectorIngestionButton(props) {
  return (
    <Button
      variant="solid"
      icon={AnimatedDatabaseIcon}
      iconChip
      title="Start vectorizing and embedding document into semantic store"
      {...props}
    >
      Start Vector Ingestion
    </Button>
  );
}