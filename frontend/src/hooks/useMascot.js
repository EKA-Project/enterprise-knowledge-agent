import { useContext } from "react";
import { MascotContext } from "../context/MascotContext";

// Returns { mascotId, mascot, setMascotId }.
// Throws early if used outside <MascotProvider>, so a missing provider shows
// up as a clear error instead of a silent undefined.
export function useMascot() {
  const ctx = useContext(MascotContext);
  if (!ctx) throw new Error("useMascot must be used inside <MascotProvider>");
  return ctx;
}