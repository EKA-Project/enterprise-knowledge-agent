import { useNavigate } from "react-router-dom";
import { CircleHelp, ArrowRight } from "lucide-react";

import { employeeFaqs } from "./employeeDashboardData.js";

function EmployeeFaqCard() {
  const navigate = useNavigate();

  // Open Ask EKA with the selected question.
  const handleFaqClick = (targetQuery) => {
    navigate("/ask-eka", {
      state: { query: targetQuery },
    });
  };

  return (
    <section className="flex h-full flex-col rounded-[16px] border border-(--border-subtle) bg-(--bg-surface) p-[1.5rem_1.75rem] shadow-(--shadow-sm)">
      {/* Section header */}
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-(--border-subtle) pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 font-sans text-[1rem] font-bold text-(--text-primary)">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#fef2f2] text-(--status-danger)"
            >
              <CircleHelp size={14} />
            </span>
            Frequently Asked Questions
          </h2>

          <p className="mt-[0.3rem] text-[0.75rem] text-(--text-muted)">
            Popular company queries, one click from an answer in Ask EKA.
          </p>
        </div>
      </div>

      {/* FAQ shortcuts (fills the remaining height so cards match in a grid) */}
      <div className="flex flex-1 flex-col gap-3">
        {employeeFaqs.map((faq) => (
          <button
            key={faq.id}
            type="button"
            onClick={() => handleFaqClick(faq.targetQuery)}
            className="group/card relative flex w-full flex-1 cursor-pointer items-center gap-3.5 overflow-hidden rounded-[14px] border border-(--border-subtle) bg-(--bg-surface) px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-(--doc-doc-border) hover:shadow-(--shadow-md) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary)"
          >
            {/* Left accent that appears on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-(--primary) transition-transform duration-200 group-hover/card:scale-y-100"
            />

            {/* Question and action label */}
            <div className="min-w-0 flex-1">
              <h3 className="text-[0.8rem] font-semibold leading-snug text-(--text-primary) transition-colors duration-150 group-hover/card:text-(--primary)">
                "{faq.question}"
              </h3>

              <p className="mt-1 text-[0.7rem] font-semibold text-(--primary)">
                {faq.actionLabel}
              </p>
            </div>

            {/* Arrow */}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="shrink-0 text-(--text-muted) transition-all duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-(--primary)"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default EmployeeFaqCard;