import type { useRender } from "@base-ui/react/use-render";
import { PATTERNMODE_EXTENDED_SIZE_VALUES } from "@patternmode/system";
import type { ObjectFit, PatternmodeExtendedSize } from "@patternmode/system";
import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from "react";

export const SWATCH_VARIANTS = ["circle", "pill", "square", "block"] as const;

export const SWATCH_TEXTURES = ["atmosphere"] as const;

export type SwatchVariant = (typeof SWATCH_VARIANTS)[number];
export type SwatchTexture = (typeof SWATCH_TEXTURES)[number];
export type SwatchColorStop = string | { color: string; ratio?: number };
type SwatchIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const getSwatchSizeVariableStyle = (
  size: PatternmodeExtendedSize,
  variableName = "--patternmode-swatch-size",
) => ({
  [variableName]: PATTERNMODE_EXTENDED_SIZE_VALUES[size],
});

/**
 * Visual and behavioural props shared by every Swatch rendering mode. These
 * map deterministically to the fill, scrim, shape, and size treatment
 * regardless of whether the swatch renders its own wrapper or a `render`
 * element.
 */
export interface SwatchSharedProps extends HTMLAttributes<HTMLElement> {
  background?: string;
  color?: string;
  /**
   * How multiple `colors` blend: `"step"` renders hard bands, `"smooth"`
   * renders a continuous OKLab-interpolated ramp. Ignored by
   * `texture="atmosphere"`.
   *
   * Default `"step"`.
   */
  blend?: "smooth" | "step";
  colors?: SwatchColorStop[];
  /**
   * Atmosphere density (0 = diffuse wash, 1 = dense pools). Only applies when
   * `texture="atmosphere"`.
   *
   * Default `0.5`.
   */
  density?: number;
  /**
   * Draw a hairline just inside the edge, over the fill. A pale color on a
   * pale page otherwise has no boundary at all; the line is a translucent
   * dark so it lifts pale fills and disappears into dark ones. Tune it with
   * `--patternmode-swatch-edge`.
   *
   * Default `false`.
   */
  edge?: boolean;
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
  /**
   * Whether the fill reads as light, which sets `data-tone` and so a dark
   * foreground for the icon and any content. When omitted, a plain `color` is
   * analysed: hex (3, 4, 6 or 8 digits), `rgb()`, `hsl()`, `oklab()`,
   * `oklch()`, `white`, `black` and `transparent`. Any other `color` (`var()`,
   * `color-mix()`, most named colors), and every `background` or `colors`
   * fill, renders with the dark tone — pass `isLight` for those when the fill
   * is light.
   */
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
  raised?: boolean;
  /**
   * Shows selected state and optional icon overlay.
   *
   * Default `false`.
   */
  selected?: boolean;
  /**
   * Rendered swatch silhouette.
   *
   * Default `"circle"`.
   */
  variant?: SwatchVariant;
  /**
   * Whether selected swatches render their ring treatment.
   *
   * Default `true`.
   */
  showRing?: boolean;
  /**
   * Size token on the extended Patternmode scale (`2xs`…`7xl`) used for the
   * swatch dimensions.
   *
   * Default `"base"`.
   */
  size?: PatternmodeExtendedSize;
  /**
   * Render supplied colors as a soft, layered radial atmosphere — overlapping
   * color pools — instead of a ratio-encoded weighted palette. Pair with
   * `density` and `gravity` to shape the pools.
   */
  texture?: SwatchTexture;
  /**
   * Renders a visible backdrop behind the fill so a partially transparent
   * Visual Value reads as transparent rather than as white or as absence.
   *
   * Opt in explicitly. CSS alpha cannot be detected reliably across every
   * accepted value — a gradient, a `color-mix()`, a CSS variable or child
   * media can all carry alpha the component cannot see — so this is a
   * declaration by the caller, not an inference.
   *
   * Tune it with `--patternmode-swatch-backdrop-size` and
   * `--patternmode-swatch-backdrop-color`.
   *
   * Default `false`.
   */
  transparencyBackdrop?: boolean;
  /**
   * Marks the swatch as unavailable.
   *
   * Default `false`.
   */
  unavailable?: boolean;
}

/**
 * Default Swatch props: the swatch renders its own wrapper element
 * (`<figure>`, or `<fieldset>` when `onRemove` is set).
 */
export interface SwatchDefaultProps extends SwatchSharedProps {
  render?: undefined;
  /**
   * Optional media rendered inside the swatch frame.
   *
   * Swatch does not optimize image elements itself. Next.js consumers can pass
   * their own `next/image` `Image` component here and use `objectFit` /
   * `objectPosition` to align it with the swatch shape.
   */
  children?: ReactNode;
  /** Renders a remove affordance and calls this after stopping propagation. */
  onRemove?: () => void;
  /** Accessible label for the remove affordance. Defaults to the swatch label. */
  removeLabel?: string;
}

/**
 * `render` Swatch props: the swatch merges its className, style (size/fill
 * CSS variables), data attributes, and other props onto the element passed via
 * `render`, rendering through it (Base UI render-prop pattern) instead of
 * emitting its own wrapper. Use this when the swatch must *be* an interactive
 * element, such as a `<button>` cell in a color matrix.
 *
 * The `render` element must be childless — put the swatch's content in
 * `children`, e.g. `<Swatch render={<button type="button" />}>A1</Swatch>`.
 * Children on the `render` element itself would override the swatch's own fill
 * layers.
 *
 * `onRemove` is unsupported in this mode — its remove affordance cannot be
 * composed into an arbitrary rendered element. Wrap a default Swatch instead
 * when a remove control is required.
 */
export interface SwatchRenderProps extends SwatchSharedProps {
  render: useRender.RenderProp;
  children?: ReactNode;
  onRemove?: never;
  removeLabel?: never;
}

export type SwatchProps = SwatchDefaultProps | SwatchRenderProps;
