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
                ? 'rounded-full bg-slate-900 px-4 py-0.5 text-xs font-semibold text-white'
                : 'rounded-full border border-slate-300 bg-white px-4 py-0.5 text-xs font-semibold text-slate-700 hover:bg-slate-50'
            }
          >
            {topic.label}
          </button>
        );
      })}
    </div>
  );
}