import "../../styles/splash.css";

/*
  Icon SVGs are kept here, not in the config, so splashCards.js
  stays plain data. The config refers to them by name.
*/
const ICONS = {
  document: (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  search: (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  lock: (
    <svg className="h-[18px] w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  sparkle: (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  ),
};

/*
  One floating info card. All visual details come from the `card` config
  in splashCards.js, so this component only handles layout and markup.
*/
function SplashInfoCard({ card }) {
  return (
    <div
      className={`${card.floatClass} ${card.position} z-15 flex h-[58px] w-[218px] items-center gap-3 rounded-[16px] px-3.5 py-0 backdrop-blur-[28px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]`}
      style={card.cardStyle}
    >
      <div
        className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] ${card.iconColorClass}`}
        style={card.iconStyle}
      >
        {ICONS[card.icon]}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
        <div className="truncate text-[13px] font-bold leading-tight tracking-[-0.015em] text-[#0a0f1d]">
          {card.title}
        </div>
        <div className="flex items-center gap-1.5 truncate text-[10.5px] font-medium leading-tight text-slate-500">
          <span className={`h-[6px] w-[6px] shrink-0 rounded-full animate-pulse ${card.dotClass}`} />
          <span>{card.subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashInfoCard;