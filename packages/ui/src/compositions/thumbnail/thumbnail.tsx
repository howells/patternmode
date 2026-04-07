import type { ReactNode } from "react";

import {
  type ThumbnailSize as ThumbnailSizeScale,
  thumbnailSizeMap,
} from "../../lib/size";
import { cn } from "../../utils/cn";

/**
 * Size can be either a ThumbnailSize scale value or a pixel number.
 * - ThumbnailSize: Uses predefined scale ("xs", "sm", "base", "lg", "xl", "2xl")
 * - number: Uses exact pixel value via inline style
 */
type ThumbnailSize = ThumbnailSizeScale | number;

type ThumbnailVariant = "card" | "bare";

type SizeTier = "tiny" | "small" | "standard";

interface ThumbnailProps {
  /** Alt text for the image (used when `src` is provided) */
  alt?: string;
  /** Border color override (e.g., "white" for decorative use) */
  borderColor?: string;
  /** Custom content — takes precedence over `src` and `color` */
  children?: ReactNode;
  /** Additional className for the outer container */
  className?: string;
  /** Background color (solid fill, no image) */
  color?: string;
  /** Use a slightly lighter corner radius profile (useful for dense selectors) */
  compactRadius?: boolean;
  /** Disabled state - blocks interaction, reduced opacity */
  disabled?: boolean;
  /** Dotted border style (e.g., for pending/preview states) */
  dotted?: boolean;
  /** Muted state - reduced opacity, restores on hover */
  muted?: boolean;
  /**
   * Show inner padding gap - card style with rounded-lg inner content.
   * When true: outer rounded-xl with p-[3px], inner rounded-lg
   * When false: solid fill, no padding
   * @default true (for card variant), false (for bare variant)
   */
  padded?: boolean;
  /** Prioritize image loading for above-the-fold or interactive CTAs */
  priority?: boolean;
  /** Selection state - shows primary border + elevated shadow (card variant only) */
  selected?: boolean;
  /** Size - ComponentSize scale ("xs", "base", "2xl") or pixel number (58, 88) */
  size?: ThumbnailSize;
  /** Responsive size hint forwarded to the underlying `<img>` element */
  sizes?: string;
  /** Image source URL — renders a native `<img>` with `object-cover` */
  src?: string;
  /** Inline styles (useful for motion animations) */
  style?: React.CSSProperties;
  /**
   * Visual style variant.
   * - "card": Border, shadow, and optional padding (for selectable items)
   * - "bare": Simple container with muted background (for data grids, etc.)
   * @default "card"
   */
  variant?: ThumbnailVariant;
}

function getSizeTier(size: ThumbnailSize): SizeTier {
  if (typeof size === "number") {
    return size <= 56 ? "small" : "standard";
  }
  if (size === "3xs" || size === "2xs") {
    return "tiny";
  }
  if (size === "xs" || size === "sm") {
    return "small";
  }
  return "standard";
}

const containerRadiusMap: Record<
  SizeTier,
  { compact: string; normal: string }
> = {
  tiny: { compact: "rounded-full", normal: "rounded-full" },
  small: { compact: "rounded-lg", normal: "rounded-xl" },
  standard: { compact: "rounded-xl", normal: "rounded-2xl" },
};

const containerBorderMap: Record<SizeTier, string> = {
  tiny: "border",
  small: "border",
  standard: "border-2",
};

const containerShadowMap: Record<SizeTier, string> = {
  tiny: "shadow-xs",
  small: "shadow-sm",
  standard: "shadow-sm",
};

const containerPaddingMap: Record<SizeTier, string> = {
  tiny: "p-px",
  small: "p-[2px]",
  standard: "p-[3px]",
};

const paddedInnerRadiusMap: Record<
  SizeTier,
  { compact: string; normal: string }
> = {
  tiny: {
    compact: "overflow-hidden rounded-full",
    normal: "overflow-hidden rounded-full",
  },
  small: {
    compact: "overflow-hidden rounded-md",
    normal: "overflow-hidden rounded-lg",
  },
  standard: {
    compact: "overflow-hidden rounded-lg",
    normal: "overflow-hidden rounded-xl",
  },
};

const cardInnerRadiusMap: Record<
  SizeTier,
  { compact: string; normal: string }
> = {
  tiny: { compact: "rounded-full", normal: "rounded-full" },
  small: { compact: "rounded-lg", normal: "rounded-xl" },
  standard: { compact: "rounded-xl", normal: "rounded-2xl" },
};

function getBorderClasses(
  isCard: boolean,
  borderColor: string | undefined,
  selected: boolean,
): string {
  if (!isCard || borderColor) {
    return "";
  }
  return selected ? "border-primary" : "border-border/50 hover:border-border";
}

function getContainerRadius(
  tier: SizeTier,
  isCard: boolean,
  compactRadius: boolean,
): string {
  if (tier === "tiny") {
    return "rounded-full";
  }
  if (!isCard) {
    return "rounded-md";
  }
  return containerRadiusMap[tier][compactRadius ? "compact" : "normal"];
}

function getContainerBorder(tier: SizeTier, dotted: boolean): string {
  if (dotted) {
    return "border-2";
  }
  return containerBorderMap[tier];
}

function getContainerShadow(tier: SizeTier, selected: boolean): string {
  if (selected) {
    return "shadow-md";
  }
  return containerShadowMap[tier];
}

