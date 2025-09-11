"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

/**
 * Default dimensions for preview card images.
 */
const DEFAULT_IMAGE_HEIGHT = 675;
const DEFAULT_IMAGE_WIDTH = 1200;

type PreviewCardImageProps = {
  /**
   * Reference to the image element.
   */
  ref?: React.RefObject<HTMLImageElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"img">;

/**
 * Image component for preview card headers with consistent aspect ratio.
 */
const PreviewCardImage = ({
  ref,
  className,
  alt,
  ...props
}: PreviewCardImageProps) => (
  // biome-ignore lint/performance/noImgElement: Library component supports plain <img>
  <img
    alt={alt ?? ""}
    className={cx(previewCardVariants().image(), className)}
    height={props.height ?? DEFAULT_IMAGE_HEIGHT}
    ref={ref}
    width={props.width ?? DEFAULT_IMAGE_WIDTH}
    {...props}
  />
);

PreviewCardImage.displayName = "PreviewCardImage";

export { PreviewCardImage };
export type { PreviewCardImageProps };
