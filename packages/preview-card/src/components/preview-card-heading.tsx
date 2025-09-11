"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardHeadingProps = {
  /**
   * Reference to the title element.
   */
  ref?: React.RefObject<HTMLHeadingElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"h3">;

/**
 * Title heading component for preview cards with prominent typography.
 */
const PreviewCardHeading = ({
  ref,
  className,
  ...props
}: PreviewCardHeadingProps) => (
  <h3
    className={cx(previewCardVariants().heading(), className)}
    ref={ref}
    {...props}
  />
);

PreviewCardHeading.displayName = "PreviewCardHeading";

export { PreviewCardHeading };
export type { PreviewCardHeadingProps };
