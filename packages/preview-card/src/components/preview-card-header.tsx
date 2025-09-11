"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardHeaderProps = {
  /**
   * Reference to the header element.
   */
  ref?: React.RefObject<HTMLDivElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Header section for preview card title and description with consistent spacing.
 */
const PreviewCardHeader = ({
  ref,
  className,
  ...props
}: PreviewCardHeaderProps) => (
  <div
    className={cx(previewCardVariants().header(), className)}
    ref={ref}
    {...props}
  />
);

PreviewCardHeader.displayName = "PreviewCardHeader";

export { PreviewCardHeader };
export type { PreviewCardHeaderProps };
