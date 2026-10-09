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
    <section className="mt-6 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-sm">
      {/* Section header */}

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CircleHelp size={20} className="shrink-0 text-(--status-danger)" />
          <h2 className="text-base font-black text-(--text-primary)">
            Frequently Asked Questions
          </h2>
        </div>

        <p className="shrink-0 text-xs text-(--text-muted)">
          Popular Company Queries
        </p>
      </div>

      {/* Frequently asked question shortcuts */}
      <div className="flex flex-col gap-3">
        {employeeFaqs.map((faq) => (
          <button
            key={faq.id}
            type="button"
            onClick={() => handleFaqClick(faq.targetQuery)}
            className="group w-full cursor-pointer rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-(--border-medium) hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary)"
          >
            <span className="block text-[0.8rem] font-bold leading-relaxed text-(--text-primary)">
              "{faq.question}"
            </span>

            <span className="mt-2 flex items-center gap-1 text-[0.67rem] font-semibold text-(--primary)">
              {faq.actionLabel}

              <ArrowRight
                size={14}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default EmployeeFaqCard;
