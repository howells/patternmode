"use client";

import { cx } from "../../lib/utils";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

// Responsive breakpoint type
type ResponsiveValue<T> =
  | T
  | {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
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
      0: "gap-0",
      1: "gap-1", // 4px
      2: "gap-2", // 8px
      3: "gap-3", // 12px
      4: "gap-4", // 16px
      5: "gap-5", // 20px
      6: "gap-6", // 24px
      8: "gap-8", // 32px
      10: "gap-10", // 40px
      12: "gap-12", // 48px
      16: "gap-16", // 64px
      20: "gap-20", // 80px
      24: "gap-24", // 96px
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
  defaultVariants: {
    direction: "vertical",
    gap: 4,
    wrap: false,
  },
});

type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
type StackPadding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
type StackDirection = "vertical" | "horizontal";

// Helper function to generate responsive classes
const generateResponsiveClasses = (
  property: "direction" | "gap" | "padding",
  value: ResponsiveValue<StackDirection | StackGap | StackPadding> | undefined
): string => {
  if (!value) return "";

  // If it's a simple value (not an object), return empty string to use variants
  if (typeof value !== "object") return "";

  const classes: string[] = [];
  const breakpoints = {
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  };

  Object.entries(value).forEach(([breakpoint, val]) => {
    if (val === undefined) return;

    const prefix = breakpoints[breakpoint as keyof typeof breakpoints] || "";

    if (property === "direction") {
      if (val === "vertical") {
        classes.push(`${prefix}flex-col`);
      } else if (val === "horizontal") {
        classes.push(`${prefix}flex-row`);
      }
    } else if (property === "gap") {
      classes.push(`${prefix}gap-${val}`);
    } else if (property === "padding") {
      classes.push(`${prefix}p-${val}`);
    }
  });

  return classes.join(" ");
};

// Helper function to get the base value (non-responsive)
const getBaseValue = <T,>(
  value: ResponsiveValue<T> | undefined
): T | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "object" && value !== null) {
    // Return the smallest breakpoint value or undefined
    const responsiveObj = value as {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };
    return responsiveObj.sm;
  }
  return value as T;
};

interface StackProps
  extends React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof stackVariants>, "gap" | "padding" | "direction"> {
  /**
   * The direction of the stack - can be responsive
   */
  direction?: ResponsiveValue<StackDirection>;
  /**
   * Gap between items (4px grid scale) - can be responsive
   */
  gap?: ResponsiveValue<StackGap>;
  /**
   * Padding around the stack (4px grid scale) - can be responsive
   */
  padding?: ResponsiveValue<StackPadding>;
  /**
   * How to align items along the cross axis
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /**
   * How to distribute items along the main axis
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Whether items should wrap to new lines
   */
  wrap?: boolean;
  /**
   * The HTML element to render
   */
  as?: React.ElementType;
  /**
   * Stack content
   */
  children: React.ReactNode;
}

const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      direction = "vertical",
      gap,
      padding,
      align,
      justify,
      wrap = false,
      as: Component = "div",
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Get base values for the variants system
    const baseDirection = getBaseValue(direction) ?? "vertical";
    const baseGap = getBaseValue(gap) ?? 4;
    const basePadding = getBaseValue(padding);

    // Generate responsive classes
    const responsiveDirectionClasses = generateResponsiveClasses(
      "direction",
      direction
    );
    const responsiveGapClasses = generateResponsiveClasses("gap", gap);
    const responsivePaddingClasses = generateResponsiveClasses(
      "padding",
      padding
    );

    return (
      <Component
        ref={ref}
        className={cx(
          stackVariants({
            direction: baseDirection as "vertical" | "horizontal",
            gap: baseGap as StackGap,
            padding: basePadding as StackPadding,
            align,
            justify,
            wrap,
          }),
          responsiveDirectionClasses,
          responsiveGapClasses,
          responsivePaddingClasses,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = "Stack";

// Helper components for common patterns
const VStack = React.forwardRef<HTMLElement, Omit<StackProps, "direction">>(
  ({ ...props }, ref) => <Stack ref={ref} direction="vertical" {...props} />
);
VStack.displayName = "VStack";

const HStack = React.forwardRef<HTMLElement, Omit<StackProps, "direction">>(
  ({ ...props }, ref) => <Stack ref={ref} direction="horizontal" {...props} />
);
HStack.displayName = "HStack";

export {
  HStack,
  Stack,
  stackVariants,
  VStack,
  type ResponsiveValue,
  type StackProps,
};
