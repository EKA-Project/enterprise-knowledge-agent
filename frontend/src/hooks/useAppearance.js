import { useContext } from "react";
import AppearanceContext from "../context/AppearanceContext.jsx";

// const [appearance, update] = useAppearance();
// update({ theme: "sky-blue" }) merges a change, applies it to the page and saves it.
function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used inside <AppearanceProvider>");
  }
  return context;
}

export default useAppearance;