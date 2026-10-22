// Small decorative particles that float around Byte.
// Each effect is a list of tiny spans; the CSS in variables.css animates them.
// The numbers are just positions/timing: dx/dy = where a particle flies to (px),
// delay = when it starts (s), x = left position for rising bits.

const SETS = {
  drool: [{ delay: 0 }],

  crumbs: [
    { dx: -28, dy: -24, delay: 0, color: "#0ea5e9" },
    { dx: 24, dy: -30, delay: 0.15, color: "#38bdf8" },
    { dx: -14, dy: -36, delay: 0.3, color: "#cbd5e1" },
    { dx: 30, dy: -18, delay: 0.45, color: "#10b981" },
    { dx: 6, dy: -40, delay: 0.6, color: "#0ea5e9" },
  ],

  bits: [
    { x: "22%", delay: 0 },
    { x: "42%", delay: 0.45 },
    { x: "62%", delay: 0.9 },
    { x: "78%", delay: 0.25 },
  ],

  sparkles: [
    { dx: -46, dy: -40, delay: 0.1 },
    { dx: 44, dy: -46, delay: 0.18 },
    { dx: -52, dy: 2, delay: 0.26 },
    { dx: 50, dy: -4, delay: 0.14 },
    { dx: -20, dy: -62, delay: 0.3 },
    { dx: 22, dy: -64, delay: 0.22 },
  ],

  // 4 stars evenly spaced around the orbit (1.4s per lap, so 0.35s apart;
  // a negative delay starts a star partway round its lap)
  stars: [{ delay: 0 }, { delay: -0.35 }, { delay: -0.7 }, { delay: -1.05 }],

  // Angry steam: two side vents and the top of the head, puffs of different sizes
  // and lifetimes so the plume never looks synchronised.
  // x/y = start (% of Byte's box), rise = climb, drift = sideways, s = size, dur = life
  steam: [
    {
      x: "34%",
      y: "30%",
      rise: "56%",
      drift: "-16%",
      s: "16%",
      dur: "1.5s",
      delay: 0,
    },
    {
      x: "34%",
      y: "30%",
      rise: "62%",
      drift: "-20%",
      s: "20%",
      dur: "1.7s",
      delay: 0.8,
    },
    {
      x: "66%",
      y: "30%",
      rise: "58%",
      drift: "16%",
      s: "17%",
      dur: "1.5s",
      delay: 0.25,
    },
    {
      x: "66%",
      y: "30%",
      rise: "62%",
      drift: "20%",
      s: "21%",
      dur: "1.7s",
      delay: 1.05,
    },
    {
      x: "50%",
      y: "20%",
      rise: "52%",
      drift: "4%",
      s: "15%",
      dur: "1.4s",
      delay: 0.5,
    },
    {
      x: "46%",
      y: "22%",
      rise: "62%",
      drift: "-6%",
      s: "19%",
      dur: "1.8s",
      delay: 1.2,
    },
    {
      x: "54%",
      y: "22%",
      rise: "58%",
      drift: "8%",
      s: "18%",
      dur: "1.6s",
      delay: 0.1,
    },
  ],

  // Success confetti. dx = sideways (px), dy = peak height (px, negative = up),
  // fall = where it lands (px), rot = spin (degrees)
  confetti: [
    { dx: -62, dy: -30, fall: 34, rot: 240, delay: 0.4, color: "#38bdf8" },
    { dx: -44, dy: -38, fall: 26, rot: -200, delay: 0.42, color: "#facc15" },
    { dx: -28, dy: -42, fall: 20, rot: 300, delay: 0.44, color: "#10b981" },
    { dx: -12, dy: -42, fall: 18, rot: -260, delay: 0.4, color: "#f472b6" },
    { dx: 6, dy: -42, fall: 16, rot: 220, delay: 0.46, color: "#a78bfa" },
    { dx: 20, dy: -40, fall: 18, rot: -300, delay: 0.42, color: "#fb923c" },
    { dx: 36, dy: -38, fall: 22, rot: 260, delay: 0.44, color: "#38bdf8" },
    { dx: 52, dy: -34, fall: 28, rot: -220, delay: 0.4, color: "#facc15" },
    { dx: 68, dy: -26, fall: 36, rot: 280, delay: 0.46, color: "#10b981" },
    { dx: -54, dy: -20, fall: 40, rot: 200, delay: 0.48, color: "#f472b6" },
    { dx: 58, dy: -18, fall: 42, rot: -240, delay: 0.5, color: "#a78bfa" },
    { dx: -20, dy: -30, fall: 30, rot: 320, delay: 0.5, color: "#fb923c" },
    { dx: 24, dy: -32, fall: 30, rot: -180, delay: 0.52, color: "#38bdf8" },
    { dx: 0, dy: -40, fall: 24, rot: 260, delay: 0.48, color: "#facc15" },
  ],
};

// type: "drool" | "crumbs" | "bits" | "sparkles" | null
function MascotParticles({ type }) {
  const items = SETS[type];
  if (!items) return null; // no particles for this state

  // "crumbs" -> class "mascot-p-crumb" (drop the trailing "s", except "drool")
  const kind = type === "drool" ? "drool" : type.replace(/s$/, "");

  return (
    <div className="mascot-particles" aria-hidden="true">
      {items.map((p, i) => (
        <span
          key={i}
          className={`mascot-p mascot-p-${kind}`}
          style={{
            "--dx": `${p.dx ?? 0}px`,
            "--dy": `${p.dy ?? 0}px`,
            "--delay": `${p.delay ?? 0}s`,
            "--c": p.color,
            "--x": p.x,
            "--fall": p.fall != null ? `${p.fall}px` : undefined,
            "--rot": p.rot != null ? `${p.rot}deg` : undefined,
            "--y": p.y,
            "--rise": p.rise,
            "--drift": p.drift,
            "--dur": p.dur,
            "--s": p.s,
          }}
        />
      ))}
    </div>
  );
}

export default MascotParticles;
