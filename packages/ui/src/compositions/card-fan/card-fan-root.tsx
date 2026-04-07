"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { type ThumbnailSize, thumbnailSizePx } from "../../lib/size";
import { Thumbnail } from "../thumbnail";

export interface CardFanImages {
  center: string;
  left: string;
  right: string;
}

export interface CardFanImageProps {
  alt: string;
  className: string;
  draggable: boolean;
  fill?: boolean;
  height?: number;
  sizes?: string;
  src: string;
  width?: number;
}

export type CardFanVariant = "spread" | "stack";

export interface CardFanProps {
  /** Subtle micro-animation on hover (cards breathe outward) */
  animateOnHover?: boolean;
  /** Animate cards fanning out on mount */
  animateOnMount?: boolean;
  className?: string;
  images: CardFanImages;
  renderImage?: (props: CardFanImageProps) => ReactNode;
  /** Thumbnail size (default: "xl" = 96px) */
  size?: ThumbnailSize;
  /** Layout variant: "stack" horizontal fan with center prominent (default), "spread" tight fan */
  variant?: CardFanVariant;
}

const defaultRenderImage = ({
  src,
  alt,
  className,
  draggable,
  width,
  height,
  fill,
}: CardFanImageProps): ReactNode => (
  <img
    alt={alt}
    className={cn(fill ? "absolute inset-0 size-full" : "", className)}
    draggable={draggable}
    height={height ?? 1}
    src={src}
    width={width ?? 1}
  />
);

// =============================================================================
// LAYOUT CALCULATIONS
// =============================================================================

const SHADOW =
  "0 7px 10px -1px rgba(0, 0, 0, 0.1), 0 3.5px 7px -2px rgba(0, 0, 0, 0.1)";

// Rotation angle for side cards
const ROTATION_DEG = 8;

// Bounding-box multiplier for a square rotated by ROTATION_DEG:
// cos(8°) + sin(8°) ≈ 1.1295
const ROT_RAD = (ROTATION_DEG * Math.PI) / 180;
const WRAPPER_RATIO = Math.cos(ROT_RAD) + Math.sin(ROT_RAD);

interface CardPosition {
  left: number;
  rotation: number;
  top: number;
  zIndex: number;
}

interface Layout {
  outerHeight: number;
  outerWidth: number;
  positions: {
    left: CardPosition;
    center: CardPosition;
    right: CardPosition;
  };
  wrapperSize: number;
}

/**
 * Calculate layout for the spread variant.
 * Cards overlap heavily with tight gaps, right card on top.
 *
 * Derived from Figma reference (EditorialCardStack):
 * - Rotated cards sit in a square wrapper = cardSize * (cos θ + sin θ)
 * - Center card has no wrapper (not rotated)
 * - Overlap ratio ≈ 0.856 (Figma: 83px overlap / 97px card)
 */
function getSpreadLayout(cardSize: number): Layout {
  const wrapperSize = Math.ceil(cardSize * WRAPPER_RATIO);
  const overlap = Math.ceil(cardSize * 0.856);

  // Center card (no wrapper) vertically centered in wrapper height
  const centerTop = Math.round((wrapperSize - cardSize) / 2);
  const centerLeft = wrapperSize - overlap;
  const rightLeft = centerLeft + cardSize - overlap;

  return {
    wrapperSize,
    outerWidth: rightLeft + wrapperSize,
    outerHeight: wrapperSize,
    positions: {
      left: { left: 0, top: 0, rotation: -ROTATION_DEG, zIndex: 1 },
      center: { left: centerLeft, top: centerTop, rotation: 0, zIndex: 2 },
      right: { left: rightLeft, top: 0, rotation: ROTATION_DEG, zIndex: 3 },
    },
  };
}

/**
 * Calculate layout for the stack variant.
 * Center card prominent with two cards peeking from sides, center on top.
 */
function getStackLayout(cardSize: number): Layout {
  const wrapperSize = Math.ceil(cardSize * WRAPPER_RATIO);
  const overlap = Math.ceil(cardSize * 0.65);

  const centerTop = Math.round((wrapperSize - cardSize) / 2);
  const centerLeft = wrapperSize - overlap;
  const rightLeft = centerLeft + cardSize - overlap;

  return {
    wrapperSize,
    outerWidth: rightLeft + wrapperSize,
    outerHeight: wrapperSize,
    positions: {
      left: { left: 0, top: 0, rotation: -ROTATION_DEG, zIndex: 2 },
      center: { left: centerLeft, top: centerTop, rotation: 0, zIndex: 3 },
      right: { left: rightLeft, top: 0, rotation: ROTATION_DEG, zIndex: 1 },
    },
  };
}

// =============================================================================
// CARD COMPONENT
// =============================================================================

interface FanCardProps {
  animate: boolean;
  initialPosition?: CardPosition;
  position: CardPosition;
  renderImage: (props: CardFanImageProps) => ReactNode;
  size: ThumbnailSize;
  src: string;
  wrapperSize: number;
}

