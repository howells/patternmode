/**
 * Variant system for the PatternMode design system.
 *
 * Variants are organised in two tiers:
 * - **Semantic variants** (`SEMANTIC_VARIANTS`) convey meaning: default,
 *   secondary, affirmative, warning, destructive. These form the base layer
 *   shared by most components.
 * - **Extended variants** (`EXTENDED_VARIANTS`) add structural/behavioural
 *   options on top of the semantic set: outline, ghost, link, brand. Used by
 *   components like Button that need both semantic colour and presentation modes.
 *
 * Individual components may define their own subset (e.g., `BADGE_VARIANTS`,
 * `BUTTON_VARIANTS`) to restrict the allowed values.
 *
 * @module
 */

/**
 * Core semantic variants - the foundation for component styling.
 * Used by: Badge, Button (via mapping), Dot, IconBox, Alert, etc.
 */
export const SEMANTIC_VARIANTS = [
  "default",
  "secondary",
  "affirmative",
  "warning",
  "destructive",
] as const;

export type SemanticVariant = (typeof SEMANTIC_VARIANTS)[number];

/**
 * Extended variants - semantic + structural variants.
 * Used by components that need both semantic and structural styling.
 */
export const EXTENDED_VARIANTS = [
  ...SEMANTIC_VARIANTS,
  "outline",
  "ghost",
  "link",
  "brand",
] as const;

export type ExtendedVariant = (typeof EXTENDED_VARIANTS)[number];

/**
 * Badge-specific variants.
 */
export const BADGE_VARIANTS = [
  "default",
  "secondary",
  "affirmative",
  "warning",
  "destructive",
  "outline",
  "info",
  "brand",
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

/**
 * Button-specific variants (includes link, ghost as standalone).
 */
export const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
  "brand",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/**
 * Appearance modifiers - combine with any variant.
 */
export const APPEARANCE_MODIFIERS = [
  "solid",
  "light",
  "outline",
  "ghost",
  "dashed",
  "transparent",
  "input",
] as const;

export type AppearanceModifier = (typeof APPEARANCE_MODIFIERS)[number];

/**
 * Badge appearances (subset of modifiers).
 */
export const BADGE_APPEARANCES = [
  "solid",
  "light",
  "outline",
  "ghost",
] as const;

export type BadgeAppearance = (typeof BADGE_APPEARANCES)[number];

/**
 * Icon box variants (includes neutral/muted for presentational use).
 */
export const ICON_BOX_VARIANTS = [
  "default",
  "neutral",
  "muted",
  "secondary",
  "affirmative",
  "warning",
  "destructive",
] as const;

export type IconBoxVariant = (typeof ICON_BOX_VARIANTS)[number];

/**
 * Dot variants — aligned with Tag/Pill variant system.
 */
export const DOT_VARIANTS = [
  "default",
  "secondary",
  "affirmative",
  "warning",
  "info",
  "destructive",
  "brand",
] as const;

export type DotVariant = (typeof DOT_VARIANTS)[number];
