"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import {
  arrowFillClasses,
  arrowSvgPaths,
  previewCardVariants,
} from "../variants";

type PreviewCardArrowProps = {
  /**
   * Reference to the arrow element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Arrow> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Arrow>;

/**
 * Arrow component pointing from preview card to trigger with automatic positioning.
 */
const PreviewCardArrow = ({
  ref,
  className,
  ...props
}: PreviewCardArrowProps) => (
  <BasePreviewCard.Arrow
    className={cx(previewCardVariants().arrow(), className)}
    ref={ref}
    {...props}
  >
    <svg
      aria-hidden="true"
      fill="none"
      height="10"
      viewBox="0 0 20 10"
      width="20"
    >
      <title>Preview arrow</title>
      <path className={arrowFillClasses.main} d={arrowSvgPaths.main} />
      <path className={arrowFillClasses.border1} d={arrowSvgPaths.border1} />
      <path className={arrowFillClasses.border2} d={arrowSvgPaths.border2} />
    </svg>
  </BasePreviewCard.Arrow>
);

PreviewCardArrow.displayName = "PreviewCardArrow";

export { PreviewCardArrow };
export type { PreviewCardArrowProps };
