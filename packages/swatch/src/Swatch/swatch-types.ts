import { PATTERNMODE_SIZE_VALUES, PATTERNMODE_SIZES } from "@patternmode/system";
import type { ObjectFit } from "@patternmode/system";
import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from "react";

export const SWATCH_SIZES = [...PATTERNMODE_SIZES, "4xl", "5xl", "6xl", "7xl"] as const;

export const SWATCH_SIZE_VALUES = {
  ...PATTERNMODE_SIZE_VALUES,
  "4xl": "4.5rem",
  "5xl": "5rem",
  "6xl": "5.5rem",
  "7xl": "6rem",
} as const satisfies Record<SwatchSize, string>;

export const SWATCH_SHAPES = ["circle", "pill", "square", "block"] as const;

export const SWATCH_TEXTURES = ["atmosphere"] as const;

export type SwatchSize = (typeof SWATCH_SIZES)[number];
export type SwatchShape = (typeof SWATCH_SHAPES)[number];
export type SwatchTexture = (typeof SWATCH_TEXTURES)[number];
export type SwatchColorStop = string | { color: string; ratio?: number };
type SwatchIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const getSwatchSizeVariableStyle = (
  size: SwatchSize,
  variableName = "--patternmode-swatch-size",
): Record<string, string> => ({
  [variableName]: SWATCH_SIZE_VALUES[size],
});

export interface SwatchProps extends HTMLAttributes<HTMLElement> {
  background?: string;
  /**
   * Optional media rendered inside the swatch frame.
   *
   * Swatch does not optimize image elements itself. Next.js consumers can pass
   * their own `next/image` `Image` component here and use `objectFit` /
   * `objectPosition` to align it with the swatch shape.
   */
  children?: ReactNode;
  color?: string;
  colors?: SwatchColorStop[];
  /**
   * Atmosphere density (0 = diffuse wash, 1 = dense pools). Only applies when
   * `texture="atmosphere"`.
   *
   * Default `0.5`.
   */
  density?: number;
  /**
   * Render a precise, flat color block: no top-to-bottom scrim gradient and
   * no drop shadow. Use for data visualisation where the fill must read as
   * the exact color value.
   *
   * Default `false`.
   */
  flat?: boolean;
  /**
   * Atmosphere gravity (-1 = pools sink, 1 = pools rise). Only applies when
   * `texture="atmosphere"`.
   *
   * Default `0`.
   */
  gravity?: number;
  icon?: SwatchIcon;
  isLight?: boolean;
  /**
   * Object-fit mode applied to media children through CSS variables.
   *
   * Default `"cover"`.
   */
  objectFit?: ObjectFit;
  /**
   * Object-position value applied to media children through CSS variables.
   *
   * Default `"center"`.
   */
  objectPosition?: string;
  onRemove?: () => void;
  raised?: boolean;
  removeLabel?: string;
  /**
   * Shows selected state and optional icon overlay.
   *
   * Default `false`.
   */
  selected?: boolean;
  /**
   * Rendered swatch shape.
   *
   * Default `"circle"`.
   */
  shape?: SwatchShape;
  /**
   * Whether selected swatches render their ring treatment.
   *
   * Default `true`.
   */
  showRing?: boolean;
  /**
   * Size token used for the swatch dimensions.
   *
   * Default `"base"`.
   */
  size?: SwatchSize;
  /**
   * Render supplied colors as a soft, layered radial atmosphere — overlapping
   * color pools — instead of a ratio-encoded weighted palette. Pair with
   * `density` and `gravity` to shape the pools.
   */
  texture?: SwatchTexture;
  /**
   * Marks the swatch as unavailable.
   *
   * Default `false`.
   */
  unavailable?: boolean;
}
