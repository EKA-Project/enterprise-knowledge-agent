import { FileText, BookOpen, Share2 } from 'lucide-react';

export const SUMMARY_TABS = [
  { key: 'summary', label: 'AI Document Summary', Icon: FileText },
  { key: 'reader', label: 'Original Document Reader', Icon: BookOpen },
  { key: 'graph', label: 'Connected Knowledge Graph', Icon: Share2 },
];

function SummaryTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      className="flex items-center gap-1 overflow-x-auto rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-1.5"
    >
      {SUMMARY_TABS.map(({ key, label, Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-(--primary) text-(--primary-contrast) shadow-(--shadow-md)'
                : 'text-(--text-muted) hover:text-(--text-primary)'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default SummaryTabs;