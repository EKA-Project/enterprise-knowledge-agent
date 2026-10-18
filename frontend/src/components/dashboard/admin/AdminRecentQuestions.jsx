import { Clock, ArrowUpRight } from "lucide-react";
import { recentQuestions } from "./adminDashboardData.js";

function AdminRecentQuestions() {
  return (
    <section className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-6 shadow-(--shadow-sm)">
      {recentQuestions.map((question) => (
        <div
          key={question.number}
          className="group mb-2 flex cursor-pointer items-center justify-between rounded-3xl border border-(--border-subtle) bg-(--bg-surface-subtle) px-4 py-3 transition-all duration-200 last:mb-0 hover:-translate-y-px hover:border-(--border-medium) hover:bg-(--bg-surface)"
        >
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="shrink-0 font-mono text-xs font-bold text-(--primary)">
              {question.number}
            </span>

            <div className="min-w-0">
              <h3 className="font-serif text-[0.85rem] font-extrabold text-(--text-primary)">
                {question.title}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-[0.76rem] text-(--text-muted)">
                <Clock size={13} strokeWidth={1.8} />
                <span>{question.meta}</span>
              </div>
            </div>
          </div>

          <ArrowUpRight
            size={17}
            strokeWidth={1.7}
            className="ml-4 shrink-0 text-(--text-muted) transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-(--primary)"
          />
        </div>
      ))}
    </section>
  );
}

export default AdminRecentQuestions;
