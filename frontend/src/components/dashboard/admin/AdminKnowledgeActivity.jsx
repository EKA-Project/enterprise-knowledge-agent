import {
  ShieldCheck,
  FileCheck,
  MessageCircle,
} from "lucide-react";
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
    <section className="flex flex-col gap-3.5 rounded-(--radius-lg) border border-(--border-subtle) bg-(--bg-surface) p-5 shadow-(--shadow-sm)">
      {knowledgeActivity.map((activity, index) => {
        const Icon = activityIcons[activity.type];

        return (
          <div
            key={activity.type}
            className={`flex items-start gap-3.5 border-b border-(--border-subtle) pb-3.5 ${
              index === knowledgeActivity.length - 1
                ? "border-b-0 pb-0"
                : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-sm) ${
                activityStyles[activity.type]
              }`}
            >
              <Icon size={14} strokeWidth={2} />
            </div>

            <div>
              <strong className="block text-[0.88rem] font-bold text-(--text-primary)">
                {activity.title}
              </strong>

              <span className="text-[0.76rem] text-(--text-muted)">
                {activity.meta}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default AdminKnowledgeActivity;