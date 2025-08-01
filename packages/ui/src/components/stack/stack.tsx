"use client";

/**
 * Stack Components.
 *
 * Flexible layout components for arranging content in vertical or horizontal stacks
 * with consistent spacing and alignment. Supports responsive configurations and provides
 * convenient helper components for common layout patterns.
 *
 * Features:
 * - Responsive direction, gap, and padding configuration
 * - 4px grid-based spacing system (1-24 scale)
 * - Flexible alignment and justification options
 * - Wrap support for flexible layouts
 * - Helper components (VStack, HStack) for common patterns
 * - Custom element type support (as prop)
 * - TypeScript support for responsive values.
 *
 * @category layout
 * @icon Layers
 * @example
 * ```tsx
 * // Basic vertical stack
 * <Stack gap={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * // Horizontal stack with responsive configuration
 * <Stack
 *   direction={{ sm: "vertical", md: "horizontal" }}
 *   gap={{ sm: 2, md: 6 }}
 *   align="center"
 *   justify="between"
 * >
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </Stack>
 *
 * // Card layout with padding
 * <Stack gap={6} padding={8} as="section">
 *   <Heading>Dashboard</Heading>
 *   <Text>Welcome to your dashboard</Text>
 *   <Stack direction="horizontal" gap={4}>
 *     <Button>Get Started</Button>
 *     <Button variant="secondary">Learn More</Button>
 *   </Stack>
 * </Stack>
 *
 * // Responsive form layout
 * <Stack gap={4}>
 *   <Stack direction={{ sm: "vertical", lg: "horizontal" }} gap={4}>
 *     <Field>
 *       <FieldLabel>First Name</FieldLabel>
 *       <FieldControl />
 *     </Field>
 *     <Field>
 *       <FieldLabel>Last Name</FieldLabel>
 *       <FieldControl />
 *     </Field>
 *   </Stack>
 *   <Field>
 *     <FieldLabel>Email</FieldLabel>
 *     <FieldControl type="email" />
 *   </Field>
 * </Stack>
 *
 * // Helper components for convenience
 * <VStack gap={6}>
 *   <Heading>Vertical Stack</Heading>
 *   <Text>Items arranged vertically</Text>
 * </VStack>
 *
 * <HStack gap={4} align="center">
 *   <Icon name="check" />
 *   <Text>Horizontal Stack</Text>
 * </HStack>
 *
 * // Flexible grid-like layout with wrapping
 * <Stack direction="horizontal" gap={4} wrap align="stretch">
 *   <Card className="flex-1">Card 1</Card>
 *   <Card className="flex-1">Card 2</Card>
 *   <Card className="flex-1">Card 3</Card>
 * </Stack>
 * ```
 */

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

/**
 * Responsive value type for stack properties.
 *
 * Allows specifying different values for different screen sizes.
 * Can be a single value or an object with breakpoint-specific values.
 */
type ResponsiveValue<T>
  = | T
    | {
      /**
       * Small screens (640px+).
       */
      "sm"?: T;
      /**
       * Medium screens (768px+).
       */
      "md"?: T;
      /**
       * Large screens (1024px+).
       */
      "lg"?: T;
      /**
       * Extra large screens (1280px+).
       */
      "xl"?: T;
      /**
       * 2X large screens (1536px+).
       */
      "2xl"?: T;
    };

