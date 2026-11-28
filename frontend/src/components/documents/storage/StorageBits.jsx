import { getDepartmentTheme } from '../../../config/departmentTheme.js';
import Badge from '../../common/Badge.jsx';
import '../../../styles/Document.css';

// EKA-EDIT: TypeTile takes the raw enum `format` ('pdf') and upper-cases it for Badge.
const TYPE = {
  PDF: 'bg-[#fde2e1] text-[#d9373f]',
  DOCX: 'bg-[#e3ecfc] text-[#3b6fd4]',
  CSV: 'bg-[#dcf7ea] text-[#0f9d6b]',
  MD: 'bg-[#e6e9ff] text-[#5461d6]',
  TXT: 'bg-[#eef1f4] text-[#6b7f8f]',
};

export function TypeTile({ format }) {
  const label = String(format ?? '').toUpperCase();

  return (
    <Badge
      format={label}
      className={`doc-mono !inline-flex !h-[29px] !w-[41px] !rounded-lg !border-0 !text-[10px] ${TYPE[label] ?? ''}`}
    />
  );
}

// EKA-EDIT: colors/icons now come from departmentTheme (keys), not a hardcoded name map.
// `department` = { name, colorKey, iconKey } looked up by departmentId.
export function DeptPill({ department }) {
  const { Icon, color, softBg, border } = getDepartmentTheme(
    department?.colorKey,
    department?.iconKey,
  );

  return (
    <span
      style={{ color, backgroundColor: softBg, borderColor: border }}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-semibold"
    >
      <Icon size={10} />
      {department?.name ?? 'Unknown'}
    </span>
  );
}

// EKA-EDIT: StatusPill takes the stored enum; the label is a UI map (blueprint rule 5).
const STATUS = {
  ready: {
    label: 'Ready',
    type: 'success',
    cls: 'border-[#c4ecd9] bg-[#e8f8f0] text-[#0f8f63]',
  },
  processing: {
    label: 'Processing',
    type: 'info',
    cls: 'border-[#c9def6] bg-[#eaf3fd] text-[#1f66c4]',
  },
  failed: {
    label: 'Failed',
    type: 'danger',
    cls: 'border-[#f6c4c3] bg-[#ffe9e8] text-[#d9373f]',
  },
};

export function StatusPill({ status }) {
  const meta = STATUS[status];

  return (
    <Badge
      type={meta?.type ?? 'info'}
      size="sm"
      className={`doc-mono !gap-1.5 !px-2.5 !py-1 !text-[10px] !font-bold ${meta?.cls ?? ''}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta?.label ?? status}

      {status === 'failed' && (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-current text-[8px]">
          ?
        </span>
      )}
    </Badge>
  );
}

// EKA-EDIT: DeptIcon takes the department object too.
export function DeptIcon({ department, size = 14, className }) {
  const { Icon } = getDepartmentTheme(department?.colorKey, department?.iconKey);
  return <Icon size={size} className={className} />;
}