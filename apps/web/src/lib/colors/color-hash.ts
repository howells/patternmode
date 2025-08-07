/**
 * Hash-Based Color Selection
 *
 * Utilities for generating consistent colors based on string hashing.
 * Useful for assigning consistent colors to categories, users, or other string-based identifiers.
 */

/**
 * Generates a simple hash from a string value.
 * This is a basic hashing function and should not be used for cryptographic purposes.
 * @param {string} value - The string to hash.
 * @returns {number} A non-negative integer hash value.
 */
export function customHash(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) + value.charCodeAt(i);
    hash = hash & hash;
  }

  return Math.abs(hash);
}

/**
 * Gets an index for an array based on a hash of the input string value.
 * Useful for consistently picking an element from an array based on a string.
 * @param {string} value - The string to hash for index generation.
 * @param {number} arrayLength - The length of the array for which to generate an index.
 * @returns {number} An index within the bounds of the array (0 to arrayLength - 1).
 */
export function getColor(value: string, arrayLength: number) {
  const hashValue = customHash(value);
  const index = hashValue % arrayLength;
  return index;
}
