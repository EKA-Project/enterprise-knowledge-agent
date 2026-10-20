// One-off helper: moves every [data-theme="..."] block out of src/styles/variables.css
// into src/styles/themes/<collection>.css, grouped by `collection` in src/appearance/theme.js.
//   node scripts/split-themes.mjs           dry run (prints the plan, changes nothing)
//   node scripts/split-themes.mjs --write   applies it
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const cssPath = path.join(root, "src/styles/variables.css");
const themesDir = path.join(root, "src/styles/themes");
const write = process.argv.includes("--write");

let mod;
try {
  mod = await import(pathToFileURL(path.join(root, "src/appearance/theme.js")).href);
} catch (err) {
  console.error("Could not load src/appearance/theme.js:", err.message);
  process.exit(1);
}
const { THEMES, THEME_COLLECTIONS = [] } = mod;
const collectionOf = Object.fromEntries(THEMES.map((t) => [t.id, t.collection]));
const labelOf = Object.fromEntries(THEME_COLLECTIONS.map((c) => [c.id, c.label]));

const raw = readFileSync(cssPath, "utf8");
const eol = raw.includes("\r\n") ? "\r\n" : "\n";
const lines = raw.split(/\r?\n/);

// ---- 1. Find every theme block, plus the banner comment right above it ----
const startRe = /^\[data-theme="([^"]+)"\]\s*\{\s*$/;
const blocks = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(startRe);
  if (!m) continue;
  let end = i;
  while (end < lines.length && lines[end] !== "}") end++; // blocks close with "}" in column 0
  if (end === lines.length) {
    console.error(`No closing } found for ${m[1]}`);
    process.exit(1);
  }
  let from = i;
  let j = i - 1;
  while (j >= 0 && lines[j].trim() === "") j--;
  if (j >= 0 && lines[j].trim().endsWith("*/")) {
    let k = j;
    while (k >= 0 && !lines[k].includes("/*")) k--;
    if (k >= 0) from = k;
  }
  blocks.push({ id: m[1], from, to: end });
}

// ---- 2. Group by collection ----
const groups = new Map();
const unsorted = [];
for (const b of blocks) {
  const col = collectionOf[b.id];
  if (!col) {
    unsorted.push(b.id);
    continue;
  }
  if (!groups.has(col)) groups.set(col, []);
  groups.get(col).push(b);
}
const missing = THEMES.filter((t) => !blocks.some((b) => b.id === t.id)).map((t) => t.id);

console.log(`Found ${blocks.length} theme blocks in variables.css\n`);
for (const [col, list] of groups) {
  console.log(`  themes/${col}.css  <- ${list.length}: ${list.map((b) => b.id).join(", ")}`);
}
if (unsorted.length) console.log(`\nNOT in THEMES (left in variables.css): ${unsorted.join(", ")}`);
if (missing.length) console.log(`\nIn THEMES but no CSS block found: ${missing.join(", ")}`);
if (!write) {
  console.log("\nDry run only. Re-run with --write to apply.");
  process.exit(0);
}

// ---- 3. Build everything in memory and check it before touching any file ----
const count = (s) => (s.match(/^\[data-theme="/gm) ?? []).length;
const drop = new Set();
const files = new Map();
for (const [col, list] of groups) {
  const body = list
    .map((b) => {
      for (let n = b.from; n <= b.to; n++) drop.add(n);
      return lines.slice(b.from, b.to + 1).join(eol);
    })
    .join(eol + eol);
  const header = [
    "/* ==========================================================================",
    `   Theme collection: ${labelOf[col] ?? col}  (collection id "${col}")`,
    "   One [data-theme=\"<id>\"] block per theme; each id is registered in src/appearance/theme.js.",
    "   Imported by src/styles/variables.css.",
    "   ========================================================================== */",
  ].join(eol);
  files.set(col, `${header}${eol}${eol}${body}${eol}`);
}

const importLine = '@import "tailwindcss";';
let out = lines.filter((_, n) => !drop.has(n)).join(eol).replace(/(\r?\n){3,}/g, eol + eol);
if (!out.includes(importLine)) {
  console.error(`Could not find ${importLine} in variables.css, aborting.`);
  process.exit(1);
}
const imports = [
  "/* Theme atmospheres: one file per collection */",
  ...[...groups.keys()].map((c) => `@import "./themes/${c}.css";`),
].join(eol);
out = out.replace(importLine, `${importLine}${eol}${eol}${imports}`);

const written = [...files.values()].reduce((sum, text) => sum + count(text), 0);
if (written !== blocks.length - unsorted.length || count(out) !== unsorted.length) {
  console.error("Block counts don't add up, aborting without writing anything.");
  process.exit(1);
}

// ---- 4. Write ----
mkdirSync(themesDir, { recursive: true });
for (const [col, text] of files) writeFileSync(path.join(themesDir, `${col}.css`), text);
writeFileSync(cssPath, out);
console.log(`\nDone. ${written} blocks moved into src/styles/themes/, ${count(out)} left in variables.css.`);