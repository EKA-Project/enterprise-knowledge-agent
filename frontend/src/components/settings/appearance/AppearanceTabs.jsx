// Tab bar for the Appearance studio. tabs = [{ id, label, icon, count? }]
// Controlled: value = active tab id, onChange(id).
// Selection follows focus (arrow keys, Home, End), like native tabs.

// Shared with the tab panel in AppearanceSettings so aria-controls / aria-labelledby line up.
export const appearanceTabId = (id) => `appearance-tab-${id}`;
export const appearancePanelId = (id) => `appearance-panel-${id}`;

export default function AppearanceTabs({ tabs, value, onChange }) {
  const handleKeyDown = (event) => {
    const last = tabs.length - 1;
    const index = tabs.findIndex((t) => t.id === value);
    const target = {
      ArrowRight: index === last ? 0 : index + 1, // wraps around
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;

    event.preventDefault(); // stop the page from scrolling
    onChange(tabs[target].id);
    document.getElementById(appearanceTabId(tabs[target].id))?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Appearance sections"
      onKeyDown={handleKeyDown}
      className="flex w-fit max-w-full overflow-x-auto rounded-full border border-(--border-subtle) bg-(--bg-surface-subtle) p-1"
    >
      {tabs.map(({ id, label, icon: Icon, count }) => {
        const on = id === value;
        return (
          <button
            key={id}
            id={appearanceTabId(id)}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={appearancePanelId(id)}
            tabIndex={on ? 0 : -1} // only the active tab is a Tab stop
            onClick={() => onChange(id)}
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) ${
              on
                ? "bg-(--bg-surface) text-(--text-primary) shadow-(--shadow-sm)"
                : "text-(--text-secondary) hover:text-(--primary)"
            }`}
          >
            <Icon size={15} aria-hidden="true" />
            {label}
            {count !== undefined && (
              <span
                className={`rounded-full px-2 py-px font-mono text-[10.5px] font-semibold ${
                  on
                    ? "bg-(--primary-light) text-(--primary)"
                    : "bg-(--bg-surface)/60 text-(--text-muted)"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}