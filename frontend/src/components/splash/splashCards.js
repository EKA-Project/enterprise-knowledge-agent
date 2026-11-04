/*
  Config for the four floating info cards on the splash screen.
  Tailwind class strings are written out in full so Tailwind can detect them.
*/
export const SPLASH_CARDS = [
  {
    id: "documents",
    title: "Your Documents",
    subtitle: "Ready to search",
    icon: "document",
    position: "absolute left-[10px] top-[44px]",
    floatClass: "animate-card-float-1",
    cardStyle: {
      background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(240, 253, 248, 0.94) 55%, rgba(220, 252, 238, 0.88) 100%)",
      border: "1.2px solid rgba(16, 185, 129, 0.28)",
      boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(16, 185, 129, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
    },
    iconColorClass: "text-[#059669]",
    iconStyle: {
      background: "linear-gradient(145deg, #ffffff 0%, #ecfdf5 45%, #d1fae5 100%)",
      border: "1.2px solid rgba(16, 185, 129, 0.38)",
      boxShadow: "0 3px 10px rgba(16, 185, 129, 0.18), inset 0 1px 0 #ffffff",
    },
    dotClass: "bg-[#10b981] shadow-[0_0_6px_#10b981]",
  },
  {
    id: "search",
    title: "Semantic Search",
    subtitle: "Finds passages by meaning",
    icon: "search",
    position: "absolute right-[10px] top-[44px]",
    floatClass: "animate-card-float-3",
    cardStyle: {
      background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(245, 243, 255, 0.94) 55%, rgba(237, 233, 254, 0.88) 100%)",
      border: "1.2px solid rgba(139, 92, 246, 0.28)",
      boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(139, 92, 246, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
    },
    iconColorClass: "text-[#7c3aed]",
    iconStyle: {
      background: "linear-gradient(145deg, #ffffff 0%, #f5f3ff 45%, #ede9fe 100%)",
      border: "1.2px solid rgba(139, 92, 246, 0.38)",
      boxShadow: "0 3px 10px rgba(139, 92, 246, 0.18), inset 0 1px 0 #ffffff",
    },
    dotClass: "bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]",
  },
  {
    id: "sign-in",
    title: "Secure Sign-in",
    subtitle: "Organization access only",
    icon: "lock",
    position: "absolute bottom-[44px] left-[10px]",
    floatClass: "animate-card-float-4",
    cardStyle: {
      background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 251, 235, 0.94) 55%, rgba(254, 243, 199, 0.88) 100%)",
      border: "1.2px solid rgba(245, 158, 11, 0.28)",
      boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(245, 158, 11, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
    },
    iconColorClass: "text-[#d97706]",
    iconStyle: {
      background: "linear-gradient(145deg, #ffffff 0%, #fffbeb 45%, #fef3c7 100%)",
      border: "1.2px solid rgba(245, 158, 11, 0.38)",
      boxShadow: "0 3px 10px rgba(245, 158, 11, 0.18), inset 0 1px 0 #ffffff",
    },
    dotClass: "bg-[#f59e0b] shadow-[0_0_6px_#f59e0b]",
  },
  {
    id: "ask",
    title: "Ask Anything",
    subtitle: "Answers with citations",
    icon: "sparkle",
    position: "absolute bottom-[44px] right-[10px]",
    floatClass: "animate-card-float-2",
    cardStyle: {
      background: "linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(240, 249, 255, 0.94) 55%, rgba(224, 242, 254, 0.88) 100%)",
      border: "1.2px solid rgba(14, 165, 233, 0.28)",
      boxShadow: "inset 0 1px 0 #ffffff, inset 0 0 0 1px rgba(255, 255, 255, 0.7), 0 18px 38px -8px rgba(14, 165, 233, 0.18), 0 4px 14px -2px rgba(15, 23, 42, 0.05)",
    },
    iconColorClass: "text-[#0284c7]",
    iconStyle: {
      background: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 45%, #e0f2fe 100%)",
      border: "1.2px solid rgba(14, 165, 233, 0.38)",
      boxShadow: "0 3px 10px rgba(14, 165, 233, 0.18), inset 0 1px 0 #ffffff",
    },
    dotClass: "bg-[#0ea5e9] shadow-[0_0_6px_#0ea5e9]",
  },
];