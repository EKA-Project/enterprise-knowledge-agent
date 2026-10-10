// Tailwind v4 arbitrary values for your font tokens. The full class strings are
// literal, so Tailwind's scanner picks them up. No global CSS is needed for fonts.
export const SERIF = 'font-[family-name:var(--font-serif)]';
export const MONO = 'font-[family-name:var(--font-mono)]';
export const EYEBROW = `${MONO} text-[10.5px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]`;

// answer = { intro, points: [{ label, text }] }
// Converts it into lines of { text, bold } segments so we can reveal it gradually.
export function answerToLines(answer) {
  const lines = [[{ text: answer.intro, bold: false }]];
  answer.points.forEach((p, i) => {
    lines.push([
      { text: `${i + 1}. `, bold: false },
      { text: p.label, bold: true },
      { text: `: ${p.text}`, bold: false },
    ]);
  });
  return lines;
}

export function countChars(lines) {
  return lines.reduce((sum, line) => sum + line.reduce((s, seg) => s + seg.text.length, 0), 0);
}

// Returns only the first `count` characters, line by line. Empty lines are dropped.
export function revealLines(lines, count) {
  let remaining = count;
  return lines
    .map((line) =>
      line.map((seg) => {
        const take = Math.max(0, Math.min(seg.text.length, remaining));
        remaining -= take;
        return { ...seg, text: seg.text.slice(0, take) };
      })
    )
    .filter((line) => line.some((seg) => seg.text.length > 0));
}

export function answerToPlainText(answer) {
  return answerToLines(answer)
    .map((line) => line.map((s) => s.text).join(''))
    .join('\n');
}

// ONE place that decides where a citation opens. It targets the existing /documents
// route and passes the document id and page in router state. If Documents gets a
// viewer route (e.g. /documents/:id), change only this function.
export function getDocumentLink(citation) {
  return {
    to: '/documents',
    state: { documentId: citation.documentId, page: citation.page },
  };
}