import { FileText, Upload, UserPlus } from "lucide-react";
import Button from "./Button";

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
