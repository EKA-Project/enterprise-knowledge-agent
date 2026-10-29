import { CircleHelp, Clock, Trash2, X } from "lucide-react";
import { formatRelativeTime } from "./semanticmock";

export default function RecentSearchesPanel({ items, onSelect, onRemove, onClear }) {
  return (
    <section
      aria-label="Recent searches"
      className="ssp-rise rounded-2xl border border-(--border-medium) bg-(--bg-surface) p-5 shadow-(--shadow-sm)"
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[14px] font-bold text-(--text-primary)">
          <Clock size={14} aria-hidden="true" /> Recent searches
          <span className="rounded-full bg-[#edf4fa] px-1.5 py-0.5 font-(family-name:--font-mono) text-[10px] font-semibold text-[#607a91]">
            {items.length}
          </span>
          <CircleHelp size={12} className="text-(--text-muted)" aria-hidden="true" />
        </h3>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-(--text-muted) transition-colors duration-200 hover:text-red-500"
          >
            <Trash2 size={12} aria-hidden="true" /> Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="mt-3 text-[12px] text-(--text-muted)">No recent searches yet. Run a search to see it here.</p>
      ) : (
        <ul className="mt-3 space-y-1.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="group flex items-center rounded-lg border border-[#c8e2f3] bg-[#e0eff9] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#a9d5ef] hover:bg-[#d5eafa] hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => onSelect(item.query)}
                className="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left focus-visible:outline-2 focus-visible:outline-(--border-focus)"
              >
                <span className="shrink-0 text-[13px]" aria-hidden="true">🔍</span>
                <span className="truncate text-[12px] text-(--text-primary)">{item.query}</span>
                <span className="ml-auto shrink-0 font-(family-name:--font-mono) text-[10px] text-(--text-muted)">
                  {formatRelativeTime(item.at)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.query}`}
                className="mr-1.5 rounded p-1 text-(--text-muted) transition hover:text-(--status-danger) focus-visible:outline-2 focus-visible:outline-(--border-focus)"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}