// Four summary tiles shown under the hero.
function KnowledgeStats({ stats }) {
  return (
    <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="rounded-2xl bg-(--bg-surface) px-5 py-4 shadow-(--shadow-sm)"
        >
          <p className="kb-mono text-[10px] uppercase tracking-[0.12em] text-(--text-muted)">
            {stat.label}
          </p>
          <div className="mt-1 flex items-end justify-between">
            <span
              className={`kb-serif text-2xl font-bold ${
                stat.highlight ? 'text-(--primary)' : 'text-(--text-primary)'
              }`}
            >
              {stat.value}
            </span>
            <span className="text-[11px] text-(--text-muted)">{stat.caption}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default KnowledgeStats;