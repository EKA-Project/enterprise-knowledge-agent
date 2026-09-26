import ekaBrain from "../../assets/images/eka_brain_bg.png";
import "../../styles/splash.css";
import { useEffect, useState } from "react";

/*
  SplashScreen is responsible only for displaying
  the initial EKA loading experience.

  The logic that decides WHEN this screen should appear
  will be handled by App.jsx.
*/

function SplashScreen({ onComplete }) {
  // ============================================================
  // INITIALIZATION STATE
  // ============================================================

  /*
    Tracks the current initialization phase.

    0 → Establishing secure pipeline
    1 → Verifying organization SSO
    2 → Optimizing knowledge layer
    3 → System ready
  */
  const [phase, setPhase] = useState(0);

  /*
    Advances the splash screen through each
    initialization phase every 1.5 seconds.
  */
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((currentPhase) => {
        // Keep the final phase active once reached.
        if (currentPhase === 3) {
          return 3;
        }

        return currentPhase + 1;
      });
    }, 1500);

    // Clean up the timer when the splash unmounts.
    return () => clearInterval(timer);
  }, []);

  /*
  Once the final initialization phase is reached,
  notify App that the splash screen has completed.

  This runs after React has finished updating the phase,
  so we avoid updating App while SplashScreen is rendering.
*/
  useEffect(() => {
    if (phase === 3) {
      onComplete();
    }
  }, [phase, onComplete]);

  // ============================================================
  // INITIALIZATION PHASE CONFIGURATION
  // ============================================================

  /*
    Each phase contains the status text and
    corresponding progress-bar position.
  */
  const phases = [
    {
      text: "Establishing secure pipeline",
      progress: "0%",
    },
    {
      text: "Verifying organization SSO",
      progress: "33%",
    },
    {
      text: "Optimizing knowledge layer",
      progress: "66%",
    },
    {
      text: "System ready",
      progress: "100%",
    },
  ];

  return (
    // ============================================================
    // SPLASH SCREEN CONTAINER
    // ============================================================

    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.08),transparent_45%),linear-gradient(135deg,#eef8f7_0%,#f8fafc_38%,#f1f7f8_70%,#eaf7f5_100%)]">
      {/* Decorative background glows */}
      <div className="page-glow page-glow--mint" />
      <div className="page-glow page-glow--lavender" />
      {/* ========================================================
          INTELLIGENCE VISUAL
          Contains the orbit system, information cards,
          intelligence points, and EKA core.
      ======================================================== */}

      <div className="relative flex items-center justify-center">
        {/* --------------------------------------------------------
            ORBIT RINGS
            Three independent orbital paths create the
            layered intelligence visualization.
        -------------------------------------------------------- */}

        {/* Primary orbit */}
        <div className="absolute w-115 h-115 rounded-full border border-emerald-400/60 transform-[rotateX(68deg)_rotateY(-18deg)]"></div>

        {/* Secondary orbit */}
        <div className="absolute w-92.5 h-92.5 rounded-full border border-sky-400/45 transform-[rotateX(58deg)_rotateY(22deg)]"></div>

        {/* Tertiary orbit */}
        <div className="absolute w-105 h-105 rounded-full border border-slate-500/40 transform-[rotateX(63deg)_rotateY(2deg)]"></div>

        {/* --------------------------------------------------------
            INTELLIGENCE POINTS
            Each point follows one of the orbital paths.
            Their movement is controlled by splash.css.
        -------------------------------------------------------- */}

        {/* Green intelligence point — primary orbit */}
        <div className="absolute w-115 h-115 rounded-full primary-orbit-plane">
          <div className="absolute inset-0 rounded-full orbit-rotation-primary">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] orbit-orb-pulse"></div>
            </div>
          </div>
        </div>

        {/* Blue intelligence point — secondary orbit */}
        <div className="absolute w-92.5 h-92.5 rounded-full secondary-orbit-plane">
          <div className="absolute inset-0 rounded-full orbit-rotation-secondary">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)] orbit-orb-pulse"></div>
            </div>
          </div>
        </div>

        {/* Purple intelligence point — tertiary orbit */}
        <div className="absolute w-105 h-105 rounded-full tertiary-orbit-plane">
          <div className="absolute inset-0 rounded-full orbit-rotation-tertiary">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.7)] orbit-orb-pulse"></div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------
            KNOWLEDGE INDICATOR
            Shows the amount of connected knowledge available
            to EKA.
        -------------------------------------------------------- */}

        <div className="absolute top-8 -left-38 z-20">
          <div className="eka-info-card eka-documents-card flex items-center gap-3 rounded-xl px-5 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <span className="text-sm font-semibold">42</span>
            </div>

            <div>
              <div className="text-sm font-medium text-slate-800">
                42 documents
              </div>

              <div className="text-[10px] lowercase tracking-wider text-emerald-500">
                All knowledge connected ✓
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------
            ASK ANYTHING INDICATOR
            Represents EKA's context-aware question answering
            capability.
        -------------------------------------------------------- */}

        <div className="absolute bottom-8 -right-38 z-20">
          <div className="eka-info-card eka-ask-card flex items-center gap-3 rounded-xl px-5 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-500">
              <span className="text-sm">✦</span>
            </div>

            <div>
              <div className="text-sm font-medium text-slate-800">
                Ask anything
              </div>

              <div className="text-[10px] lowercase tracking-wider text-slate-700">
                Answers with context
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------
            EKA INTELLIGENCE CORE
            The central visual remains above the orbiting
            intelligence points.
        -------------------------------------------------------- */}

        <img
          src={ekaBrain}
          alt="EKA Intelligence"
          className="relative z-10 w-64 h-64 object-contain"
        />
      </div>

      {/* ========================================================
          LOADING / INITIALIZATION INFORMATION
          Branding, intelligence layer label, progress bar,
          and current initialization status.
      ======================================================== */}

      <div className="absolute bottom-8 flex flex-col items-center">
        {/* EKA brand identity */}
        <div
          className="text-4xl font-semibold tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          eka.
        </div>

        {/* EKA system description */}
        <div className="text-xs tracking-[0.3em] uppercase">
          INTELLIGENCE LAYER
        </div>

        {/* --------------------------------------------------------
            PROGRESS BAR
            Uses the current phase to determine its width.
            The gradient moves from blue → green → pink.
        -------------------------------------------------------- */}

        <div className="mt-4 w-64 h-1 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-linear-to-r from-sky-500 via-emerald-400 to-pink-500 transition-all duration-700"
            style={{ width: phases[phase].progress }}
          ></div>
        </div>

        {/* Current initialization stage */}
        <div className="mt-3 text-[8px] tracking-[0.15em] uppercase text-slate-500">
          {phases[phase].text}
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
