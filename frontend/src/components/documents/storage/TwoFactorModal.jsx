import { useEffect, useRef, useState } from 'react';
import { RefreshCw, Smartphone, X } from 'lucide-react';
import { TypeTile } from './StorageBits';
import '../../../styles/Document.css';

const rand = () => 10 + Math.floor(Math.random() * 90);
const makeCodes = () => {
  const code = rand();
  const set = new Set([code]);
  while (set.size < 3) set.add(rand());
  return { code, options: [...set].sort(() => Math.random() - 0.5) };
};

// Admin 2FA number matching, like the video: tap the same number that is shown above.
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
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[611px] rounded-[28px] border-t-[3px] border-t-[#e5484d] bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl bg-[#ffe2e1] text-[#e5484d]">
              <Smartphone size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="doc-mono rounded-full border border-[#f6c4c3] bg-[#fff0ef] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#d9373f]">Admin 2FA</span>
                <span className="doc-mono text-[10px] uppercase tracking-[0.06em] text-[#1b79a8]">Two-factor authentication</span>
              </div>
              <h3 className="doc-heading mt-1 text-[24px] font-black leading-8 text-[#10283f]">Verify via Mobile App</h3>
            </div>
          </div>
          <button type="button" onClick={onClose} className="group flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#e1f0fa] text-[#1b79a8] transition-colors hover:bg-[#ffe2e1] hover:text-[#d9373f]">
            <X size={14} className="transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#e4f1fb] px-4 py-3.5">
          <TypeTile type={file.type} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-[#10283f]">{file.name}</p>
            <p className="doc-mono truncate text-[10.5px] text-[#7c949a]">{file.file}</p>
          </div>
          <span className="doc-mono shrink-0 rounded-md bg-[#fff0ef] px-2.5 py-1 text-[10px] font-bold uppercase text-[#d9373f]">Permanent purge</span>
        </div>

        <div className="mt-5 rounded-2xl bg-[#e4f1fb] p-5 text-center">
          <p className="text-[13.5px] leading-5 text-[#44596a]">
            Open <strong className="text-[#10283f]">GitHub Mobile / EKA Authenticator</strong> on your phone and tap the number shown below:
          </p>
          <div className="mx-auto mt-4 flex h-[66px] w-[120px] items-center justify-center rounded-2xl bg-white shadow-sm">
            <span className="text-[40px] font-black text-[#10283f]">{code}</span>
          </div>
          <p className={`mt-3 flex items-center justify-center gap-2 text-[12px] ${status === 'ok' ? 'text-[#0f8f63]' : status === 'wrong' ? 'text-[#d9373f]' : 'text-[#1b79a8]'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status === 'ok' ? '2FA Approved via EKA Authenticator' : status === 'wrong' ? 'Wrong number. Tap the number shown above.' : 'Waiting for mobile authorization on iPhone...'}
          </p>

          <div className="mt-4 rounded-xl bg-white p-4 text-left">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-2 text-[#44596a]"><span className="h-2.5 w-2.5 rounded-full border border-[#7c949a]" /> EKA Authenticator</span>
              <span className="text-[#9db0bd]">Push received just now</span>
            </div>
            <p className="mt-3 text-[12px] font-semibold text-[#10283f]">Tap the number shown on your desktop screen:</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {options.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => pick(n)}
                  className={`h-[42px] cursor-pointer rounded-lg text-[16px] font-bold transition-colors ${
                    picked === n ? (n === code ? 'border-2 border-[#1b79a8] bg-[#e1f0fa] text-[#1b79a8]' : 'border-2 border-[#e5484d] bg-[#fff0ef] text-[#d9373f]') : 'bg-[#e4f1fb] text-[#10283f] hover:bg-[#d4e8f6]'
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

        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={resend} className="inline-flex cursor-pointer items-center gap-2 text-[12px] text-[#44596a] hover:text-[#10283f]">
            <RefreshCw size={13} /> Send new number
          </button>
          <button type="button" onClick={onClose} className="h-9 cursor-pointer rounded-full border border-[#cfe3f3] bg-white px-5 text-[12px] font-bold text-[#10283f] hover:bg-[#e1f0fa]">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TwoFactorModal;