import { useContext } from "react";
import SurpriseContext from "../context/SurpriseContext.jsx";

// const { isSurprising, rollCount, triggerSurprise } = useSurprise();
function useSurprise() {
  const context = useContext(SurpriseContext);
  if (!context) {
    throw new Error("useSurprise must be used inside <SurpriseProvider>");
  }
  return context;
}

export default useSurprise;