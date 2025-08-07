/**
 * Chart Data Processing and Validation
 *
 * Utilities for processing and validating chart data structures.
 */

export function hasOnlyOneValueForKey(
  array: Record<string, unknown>[],
  keyToCheck: string,
): boolean {
  const val: unknown[] = [];

  for (const obj of array) {
    if (Object.hasOwn(obj, keyToCheck)) {
      val.push(obj[keyToCheck]);
      if (val.length > 1) {
        return false;
      }
    }
  }

  return true;
}