function getInnerRadius(
  tier: SizeTier,
  isPadded: boolean,
  isCard: boolean,
  compactRadius: boolean,
): string {
  if (isPadded) {
    return paddedInnerRadiusMap[tier][compactRadius ? "compact" : "normal"];
  }
  if (isCard) {
    return cardInnerRadiusMap[tier][compactRadius ? "compact" : "normal"];
  }
  return "rounded-md";
}

interface ResolvedThumbnailState {
  hasColor: boolean;
  hasImage: boolean;
  isCard: boolean;
  isPadded: boolean;
  isPixelSize: boolean;
  tier: SizeTier;
}

function resolveState(
  props: ThumbnailProps & { variant: ThumbnailVariant; size: ThumbnailSize },
): ResolvedThumbnailState {
  const isPixelSize = typeof props.size === "number";
  const isCard = props.variant === "card";
  return {
    isPixelSize,
    isCard,
    tier: getSizeTier(props.size),
    isPadded: props.padded ?? isCard,
    hasImage: !props.children && Boolean(props.src),
    hasColor: !(props.children || props.src) && Boolean(props.color),
  };
}

function buildContainerClasses(
  state: ResolvedThumbnailState,
  props: ThumbnailProps & { size: ThumbnailSize },
): string {
  const { tier, isCard, isPadded, isPixelSize } = state;
  return cn(
    "relative aspect-square shrink-0 overflow-hidden",
    getContainerRadius(tier, isCard, props.compactRadius ?? false),
    isCard && getContainerBorder(tier, props.dotted ?? false),
    isCard && getContainerShadow(tier, props.selected ?? false),
    !isCard && "bg-muted",
    isCard && "bg-card",
    isPadded && containerPaddingMap[tier],
    isCard && (props.dotted ? "border-dotted" : "border-solid"),
    getBorderClasses(isCard, props.borderColor, props.selected ?? false),
    props.muted && "opacity-50 hover:opacity-100",
    isCard &&
      "transition-[border-color,box-shadow,opacity] duration-150 ease-out",
    props.disabled && "cursor-not-allowed opacity-50",
    !isPixelSize && thumbnailSizeMap[props.size as ThumbnailSizeScale],
    props.className,
  );
}

function buildInnerClasses(
  state: ResolvedThumbnailState,
  compactRadius: boolean,
): string {
  const { tier, isPadded, isCard, hasColor } = state;
  return cn(
    "relative size-full",
    getInnerRadius(tier, isPadded, isCard, compactRadius),
    hasColor && isPadded && isCard && "shadow-inner",
  );
}

/**
 * Base visual thumbnail component for colors and images.
 *
 * Used as the visual foundation for VariantSelectorItem, image upload previews,
 * and decorative illustrations. Handles all visual states (selected, muted, dotted)
 * while leaving interactivity to parent wrappers.
 *
 * @example
 * ```tsx
 * // Image via src prop (recommended)
 * <Thumbnail src="/image.jpg" alt="Lace" size="lg" />
 *
 * // Solid color
 * <Thumbnail color="#a2b09f" size={58} />
 *
 * // Custom children (e.g. next/image for optimization)
 * <Thumbnail size="2xl">
 *   <Image src="/image.jpg" fill />
 * </Thumbnail>
 *
 * // Selection state
 * <Thumbnail src="/image.jpg" alt="Lace" size={88} padded selected />
 *
 * // Decorative with custom border
 * <Thumbnail color="#4c7573" size={58} borderColor="white" />
 * ```
 */
function Thumbnail({
  variant = "card",
  size = "base",
  color,
  src,
  priority = false,
  sizes,
  alt = "",
  children,
  selected = false,
  muted = false,
  dotted = false,
  disabled = false,
  borderColor,
  compactRadius = false,
  padded,
  className,
  style,
}: ThumbnailProps) {
  const props = {
    variant,
    size,
    color,
    src,
    priority,
    sizes,
    alt,
    children,
    selected,
    muted,
    dotted,
    disabled,
    borderColor,
    compactRadius,
    padded,
    className,
    style,
  };
  const state = resolveState(props);
  const { isPixelSize, isCard, hasImage, hasColor } = state;

  const containerClasses = buildContainerClasses(state, props);
  const innerClasses = buildInnerClasses(state, compactRadius);

  const containerStyle: React.CSSProperties = {
    ...(isPixelSize ? { width: size, height: size } : {}),
    ...style,
    ...(borderColor && isCard ? { borderColor } : {}),
  };

  const innerStyle: React.CSSProperties = hasColor
    ? { backgroundColor: color }
    : {};

  return (
    <div
      className={containerClasses}
      data-component="thumbnail"
      data-muted={muted}
      data-selected={selected}
      data-variant={variant}
      style={containerStyle}
    >
      <div className={innerClasses} style={innerStyle}>
        {children}
        {hasImage && (
          <img
            alt={alt}
            className="size-full object-cover"
            fetchPriority={priority ? "high" : "auto"}
            height={isPixelSize ? (size as number) : 200}
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            src={src}
            width={isPixelSize ? (size as number) : 200}
          />
        )}
      </div>
    </div>
  );
}

export {
  Thumbnail,
  type ThumbnailProps,
  type ThumbnailSize,
  type ThumbnailVariant,
};
