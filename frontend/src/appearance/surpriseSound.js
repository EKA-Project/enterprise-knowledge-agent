// src/appearance/surpriseSound.js
// Synthesized "Surprise Me" sound: a quick tumbling dice rattle that
// resolves into an ascending chime. No audio files needed.

// Last tone starts at 0.30s and lasts 0.18s; close the context shortly after
// so rapid clicks don't pile up open AudioContexts (browsers cap these).
const CLOSE_AFTER_MS = 700;

export function playSurpriseMeSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Schedules one oscillator tone `offset` seconds from now
    const playTone = (freq, type, duration, offset, gainLevel = 0.15) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + offset + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + duration);
    };

    // Tumbling dice rattle → ascending resolution chime
    playTone(587.33, "triangle", 0.04, 0.0, 0.16); // D5
    playTone(739.99, "square", 0.04, 0.05, 0.13); // F#5
    playTone(659.25, "triangle", 0.05, 0.1, 0.15); // E5
    playTone(880.0, "square", 0.05, 0.15, 0.16); // A5
    playTone(1046.5, "triangle", 0.08, 0.22, 0.18); // C6
    playTone(1318.51, "triangle", 0.18, 0.3, 0.2); // E6

    setTimeout(() => ctx.close().catch(() => {}), CLOSE_AFTER_MS);
  } catch (err) {
    console.error("Audio error:", err);
  }
}