"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardFooterProps = {
  /**
   * Reference to the footer element.
   */
  ref?: React.RefObject<HTMLDivElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Footer section for preview card actions and metadata with subtle styling.
 */
const PreviewCardFooter = ({
  ref,
  className,
  ...props
}: PreviewCardFooterProps) => (
  <div
    className={cx(previewCardVariants().footer(), className)}
    ref={ref}
    {...props}
  />
);

PreviewCardFooter.displayName = "PreviewCardFooter";

export { PreviewCardFooter };
export type { PreviewCardFooterProps };
