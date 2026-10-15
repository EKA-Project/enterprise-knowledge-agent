const states = [
  { id: 'normal', label: 'Normal' },
  { id: 'loading', label: 'Loading' },
  { id: 'empty', label: 'Empty' },
  { id: 'error', label: 'Error' },
];

// Floating bar to preview the page in each state (as in the reference design).
export default function DemoStatesBar({ value, onChange }) {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full bg-(--sidebar-bg) px-2 py-1.5 shadow-(--shadow-lg)">
      <span className="kb-mono px-2 text-[9px] uppercase tracking-[0.12em] text-white/60">Demo states:</span>
      {states.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            value === s.id ? 'bg-(--primary) text-(--primary-contrast)' : 'text-white/70 hover:text-white'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}