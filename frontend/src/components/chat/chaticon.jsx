const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};
// ↑ Shared SVG settings used by every icon.

export const DocIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </svg>
);
// ↑ Document icon. Used by the page header, CitationPill and ChatInput.

export const ClockIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);
// ↑ History icon. Used by the Toggle History button.

export const ReturnIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 5v6a3 3 0 0 1-3 3H5" />
    <path d="m9 10-4 4 4 4" />
  </svg>
);
// ↑ Enter-key icon. Used by the "send" hint in ChatInput.