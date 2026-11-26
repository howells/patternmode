type RefCallback<T> = (value: T | null) => void;

/**
 * A React ref in structural form, so the system package needs no React
 * dependency: React's `Ref<T>` is assignable to it.
 */
export type AssignableRef<T> =
  | ((value: T | null) => void)
  | { current: T | null }
  | null
  | undefined;

const isRefCallback = <T>(ref: NonNullable<AssignableRef<T>>): ref is RefCallback<T> =>
  typeof ref === "function";

/** Hands a node to a callback ref or an object ref, whichever the owner supplied. */
export const assignRef = <T>(ref: AssignableRef<T>, value: T | null): void => {
  if (ref === null || ref === undefined) {
    return;
  }
  if (isRefCallback(ref)) {
    ref(value);
    return;
  }
  ref.current = value;
};
