import { useEffect, useRef, useState } from 'react';
import { RefreshCw, Shield, Smartphone, X } from 'lucide-react';
import { TypeTile } from './StorageBits';
import '../../../styles/Document.css';

const rand = () => 10 + Math.floor(Math.random() * 90);
const makeCodes = () => {
  const code = rand();
  const set = new Set([code]);
  while (set.size < 3) set.add(rand());
  return { code, options: [...set].sort(() => Math.random() - 0.5) };
};

// Admin 2FA number matching: tap the same number that is shown above.
// Sizes measured on the real-size screenshot (modal 610 wide, ~788 tall).
function TwoFactorModal({ file, onClose, onVerified }) {
  const [{ code, options }, setCodes] = useState(makeCodes);
  const [status, setStatus] = useState('waiting'); // waiting | ok | wrong
  const [picked, setPicked] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer.current);
    };
  }, [onClose]);

  const pick = (n) => {
    if (status === 'ok') return;
    setPicked(n);
    if (n === code) {
      setStatus('ok');
      timer.current = setTimeout(onVerified, 1000);
    } else {
      setStatus('wrong');
    }
  };
  const resend = () => {
    setCodes(makeCodes());
    setStatus('waiting');
    setPicked(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10192b]/45 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-[610px] overflow-y-auto rounded-[30px] border-t-[3px] border-t-[#e5484d] bg-white px-[30px] pb-[30px] pt-[32px] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-2xl border border-[#f6c4c3] bg-[#ffe2e1] text-[#e5484d]">
              <Smartphone size={22} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="doc-mono inline-flex h-[22px] items-center rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-[11px] text-[11px] font-bold uppercase tracking-[0.06em] text-[#d92d2d]">
                  Admin 2FA
                </span>
                <span className="doc-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#6f8aa3]">Two-factor authentication</span>
              </div>
              <h3 className="doc-heading text-[24px] font-black leading-8 text-[#10283f]">Verify via Mobile App</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#b9d6ec] bg-[#e1f0fa] text-[#1b5f8a] transition-colors hover:border-[#f6c4c3] hover:bg-[#ffe2e1] hover:text-[#d9373f]"
          >
            <X size={15} className="transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        {/* File card (550 x 85) */}
        <div className="mt-[62px] flex h-[85px] items-center gap-3.5 rounded-2xl border border-[#b9d6ec] bg-[#e1f0fa] px-[19px]">
          <TypeTile type={file.type} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-bold leading-6 text-[#10283f]">{file.name}</p>
            <p className="doc-mono truncate text-[12px] text-[#7c949a]">
              {file.file} • {file.sizeMb.toFixed(1)} MB • {file.dept}
            </p>
          </div>
          <span className="doc-mono inline-flex h-6 shrink-0 items-center rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#d92d2d]">
            Permanent purge
          </span>
        </div>

        {/* Auth box (550 x 389) */}
        <div className="mt-10 rounded-[18px] border border-[#b9d6ec] bg-[#e1f0fa] p-[22px] text-center">
          <p className="text-[15.5px] leading-[23px] text-[#44596a]">
            Open <strong className="font-semibold text-[#10283f]">GitHub Mobile / EKA Authenticator</strong> on your phone and tap the number shown below:
          </p>

          <div className="mx-auto mt-3.5 flex h-[75px] w-[136px] items-center justify-center rounded-[18px] border border-[#b9d6ec] bg-white shadow-[0_4px_14px_rgba(11,111,164,0.12)]">
            <span className="doc-mono text-[54px] font-bold leading-none text-[#10283f]">{code}</span>
          </div>

          <p
            className={`mt-3.5 flex items-center justify-center gap-2.5 text-[13px] leading-5 ${
              status === 'ok' ? 'text-[#0f8f63]' : status === 'wrong' ? 'text-[#d9373f]' : 'text-[#7c9bb5]'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${status === 'waiting' ? 'bg-[#3b82f6]' : 'bg-current'}`} />
            {status === 'ok'
              ? '2FA Approved via EKA Authenticator'
              : status === 'wrong'
                ? 'Wrong number. Tap the number shown above.'
                : 'Waiting for mobile authorization on iPhone...'}
          </p>

          {/* Phone push (505 x 155) */}
          <div className="mt-5 rounded-2xl bg-white px-[19px] pb-[15px] pt-[17px] text-left">
            <div className="flex items-center justify-between border-b border-[#e3eef7] pb-2.5">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#44596a]">
                <Shield size={13} className="text-[#7c949a]" /> EKA Authenticator
              </span>
              <span className="text-[12px] text-[#8ea3b5]">Push received just now</span>
            </div>
            <p className="mt-3.5 text-[14px] font-semibold leading-5 text-[#10283f]">Tap the number shown on your desktop screen:</p>
            <div className="mx-auto mt-2.5 grid max-w-[399px] grid-cols-3 gap-3">
              {options.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => pick(n)}
                  className={`doc-mono h-[49px] cursor-pointer rounded-[10px] border text-[18px] font-bold transition-all duration-200 ${
                    picked === n
                      ? n === code
                        ? 'border-[#17b97f] bg-[#17b97f] text-white shadow-[0_6px_14px_rgba(23,185,127,0.35)]'
                        : 'border-[#e5484d] bg-[#e5484d] text-white shadow-[0_6px_14px_rgba(229,72,77,0.3)]'
                      : 'border-[#b9d6ec] bg-[#dcebf8] text-[#10283f] hover:-translate-y-px hover:bg-[#cfe3f4]'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {status === 'ok' && (
              <p className="mt-3 text-[12px] font-semibold text-[#0f8f63]">✓ Mobile verified: Code {code} approved on iPhone. Purging...</p>
            )}
          </div>
        </div>

        {/* Footer: divider 45px below the auth box */}
        <div className="mt-[45px] flex items-center justify-between border-t border-[#d6e6f2] pt-[15px]">
          <button
            type="button"
            onClick={resend}
            className="inline-flex cursor-pointer items-center gap-2 pl-3 text-[14px] font-semibold text-[#6f8aa3] transition-colors hover:text-[#10283f]"
          >
            <RefreshCw size={15} /> Send new number
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-8 cursor-pointer rounded-full border border-[#b9d6ec] bg-white px-[18px] text-[14px] font-semibold text-[#10283f] transition-colors hover:bg-[#e1f0fa]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TwoFactorModal;