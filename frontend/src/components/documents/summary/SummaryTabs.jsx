import { FileText, BookOpen, Share2 } from 'lucide-react';

const tabs = [
  { key: 'summary', label: 'AI Document Summary', icon: FileText },
  { key: 'reader', label: 'Original Document Reader', icon: BookOpen },
  { key: 'graph', label: 'Connected Knowledge Graph', icon: Share2 },
];

// Tab bar (Oct-20 video): light-blue bar, dark-green active pill.
function SummaryTabs({ active, onChange }) {
  return (
    <div role="tablist" className="flex flex-wrap items-center gap-1 rounded-full bg-[#e2eef9] p-1.5">
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={active === key}
          onClick={() => onChange(key)}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            active === key
              ? 'bg-[#153830] text-white'
              : 'text-(--text-primary) hover:bg-white/60'
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