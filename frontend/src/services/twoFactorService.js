// EKA-EDIT: new file. Number-matching 2FA (same UI as before). Not in the blueprint (auth is out of scope).
// Backend later: POST /auth/2fa/challenge and POST /auth/2fa/verify. Only these bodies change.
import { getMockCurrentUser } from "./mockSession.js";
import { delay, ServiceError } from "./mockHelpers.js";

const CHALLENGE_TTL_MS = 2 * 60 * 1000;
const TOKEN_TTL_MS = 5 * 60 * 1000;
const challenges = new Map(); // challengeId -> { code, expiresAt }
const tokens = new Map(); // verificationToken -> expiresAt (single use)

const rand = () => 10 + Math.floor(Math.random() * 90);

function assertAdmin() {
  if (getMockCurrentUser()?.role !== "admin") throw new ServiceError(403, "Only the admin can verify");
}

// POST /auth/2fa/challenge
// Mock returns code and options together. The real backend shows the code on the desktop
// and the options on the phone.
/** @returns {Promise<{challengeId: string, code: number, options: number[]}>} */
export async function createChallenge() {
  await delay(80);
  assertAdmin();
  const code = rand();
  const set = new Set([code]);
  while (set.size < 3) set.add(rand());
  const options = [...set].sort(() => Math.random() - 0.5);
  const challengeId = `chl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  challenges.set(challengeId, { code, expiresAt: Date.now() + CHALLENGE_TTL_MS });
  return { challengeId, code, options };
}

// POST /auth/2fa/verify   { challengeId, pickedNumber }
/** @returns {Promise<{verificationToken: string, expiresAt: string}>} */
export async function verifyChallenge(challengeId, pickedNumber) {
  await delay(80);
  assertAdmin();
  const row = challenges.get(challengeId);
  if (!row) throw new ServiceError(404, "Verification request not found");
  if (Date.now() > row.expiresAt) {
    challenges.delete(challengeId);
    throw new ServiceError(410, "Verification expired. Send a new number.");
  }
  if (Number(pickedNumber) !== row.code) throw new ServiceError(422, "Wrong number");

  challenges.delete(challengeId);
  const verificationToken = `vt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const expires = Date.now() + TOKEN_TTL_MS;
  tokens.set(verificationToken, expires);
  return { verificationToken, expiresAt: new Date(expires).toISOString() };
}

// MOCK ONLY: in the real backend the server checks the token itself (storageService passes it along).
export function consumeVerificationToken(token) {
  const expires = tokens.get(token);
  tokens.delete(token);
  if (!expires || Date.now() > expires) throw new ServiceError(403, "Two-factor verification required");
}