import { FocusTrap } from "focus-trap-react";
import type { ReactNode, RefObject } from "react";
import { useSyncExternalStore } from "react";

const LAYERED_MODAL_SELECTORS = [
  '[role="dialog"][data-state="open"]',
  '[role="alertdialog"][data-state="open"]',
  "[data-radix-popper-content-wrapper]",
  "[data-radix-focus-guard]",
].join(", ");

const subscribeToFocusTarget = (onStoreChange: () => void): (() => void) => {
  document.addEventListener("focusin", onStoreChange, true);
  return () => {
    document.removeEventListener("focusin", onStoreChange, true);
  };
};
const getServerLayeredModalFocused = (): boolean => false;
const getLayeredModalFocused = (): boolean => {
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
};
const useLayeredModalFocused = (active: boolean): boolean => {
  const layered = useSyncExternalStore(
    subscribeToFocusTarget,
    getLayeredModalFocused,
    getServerLayeredModalFocused,
  );
  return active && layered;
};

export const ModalFocusTrap = ({
  enabled,
  active,
  fallbackRef,
  children,
}: {
  enabled: boolean;
  active: boolean;
  fallbackRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}): ReactNode => {
  const paused = useLayeredModalFocused(enabled && active);
  if (!enabled) {
    return children;
  }
  return (
    <FocusTrap
      active={active}
      focusTrapOptions={{
        allowOutsideClick: true,
        escapeDeactivates: false,
        fallbackFocus: () => {
          if (fallbackRef.current !== null) {
            return fallbackRef.current;
          }
          return document.body;
        },
        initialFocus: false,
        returnFocusOnDeactivate: true,
      }}
      paused={paused}
    >
      {children}
    </FocusTrap>
  );
};
