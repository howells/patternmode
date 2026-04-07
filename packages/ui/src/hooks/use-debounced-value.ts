import { useEffect, useState } from "react";

/**
 * Debounces a reactive value, updating only after the specified delay
 * has elapsed since the last change.
 *
 * Useful for deferring expensive operations (e.g., search API calls)
 * until the user stops typing.
 *
 * @param value - The source value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced value, which trails behind the source by `delay` ms
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
