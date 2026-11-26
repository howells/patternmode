import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/**
 * Minimal client-only portal into `document.body`, or a stack's `container`. Replaces
 * `@radix-ui/react-portal` — Base UI ships no standalone portal primitive, and
 * the sheet renderer only ever runs on the client. Mounting is deferred to an
 * effect so server render and first client render agree (no hydration
 * mismatch).
 */
const subscribeToNothing = () => () => {
  // The client never changes after mount, so there is nothing to subscribe to.
};

export const SheetPortal = ({
  children,
  container,
}: {
  children: ReactNode;
  /** Render here instead of `document.body`; `null` renders nothing yet. */
  container: HTMLElement | null | undefined;
}): ReactNode => {
  // False on the server and during hydration, true once the client has mounted.
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  if (!mounted || typeof document === "undefined" || container === null) {
    return null;
  }
  return createPortal(children, container ?? document.body);
};