// Stack variants using a 4px grid scale
const stackVariants = tv({
  base: "flex",
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    gap: {
      "0": "gap-0",
      "1": "gap-1", // 4px
      "2": "gap-2", // 8px
      "3": "gap-3", // 12px
      "4": "gap-4", // 16px
      "5": "gap-5", // 20px
      "6": "gap-6", // 24px
      "8": "gap-8", // 32px
      "10": "gap-10", // 40px
      "12": "gap-12", // 48px
      "16": "gap-16", // 64px
      "20": "gap-20", // 80px
      "24": "gap-24", // 96px
      "-6": "", // -24px negative spacing (handled by compoundVariants)
      "-5": "", // -20px negative spacing (handled by compoundVariants)
      "-4": "", // -16px negative spacing (handled by compoundVariants)
      "-3": "", // -12px negative spacing (handled by compoundVariants)
      "-2": "", // -8px negative spacing (handled by compoundVariants)
      "-1": "", // -4px negative spacing (handled by compoundVariants)
    },
    padding: {
      0: "p-0",
      1: "p-1", // 4px
      2: "p-2", // 8px
      3: "p-3", // 12px
      4: "p-4", // 16px
      5: "p-5", // 20px
      6: "p-6", // 24px
      8: "p-8", // 32px
      10: "p-10", // 40px
      12: "p-12", // 48px
      16: "p-16", // 64px
      20: "p-20", // 80px
      24: "p-24", // 96px
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  compoundVariants: [
    // Negative spacing for horizontal direction
    { direction: "horizontal", gap: "-6", class: "-space-x-6" },
    { direction: "horizontal", gap: "-5", class: "-space-x-5" },
    { direction: "horizontal", gap: "-4", class: "-space-x-4" },
    { direction: "horizontal", gap: "-3", class: "-space-x-3" },
    { direction: "horizontal", gap: "-2", class: "-space-x-2" },
    { direction: "horizontal", gap: "-1", class: "-space-x-1" },
    // Negative spacing for vertical direction
    { direction: "vertical", gap: "-6", class: "-space-y-6" },
    { direction: "vertical", gap: "-5", class: "-space-y-5" },
    { direction: "vertical", gap: "-4", class: "-space-y-4" },
    { direction: "vertical", gap: "-3", class: "-space-y-3" },
    { direction: "vertical", gap: "-2", class: "-space-y-2" },
    { direction: "vertical", gap: "-1", class: "-space-y-1" },
  ],
  defaultVariants: {
    direction: "vertical",
    gap: "4",
    wrap: false,
  },
});

/**
 * Stack gap values using 4px grid scale.
 * Accepts both numbers and strings for developer convenience.
 */
type StackGap = "-6" | "-5" | "-4" | "-3" | "-2" | "-1" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/**
 * Stack padding values using 4px grid scale.
 */
type StackPadding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/**
 * Stack direction options.
 */
type StackDirection = "vertical" | "horizontal";

// Helper function to generate responsive classes
const generateResponsiveClasses = (
  property: "direction" | "gap" | "padding",
  value: ResponsiveValue<StackDirection | StackGap | StackPadding> | undefined,
): string => {
  if (!value) {
    return "";
  }

  // If it's a simple value (not an object), return empty string to use variants
  if (typeof value !== "object") {
    return "";
  }

  const classes: string[] = [];
  const breakpoints = {
    "sm": "sm:",
    "md": "md:",
    "lg": "lg:",
    "xl": "xl:",
    "2xl": "2xl:",
  };

  Object.entries(value).forEach(([breakpoint, val]) => {
    if (val === undefined) {
      return;
    }

    const prefix = breakpoints[breakpoint as keyof typeof breakpoints] || "";

    if (property === "direction") {
      if (val === "vertical") {
        classes.push(`${prefix}flex-col`);
      }
      else if (val === "horizontal") {
        classes.push(`${prefix}flex-row`);
      }
    }
    else if (property === "gap") {
      const normalizedVal = String(val);
      classes.push(`${prefix}gap-${normalizedVal}`);
    }
    else if (property === "padding") {
      classes.push(`${prefix}p-${val}`);
    }
  });

  return classes.join(" ");
};

// Helper function to convert gap values to strings
const normalizeGapValue = (value: StackGap): string => {
  return String(value);
};

// Helper function to get the base value (non-responsive)
const getBaseValue = <T,>(
  value: ResponsiveValue<T> | undefined,
): T | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === "object" && value !== null) {
    // Return the smallest breakpoint value or undefined
    const responsiveObj = value as {
      "sm"?: T;
      "md"?: T;
      "lg"?: T;
      "xl"?: T;
      "2xl"?: T;
    };
    return responsiveObj.sm;
  }
  return value as T;
};

/**
 * Props for the Stack component.
 *
 * Configuration for stack layout, spacing, and responsive behavior.
 */
