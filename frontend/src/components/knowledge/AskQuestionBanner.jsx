import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Bottom guidance banner of the Knowledge Base page.
// Props are optional so the default copy matches the reference design.
export default function AskQuestionBanner({
  eyebrow = 'A good place to begin',
  title = 'Not sure where to look?',
  description = 'Ask EKA in plain language and it will point you to the source, not just the summary.',
  actionLabel = 'Ask a question',
  to = '/ask-eka',
}) {
  return (
    <section className="mt-8 flex flex-col gap-4 rounded-3xl bg-(--banner-bg) px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
      <div className="min-w-0">
        <p className="kb-mono text-[9px] font-medium uppercase tracking-[0.14em] text-(--banner-eyebrow)">
          {eyebrow}
        </p>
        <h3 className="kb-serif mt-1.5 text-[1.375rem] font-bold leading-tight text-white">{title}</h3>
        <p className="mt-1.5 text-[13px] text-(--banner-text-muted)">{description}</p>
      </div>

      <Link
        to={to}
        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-(--bg-surface) px-6 py-2.5 text-sm font-semibold text-(--text-primary) hover:bg-(--bg-surface-subtle)"
      >
        {actionLabel}
        <ArrowUpRight size={13} />
      </Link>
    </section>
  );
}