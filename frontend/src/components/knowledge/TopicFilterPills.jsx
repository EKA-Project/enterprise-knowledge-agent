// Horizontal row of topic filter pills.
// Active state is controlled by the parent (KnowledgeBasePage) so that
// other sections, like the category grid, can react to the same value.
export default function TopicFilterPills({ topics, activeTopic, onChange }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {topics.map((topic) => {
        const isActive = topic.id === activeTopic;
        return (
          <button
            key={topic.id}
            type="button"
            onClick={() => onChange(topic.id)}
            className={
              isActive
                ? 'rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-(--primary-contrast)'
                : 'rounded-full border border-(--border-medium) bg-(--bg-surface) px-4 py-2 text-xs font-semibold text-(--text-primary) hover:bg-(--bg-surface-subtle)'
            }
          >
            {topic.label}
          </button>
        );
      })}
    </div>
  );
}