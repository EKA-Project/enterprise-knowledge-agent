// The pending answer: shown inside the entry while waiting for the backend.
export default function LoadingBubble() {
  return (
    <div className="ask-eka-streaming rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-5 py-4" aria-label="EKA is thinking">
      <div className="flex items-center gap-1.5 py-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] [animation-delay:300ms]" />
      </div>
    </div>
  );
}