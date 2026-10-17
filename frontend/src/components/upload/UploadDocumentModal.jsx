import { useEffect, useId, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Info,
  Loader2,
  Lock,
  RotateCcw,
  Upload,
} from "lucide-react";
import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";
import ByteMascot from "../mascot/ByteMascot.jsx";
import { documentCategories } from "../documents/DocumentData.js";
import UploadDropzone from "./UploadDropzone.jsx";
import UploadProgress from "./UploadProgress.jsx";
import useUploadPipeline from "./useUploadPipeline.js";

/* ==========================================================================
   Constants and small helpers
   ========================================================================== */

const TITLE_MAX = 120;
const CLOSE_DELAY_MS = 2600; // how long the success state shows before closing

// One look shared by the title input and the select (matches the target pill)
const CONTROL =
  "h-9 w-full rounded-full border border-(--border-medium) bg-white px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--border-focus) focus:shadow-[0_0_0_3px_var(--primary-glow)] disabled:cursor-not-allowed disabled:bg-(--bg-surface-subtle) disabled:text-(--text-secondary)";

// Footer hint colours (written out in full so Tailwind can see them)
const HINT_TONES = {
  muted: "text-(--text-secondary)",
  success: "text-(--status-success)",
  danger: "text-(--status-danger)",
};

// validateFile error code -> Byte state
const FILE_ERROR_MASCOT = {
  type: "invalidType",
  size: "tooLarge",
  empty: "emptyFile",
};
const [rejectCount, setRejectCount] = useState(0); // lets Byte react to every rejection
// "Q4_cloud_plan.pdf" -> "Q4 cloud plan" (used to pre-fill the title)
function titleFromFilename(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/_+/g, " ")
    .trim()
    .slice(0, TITLE_MAX);
}

// The single place that decides which mascot state to show.
// Order matters: the first matching rule wins.
function getMascotState({ phase, stage, isDragging, fileError, file }) {
  if (phase === "success") return "success";
  if (phase === "error") return "failed";
  if (phase === "uploading") return stage.mascot; // sending -> chunking -> embedding
  if (isDragging) return "dragging";
  if (fileError) return FILE_ERROR_MASCOT[fileError.code] ?? "invalidType";
  if (file) return "ready";
  return "empty";
}

// TEMP stand-in for the real upload, used until the page passes its own onSubmit.
// Tip for testing: put the word "fail" in the title to see the error state.
function mockSubmit({ title }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (title.toLowerCase().includes("fail")) {
        reject(new Error("Simulated ingestion failure. Please try again."));
      } else {
        resolve();
      }
    }, 600);
  });
}

// Icon with a spin animation. Defined here (not inside the component) so it keeps
// the same identity between renders. Button passes it a `size` prop.
function SpinnerIcon(props) {
  return (
    <Loader2
      {...props}
      className="shrink-0 animate-spin motion-reduce:animate-none"
    />
  );
}

// Closes the modal (WITH its exit animation) after a delay. Renders nothing.
// Mounted only during the success state; unmounting cancels the timer.
function CloseAfter({ close, ms }) {
  useEffect(() => {
    const id = setTimeout(close, ms);
    return () => clearTimeout(id);
  }, [close, ms]);
  return null;
}

