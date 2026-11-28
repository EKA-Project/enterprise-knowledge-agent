// EKA-EDIT: new file. Turns raw getStorageSummary() into the cards/bar items (derived, never stored).
// key = departmentId or format enum, so the card filter can go straight to getSuggestions.
import { getDepartmentTheme } from '../../../config/departmentTheme.js';
import { FORMAT_META } from '../../../config/storageConfig.js';

export function buildAllocation(summary, departmentsById, mode) {
  if (!summary) return [];
  const used = summary.usedBytes || 0;
  const share = (b) => (used > 0 ? Number(((b / used) * 100).toFixed(1)) : 0);

  const items =
    mode === 'dept'
      ? summary.byDepartment.map((r) => {
          const dep = departmentsById.get(r.departmentId);
          const { color, softBg, Icon } = getDepartmentTheme(dep?.colorKey, dep?.iconKey);
          return {
            key: r.departmentId,
            name: dep?.name ?? 'Unknown',
            count: r.documentCount,
            sizeBytes: r.sizeBytes,
            share: share(r.sizeBytes),
            color, softBg, Icon, department: dep,
          };
        })
      : summary.byFormat.map((r) => ({
          key: r.format,
          name: FORMAT_META[r.format]?.label ?? r.format.toUpperCase(),
          count: r.fileCount,
          sizeBytes: r.sizeBytes,
          share: share(r.sizeBytes),
          color: FORMAT_META[r.format]?.color ?? '#6b7f8f',
          softBg: `color-mix(in srgb, ${FORMAT_META[r.format]?.color ?? '#6b7f8f'} 14%, transparent)`,
        }));

  return items.sort((a, b) => b.sizeBytes - a.sizeBytes);
}