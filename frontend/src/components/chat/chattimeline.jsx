export default function chattimeline({ children, line = false }) {
  return (
    <div className="relative pl-7">
      {/* ↑ Left padding leaves room for the circle node. */}

      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 size-4 rounded-full border-2 border-[#0f4f3d] bg-(--bg-app)"
      />
      {/* ↑ Circle node. Its fill matches the app background. */}

      {line && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-4 w-0.5 bg-[#4a6a8a]"
        />
      )}
      {/* ↑ Vertical line, drawn only when line is true. */}

      {children}
      {/* ↑ The content that sits next to the node. */}
    </div>
  );
}
// ↑ Used by EmptyState, ChatMessage and ChatInput.