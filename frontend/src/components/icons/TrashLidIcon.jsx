import React from "react";

/**
 * TrashLidIcon - EKA's signature trash icon.
 * When the parent button (with class 'group') is hovered, the lid lifts and tilts (-38deg).
 */
export default function TrashLidIcon({ size = 13, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`overflow-visible ${className}`}
    >
      {/* Animated Lid: Rotates and lifts when parent group is hovered */}
      <g className="origin-[4px_6px] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-[-2.8px] group-hover:rotate-[-38deg]">
        <path d="M4 6h16" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </g>
      {/* Animated Body: Sinks slightly on hover */}
      <g className="transition-transform duration-250 ease-out group-hover:translate-y-[0.5px]">
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </g>
    </svg>
  );
}