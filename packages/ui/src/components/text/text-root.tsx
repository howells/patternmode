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

const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

type TextVariant = keyof typeof VARIANT_CLASSES;
type TextWeight = keyof typeof WEIGHT_CLASSES;
type TextAlign = keyof typeof ALIGN_CLASSES;
type TextFont = "sans" | "mono";

/** Props for the Text component. */
type TextProps = Omit<React.ComponentProps<"p">, "size"> & {
  /** Text alignment. */
  align?: TextAlign;
  /** Text size — accepts a static size or responsive object like `{ base: "sm", md: "lg" }`. */
  size?: ResponsiveValue<ComponentSize>;
  /** Text color variant. "default" inherits color, "muted" uses muted-foreground, "accent" uses accent-foreground. */
  variant?: TextVariant;
  /** Font weight. Default "normal". */
  weight?: TextWeight;
  /** Font family. "sans" (default) uses the system font, "mono" uses the monospace font. */
  font?: TextFont;
  /** Use tabular (fixed-width) numerals for aligned columns of numbers. */
  tabularNums?: boolean;
  /** Truncate text with ellipsis instead of wrapping. */
  truncate?: boolean;
  /** Merge props onto child element using Radix Slot. */
  asChild?: boolean;
};

/**
 * Body text element with configurable size, weight, color variant, and font family.
 * Supports responsive sizes.
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="medium">Bold text</Text>
 * <Text variant="muted" size={{ base: "sm", md: "base" }}>Responsive muted</Text>
 * <Text font="mono" tabularNums>usr_01HQ3A9V7X</Text>
 * <Text truncate>Very long text that will be cut off...</Text>
 * ```
 */
function Text({
  align,
  size,
  variant = "default",
  weight = "normal",
  font,
  tabularNums = false,
  truncate = false,
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
        "trim-both max-w-prose",
        truncate ? "truncate" : "text-pretty",
        ...sizeClasses,
        VARIANT_CLASSES[variant],
        WEIGHT_CLASSES[weight],
        align && ALIGN_CLASSES[align],
        font === "mono" && "font-mono",
        tabularNums && "tabular-nums",
        className,
      )}
      data-component="text"
      data-slot="text"
      {...props}
    />
  );
}

export { SIZE_CLASSES as textSizeClasses, Text };
