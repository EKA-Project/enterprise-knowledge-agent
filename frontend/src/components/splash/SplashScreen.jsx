import ekaBrain from "../../assets/images/eka_brain_bg.png";
import "../../styles/splash.css";
import { useEffect, useRef, useState } from "react";

/*
  Phase configuration lives outside the component so its
  reference never changes between renders.
*/
const PHASES = [
  { text: "ESTABLISHING SECURE PIPELINE", progress: "15%", duration: 600 },
  { text: "AUTHENTICATING WORKSPACE SSO", progress: "38%", duration: 700 },
  { text: "CONNECTING KNOWLEDGE GRAPH & 42 DOCS", progress: "64%", duration: 750 },
  { text: "OPTIMIZING SEMANTIC VECTOR STORE", progress: "86%", duration: 700 },
  { text: "SYSTEM READY — OPENING WORKSPACE", progress: "100%", duration: 400 },
];

const EXIT_DELAY_MS = 350;

/*
  SplashScreen displays the EKA branded loading sequence
  and notifies App via onComplete() when finished.
*/
function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  // Keep the latest onComplete in a ref so a new function from the parent
  // does not restart the phase timers.
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // On the final phase, hold briefly so "System Ready" is visible, then finish.
    if (phase >= PHASES.length - 1) {
      const exitTimer = setTimeout(() => {
        onCompleteRef.current?.();
      }, EXIT_DELAY_MS);
      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(() => {
      setPhase((prev) => prev + 1);
    }, PHASES[phase].duration);

    return () => clearTimeout(timer);
  }, [phase]);

  const currentPhase = PHASES[phase];

  return (
    <div
      className="fixed inset-0 z-[99999] flex h-screen w-screen select-none flex-col items-center justify-center overflow-hidden font-sans"
      style={{
        backgroundColor: "#eff8f8",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #ffffff 0%, rgba(255, 255, 255, 0.94) 22%, rgba(245, 251, 251, 0.6) 48%, rgba(239, 248, 248, 0.95) 100%),
          radial-gradient(rgba(100, 116, 139, 0.08) 1.2px, transparent 1.2px)
        `,
        backgroundSize: "100% 100%, 36px 36px",
      }}
    >
      {/* ── Ambient Background Circles ── */}
      <div className="pointer-events-none absolute -bottom-[150px] -left-[140px] z-[1] h-[340px] w-[340px] rounded-full bg-[#eae8fa] opacity-85" />
      <div className="pointer-events-none absolute right-[-150px] top-[36%] z-[1] h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-[#daf5f2] opacity-85" />
      <div className="pointer-events-none absolute -left-[100px] -top-[120px] z-[1] h-[360px] w-[360px] rounded-full bg-[#e0f2fe] opacity-65" />
      <div className="pointer-events-none absolute -bottom-[130px] -right-[110px] z-[1] h-[340px] w-[340px] rounded-full bg-[#fef3c7] opacity-55" />

      {/* ── Editorial Telemetry Corner Marks ── */}
      <div className="pointer-events-none absolute left-8 top-7 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + NODE // EKA.SECURE_V3
      </div>
      <div className="pointer-events-none absolute right-8 top-7 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + LATENCY // 12ms [OK]
      </div>
      <div className="pointer-events-none absolute bottom-7 left-8 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + STORAGE // HYBRID VECTOR
      </div>
      <div className="pointer-events-none absolute bottom-7 right-8 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + ARCHITECTURE // ZERO-RETENTION
      </div>

      {/* ── Minimal Stardust Nodes ── */}
      <div className="stardust-node pointer-events-none absolute left-[24%] top-[18%] z-[2] h-[3.5px] w-[3.5px] rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
      <div className="stardust-node pointer-events-none absolute right-[22%] top-[24%] z-[2] h-[4px] w-[4px] rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]" style={{ animationDelay: "1.5s" }} />
      <div className="stardust-node pointer-events-none absolute bottom-[22%] left-[26%] z-[2] h-[3px] w-[3px] rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" style={{ animationDelay: "2.8s" }} />
      <div className="stardust-node pointer-events-none absolute bottom-[24%] right-[24%] z-[2] h-[3.5px] w-[3.5px] rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" style={{ animationDelay: "0.8s" }} />
      <div className="stardust-node pointer-events-none absolute left-[14%] top-[48%] z-[2] h-[3px] w-[3px] rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" style={{ animationDelay: "2.1s" }} />
      <div className="stardust-node pointer-events-none absolute right-[14%] top-[52%] z-[2] h-[3px] w-[3px] rounded-full bg-[#ec4899] shadow-[0_0_8px_#ec4899]" style={{ animationDelay: "3.4s" }} />

      {/* ── Central Stage (Guaranteed Dead Center via Flexbox) ── */}
      <div className="animate-stage-float relative z-10 -mt-6 flex h-[400px] w-[660px] items-center justify-center">
        {/* Breathing Luminous Aura */}
        <div className="animate-aura-breath pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,rgba(16,185,129,0.14)_35%,rgba(139,92,246,0.08)_65%,transparent_80%)] blur-[24px]" />

        {/* Orbit Rings with Motion Beads */}
        <svg
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"
          viewBox="0 0 660 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orbit 1: Cyan Ellipse (+7deg) */}
          <g transform="rotate(7 330 200)">
            <path d="M 100,200 a 230,66 0 1,0 460,0 a 230,66 0 1,0 -460,0" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
            <path id="orbit-cyan-cw" d="M 100,200 a 230,66 0 1,1 460,0 a 230,66 0 1,1 -460,0" fill="none" stroke="none" />
            <path id="orbit-cyan-ccw" d="M 100,200 a 230,66 0 1,0 460,0 a 230,66 0 1,0 -460,0" fill="none" stroke="none" />
            <g>
              <animateMotion dur="8.4s" repeatCount="indefinite">
                <mpath href="#orbit-cyan-cw" />
              </animateMotion>
              <circle r="9" fill="#06b6d4" opacity="0.18" />
              <circle r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#ffffff" opacity="0.9" />
            </g>
            <g>
              <animateMotion dur="10.2s" begin="-5.1s" repeatCount="indefinite">
                <mpath href="#orbit-cyan-ccw" />
              </animateMotion>
              <circle r="8" fill="#38bdf8" opacity="0.18" />
              <circle r="4.2" fill="#0284c7" stroke="#ffffff" strokeWidth="1.4" />
              <circle cx="-1.2" cy="-1.2" r="1.1" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          {/* Orbit 2: Emerald Ellipse (-18deg) */}
          <g transform="rotate(-18 330 195)">
            <path d="M 95,195 a 235,74 0 1,0 470,0 a 235,74 0 1,0 -470,0" stroke="#10b981" strokeWidth="1.25" strokeOpacity="0.5" fill="none" />
            <path id="orbit-emerald-cw" d="M 95,195 a 235,74 0 1,1 470,0 a 235,74 0 1,1 -470,0" fill="none" stroke="none" />
            <path id="orbit-emerald-ccw" d="M 95,195 a 235,74 0 1,0 470,0 a 235,74 0 1,0 -470,0" fill="none" stroke="none" />
            <g>
              <animateMotion dur="7.2s" repeatCount="indefinite">
                <mpath href="#orbit-emerald-cw" />
              </animateMotion>
              <circle r="9.5" fill="#10b981" opacity="0.18" />
              <circle r="5.2" fill="#00c888" stroke="#ffffff" strokeWidth="1.6" />
              <circle cx="-1.6" cy="-1.6" r="1.4" fill="#ffffff" opacity="0.9" />
            </g>
            <g>
              <animateMotion dur="8.8s" begin="-4.4s" repeatCount="indefinite">
                <mpath href="#orbit-emerald-ccw" />
              </animateMotion>
              <circle r="8" fill="#34d399" opacity="0.18" />
              <circle r="4.4" fill="#059669" stroke="#ffffff" strokeWidth="1.4" />
              <circle cx="-1.3" cy="-1.3" r="1.1" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          {/* Orbit 3: Violet Ellipse (+28deg) */}
          <g transform="rotate(28 330 200)">
            <path d="M 110,200 a 220,80 0 1,0 440,0 a 220,80 0 1,0 -440,0" stroke="#8b5cf6" strokeWidth="1.15" strokeOpacity="0.4" fill="none" />
            <path id="orbit-violet-cw" d="M 110,200 a 220,80 0 1,1 440,0 a 220,80 0 1,1 -440,0" fill="none" stroke="none" />
            <path id="orbit-violet-ccw" d="M 110,200 a 220,80 0 1,0 440,0 a 220,80 0 1,0 -440,0" fill="none" stroke="none" />
            <g>
              <animateMotion dur="10.8s" repeatCount="indefinite">
                <mpath href="#orbit-violet-cw" />
              </animateMotion>
              <circle r="8.5" fill="#8b5cf6" opacity="0.18" />
              <circle r="4.8" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#ffffff" opacity="0.9" />
            </g>
            <g>
              <animateMotion dur="12.2s" begin="-6.1s" repeatCount="indefinite">
                <mpath href="#orbit-violet-ccw" />
              </animateMotion>
              <circle r="7.5" fill="#c084fc" opacity="0.18" />
              <circle r="4.0" fill="#a855f7" stroke="#ffffff" strokeWidth="1.4" />
              <circle cx="-1.1" cy="-1.1" r="1.0" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          {/* Inner Dashed Orbital Ring */}
          <circle cx="330" cy="200" r="150" stroke="rgba(16, 185, 129, 0.16)" strokeWidth="1" strokeDasharray="2 6" fill="none" />
        </svg>

        {/* Center Brain Graphic */}
        <img
          src={ekaBrain}
          alt="EKA Intelligence"
          className="pointer-events-none z-[8] h-auto w-[220px] object-contain drop-shadow-[0_16px_36px_rgba(0,168,132,0.1)]"
        />

        {/* ── CARD 1: 42 Documents (Top-Left) ── */}
        <div
          className="animate-card-float-1 absolute left-[10px] top-[44px] z-[15] flex h-[58px] w-[218px] items-center gap-3 rounded-[16px] px-3.5 py-0 backdrop-blur-[28px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]"
          style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(240, 253, 248, 0.94) 55%, rgba(220, 252, 238, 0.88) 100%)",
            border: "1.2px solid rgba(16, 185, 129, 0.28)",
            boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(16, 185, 129, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] text-[#059669]"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #ecfdf5 45%, #d1fae5 100%)",
              border: "1.2px solid rgba(16, 185, 129, 0.38)",
              boxShadow: "0 3px 10px rgba(16, 185, 129, 0.18), inset 0 1px 0 #ffffff",
            }}
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
            <div className="truncate text-[13px] font-bold leading-tight tracking-[-0.015em] text-[#0a0f1d]">
              42 Documents
            </div>
            <div className="flex items-center gap-1.5 truncate text-[10.5px] font-medium leading-tight text-slate-500">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] animate-pulse" />
              <span>all knowledge connected</span>
            </div>
          </div>
        </div>

        {/* ── CARD 3: Deep Search (Top-Right) ── */}
        <div
          className="animate-card-float-3 absolute right-[10px] top-[44px] z-[15] flex h-[58px] w-[218px] items-center gap-3 rounded-[16px] px-3.5 py-0 backdrop-blur-[28px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]"
          style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(245, 243, 255, 0.94) 55%, rgba(237, 233, 254, 0.88) 100%)",
            border: "1.2px solid rgba(139, 92, 246, 0.28)",
            boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(139, 92, 246, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] text-[#7c3aed]"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f5f3ff 45%, #ede9fe 100%)",
              border: "1.2px solid rgba(139, 92, 246, 0.38)",
              boxShadow: "0 3px 10px rgba(139, 92, 246, 0.18), inset 0 1px 0 #ffffff",
            }}
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
            <div className="truncate text-[13px] font-bold leading-tight tracking-[-0.015em] text-[#0a0f1d]">
              Deep Search
            </div>
            <div className="flex items-center gap-1.5 truncate text-[10.5px] font-medium leading-tight text-slate-500">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6] animate-pulse" />
              <span>vector store indexed</span>
            </div>
          </div>
        </div>

        {/* ── CARD 4: Enterprise SSO (Bottom-Left) ── */}
        <div
          className="animate-card-float-4 absolute bottom-[44px] left-[10px] z-[15] flex h-[58px] w-[218px] items-center gap-3 rounded-[16px] px-3.5 py-0 backdrop-blur-[28px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]"
          style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 251, 235, 0.94) 55%, rgba(254, 243, 199, 0.88) 100%)",
            border: "1.2px solid rgba(245, 158, 11, 0.28)",
            boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(245, 158, 11, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] text-[#d97706]"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #fffbeb 45%, #fef3c7 100%)",
              border: "1.2px solid rgba(245, 158, 11, 0.38)",
              boxShadow: "0 3px 10px rgba(245, 158, 11, 0.18), inset 0 1px 0 #ffffff",
            }}
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
            <div className="truncate text-[13px] font-bold leading-tight tracking-[-0.015em] text-[#0a0f1d]">
              Enterprise SSO
            </div>
            <div className="flex items-center gap-1.5 truncate text-[10.5px] font-medium leading-tight text-slate-500">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] animate-pulse" />
              <span>zero-retention active</span>
            </div>
          </div>
        </div>

        {/* ── CARD 2: Ask Anything (Bottom-Right) ── */}
        <div
          className="animate-card-float-2 absolute bottom-[44px] right-[10px] z-[15] flex h-[58px] w-[218px] items-center gap-3 rounded-[16px] px-3.5 py-0 backdrop-blur-[28px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015]"
          style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(240, 249, 255, 0.94) 55%, rgba(224, 242, 254, 0.88) 100%)",
            border: "1.2px solid rgba(14, 165, 233, 0.28)",
            boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(14, 165, 233, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] text-[#0284c7]"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 45%, #e0f2fe 100%)",
              border: "1.2px solid rgba(14, 165, 233, 0.38)",
              boxShadow: "0 3px 10px rgba(14, 165, 233, 0.18), inset 0 1px 0 #ffffff",
            }}
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
            <div className="truncate text-[13px] font-bold leading-tight tracking-[-0.015em] text-[#0a0f1d]">
              Ask Anything
            </div>
            <div className="flex items-center gap-1.5 truncate text-[10.5px] font-medium leading-tight text-slate-500">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#0ea5e9] shadow-[0_0_6px_#0ea5e9] animate-pulse" />
              <span>answers with context</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div className="absolute bottom-7 inset-x-0 z-20 mx-auto flex w-full flex-col items-center text-center">
        <h1 className="m-0 mb-1 font-serif text-[33px] font-bold leading-none tracking-[-0.025em] text-[#0a0f1d]">
          eka.
        </h1>
        <span className="mb-4 text-[9.5px] font-bold uppercase tracking-[0.32em] text-slate-800">
          intelligence layer
        </span>

        {/* Progress Track */}
        <div className="mb-2 h-[3.5px] w-[250px] overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              width: currentPhase.progress,
              background: "linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.45)",
            }}
          />
        </div>

        {/* Status Meta */}
        <div className="mt-0.5 flex w-[250px] items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-[4.5px] w-[4.5px] rounded-full bg-[#10b981] shadow-[0_0_7px_#10b981] animate-pulse" />
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {currentPhase.text}
            </span>
          </div>
          <span className="text-[8.5px] font-bold tracking-[0.05em] text-emerald-600">
            {currentPhase.progress}
          </span>
        </div>

        {/* Footer Badge */}
        <div className="mt-2 text-[7.5px] font-semibold uppercase tracking-wider text-slate-400">
          <span>SOC-2 TYPE II COMPLIANT</span> • <span>ZERO-RETENTION ARCHITECTURE</span>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;