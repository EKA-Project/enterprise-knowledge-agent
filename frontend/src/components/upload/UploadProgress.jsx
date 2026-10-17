import { AlertCircle, Check, Loader2 } from "lucide-react";
import { UPLOAD_STAGES } from "./uploadStages.js";

// Text colour for each step in the checklist (written in full so Tailwind sees them)
const STATUS_TEXT = {
  done: "text-(--status-success)",
  active: "text-(--primary)",
  failed: "text-(--status-danger)",
  pending: "text-(--text-muted)",
};

const clamp = (value) => Math.min(100, Math.max(0, value));

/**
 * phase:      "uploading" | "success" | "error"
 * stageIndex: current stage (from useUploadPipeline)
 * progress:   0-100 (from useUploadPipeline)
 */
function UploadProgress({ phase, stageIndex, progress }) {
  const isSuccess = phase === "success";
  const isError = phase === "error";
  const percent = Math.round(isSuccess ? 100 : progress);
  const current = UPLOAD_STAGES[stageIndex];

  // Headline + one-line detail change with the phase
  let headline = `Step ${stageIndex + 1} of ${UPLOAD_STAGES.length} · ${current.label}`;
  let detail = current.detail;
  if (isSuccess) {
    headline = "Ingestion complete";
    detail = "Your document is searchable and ready for questions.";
  } else if (isError) {
    headline = `Stopped during ${current.label.toLowerCase()}`;
    detail = "You can try again.";
  }

  return (
    <div className="rounded-2xl border border-(--border-subtle) bg-white p-4">
      {/* Headline + percentage */}
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-(--text-primary)">{headline}</p>
        <span className="font-mono text-xs font-semibold tabular-nums text-(--text-secondary)">
          {percent}%
        </span>
      </div>

      {/* Segmented bar: one segment per stage, width proportional to its weight */}
      <div
        role="progressbar"
        aria-label="Ingestion progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="flex gap-1.5"
      >
        {UPLOAD_STAGES.map((stage, i) => {
          const fill = isSuccess ? 100 : clamp(((progress - stage.start) / stage.weight) * 100);
          const failedHere = isError && i === stageIndex;

          let fillColor = "bg-(--primary)";
          if (isSuccess) fillColor = "bg-(--status-success)";
          if (failedHere) fillColor = "bg-(--status-danger)";

          return (
            <div
              key={stage.id}
              style={{ flexGrow: stage.weight }}
              className="h-2 basis-0 overflow-hidden rounded-full bg-(--border-subtle)"
            >
              <div
                className={`h-full rounded-full transition-[width] duration-100 ease-linear ${fillColor}`}
                style={{ width: `${fill}%` }}
              />
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-(--text-muted)">{detail}</p>

      {/* Checklist: done / running / failed / waiting */}
      <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {UPLOAD_STAGES.map((stage, i) => {
          let status = "pending";
          if (isSuccess || i < stageIndex) status = "done";
          else if (i === stageIndex) status = isError ? "failed" : "active";

          return (
            <li
              key={stage.id}
              className={`flex items-center gap-1.5 text-xs font-medium ${STATUS_TEXT[status]}`}
            >
              {status === "done" && <Check size={13} strokeWidth={3} />}
              {status === "active" && (
                <Loader2 size={13} className="animate-spin motion-reduce:animate-none" />
              )}
              {status === "failed" && <AlertCircle size={13} />}
              {status === "pending" && (
                <span className="flex w-[13px] justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                </span>
              )}
              {stage.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default UploadProgress;