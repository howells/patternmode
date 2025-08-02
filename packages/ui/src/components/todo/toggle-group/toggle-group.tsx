// Tremor ToggleGroup [v1.0.0] - Base UI

"use client";

import type { VariantProps } from "tailwind-variants";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import React, { createContext, use } from "react";
import { tv } from "tailwind-variants";

import { config } from "../../../lib/config";
import { cx, focusRing } from "../../../lib/utils";
import { getIconSizeForContext, Icon } from "../icon/icon";

// Create context for toggle group size
/**
 * Toggle Group.
 *
 * @id toggle-group
 * @name Toggle Group
 * @example
 * ```tsx
 * <ToggleGroup>Content</ToggleGroup>
 * ```
 */
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
  children: React.ReactNode;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseToggleGroup>,
      "children"
    > & VariantProps<typeof toggleGroupVariants>;

/**
 * A group of related toggle buttons that work together as a cohesive unit for multi-select or single-select interactions.
 *
 * ToggleGroup provides a structured way to group related toggle buttons with consistent styling
 * and behavior. It supports both single-select (radio-like) and multi-select (checkbox-like)
 * modes, making it perfect for toolbars, filter groups, view options, and settings panels.
 *
 * **Key Features:**
 * - **Flexible Selection**: Support for single-select and multi-select modes
 * - **Visual Grouping**: Cohesive appearance with grouped borders and consistent spacing
 * - **Multiple Orientations**: Horizontal (default) and vertical layouts
 * - **Icon Support**: Left and right icons with automatic sizing
 * - **Size Variants**: xs, sm, default, lg sizes for different contexts
 * - **Style Variants**: Default, outline, and ghost styles for various UI needs
 * - **Keyboard Navigation**: Arrow key navigation between items.
 *
 * **Common Use Cases:**
 * - Text formatting toolbars (Bold, Italic, Underline)
 * - View mode selection (List, Grid, Card views)
 * - Filter groups with multiple categories
 * - Alignment controls (Left, Center, Right)
 * - Tab-like navigation with toggle behavior
 * - Settings panels with grouped options.
 *
 * **Accessibility:**
 * - Proper ARIA attributes for group semantics
 * - Keyboard navigation with arrow keys
 * - Screen reader announcements for state changes
 * - Focus management within the group.
 *
 * @category inputs
 * @icon ToggleLeft
 * @example
 * ```tsx
 * // Text formatting toolbar (multi-select)
 * <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
 *   <ToggleGroupItem value="bold" leftIcon={Bold}>
 *     Bold
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="italic" leftIcon={Italic}>
 *     Italic
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="underline" leftIcon={Underline}>
 *     Underline
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // View mode selector (single-select)
 * <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
 *   <ToggleGroupItem value="list" leftIcon={List}>
 *     List
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="grid" leftIcon={Grid}>
 *     Grid
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="card" leftIcon={Card}>
 *     Card
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Icon-only buttons with small size
 * <ToggleGroup type="multiple" size="sm" variant="outline">
 *   <ToggleGroupItem value="bold" leftIcon={Bold} />
 *   <ToggleGroupItem value="italic" leftIcon={Italic} />
 *   <ToggleGroupItem value="underline" leftIcon={Underline} />
 *   <ToggleGroupItem value="strikethrough" leftIcon={Strikethrough} />
 * </ToggleGroup>
 *
 * // Vertical alignment controls
 * <ToggleGroup
 *   type="single"
 *   orientation="vertical"
 *   value={alignment}
 *   onValueChange={setAlignment}
 * >
 *   <ToggleGroupItem value="top" leftIcon={AlignTop}>
 *     Top
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" leftIcon={AlignCenter}>
 *     Center
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="bottom" leftIcon={AlignBottom}>
 *     Bottom
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Ghost variant for subtle grouping
 * <ToggleGroup type="single" variant="ghost" size="lg">
 *   <ToggleGroupItem value="all" rightIcon={ChevronDown}>
 *     All Items
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="active" rightIcon={ChevronDown}>
 *     Active
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="archived" rightIcon={ChevronDown}>
 *     Archived
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
/**
 * Group of toggle buttons for multiple selection with coordinated state.
 *
 * @id toggle-group
 * @name ToggleGroup
 * @icon ToggleLeft
 * @category inputs
 * @component
 * @param props - Component properties.
 */
const ToggleGroup = ({ ref, className, variant, size, orientation, children, ...props }: ToggleGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggleGroup> | null> }) => {
  const { root } = toggleGroupVariants({ variant, size, orientation });

  return (
    <ToggleGroupContext value={{ size, variant }}>
      <BaseToggleGroup ref={ref} className={cx(root(), className)} {...props}>
        {children}
      </BaseToggleGroup>
    </ToggleGroupContext>
  );
};

ToggleGroup.displayName = "ToggleGroup";

type ToggleGroupItemProps = {
  value: string;
  /**
   * Icon component to display on the left side.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon component to display on the right side.
   */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Stroke width for icons (defaults to global config).
   */
  iconStrokeWidth?: number;
} & React.ComponentPropsWithoutRef<typeof BaseToggle> & VariantProps<typeof toggleGroupVariants>;

const ToggleGroupItem = (
  { ref, className, variant, size, children, leftIcon: LeftIcon, rightIcon: RightIcon, iconStrokeWidth = config.getIconStrokeWidth(), ...props }: ToggleGroupItemProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> },
) => {
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
        <Icon icon={LeftIcon} size={iconSize} strokeWidth={iconStrokeWidth} />
      );
    }

    if (isIconOnly && hasRightIcon) {
      return (
        <Icon
          icon={RightIcon}
          size={iconSize}
          strokeWidth={iconStrokeWidth}
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
