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

  // Negative delays start each star partway around its circle, so they're evenly spaced
  stars: [{ delay: 0 }, { delay: -0.4 }, { delay: -0.8 }],
};

// type: "drool" | "crumbs" | "bits" | "sparkles" | null
function ByteParticles({ type }) {
  const items = SETS[type];
  if (!items) return null; // no particles for this state

  // "crumbs" -> class "byte-p-crumb" (drop the trailing "s", except "drool")
  const kind = type === "drool" ? "drool" : type.replace(/s$/, "");

  return (
    <div className="byte-particles" aria-hidden="true">
      {items.map((p, i) => (
        <span
          key={i}
          className={`byte-p byte-p-${kind}`}
          style={{
            "--dx": `${p.dx ?? 0}px`,
            "--dy": `${p.dy ?? 0}px`,
            "--delay": `${p.delay ?? 0}s`,
            "--c": p.color,
            "--x": p.x,
          }}
        />
      ))}
    </div>
  );
}

export default ByteParticles;
