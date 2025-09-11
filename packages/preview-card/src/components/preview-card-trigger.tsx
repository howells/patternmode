"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardTriggerProps = {
  /**
   * Reference to the trigger element.
   */
  ref?: React.RefObject<React.ElementRef<
    typeof BasePreviewCard.Trigger
  > | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Trigger>;

/**
 * Preview card trigger component that shows preview on hover with link-like styling.
 */
const PreviewCardTrigger = ({
  ref,
  className,
  ...props
}: PreviewCardTriggerProps) => (
  <BasePreviewCard.Trigger
    className={cx(previewCardVariants().trigger(), className)}
    ref={ref}
    {...props}
  />
);

PreviewCardTrigger.displayName = "PreviewCardTrigger";

export { PreviewCardTrigger };
export type { PreviewCardTriggerProps };
