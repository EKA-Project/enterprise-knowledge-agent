import { Code2, FileText, Landmark, Palette, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import '../../../styles/Document.css';

const TYPE = {
  PDF: 'bg-[#fde2e1] text-[#d9373f]',
  DOCX: 'bg-[#e3ecfc] text-[#3b6fd4]',
  CSV: 'bg-[#dcf7ea] text-[#0f9d6b]',
  MD: 'bg-[#e6e9ff] text-[#5461d6]',
  TXT: 'bg-[#eef1f4] text-[#6b7f8f]',
};

export function TypeTile({ type }) {
  return (
    <span className={`doc-mono inline-flex h-[29px] w-[41px] shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${TYPE[type]}`}>
      {type}
    </span>
  );
}

const DEPT = {
  'Security & Compliance': [ShieldCheck, 'border-[#f6c9c8] bg-[#fff0ef] text-[#d9373f]'],
  'Engineering & DevOps': [Code2, 'border-[#c9def6] bg-[#eaf3fd] text-[#1f66c4]'],
  'Sales & Go-To-Market': [TrendingUp, 'border-[#f7d9b4] bg-[#fff3e4] text-[#c76a0b]'],
  'General Knowledge': [Landmark, 'border-[#dccaf5] bg-[#f4ecfd] text-[#7e3fd0]'],
  'Legal & Finance': [FileText, 'border-[#bfe3f3] bg-[#e6f5fb] text-[#1b79a8]'],
  'People & HR Operations': [Users, 'border-[#bfe9d4] bg-[#e8f8f0] text-[#0f8f63]'],
  'Product Strategy & Design': [Palette, 'border-[#e6c9f2] bg-[#f8ebfc] text-[#a43fc9]'],
};

export function DeptPill({ name }) {
  const [Icon, cls] = DEPT[name] ?? DEPT['General Knowledge'];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[12px] font-semibold ${cls}`}>
      <Icon size={12} />
      {name}
    </span>
  );
}

const STATUS = {
  Ready: 'border-[#c4ecd9] bg-[#e8f8f0] text-[#0f8f63]',
  Outdated: 'border-[#f7dfa8] bg-[#fff5dc] text-[#c27a00]',
  Failed: 'border-[#f6c4c3] bg-[#ffe9e8] text-[#d9373f]',
};

export function StatusPill({ status }) {
  return (
    <span className={`doc-mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${STATUS[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
      {status === 'Failed' && (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-current text-[8px]">?</span>
      )}
    </span>
  );
}