// Label row: text on the left, red * on the right (as in the target design)
function Field({ htmlFor, label, required = false, children }) {
  const Label = htmlFor ? "label" : "p"; // no input to point at -> plain text
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label
          htmlFor={htmlFor}
          className="text-[0.8rem] font-semibold text-(--text-primary)"
        >
          {label}
        </Label>
        {required && (
          <span
            aria-hidden="true"
            className="text-sm font-bold text-(--status-danger)"
          >
            *
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ==========================================================================
   UploadDocumentModal
   --------------------------------------------------------------------------
   onClose:           () => void   called after the exit animation
   onSubmit?:         (payload) => Promise   payload = { title, scope, file }
                      resolve = success, reject = failure (message is shown)
   departments?:      [{ value, label }]   default: documentCategories
   lockedDepartment?: string   fixes + disables the scope select (managers)

   Render it only while it's open ({open && <UploadDocumentModal ... />}),
   so every opening starts with a clean form.
   ========================================================================== */
function UploadDocumentModal({
  onClose,
  onSubmit = mockSubmit,
  departments = documentCategories,
  lockedDepartment = null,
}) {
  const formId = useId();
  const titleId = useId();
  const scopeId = useId();
  const hintId = useId();

  /* ---------- Form state ---------- */
  const [title, setTitle] = useState("");
  const [titleEdited, setTitleEdited] = useState(false); // typed by the user?
  const [scope, setScope] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null); // { code, message } | null
  const [isDragging, setIsDragging] = useState(false);

  const pipeline = useUploadPipeline(onSubmit);
  const { phase } = pipeline;

  /* ---------- Derived values ---------- */
  const scopeValue = lockedDepartment ?? scope;
  const busy = phase === "uploading";
  const finished = phase === "success";
  const locked = busy || finished; // fields and dropzone are frozen
  const dirty = title.trim() !== "" || file !== null; // user has something to lose

  // The first missing requirement, in form order. null means ready to submit.
  let missing = null;
  if (!title.trim()) missing = "Add a document title";
  else if (!scopeValue) missing = "Choose a department scope";
  else if (!file) missing = "Choose a file to upload";

  const canSubmit = !missing && !locked;

  const mascotState = getMascotState({
    phase,
    stage: pipeline.stage,
    isDragging,
    fileError,
    file,
  });

  // If a manager's department isn't in the list, still show it as an option
  const scopeOptions =
    !lockedDepartment || departments.some((d) => d.value === lockedDepartment)
      ? departments
      : [{ value: lockedDepartment, label: lockedDepartment }, ...departments];

  /* ---------- Handlers ---------- */

  // After a failed ingestion, any edit returns the form to normal
  const clearFailure = () => {
    if (phase === "error") pipeline.reset();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleEdited(true);
    clearFailure();
  };

  const handleScopeChange = (event) => {
    setScope(event.target.value);
    clearFailure();
  };

  const handleSelect = (picked) => {
    setFile(picked);
    setFileError(null);
    clearFailure();
    // Pre-fill the title from the filename, unless the user already typed one
    if (!titleEdited || !title.trim()) {
      setTitle(titleFromFilename(picked.name));
    }
  };

  // A rejected file never replaces a good one: we only remember the error
  const handleReject = (rejection) => {
    setFileError(rejection);
    setRejectCount((count) => count + 1);
  };

  const handleRemove = () => {
    setFile(null);
    setFileError(null);
    clearFailure();
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Enter in the title field also lands here
    if (!canSubmit) return;
    pipeline.start({ title: title.trim(), scope: scopeValue, file });
  };

  /* ---------- Footer pieces ---------- */
  let hint;
  if (phase === "uploading") {
    hint = {
      icon: SpinnerIcon,
      tone: "muted",
      text: "Ingesting… keep this window open",
    };
  } else if (phase === "success") {
    hint = { icon: Check, tone: "success", text: "Ingested! Closing…" };
  } else if (phase === "error") {
    hint = {
      icon: AlertCircle,
      tone: "danger",
      text: "Ingestion failed. You can try again.",
    };
  } else if (missing) {
    hint = { icon: Info, tone: "muted", text: missing };
  } else {
    hint = { icon: Check, tone: "success", text: "Ready to ingest" };
  }
  const HintIcon = hint.icon;

  let submitLabel = "Start Vector Ingestion";
  let submitIcon;
  if (busy) {
    submitLabel = "Ingesting…";
    submitIcon = SpinnerIcon;
  } else if (phase === "error") {
    submitLabel = "Try again";
    submitIcon = RotateCcw;
  }

  return (
    <Modal
      size="confirm"
      spacing="compact"
      onClose={onClose}
      icon={
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--border-medium) bg-(--primary-light) text-(--primary)">
          <Upload size={18} />
        </div>
      }
      title="Ingest New Enterprise Document"
      // Protect an in-flight upload, and typed work, from accidental closes
      closeOnClickOutside={!busy && !dirty}
      closeOnEsc={!busy}
      closeDisabled={busy}
      footer={(close) => (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {/* Why the button is (or isn't) enabled. aria-live announces changes. */}
          <p
            id={hintId}
            aria-live="polite"
            className={`flex min-w-0 items-center gap-1.5 text-xs font-medium ${HINT_TONES[hint.tone]}`}
          >
            <HintIcon size={15} className="shrink-0" />
            <span>{hint.text}</span>
          </p>

          <div className="ml-auto flex items-center gap-2">
            {finished ? (
              <>
                <Button variant="solid" size="md" icon={Check} onClick={close}>
                  Done
                </Button>
                <CloseAfter close={close} ms={CLOSE_DELAY_MS} />
              </>
            ) : (
              <>
                <Button
                  variant="soft"
                  size="md"
                  onClick={close}
                  disabled={busy}
                >
                  Cancel
                </Button>
                {/* type="submit" + form=... submits the form even though the
                    footer lives outside it */}
                <Button
                  type="submit"
                  form={formId}
                  variant="solid"
                  size="md"
                  icon={submitIcon}
                  disabled={!canSubmit}
                  aria-busy={busy}
                  aria-describedby={hintId}
                >
                  {submitLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    >
      {/* Byte reacts to everything below. Pokeable only while nothing is running. */}
      <ByteMascot
        state={mascotState}
        pokeable={phase === "idle"}
        frameClassName="h-32"
        imageClassName="h-20"
        replayKey={rejectCount}
      />

      <form
        id={formId}
        onSubmit={handleSubmit}
        noValidate
        className="mt-5 space-y-5"
      >
        {/* Title */}
        <Field htmlFor={titleId} label="Document Title" required>
          <input
            id={titleId}
            type="text"
            autoFocus
            autoComplete="off"
            data-1p-ignore // asks password managers not to attach their icon
            data-lpignore="true"
            aria-required="true"
            maxLength={TITLE_MAX}
            value={title}
            onChange={handleTitleChange}
            disabled={locked}
            placeholder="e.g. Q4 Cloud Migration Strategy 2026"
            className={CONTROL}
          />
        </Field>

        {/* Scope */}
        <Field
          htmlFor={scopeId}
          label="Category / Department Scope"
          required={!lockedDepartment}
        >
          <div className="relative">
            <select
              id={scopeId}
              value={scopeValue}
              onChange={handleScopeChange}
              disabled={locked || Boolean(lockedDepartment)}
              className={`${CONTROL} appearance-none pr-10`}
            >
              {!lockedDepartment && (
                <option value="" disabled>
                  Select a department…
                </option>
              )}
              {scopeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-(--text-secondary)"
            />
          </div>
          {lockedDepartment && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-(--text-muted)">
              <Lock size={12} aria-hidden="true" />
              Scoped to your assigned department
            </p>
          )}
        </Field>

        {/* File + progress */}
        <Field label="Upload File" required>
          <UploadDropzone
            file={file}
            error={fileError?.message ?? null}
            locked={locked}
            onSelect={handleSelect}
            onReject={handleReject}
            onRemove={handleRemove}
            onDragChange={setIsDragging}
          />

          {phase !== "idle" && (
            <div className="mt-3 space-y-2">
              <UploadProgress
                phase={phase}
                stageIndex={pipeline.stageIndex}
                progress={pipeline.progress}
              />
              {phase === "error" && (
                <p
                  role="alert"
                  className="flex items-start gap-1.5 text-xs font-medium text-(--status-danger)"
                >
                  <AlertCircle size={14} className="mt-px shrink-0" />
                  <span>{pipeline.error}</span>
                </p>
              )}
            </div>
          )}
        </Field>
      </form>
    </Modal>
  );
}

export default UploadDocumentModal;
