/**
 * Deterministic color utilities inspired by the Midday project.
 *
 * Provides a stable mapping from an input string to a color from a
 * predefined palette. Useful for avatars, category labels, etc.
 */

/**
 * Palette with tasteful saturation — distinct enough to tell people apart,
 * restrained enough to not fight for attention. At 50% opacity these
 * become soft watercolor tones that feel alive without being loud.
 */
export const DETERMINISTIC_COLORS: readonly string[] = [
  "#4F7CAC", // steel blue
  "#7B68A8", // soft violet
  "#C4785B", // terracotta
  "#4A9B8E", // teal
  "#8B6BAE", // purple
  "#5B8C6F", // forest
  "#B07156", // warm sienna
  "#6089A5", // ocean
  "#A0705F", // clay
  "#5C8A9E", // aegean
  "#7E7B52", // olive
  "#8C6A7A", // dusty rose
  "#5B7F6E", // sage
  "#9B7B54", // amber
  "#6B7BA0", // periwinkle
  "#8A6B6B", // muted coral
  "#5A8080", // teal-gray
  "#7A6B90", // lavender
  "#6B8B5E", // moss
  "#9E7B6B", // sandstone
];

const DEFAULT_COLOR = "#6B7280"; // Neutral gray fallback

/**
 * Produces a deterministic positive integer hash for a given string.
 * Uses polynomial rolling hash with base 31 and modulo 2^31-1.
 *
 * @param value - The string to hash
 * @returns A non-negative integer hash
 */
export function customHash(value: string): number {
  // Multiplicative hash without bitwise operators (polynomial rolling hash)
  const MOD = 2_147_483_647; // 2^31 - 1
  const BASE = 31;
  let hash = 0;
  for (const ch of value) {
    hash = (hash * BASE + ch.charCodeAt(0)) % MOD;
  }
  return hash;
}

/**
 * Returns a stable index for `value` within a given array length.
 *
 * @param value - The string to hash
 * @param arrayLength - The size of the target array
 * @returns An index from 0 to arrayLength - 1
 */
export function getColorIndex(value: string, arrayLength: number): number {
  const hashValue = customHash(value);
  return hashValue % arrayLength;
}

/**
 * Maps a string to a color from the deterministic palette.
 * Returns a neutral gray fallback for empty strings.
 *
 * @param value - The string to map (e.g., a username or category name)
 * @returns A hex color string from the deterministic palette
 *
 * @example
 * ```ts
 * getColorFromName("Alice");   // → "#0693E3"
 * getColorFromName("Bob");     // → "#FF6900"
 * getColorFromName("");        // → "#6B7280" (fallback)
 * ```
 */
export function getColorFromName(value: string): string {
  if (!value) {
    return DEFAULT_COLOR;
  }
  const index = getColorIndex(value, DETERMINISTIC_COLORS.length);
  return DETERMINISTIC_COLORS[index] ?? DEFAULT_COLOR;
}

/**
 * Returns a random color from the deterministic palette.
 *
 * @returns A hex color string
 */
export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * DETERMINISTIC_COLORS.length);
  return DETERMINISTIC_COLORS[randomIndex] ?? DEFAULT_COLOR;
}

/**
 * Calculates a readable text color (black/white) for the given background.
 */
const HASH_PREFIX_RE = /^#/;
const WHITESPACE_RE = /\s+/;

/**
 * Calculates a readable text color (black or white) for the given background
 * using the YIQ luminance formula.
 *
 * @param bgHex - Background color as a hex string (with or without "#")
 * @returns "#000000" for light backgrounds, "#FFFFFF" for dark backgrounds
 *
 * @example
 * ```ts
 * getReadableTextColor("#FFFFFF"); // → "#000000"
 * getReadableTextColor("#000000"); // → "#FFFFFF"
 * ```
 */
export function getReadableTextColor(bgHex: string): "#000000" | "#FFFFFF" {
  const START = 0; // slice start index
  const STEP = 2; // two hex chars per channel
  const HEX_BASE = 16; // hexadecimal base

  // Remove '#'
  const hex = bgHex.replace(HASH_PREFIX_RE, "");
  const rStart = START;
  const gStart = START + STEP;
  const bStart = START + STEP * 2;
  const r = Number.parseInt(hex.slice(rStart, rStart + STEP), HEX_BASE);
  const g = Number.parseInt(hex.slice(gStart, gStart + STEP), HEX_BASE);
  const b = Number.parseInt(hex.slice(bStart, bStart + STEP), HEX_BASE);

  // YIQ weights and threshold
  const WEIGHT_R = 299;
  const WEIGHT_G = 587;
  const WEIGHT_B = 114;
  const SCALE = 1000;
  const THRESHOLD = 128;

  const yiq = (r * WEIGHT_R + g * WEIGHT_G + b * WEIGHT_B) / SCALE;
  return yiq >= THRESHOLD ? "#000000" : "#FFFFFF";
}

/**
 * Generates initials from a name for avatar fallbacks.
 * Returns first and last initial for multi-word names, single initial otherwise.
 *
 * @param name - Full name string
 * @returns Uppercase initials (1-2 characters), or empty string for empty input
 *
 * @example
 * ```ts
 * getInitials("John Doe");    // → "JD"
 * getInitials("Alice");       // → "A"
 * getInitials("Jane A. Doe"); // → "JD"
 * ```
 */
export function getInitials(name: string): string {
  if (!name) {
    return "";
  }
  const parts = name.trim().split(WHITESPACE_RE);
  const [firstPart, ...rest] = parts;
  if (!firstPart) {
    return "";
  }
  if (rest.length === 0) {
    return firstPart.charAt(0).toUpperCase();
  }
  const lastPart = rest.at(-1) ?? firstPart;
  const first = firstPart.charAt(0);
  const last = lastPart.charAt(0);
  return `${first}${last}`.toUpperCase();
}
