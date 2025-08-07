/**
 * Color Utility Functions
 *
 * High-level utility functions for working with colors, including
 * deterministic selection and random selection.
 */

import { getColor } from "./color-hash";
import { colors } from "./color-palette";

/**
 * Selects a color from the predefined `colors` array based on a hash of the input string.
 * This provides a deterministic way to assign a color to a string.
 * @param {string} value - The string for which to get a color.
 * @returns {string} A hex color string from the `colors` array.
 */
export function getColorFromName(value: string) {
  const index = getColor(value, colors.length);

  return colors[index];
}

/**
 * Selects a random color from the predefined `colors` array.
 * @returns {string} A randomly selected hex color string from the `colors` array.
 */
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
