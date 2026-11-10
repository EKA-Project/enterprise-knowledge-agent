// Tailwind v4 arbitrary values for your font tokens.
export const SERIF = 'font-[family-name:var(--font-serif)]';
export const MONO = 'font-[family-name:var(--font-mono)]';
export const EYEBROW = `${MONO} text-[10.5px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]`;

// "a **bold** b" -> [{text:'a ',bold:false},{text:'bold',bold:true},{text:' b',bold:false}]
function splitBold(text) {
  return text
    .split('**')
    .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
    .filter((seg) => seg.text.length > 0);
}

// message.content (plain text, one line per row) -> lines of { text, bold } segments.
export function contentToLines(content = '') {
  return content
    .split('\n')
    .filter((line) => line.trim())
    .map(splitBold);
}

export function countChars(lines) {
  return lines.reduce((sum, line) => sum + line.reduce((s, seg) => s + seg.text.length, 0), 0);
}

// First `count` characters only, line by line. Used by the typing effect (display only).
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

export const contentToPlainText = (content = '') => content.replace(/\*\*/g, '');

// ---- time labels ("Just now", "5m ago", "Yesterday") ----
export function formatWhen(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? 'Yesterday' : `${days}d ago`;
}

export const formatUpdated = (iso, archived = false) => `${archived ? 'Archived' : 'Updated'} ${formatWhen(iso)}`;

// Flat messages[] -> [{ turnId, user, assistant }] in order. A turn is just two rows sharing a turn_id.
export function groupTurns(messages) {
  const order = [];
  const map = new Map();
  messages.forEach((m) => {
    if (!map.has(m.turn_id)) {
      map.set(m.turn_id, { turnId: m.turn_id, user: null, assistant: null });
      order.push(m.turn_id);
    }
    const turn = map.get(m.turn_id);
    if (m.role === 'user') turn.user = m;
    else turn.assistant = m;
  });
  return order.map((id) => map.get(id));
}

// One chip per document + page, highest score first.
export function dedupeCitations(citations = []) {
  const seen = new Set();
  return [...citations]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .filter((c) => {
      const key = `${c.document_id}:${c.page}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

// ONE place that decides where "Open document" goes. If Documents gets a viewer
// route (e.g. /documents/:id), change only this function.
export function getDocumentLink(citation) {
  return { to: '/documents', state: { documentId: citation.document_id, page: citation.page } };
}