// Tremor ToggleGroup [v1.0.0] - Base UI

"use client";

import { config } from "@/lib/config";
import { cx, focusRing } from "@/lib/utils";
import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Icon, getIconSizeForContext } from "../icon";

const toggleGroupVariants = tv({
  slots: {
    root: [
      // base
      "flex gap-px rounded-md border p-0.5",
      // colors
      "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
    ],
    item: [
      // base
      "flex items-center justify-center rounded-sm text-sm font-medium select-none transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      // active
      "active:bg-zinc-200 dark:active:bg-zinc-600",
      // pressed
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      // focus
      focusRing,
      "focus-visible:bg-none focus-visible:-outline-offset-1",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
        item: "",
      },
      outline: {
        root: "border-zinc-200 bg-transparent dark:border-zinc-600",
        item: "border border-transparent data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
      },
      ghost: {
        root: "border-transparent bg-transparent",
        item: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      },
    },
    size: {
      xs: {
        root: "gap-0.5 p-0.5",
        item: "h-5 px-1.5 text-xs rounded-sm", // Extra small size
      },
      sm: {
        root: "gap-0.5 p-0.5",
        item: "h-6 px-2 text-xs rounded-sm", // Match button sm: py-1.5 px-2.5 text-xs but adjusted for toggle
      },
      default: {
        root: "gap-px p-0.5",
        item: "h-8 px-3 text-sm rounded-sm", // Match button default: py-2 px-3 text-sm
      },
      lg: {
        root: "gap-1 p-1",
        item: "h-10 px-4 text-base rounded-md", // Match button lg: py-2.5 px-4 text-base
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
});

interface ToggleGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseToggleGroup>,
      "children"
    >,
    VariantProps<typeof toggleGroupVariants> {
  children: React.ReactNode;
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof BaseToggleGroup>,
  ToggleGroupProps
>(({ className, variant, size, orientation, children, ...props }, ref) => {
  const { root } = toggleGroupVariants({ variant, size, orientation });

  return (
    <BaseToggleGroup ref={ref} className={cx(root(), className)} {...props}>
      {children}
    </BaseToggleGroup>
  );
});

ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle>,
    VariantProps<typeof toggleGroupVariants> {
  value: string;
  /** Icon component to display on the left side */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Icon component to display on the right side */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Stroke width for icons (defaults to global config) */
  iconStrokeWidth?: number;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof BaseToggle>,
  ToggleGroupItemProps
>(
  (
    {
      className,
      variant,
      size,
      children,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconStrokeWidth = config.getIconStrokeWidth(),
      ...props
    },
    ref
  ) => {
    const { item } = toggleGroupVariants({ variant, size });

    const hasChildren = children != null && children !== "";
    const hasLeftIcon = LeftIcon != null;
    const hasRightIcon = RightIcon != null;

    // Check if children contains only screen reader text by checking the rendered string
    const childrenString = React.isValidElement(children) ? '' : String(children || '').trim();
    const hasVisibleText = childrenString.length > 0;

    // Determine if this is an icon-only button (no visible text content)
    const isIconOnly = !hasVisibleText && (hasLeftIcon || hasRightIcon);

    // Get appropriate icon size based on the toggle group size
    const iconSize = getIconSizeForContext(size);

    const renderContent = () => {
      // If no icons, return children directly
      if (!hasLeftIcon && !hasRightIcon) {
        return children;
      }

      // For icon-only buttons, render just the icon
      if (isIconOnly && hasLeftIcon && !hasRightIcon) {
        return (
          <Icon icon={LeftIcon} size={iconSize} strokeWidth={iconStrokeWidth} />
        );
      }

      // For buttons with text and icons
      return (
        <span className="flex items-center justify-center gap-2">
          {hasLeftIcon && (
            <Icon
              icon={LeftIcon}
              size={iconSize}
              strokeWidth={iconStrokeWidth}
            />
          )}
          {hasChildren && children}
          {hasRightIcon && (
            <Icon
              icon={RightIcon}
              size={iconSize}
              strokeWidth={iconStrokeWidth}
            />
          )}
        </span>
      );
    };

    return (
      <BaseToggle
        ref={ref}
        className={cx(
          item(),
          // For icon-only buttons, make them square like button icon sizes
          isIconOnly && size === "xs" && "min-w-5 w-5",
          isIconOnly && size === "sm" && "min-w-6 w-6", 
          isIconOnly && size === "default" && "min-w-8 w-8",
          isIconOnly && size === "lg" && "min-w-10 w-10",
          className
        )}
        {...props}
      >
        {renderContent()}
      </BaseToggle>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export the components
export { ToggleGroup, ToggleGroupItem, toggleGroupVariants };

export type { ToggleGroupItemProps, ToggleGroupProps };
