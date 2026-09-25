import ekaBrain from "../../assets/images/eka_brain_bg.png";
import "../../styles/splash.css";
// SplashScreen is responsible only for displaying
// the initial EKA loading experience.
//
// The logic that decides WHEN this screen should appear
// will be handled by App.jsx.

function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Intelligence visual */}
      <div className="relative flex items-center justify-center">
        {/* Primary orbit — main outer intelligence path */}
        <div className="absolute w-115 h-115 rounded-full border border-emerald-400/40 transform-[rotateX(68deg)_rotateY(-18deg)]"></div>

        {/* Secondary orbit — crosses the primary at a different plane */}
        <div className="absolute w-92.5 h-92.5 rounded-full border border-sky-400/25 transform-[rotateX(58deg)_rotateY(22deg)]"></div>

        {/* Tertiary orbit — darker central depth layer */}
        <div className="absolute w-105 h-105 rounded-full border border-slate-500/20 transform-[rotateX(63deg)_rotateY(2deg)]"></div>

        {/* Green intelligence point — follows the primary orbit */}
        <div className="absolute w-115 h-115 rounded-full primary-orbit-plane">
          <div className="absolute inset-0 rounded-full orbit-rotation-primary">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] orbit-orb-pulse"></div>
            </div>
          </div>
        </div>

        {/* Blue intelligence point — follows the secondary orbit */}
        <div className="absolute w-92.5 h-92.5 rounded-full secondary-orbit-plane">
          <div className="absolute inset-0 rounded-full orbit-rotation-secondary">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)] orbit-orb-pulse"></div>
            </div>
          </div>
        </div>

        {/* Purple intelligence point — follows the tertiary orbit */}
        <div className="absolute w-105 h-105 rounded-full tertiary-orbit-plane">
          <div className="absolute inset-0 rounded-full orbit-rotation-tertiary">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.7)] orbit-orb-pulse"></div>
            </div>
          </div>
        </div>
        {/* EKA intelligence core */}
        <img
          src={ekaBrain}
          alt="EKA Intelligence"
          className="relative z-10 w-64 h-64 object-contain"
        />
      </div>
      {/* Loading information shown below the intelligence visual */}
      {/* Loading information positioned near the bottom */}
      <div className="absolute bottom-8 flex flex-col items-center">
        {/* EKA brand identity */}
        <div className="text-5xl font-semibold tracking-wide">eka.</div>

        {/* Describes the EKA intelligence layer */}
        <div className="text-xs tracking-[0.3em] uppercase">
          INTELLIGENCE LAYER
        </div>

        {/* Shows initialization progress */}
        <div className="mt-4 w-64 h-1 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-sky-500"></div>
        </div>

        {/* Current initialization status */}
        <div className="mt-3 text-[10px] tracking-[0.25em] uppercase text-slate-500">
          Initializing EKA...
        </div>
      </div>
    </div>
  );
}
export default SplashScreen;