type StackProps = {
  /**
   * The direction of the stack - can be responsive.
   */
  direction?: ResponsiveValue<StackDirection>;
  /**
   * Gap between items (4px grid scale) - can be responsive.
   */
  gap?: ResponsiveValue<StackGap>;
  /**
   * Padding around the stack (4px grid scale) - can be responsive.
   */
  padding?: ResponsiveValue<StackPadding>;
  /**
   * How to align items along the cross axis.
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /**
   * How to distribute items along the main axis.
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Whether items should wrap to new lines.
   */
  wrap?: boolean;
  /**
   * The HTML element to render.
   */
  as?: React.ElementType;
  /**
   * Stack content.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement> & Omit<VariantProps<typeof stackVariants>, "gap" | "padding" | "direction">;

/**
 * Main stack component for flexible layouts.
 *
 * Arranges children in vertical or horizontal stacks with consistent spacing,
 * alignment, and responsive behavior. Supports custom elements and wrapping.
 *
 * @param direction - Stack direction (vertical or horizontal), can be responsive.
 * @param gap - Gap between items using 4px grid scale, can be responsive.
 * @param padding - Padding around stack using 4px grid scale, can be responsive.
 * @param align - Cross-axis alignment (start, center, end, stretch, baseline).
 * @param justify - Main-axis distribution (start, center, end, between, around, evenly).
 * @param wrap - Whether items should wrap to new lines.
 * @param as - HTML element type to render.
 * @param className - Additional CSS classes.
 * @param children - Stack content.
 */
/**
 * Layout component for arranging items vertically or horizontally with consistent spacing.
 *
 * @id stack
 * @name Stack
 * @icon Layers
 * @category utility
 * @component
 * @param props - Component properties.
 */
const Stack = (
  { ref, direction = "vertical", gap, padding, align, justify, wrap = false, as: Component = "div", className, children, ...props }: StackProps & { ref?: React.RefObject<HTMLElement | null> },
) => {
  // Get base values for the variants system
  const baseDirection = getBaseValue(direction) ?? "vertical";
  const baseGapValue = getBaseValue(gap) ?? 4;
  const basePadding = getBaseValue(padding);

  // Normalize gap value to string for tailwind variants
  const baseGap = normalizeGapValue(baseGapValue);

  // Debug logging for negative gaps
  if (typeof baseGapValue === "number" && baseGapValue < 0) {
    console.warn("Stack Debug:", {
      direction: baseDirection,
      gap: baseGap,
      baseGapValue,
      originalGap: gap,
    });
  }

  // Generate responsive classes
  const responsiveDirectionClasses = generateResponsiveClasses(
    "direction",
    direction,
  );
  const responsiveGapClasses = generateResponsiveClasses("gap", gap);
  const responsivePaddingClasses = generateResponsiveClasses(
    "padding",
    padding,
  );

  const generatedClasses = stackVariants({
    direction: baseDirection as "vertical" | "horizontal",
    gap: baseGap as "4" | "0" | "1" | "2" | "3" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | "-6" | "-5" | "-4" | "-3" | "-2" | "-1",
    padding: basePadding as StackPadding,
    align,
    justify,
    wrap,
  });

  // Debug logging for negative gaps
  if (typeof baseGapValue === "number" && baseGapValue < 0) {
    console.warn("Generated classes:", generatedClasses);
  }

  return (
    <Component
      ref={ref}
      className={cx(
        generatedClasses,
        responsiveDirectionClasses,
        responsiveGapClasses,
        responsivePaddingClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Stack.displayName = "Stack";

/**
 * Vertical stack helper component.
 *
 * Convenience component that wraps Stack with direction="vertical".
 * Provides a shorter syntax for common vertical layout patterns.
 *
 * @param props - All Stack props except direction.
 */
const VStack = ({ ref, ...props }: Omit<StackProps, "direction"> & { ref?: React.RefObject<HTMLElement | null> }) => <Stack ref={ref} direction="vertical" {...props} />;
VStack.displayName = "VStack";

/**
 * Horizontal stack helper component.
 *
 * Convenience component that wraps Stack with direction="horizontal".
 * Provides a shorter syntax for common horizontal layout patterns.
 *
 * @param props - All Stack props except direction.
 */
const HStack = ({ ref, ...props }: Omit<StackProps, "direction"> & { ref?: React.RefObject<HTMLElement | null> }) => <Stack ref={ref} direction="horizontal" {...props} />;
HStack.displayName = "HStack";

export {
  HStack,
  type ResponsiveValue,
  Stack,
  type StackProps,
  stackVariants,
  VStack,
};
