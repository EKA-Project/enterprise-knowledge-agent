import ekaBrain from "../../assets/images/eka_brain_bg.png";
import "../../styles/splash.css";
import { useEffect, useRef, useState } from "react";
import SplashInfoCard from "./SplashInfoCard";
import { SPLASH_CARDS } from "./splashCards";

/*
  Phase configuration lives outside the component so its
  reference never changes between renders.
*/
const PHASES = [
  { text: "ESTABLISHING SECURE PIPELINE", progress: "15%", duration: 600 },
  { text: "AUTHENTICATING WORKSPACE SSO", progress: "38%", duration: 700 },
  { text: "CONNECTING YOUR KNOWLEDGE BASE", progress: "64%", duration: 750 },
  { text: "PREPARING SEARCH", progress: "86%", duration: 700 },
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
      <div aria-hidden="true" className="pointer-events-none absolute left-8 top-7 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + WORKSPACE // EKA
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-8 top-7 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + STATUS // READY
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-7 left-8 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + SOURCE // YOUR DOCUMENTS
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-7 right-8 z-[4] font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 opacity-65">
        + ANSWERS // CITED
      </div>

      {/* ── Minimal Stardust Nodes ── */}
      <div className="stardust-node pointer-events-none absolute left-[24%] top-[18%] z-[2] h-[3.5px] w-[3.5px] rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
      <div className="stardust-node pointer-events-none absolute right-[22%] top-[24%] z-[2] h-[4px] w-[4px] rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]" style={{ animationDelay: "1.5s" }} />
      <div className="stardust-node pointer-events-none absolute bottom-[22%] left-[26%] z-[2] h-[3px] w-[3px] rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" style={{ animationDelay: "2.8s" }} />
      <div className="stardust-node pointer-events-none absolute bottom-[24%] right-[24%] z-[2] h-[3.5px] w-[3.5px] rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" style={{ animationDelay: "0.8s" }} />
      <div className="stardust-node pointer-events-none absolute left-[14%] top-[48%] z-[2] h-[3px] w-[3px] rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" style={{ animationDelay: "2.1s" }} />
      <div className="stardust-node pointer-events-none absolute right-[14%] top-[52%] z-[2] h-[3px] w-[3px] rounded-full bg-[#ec4899] shadow-[0_0_8px_#ec4899]" style={{ animationDelay: "3.4s" }} />

      {/* ── Central Stage (Guaranteed Dead Center via Flexbox) ── */}
      <div aria-hidden="true" className="animate-stage-float relative z-10 -mt-6 flex h-[400px] w-[660px] items-center justify-center">
        {/* Breathing Luminous Aura */}
        <div className="animate-aura-breath pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,rgba(16,185,129,0.14)_35%,rgba(139,92,246,0.08)_65%,transparent_80%)] blur-[24px]" />

        {/* Orbit Rings with Motion Beads */}
        <svg
          className="splash-orbits pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"
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

        {/* Floating info cards (content and styles in splashCards.js) */}
        {SPLASH_CARDS.map((card) => (
          <SplashInfoCard key={card.id} card={card} />
        ))}
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
            <span role="status" aria-live="polite" className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {currentPhase.text}
            </span>
          </div>
          <span className="text-[8.5px] font-bold tracking-[0.05em] text-emerald-600">
            {currentPhase.progress}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;