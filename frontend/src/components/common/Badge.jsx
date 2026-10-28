/**
 * text: string (the label)
 * type?: "success" | "warning" | "danger" | "info" (default "info")
 * size?: "sm" | "md" (default "md")
 */
function Badge({ text, type = "info", size = "md" }) {
  const styles = {
    success: {
      bg: "bg-(--status-success-bg)",
      text: "text-(--status-success)",
      border: "border-(--status-success)",
    },
    warning: {
      bg: "bg-(--status-warning-bg)",
      text: "text-(--status-warning)",
      border: "border-(--status-warning)",
    },
    danger: {
      bg: "bg-(--status-danger-bg)",
      text: "text-(--status-danger)",
      border: "border-(--status-danger)",
    },
    info: {
      bg: "bg-(--status-info-bg)",
      text: "text-(--status-info)",
      border: "border-(--status-info)",
    },
  };

  const sizes = {
    sm: "px-2 py-1 text-[0.68rem] font-semibold",
    md: "px-2.5 py-1.5 text-sm font-semibold",
  };

  const style = styles[type] || styles.info;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex items-center rounded-full border ${style.bg} ${style.text} ${style.border} ${sizeClass}`}
    >
      {text}
    </span>
  );
}

export default Badge;