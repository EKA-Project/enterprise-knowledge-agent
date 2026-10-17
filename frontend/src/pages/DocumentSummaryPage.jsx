
import DocumentInfoCard from "../components/documents/summary/DocumentInfoCard.jsx";
import { summaryDocument } from "../components/documents/summary/SummaryData.js";

export default function DocumentSummaryPage() {
  return (
    <section className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5">

      <DocumentInfoCard document={summaryDocument} />

      <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-5 sm:p-6">
        <h2 className="text-lg font-bold text-(--text-primary)">
          AI Document Summary
        </h2>

        <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
          {summaryDocument.summary}
        </p>
      </div>
    </section>
  );
}
