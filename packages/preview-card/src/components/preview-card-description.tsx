"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardDescriptionProps = {
  /**
   * Reference to the description element.
   */
  ref?: React.RefObject<HTMLParagraphElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"p">;

/**
 * Description component for preview card content with muted styling.
 */
const PreviewCardDescription = ({
  ref,
  className,
  ...props
}: PreviewCardDescriptionProps) => (
  <p
    className={cx(previewCardVariants().description(), className)}
    ref={ref}
    {...props}
  />
);

PreviewCardDescription.displayName = "PreviewCardDescription";

export { PreviewCardDescription };
export type { PreviewCardDescriptionProps };
