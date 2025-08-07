/**
 * Centralized Variant Types
 *
 * Core TypeScript type definitions for the entire variant system.
 * These types are used across all variant-related modules.
 */

import type { ClassValue } from "clsx";

// Global semantic variant types (used by all components)
export type SemanticVariant
  = | "default"
    | "neutral"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "critical"
    | "positive"
    | "negative";

// Button-specific variants
export type ButtonVariant
  = | "secondary"
    | "destructive"
    | "outline"
    | "outline-dashed"
    | "ghost"
    | "inverse-ghost"
    | "link"
    | "minimal";

// Tailwind color names - comprehensive list
export type TailwindColor
  = | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

// Tailwind color shades
export type TailwindShade
  = | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 950;

/**
 * Generate color classes for any Tailwind color
 * Supports both semantic variants and custom colors
 */
export type ColorClassOptions = {
  /** The color to use - can be semantic variant or Tailwind color */
  color: SemanticVariant | TailwindColor;
  /** Custom shade for Tailwind colors (ignored for semantic variants) */
  shade?: TailwindShade;
  /** Opacity for background colors */
  bgOpacity?: number;
  /** Opacity for border/ring colors */
  borderOpacity?: number;
};

/**
 * Type-safe way to extend variants with custom colors
 */
export type ExtendedVariant<T extends Record<string, unknown>> = T & {
  [K in TailwindColor]?: ClassValue[];
};
