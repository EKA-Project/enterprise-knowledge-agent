import Button from "../../common/Button";
import IconBadge from "../../icons/IconBadge";
import { getCollectionIcon } from "../../icons/collectionIcons";

export default function CollectionSection({ collection, count, focused, onToggleFocus, children }) {
  return (
    <section className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface) p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h5 className="flex flex-wrap items-center gap-2.5 font-serif text-[19px] font-bold text-(--text-primary)">
            <IconBadge icon={getCollectionIcon(collection.id)} box={28} size={16} />
            {collection.label}
            <span className="rounded-full bg-(--bg-surface-subtle) px-2.5 py-0.5 font-mono text-[11px] font-medium text-(--text-secondary)">
              {count} themes
            </span>
          </h5>
          <p className="mt-1.5 text-[12.5px] text-(--text-muted)">{collection.description}</p>
        </div>
        <Button variant="surface" size="sm" onClick={onToggleFocus}>
          {focused ? "← View All" : "Focus →"}
        </Button>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}