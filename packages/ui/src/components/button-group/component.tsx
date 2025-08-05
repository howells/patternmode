"use client";

import type { GapValue, ResponsiveSpacing } from "../../lib/spacing-utils";
import type { ButtonProps } from "../button/component";
import * as React from "react";
import { tv } from "tailwind-variants";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getGapClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";

const buttonGroupVariants = tv({
  base: "flex flex-row items-center",
  variants: {
    align: {
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
    align: "start",
    wrap: false,
  },
});

type ButtonGroupProps = {
  /**
   * Button variant inherited by all child buttons.
   * Individual buttons can override this by specifying their own variant.
   */
  variant?: ButtonProps["variant"];
  /**
   * Button size inherited by all child buttons.
   * Individual buttons can override this by specifying their own size.
   * Also affects the gap between buttons.
   */
  size?: ButtonProps["size"];
  /**
   * Gap between buttons. Can be responsive.
   * Automatically calculated based on size if not provided.
   */
  gap?: GapValue | ResponsiveSpacing<GapValue>;
  /**
   * Horizontal alignment of the button group.
   * Controls how buttons are distributed within the container.
   */
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Whether buttons should wrap to new lines.
   * When true, buttons will wrap if they exceed container width.
   */
  wrap?: boolean;
  /**
   * Additional CSS classes for the container.
   * Applied to the button group wrapper element.
   */
  className?: string;
  /**
   * Child buttons to render.
   * Should only contain Button components.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Container for grouping buttons with shared styling and consistent spacing.
 */
export const ButtonGroup = ({
  variant,
  size = "default",
  gap,
  align = "start",
  wrap = false,
  className,
  children,
  ...props
}: ButtonGroupProps) => {
  // Calculate default gap based on size if not provided
  const defaultGap = React.useMemo(() => {
    if (gap) { return gap; }

    switch (size) {
      case "xs":
        return 1;
      case "sm":
        return 1.5;
      case "default":
        return 2;
      case "lg":
        return 2.5;
      case "icon-xs":
        return 1;
      case "icon-sm":
        return 1.5;
      case "icon":
        return 2;
      case "icon-lg":
        return 2.5;
      default:
        return 2;
    }
  }, [gap, size]);

  // Generate responsive gap classes
  const baseGap = getBaseSpacingValue(defaultGap);
  const responsiveGapClasses = generateResponsiveSpacingClasses("gap", defaultGap);
  const baseGapClass = baseGap !== undefined ? getGapClass(baseGap) : "";

  // Clone children and inject inherited props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Only apply props to Button components
    if (child.type && typeof child.type === "function" && child.type.displayName === "Button") {
      const childProps = { ...child.props };

      // Apply inherited variant if child doesn't have one
      if (variant && !childProps.variant) {
        childProps.variant = variant;
      }

      // Apply inherited size if child doesn't have one
      if (size && !childProps.size) {
        childProps.size = size;
      }

      return React.cloneElement(child, childProps);
    }

    return child;
  });

  return (
    <div
      data-testid="button-group"
      className={cx(
        buttonGroupVariants({ align, wrap }),
        baseGapClass,
        responsiveGapClasses,
        className,
      )}
      {...props}
    >
      {enhancedChildren}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

export type { ButtonGroupProps };
