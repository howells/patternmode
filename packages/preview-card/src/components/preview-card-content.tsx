"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardContentProps = {
  /**
   * Reference to the content element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Popup> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Distance from trigger element in pixels.
   */
  sideOffset?: number;
  /**
   * Preferred placement side relative to trigger.
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Alignment relative to the trigger element.
   */
  align?: "start" | "center" | "end";
  /**
   * Padding for collision detection boundaries.
   */
  collisionPadding?: number;
  /**
   * Size variant for the preview card.
   */
  size?: "sm" | "md" | "lg";
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Popup>;

/**
 * Main preview card content container with automatic positioning and portal rendering.
 */
const PreviewCardContent = ({
  ref,
  className,
  sideOffset = 8,
  side = "bottom",
  align = "center",
  collisionPadding = 5,
  size = "md",
  ...props
}: PreviewCardContentProps) => {
  const { content } = previewCardVariants({ size });

  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        align={align}
        collisionPadding={collisionPadding}
        side={side}
        sideOffset={sideOffset}
      >
        <BasePreviewCard.Popup
          className={cx(content(), className)}
          ref={ref}
          {...props}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
};

PreviewCardContent.displayName = "PreviewCardContent";

export { PreviewCardContent };
export type { PreviewCardContentProps };
