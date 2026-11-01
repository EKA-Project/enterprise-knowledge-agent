import { ThumbDownIcon, ThumbUpIcon } from './ChatIcons';

const btn =
  'grid h-8 w-8 min-h-8 min-w-8 shrink-0 cursor-pointer appearance-none place-items-center rounded-lg border border-transparent outline-none ring-0 shadow-none transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:scale-100 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0';
 const idleUp =
  'text-[var(--text-muted)] hover:border-[var(--status-success)] hover:bg-[var(--status-success-bg)] hover:text-[var(--status-success)]';

const idleDown =
  'text-[var(--text-muted)] hover:border-[var(--status-danger)] hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger)]';
  const up =
    'border-[var(--status-success)] bg-[var(--status-success-bg)] text-[var(--status-success)]';

  const down =
    'border-[var(--status-danger)] bg-[var(--status-danger-bg)] text-[var(--status-danger)]';

export default function FeedbackButtons({ feedback, disabled, onRate }) {
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRate('up')}
        title="Helpful"
        aria-pressed={feedback?.rating === 'up'}
        className={`${btn} ${feedback?.rating === 'up' ? up : idleUp}`}
      >
        <ThumbUpIcon size={15} />
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onRate('down')}
        title="Not helpful"
        aria-pressed={feedback?.rating === 'down'}
        className={`${btn} ${feedback?.rating === 'down' ? down : idleDown}`}
      >
        <ThumbDownIcon size={15} />
      </button>
    </>
  );
}