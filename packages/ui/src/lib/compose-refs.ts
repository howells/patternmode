/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */

import type React from "react";
import { useCallback } from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    return ref(value);
  }

  if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

/**
 * Compose multiple refs into a single callback ref.
 * Accepts callback refs and RefObject(s). Supports React 19 ref cleanup functions.
 *
 * @param refs - Refs to compose (callback refs, RefObjects, or undefined)
 * @returns A single callback ref that forwards to all provided refs
 */
function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });

    // React <19 will log an error to the console if a callback ref returns a
    // value. We don't use ref cleanups internally so this will only happen if a
    // user's ref callback returns a value, which we only expect if they are
    // using the cleanup functionality added in React 19.
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
    return;
  };
}

/**
 * Hook that composes multiple refs into a stable callback ref.
 * Memoizes the result so it can be safely passed as a ref prop.
 *
 * @param refs - Refs to compose (callback refs, RefObjects, or undefined)
 * @returns A stable callback ref that forwards to all provided refs
 *
 * @example
 * ```tsx
 * const ref = useComposedRefs(localRef, forwardedRef);
 * return <div ref={ref} />;
 * ```
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return useCallback(composeRefs(...refs), [...refs]);
}

export { composeRefs, useComposedRefs };
