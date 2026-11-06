
import { FileText, BookOpen, Share2 } from 'lucide-react';

const tabs = [
  { key: 'summary', label: 'AI Document Summary', icon: FileText },
  { key: 'reader', label: 'Original Document Reader', icon: BookOpen },
  { key: 'graph', label: 'Connected Knowledge Graph', icon: Share2 },
];

// Tab bar with theme-aware active and inactive states.
function SummaryTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      className="flex flex-wrap items-center gap-1 rounded-full bg-(--bg-surface-subtle) p-1.5"
    >
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={active === key}
          onClick={() => onChange(key)}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            active === key
              ? 'bg-(--primary) text-(--primary-contrast)'
              : 'text-(--text-primary) hover:bg-(--bg-surface)'
          }`}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default SummaryTabs;
