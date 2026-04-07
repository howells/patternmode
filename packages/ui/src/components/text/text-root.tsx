import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import {
  getResponsiveClasses,
  isResponsiveValue,
  type ResponsiveValue,
} from "../../lib/responsive";
import type { ComponentSize } from "../../lib/size";

const SIZE_CLASSES: Record<ComponentSize, string> = {
  "2xs": "text-xs", // 12px
  xs: "text-xs", // 12px
  sm: "text-sm", // 14px
  base: "text-base", // 16px
  lg: "text-lg", // 18px
  xl: "text-xl", // 20px
  "2xl": "text-2xl", // 24px
  "3xl": "text-3xl", // 30px
};

const VARIANT_CLASSES = {
  default: "",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
} as const;

const WEIGHT_CLASSES = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
} as const;

type TextVariant = keyof typeof VARIANT_CLASSES;
type TextWeight = keyof typeof WEIGHT_CLASSES;

type TextProps = Omit<React.ComponentProps<"p">, "size"> & {
  /** Text size — accepts a static size or responsive object like `{ base: "sm", md: "lg" }` */
  size?: ResponsiveValue<ComponentSize>;
  /** Text color variant */
  variant?: TextVariant;
  /** Font weight */
  weight?: TextWeight;
  /** Merge props onto child element using Slot */
  asChild?: boolean;
};

/**
 * Renders a text element with configurable size and variant styles.
 * Size accepts responsive values: `size={{ base: "sm", md: "lg" }}`.
 */
function Text({
  size,
  variant = "default",
  weight = "normal",
  className,
  asChild = false,
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : "p";
  const effectiveSize = size ?? "sm";

  const sizeClasses = isResponsiveValue(effectiveSize)
    ? getResponsiveClasses(effectiveSize, SIZE_CLASSES)
    : [SIZE_CLASSES[effectiveSize as ComponentSize]];

  return (
    <Comp
      className={cn(
        "trim-both max-w-prose text-pretty",
        ...sizeClasses,
        VARIANT_CLASSES[variant],
        WEIGHT_CLASSES[weight],
        className,
      )}
      data-component="text"
      data-slot="text"
      {...props}
    />
  );
}

export { SIZE_CLASSES as textSizeClasses, Text };
