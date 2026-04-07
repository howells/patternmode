import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import {
  getResponsiveClasses,
  isResponsiveValue,
  type ResponsiveValue,
} from "../../lib/responsive";
import type { ComponentSize } from "../../lib/size";

const SIZE_CLASSES: Record<ComponentSize, string> = {
  "2xs": "text-paragraph-sm", // 14/20
  xs: "text-paragraph-lg", // 18/24
  sm: "text-subheading", // 20/28, -1%
  base: "text-subheading-lg", // 24/32, -1%
  lg: "text-heading-sm", // 30/36, -1%
  xl: "text-heading", // 36/44, -1%
  "2xl": "text-heading-lg", // 48/56, -2%
  "3xl": "text-title", // 60/72, -2%
};

type HeadingLevel = "1" | "2" | "3" | "4" | "5" | "6";

/** Props for the Heading component. */
type HeadingProps = Omit<React.ComponentProps<"h1">, "size"> & {
  /** Semantic heading level (renders as h1-h6). Default "2". */
  level?: HeadingLevel;
  /** Visual size — accepts a static size or responsive object like `{ base: "lg", md: "2xl" }`. */
  size?: ResponsiveValue<ComponentSize>;
};

/**
 * Semantic heading element with configurable level and responsive size.
 *
 * @example
 * ```tsx
 * <Heading level="1" size="2xl">Page Title</Heading>
 * <Heading size={{ base: "lg", md: "2xl" }}>Responsive Heading</Heading>
 * ```
 */
function Heading({ level = "2", size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const effectiveSize = size ?? "sm";

  const sizeClasses = isResponsiveValue(effectiveSize)
    ? getResponsiveClasses(effectiveSize, SIZE_CLASSES)
    : [SIZE_CLASSES[effectiveSize as ComponentSize]];

  return (
    <Tag
      className={cn("trim-both font-semibold", ...sizeClasses, className)}
      data-component="heading"
      data-level={level}
      {...props}
    />
  );
}

export { Heading, SIZE_CLASSES as headingSizeClasses };
