import { FocusTrap } from "focus-trap-react";
import type { ReactNode, RefObject } from "react";
import { useSyncExternalStore } from "react";

const LAYERED_MODAL_SELECTORS = [
  '[role="dialog"][data-state="open"]',
  '[role="alertdialog"][data-state="open"]',
  "[data-radix-popper-content-wrapper]",
  "[data-radix-focus-guard]",
].join(", ");

export function ModalFocusTrap({
  enabled,
  active,
  fallbackRef,
  children,
}: {
  enabled: boolean;
  active: boolean;
  fallbackRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const paused = useLayeredModalFocused(enabled && active);

  if (!enabled) {
    return children;
  }
  return (
    <FocusTrap
      active={active}
      focusTrapOptions={{
        initialFocus: false,
        returnFocusOnDeactivate: true,
        escapeDeactivates: false,
        allowOutsideClick: true,
        checkCanFocusTrap: () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
          ),
        fallbackFocus: () => {
          if (fallbackRef.current) {
            return fallbackRef.current;
          }
          return document.body;
        },
      }}
      paused={paused}
    >
      {children}
    </FocusTrap>
  );
}

function useLayeredModalFocused(active: boolean): boolean {
  const layered = useSyncExternalStore(
    subscribeToFocusTarget,
    getLayeredModalFocused,
    getServerLayeredModalFocused,
  );
  return active && layered;
}

function subscribeToFocusTarget(onStoreChange: () => void): () => void {
  document.addEventListener("focusin", onStoreChange, true);
  return () => document.removeEventListener("focusin", onStoreChange, true);
}

function getServerLayeredModalFocused(): boolean {
  return false;
}

function getLayeredModalFocused(): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  const target = document.activeElement;
  return (
    !!target &&
    target !== document.body &&
    target instanceof Element &&
    target.closest(LAYERED_MODAL_SELECTORS) !== null
  );
}
