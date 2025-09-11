"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardBodyProps = {
  /**
   * Reference to the body element.
   */
  ref?: React.RefObject<HTMLDivElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Body section for preview card main content between header and footer.
 */
const PreviewCardBody = ({
  ref,
  className,
  ...props
}: PreviewCardBodyProps) => (
  <div
    className={cx(previewCardVariants().body(), className)}
    ref={ref}
    {...props}
  />
);

PreviewCardBody.displayName = "PreviewCardBody";

export { PreviewCardBody };
export type { PreviewCardBodyProps };