function FanCard({
  src,
  size,
  wrapperSize,
  position,
  initialPosition,
  animate,
  renderImage,
}: FanCardProps) {
  const needsWrapper =
    position.rotation !== 0 || (initialPosition?.rotation ?? 0) !== 0;

  const cardElement = (
    <Thumbnail
      borderColor="white"
      padded={false}
      size={size}
      style={{ boxShadow: SHADOW, borderWidth: 3, borderRadius: 20 }}
    >
      {renderImage({
        src,
        alt: "",
        className: "object-cover",
        draggable: false,
        fill: true,
        sizes: `${thumbnailSizePx[size]}px`,
      })}
    </Thumbnail>
  );

  if (needsWrapper) {
    return (
      <motion.div
        animate={{
          top: position.top,
          left: position.left,
          width: wrapperSize,
          height: wrapperSize,
          zIndex: position.zIndex,
        }}
        className="absolute flex items-center justify-center"
        initial={
          animate && initialPosition
            ? {
                top: initialPosition.top,
                left: initialPosition.left,
                width: wrapperSize,
                height: wrapperSize,
                zIndex: initialPosition.zIndex,
              }
            : false
        }
        transition={springs.snappy}
      >
        <motion.div
          animate={{ rotate: position.rotation }}
          initial={
            animate && initialPosition
              ? { rotate: initialPosition.rotation }
              : false
          }
          transition={springs.snappy}
        >
          {cardElement}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{
        top: position.top,
        left: position.left,
        zIndex: position.zIndex,
      }}
      className="absolute"
      initial={
        animate && initialPosition
          ? {
              top: initialPosition.top,
              left: initialPosition.left,
              zIndex: initialPosition.zIndex,
            }
          : false
      }
      transition={springs.snappy}
    >
      {cardElement}
    </motion.div>
  );
}

// Hover nudge: side cards shift outward and rotate slightly more
const HOVER_SHIFT = 3;
const HOVER_ROTATE = 1;
const HOVER_LIFT = 1;

function getNudgedPositions(
  positions: Layout["positions"],
): Layout["positions"] {
  return {
    left: {
      ...positions.left,
      left: positions.left.left - HOVER_SHIFT,
      rotation: positions.left.rotation - HOVER_ROTATE,
    },
    center: {
      ...positions.center,
      top: positions.center.top - HOVER_LIFT,
    },
    right: {
      ...positions.right,
      left: positions.right.left + HOVER_SHIFT,
      rotation: positions.right.rotation + HOVER_ROTATE,
    },
  };
}

/**
 * Get initial "stacked" positions for mount animation.
 * All cards start stacked in the center with no rotation.
 */
function getStackedInitialPositions(layout: Layout): Layout["positions"] {
  const { left: centerLeft, top: centerTop } = layout.positions.center;
  return {
    left: { left: centerLeft, top: centerTop, rotation: 0, zIndex: 1 },
    center: { left: centerLeft, top: centerTop, rotation: 0, zIndex: 2 },
    right: { left: centerLeft, top: centerTop, rotation: 0, zIndex: 3 },
  };
}

/**
 * CardFan UI component.
 * Import from "@patternmode/ui/compositions/card-fan".
 *
 * Cards always render in the same order (left, center, right) with z-index
 * controlling stacking. This enables smooth animations between variants.
 *
 * @param variant - "stack" horizontal fan with center prominent (default), "spread" tight fan
 * @param size - Thumbnail size scale (default: "xl")
 * @param animateOnMount - Animate cards fanning out on mount
 * @param animateOnHover - Subtle micro-animation on hover
 */
export function CardFan({
  images,
  className,
  variant = "stack",
  size = "xl",
  animateOnMount = false,
  animateOnHover = false,
  renderImage = defaultRenderImage,
}: CardFanProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardSizePx = thumbnailSizePx[size];

  const layout =
    variant === "spread"
      ? getSpreadLayout(cardSizePx)
      : getStackLayout(cardSizePx);

  // Nudge positions slightly on hover (micro-movement, not a full variant morph)
  const positions =
    animateOnHover && isHovered
      ? getNudgedPositions(layout.positions)
      : layout.positions;

  const outerStyle: CSSProperties = {
    height: layout.outerHeight,
    width: layout.outerWidth,
  };

  // Initial positions for mount animation only
  const initialPositions = animateOnMount
    ? getStackedInitialPositions(layout)
    : undefined;

  return (
    <motion.div
      className={cn("relative", className)}
      data-slot="card-fan"
      data-variant={variant}
      onMouseEnter={animateOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={animateOnHover ? () => setIsHovered(false) : undefined}
      style={outerStyle}
    >
      {/* Cards always render in same order; z-index controls stacking */}
      <FanCard
        animate={animateOnMount || animateOnHover}
        initialPosition={initialPositions?.left}
        position={positions.left}
        renderImage={renderImage}
        size={size}
        src={images.left}
        wrapperSize={layout.wrapperSize}
      />
      <FanCard
        animate={animateOnMount || animateOnHover}
        initialPosition={initialPositions?.center}
        position={positions.center}
        renderImage={renderImage}
        size={size}
        src={images.center}
        wrapperSize={layout.wrapperSize}
      />
      <FanCard
        animate={animateOnMount || animateOnHover}
        initialPosition={initialPositions?.right}
        position={positions.right}
        renderImage={renderImage}
        size={size}
        src={images.right}
        wrapperSize={layout.wrapperSize}
      />
    </motion.div>
  );
}
