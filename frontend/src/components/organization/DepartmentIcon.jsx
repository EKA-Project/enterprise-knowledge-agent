import { getDepartmentTheme } from "../../config/departmentTheme.js";

// Small tinted tile with the department icon (used in the directory table).
export default function DepartmentIcon({ colorKey, iconKey }) {
  const { Icon, color, softBg, border } = getDepartmentTheme(colorKey, iconKey);
  return (
    <span
      style={{ color, background: softBg, borderColor: border }}
      className="grid size-6 shrink-0 place-items-center rounded-md border"
    >
      <Icon size={13} aria-hidden="true" />
    </span>
  );
}