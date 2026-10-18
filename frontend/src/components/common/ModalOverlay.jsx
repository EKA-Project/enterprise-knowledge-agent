import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Keep in sync with the exit animation duration in styles/variables.css
const EXIT_DURATION = 150;

// Every open overlay registers here, so we know which one is on top
// (only the top one reacts to Esc) and when it's safe to unlock page scroll.
const openOverlays = [];

/**
 * onClose: () => void (called after the exit animation finishes)
 * closeOnClickOutside?: boolean (default true)
 * closeOnEsc?: boolean (default true)
 * children: (requestClose) => node
 *   Render function: call requestClose() to close WITH the exit animation.
 */
function ModalOverlay({
  onClose,
  closeOnClickOutside = true,
  closeOnEsc = true,
  children,
}) {
  const overlayRef = useRef(null);
  const closeTimer = useRef(null);
  const pressStartedOnBackdrop = useRef(false);
  const onCloseRef = useRef(onClose);
  const [isClosing, setIsClosing] = useState(false);

  // Always call the latest onClose without re-running the effects below
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const requestClose = useCallback(() => {
    if (closeTimer.current) return; // already closing
    setIsClosing(true);
    closeTimer.current = setTimeout(() => onCloseRef.current(), EXIT_DURATION);
  }, []);

  // Register, lock page scroll, and handle focus
  useEffect(() => {
    const overlay = overlayRef.current;
    const previouslyFocused = document.activeElement;

    if (openOverlays.length === 0) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    openOverlays.push(overlay);

    // Move focus into the modal unless a field inside already took it (autoFocus)
    if (!overlay.contains(document.activeElement)) {
      overlay.focus();
    }

    return () => {
      openOverlays.splice(openOverlays.indexOf(overlay), 1);
      if (openOverlays.length === 0) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
      clearTimeout(closeTimer.current);
      previouslyFocused?.focus?.();
    };
  }, []);

  // Esc key (only the topmost modal reacts)
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleKeyDown = (event) => {
      const isTopmost =
        openOverlays[openOverlays.length - 1] === overlayRef.current;
      if (event.key === "Escape" && isTopmost) {
        requestClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, requestClose]);

  // Click outside: the press AND the release must both be on the backdrop,
  // so dragging a text selection out of an input doesn't close the modal.
  const handleMouseDown = (event) => {
    pressStartedOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleClick = (event) => {
    if (
      closeOnClickOutside &&
      pressStartedOnBackdrop.current &&
      event.target === event.currentTarget
    ) {
      requestClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      tabIndex={-1}
      data-closing={isClosing || undefined}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 outline-none backdrop-blur-sm"
    >
      {children(requestClose)}
    </div>,
    document.body,
  );
}

export default ModalOverlay;