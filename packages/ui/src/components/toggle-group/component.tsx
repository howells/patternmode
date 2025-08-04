"use client";

import type { VariantProps } from "tailwind-variants";
import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import React, { createContext, use } from "react";
import { tv } from "tailwind-variants";
import { config } from "../../lib/config";
import { cx, focusRing } from "../../lib/utils";
import { getIconSizeForContext, Icon } from "../icon";

// Create context for toggle group size
const ToggleGroupContext = createContext<{
  size: VariantProps<typeof toggleGroupVariants>["size"];
  variant: VariantProps<typeof toggleGroupVariants>["variant"];
}>({
  size: "default",
  variant: "default",
});

const toggleGroupVariants = tv({
  slots: {
    root: [
      // base
      "flex gap-px rounded-md border p-0.5",
      // colors
      " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
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
        root: " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
        item: "",
      },
      outline: {
        root: " bg-transparent dark:border-zinc-600",
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
        item: "h-4 px-1 text-xs rounded-sm", // Extra small size
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

type ToggleGroupProps = {

  /**
   * The content of the toggle group, typically ToggleGroupItem components.
   */
  children: React.ReactNode;
  /**
   * The visual style variant of the toggle group.
   * @default "default"
   */
  variant?: VariantProps<typeof toggleGroupVariants>["variant"];
  /**
   * The size of the toggle group and its items.
   * @default "default"
   */
  size?: VariantProps<typeof toggleGroupVariants>["size"];
  /**
   * The layout orientation of the toggle group.
   * @default "horizontal"
   */
  orientation?: VariantProps<typeof toggleGroupVariants>["orientation"];
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseToggleGroup>,
      "children"
    >;

/**
 * A group of related toggle buttons that work together as a cohesive unit for multi-select or single-select interactions.
 */
const ToggleGroup = ({ ref, className, variant, size, orientation, children, ...props }: ToggleGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggleGroup> | null> }) => {
  const { root } = toggleGroupVariants({ variant, size, orientation });
  const contextValue = React.useMemo(() => ({ size, variant }), [size, variant]);

  return (
    <ToggleGroupContext value={contextValue}>
      <BaseToggleGroup data-testid="toggle-group" ref={ref} className={cx(root(), className)} {...props}>
        {children}
      </BaseToggleGroup>
    </ToggleGroupContext>
  );
};

ToggleGroup.displayName = "ToggleGroup";

type ToggleGroupItemProps = {
  /**
   * The unique value for this toggle item, used for selection state.
   */
  value: string;
  /**
   * Icon component to display on the left side of the toggle item.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon component to display on the right side of the toggle item.
   */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Custom stroke width for icons. If not provided, uses the global config value.
   */
  iconStrokeWidth?: number;
  /**
   * The visual style variant of the toggle item. Inherits from parent ToggleGroup if not specified.
   */
  variant?: VariantProps<typeof toggleGroupVariants>["variant"];
  /**
   * The size of the toggle item. Inherits from parent ToggleGroup if not specified.
   */
  size?: VariantProps<typeof toggleGroupVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToggle>;

const ToggleGroupItem = (
  { ref, className, variant, size, children, leftIcon: LeftIcon, rightIcon: RightIcon, iconStrokeWidth, ...props }: ToggleGroupItemProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> },
) => {
  const finalIconStrokeWidth = iconStrokeWidth ?? config.getIconStrokeWidth();
  const context = use(ToggleGroupContext);
  const finalSize = size ?? context.size;
  const finalVariant = variant ?? context.variant;
  const { item } = toggleGroupVariants({
    variant: finalVariant,
    size: finalSize,
  });

  const hasChildren = children != null && children !== "";
  const hasLeftIcon = LeftIcon != null;
  const hasRightIcon = RightIcon != null;

  // Check if children contains only screen reader text by checking the rendered string
  const childrenString = React.isValidElement(children)
    ? ""
    : String(children || "").trim();
  const hasVisibleText = childrenString.length > 0;

  // Determine if this is an icon-only button (no visible text content)
  const isIconOnly = !hasVisibleText && (hasLeftIcon || hasRightIcon);

  // Get appropriate icon size based on the toggle group size
  const iconSize = getIconSizeForContext(finalSize);

  const renderContent = () => {
    // If no icons, return children directly
    if (!hasLeftIcon && !hasRightIcon) {
      return children;
    }

    // For icon-only buttons, render just the icon
    if (isIconOnly && hasLeftIcon) {
      return (
        <Icon icon={LeftIcon} size={iconSize} strokeWidth={finalIconStrokeWidth} />
      );
    }

    if (isIconOnly && hasRightIcon) {
      return (
        <Icon
          icon={RightIcon}
          size={iconSize}
          strokeWidth={finalIconStrokeWidth}
        />
      );
    }

    // For buttons with text and icons
    return (
      <span className="flex items-center justify-center gap-2">
        {hasLeftIcon && (
          <Icon
            icon={LeftIcon}
            size={iconSize}
            strokeWidth={finalIconStrokeWidth}
          />
        )}
        {hasChildren && children}
        {hasRightIcon && (
          <Icon
            icon={RightIcon}
            size={iconSize}
            strokeWidth={finalIconStrokeWidth}
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
        isIconOnly && finalSize === "xs" && "min-w-4 w-4",
        isIconOnly && finalSize === "sm" && "min-w-6 w-6",
        isIconOnly && finalSize === "default" && "min-w-8 w-8",
        isIconOnly && finalSize === "lg" && "min-w-10 w-10",
        className,
      )}
      {...props}
    >
      {renderContent()}
    </BaseToggle>
  );
};

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export the components
export { ToggleGroup, ToggleGroupItem, toggleGroupVariants };

export type { ToggleGroupItemProps, ToggleGroupProps };
