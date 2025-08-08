import { uniq } from "es-toolkit";

export function hasOnlyOneValueForKey(
  array: any[],
  keyToCheck: string,
): boolean {
  const values = array
    .filter(obj => Object.hasOwn(obj, keyToCheck))
    .map(obj => obj[keyToCheck]);

  return uniq(values).length <= 1;
}
