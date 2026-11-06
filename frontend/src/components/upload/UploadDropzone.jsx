import { useRef, useState } from "react";
import { AlertCircle, RefreshCw, Upload, X } from "lucide-react";
import Button from "../common/Button.jsx";
import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_LABEL,
  FILE_INPUT_ACCEPT,
  MAX_FILE_SIZE_MB,
} from "./uploadConstants.js";
import {
  formatFileSize,
  getFileExtension,
  validateFile,
} from "./fileValidation.js";

/* ==========================================================================
   FileCard (internal): what the zone turns into once a file is selected
   ========================================================================== */
function FileCard({ file, locked, isDragging, onReplace, onRemove }) {
  // "report.pdf" -> "PDF". Used for the label and the colour tokens.
  const format = ACCEPTED_EXTENSIONS[getFileExtension(file.name)] ?? "TXT";
  const key = format.toLowerCase(); // "pdf" -> --doc-pdf-bg, --doc-pdf-color, ...

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border bg-white p-3 transition-shadow ${
        isDragging
          ? "border-(--primary) shadow-[0_0_0_4px_var(--primary-glow)]"
          : "border-(--border-medium)"
      }`}
    >
      {/* Format chip. Inline style because the token name is built at runtime
          (Tailwind can only see class names that are written out in full). */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-mono text-[0.65rem] font-bold"
        style={{
          background: `var(--doc-${key}-bg)`,
          color: `var(--doc-${key}-color)`,
          borderColor: `var(--doc-${key}-border)`,
        }}
      >
        {format}
      </div>

      {/* Name + size. min-w-0 is what lets a long name truncate instead of overflowing. */}
      <div className="min-w-0 flex-1">
        <p
          className="truncate text-sm font-semibold text-(--text-primary)"
          title={file.name}
        >
          {file.name}
        </p>
        <p className="text-xs text-(--text-muted)">{formatFileSize(file.size)}</p>
      </div>

      {/* Hidden while uploading/done: the file can't change at that point */}
      {!locked && (
        <>
          <Button variant="soft" icon={RefreshCw} onClick={onReplace}>
            Replace
          </Button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${file.name}`}
            title="Remove file"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--border-subtle) bg-white text-(--text-secondary) transition-colors hover:border-[#fca5a5] hover:bg-[#fee2e2] hover:text-(--status-danger)"
          >
            <X size={15} />
          </button>
        </>
      )}
    </div>
  );
}

/* ==========================================================================
   UploadDropzone
   --------------------------------------------------------------------------
   file?:         File | null    the selected file (owned by the modal)
   error?:        string | null  message to show under the zone
   locked?:       boolean        true while uploading / after success
   onSelect:      (file) => void           only called for VALID files
   onReject:      ({ code, message }) => void   code: "type" | "size" | "empty"
   onRemove:      () => void
   onDragChange?: (isDragging) => void     lets the modal react (e.g. mascot)
   ========================================================================== */
function UploadDropzone({
  file = null,
  error = null,
  locked = false,
  onSelect,
  onReject,
  onRemove,
  onDragChange,
}) {
  const inputRef = useRef(null);
  const dragDepth = useRef(0); // see handleDragEnter below
  const [isDragging, setIsDragging] = useState(false);

  // One place that updates the flag AND tells the modal
  const updateDragging = (value) => {
    setIsDragging(value);
    onDragChange?.(value);
  };

  // Validate, then report the outcome. Used by both drop and click-to-browse.
  const handleFile = (candidate) => {
    if (!candidate) return;
    const result = validateFile(candidate);
    if (result.ok) {
      onSelect(candidate);
    } else {
      onReject({ code: result.code, message: result.message });
    }
  };

  // Ignore drags that aren't files (e.g. someone dragging selected text)
  const carriesFiles = (event) => event.dataTransfer?.types?.includes("Files");

  // dragenter/dragleave also fire when the pointer crosses child elements
  // (icon, text...), which would make the highlight flicker. Counting enters
  // and leaves fixes it: we're only "outside" when the count returns to 0.
  const handleDragEnter = (event) => {
    if (locked || !carriesFiles(event)) return;
    event.preventDefault();
    dragDepth.current += 1;
    updateDragging(true);
  };

  const handleDragOver = (event) => {
    if (locked || !carriesFiles(event)) return;
    event.preventDefault(); // required, otherwise the browser refuses the drop
  };

  const handleDragLeave = (event) => {
    if (locked || !carriesFiles(event)) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) updateDragging(false);
  };

  const handleDrop = (event) => {
    if (locked || !carriesFiles(event)) return;
    event.preventDefault(); // stops the browser from opening the file
    dragDepth.current = 0;
    updateDragging(false);
    handleFile(event.dataTransfer.files[0]); // single-file: extras are ignored
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files[0]);
    event.target.value = ""; // so picking the SAME file again still fires onChange
  };

  const openPicker = () => inputRef.current?.click();

  // Zone look: dragging > error > normal
  const zoneStyle = isDragging
    ? "border-solid border-(--primary) bg-(--primary-light) shadow-[0_0_0_4px_var(--primary-glow)]"
    : error
      ? "border-dashed border-(--status-danger)/60 bg-(--status-danger-bg)/40"
      : "border-dashed border-(--border-medium) bg-(--primary-light)/60 hover:border-(--primary) hover:bg-(--primary-light)";

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* The real file input stays hidden; the zone/Replace button open it */}
      <input
        ref={inputRef}
        type="file"
        accept={FILE_INPUT_ACCEPT}
        onChange={handleInputChange}
        className="hidden"
        tabIndex={-1}
      />

      {file ? (
        <FileCard
          file={file}
          locked={locked}
          isDragging={isDragging}
          onReplace={openPicker}
          onRemove={onRemove}
        />
      ) : (
        // A real <button>: focusable, and Enter/Space open the picker for free
        <button
          type="button"
          onClick={openPicker}
          disabled={locked}
          className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 px-4 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary) disabled:cursor-not-allowed ${zoneStyle}`}
        >
          <Upload
            size={28}
            strokeWidth={1.75}
            className={`text-(--primary) transition-transform duration-200 ${
              isDragging ? "-translate-y-1 scale-110" : ""
            }`}
          />
          <span className="font-serif text-sm font-bold text-(--text-primary)">
            {isDragging ? "Drop to attach" : "Drop file here or click to browse"}
          </span>
          <span className="text-xs text-(--text-muted)">
            {ACCEPTED_LABEL} (up to {MAX_FILE_SIZE_MB}MB)
          </span>
        </button>
      )}

      {/* Rejection message. Appears under the zone OR under the card. */}
      {error && (
        <p
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-(--status-danger)"
        >
          <AlertCircle size={14} className="mt-px shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default UploadDropzone;