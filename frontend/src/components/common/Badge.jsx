
function Badge({
  text,
  type = 'info',
  size = 'md',
  format,
  className = '',
  children,
}) {
  const styles = {
    success: 'bg-(--status-success-bg) text-(--status-success) border-(--status-success)',
    warning: 'bg-(--status-warning-bg) text-(--status-warning) border-(--status-warning)',
    danger: 'bg-(--status-danger-bg) text-(--status-danger) border-(--status-danger)',
    info: 'bg-(--status-info-bg) text-(--status-info) border-(--status-info)',
  };

  const docBadge = {
    PDF: 'border-(--doc-pdf-border) bg-(--doc-pdf-bg) text-(--doc-pdf-color)',
    DOC: 'border-(--doc-doc-border) bg-(--doc-doc-bg) text-(--doc-doc-color)',
    DOCX: 'border-(--doc-docx-border) bg-(--doc-docx-bg) text-(--doc-docx-color)',
    CSV: 'border-(--doc-csv-border) bg-(--doc-csv-bg) text-(--doc-csv-color)',
    MD: 'border-(--doc-md-border) bg-(--doc-md-bg) text-(--doc-md-color)',
    TXT: 'border-(--doc-txt-border) bg-(--doc-txt-bg) text-(--doc-txt-color)',
    FIG: 'border-(--doc-fig-border) bg-(--doc-fig-bg) text-(--doc-fig-color)',
  };

  const sizes = {
    sm: 'px-3 py-1 text-[10px] font-semibold',
    md: 'px-2.5 py-1.5 text-sm font-semibold',
  };

  if (format) {
    return (
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-(--radius-sm) border font-(family-name:--font-mono) text-[8px] font-bold ${
          docBadge[format] ??
          'border-(--border-subtle) bg-(--bg-surface) text-(--text-primary)'
        } ${className}`}
      >
        {children ?? format}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border ${
        styles[type] ?? styles.info
      } ${sizes[size] ?? sizes.md} ${className}`}
    >
      {children ?? text}
    </span>
  );
}

export default Badge;
