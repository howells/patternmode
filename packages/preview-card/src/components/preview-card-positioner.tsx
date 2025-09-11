"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardPositionerProps = {
  /**
   * Reference to the positioner element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BasePreviewCard.Positioner
  > | null>;
  /**
   * Distance from trigger element in pixels.
   */
  sideOffset?: number;
  /**
   * Padding for collision detection boundaries.
   */
  collisionPadding?: number;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner>;

/**
 * Positioner component for smart preview card placement with collision detection.
 */
const PreviewCardPositioner = ({
  ref,
  sideOffset = 8,
  collisionPadding = 5,
  ...props
}: PreviewCardPositionerProps) => (
  <BasePreviewCard.Positioner
    className={cx(previewCardVariants().positioner(), props.className)}
    collisionPadding={collisionPadding}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
);

PreviewCardPositioner.displayName = "PreviewCardPositioner";

export { PreviewCardPositioner };
export type { PreviewCardPositionerProps };
