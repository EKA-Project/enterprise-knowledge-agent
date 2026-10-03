import { ShieldCheck, FileCheck, MessageCircle } from "lucide-react";
import { knowledgeActivity } from "./adminDashboardData.js";

function AdminKnowledgeActivity() {
  const activityIcons = {
    upload: ShieldCheck,
    document: FileCheck,
    question: MessageCircle,
  };

  const activityStyles = {
    upload: "bg-[#ecfdf5] text-[#10b981]",
    document: "bg-[#fff7ed] text-[#f97316]",
    question: "bg-[#f5f3ff] text-[#8b5cf6]",
  };

  return (
    <section className="flex flex-col gap-1.5 rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-4 shadow-(--shadow-sm)">
      {knowledgeActivity.map((activity, index) => {
        const Icon = activityIcons[activity.type];

        return (
          <div key={activity.title || index} className="flex flex-col">
            {/* The hover container: includes BOTH the icon and the text inside */}
            <div className="flex cursor-pointer items-center gap-3.5 rounded-2xl p-3 transition-colors duration-200 hover:bg-(--bg-surface-subtle)">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  activityStyles[activity.type]
                }`}
              >
                <Icon size={18} strokeWidth={2} />
              </div>

              <div className="min-w-0 flex-1">
                <strong className="block text-[12.76px] font-bold text-(--text-primary) leading-snug">
                  {activity.title}
                </strong>

                <span className="text-[11px] text-(--text-muted) leading-normal">
                  {activity.meta}
                </span>
              </div>
            </div>

            {/* Subtle separator line between items, completely outside the pill */}
            {index < knowledgeActivity.length - 1 && (
              <div className="mx-3 my-1 border-b border-(--border-subtle)" />
            )}
          </div>
        );
      })}
    </section>
  );
}

export default AdminKnowledgeActivity;