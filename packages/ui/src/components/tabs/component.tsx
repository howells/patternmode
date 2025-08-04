"use client";

import type { ButtonSize } from "../button/component";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import React from "react";

import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";
import { Button } from "../button";

const tabsVariants = tv({
  slots: {
    root: [
      // base
      "w-full",
    ],
    list: [
      // base styles will be applied via variants
    ],
    tab: [
      // base styles will be applied via variants
    ],
    indicator: [
      // base
      "absolute transition-all duration-200 ease-out",
    ],
    panel: [
      // base
      "outline-hidden",
      // focus
      focusRing,
    ],
  },
  variants: {
    variant: {
      solid: {
        list: [
          // base - button collection style (sized for default = text-xs)
          "inline-flex items-center justify-start bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-md",
          // Reduce button heights inside tabs to account for container padding
          "[&_button]:!h-[calc(var(--control-height-base)-0.25rem)]", // default: 40px - 4px = 36px
          "[&_button[class*='h-control-xs']]:!h-[calc(var(--control-height-xs)-0.25rem)]", // xs: 28px - 4px = 24px
          "[&_button[class*='h-control-sm']]:!h-[calc(var(--control-height-sm)-0.25rem)]", // sm: 36px - 4px = 32px
          "[&_button[class*='h-control-lg']]:!h-[calc(var(--control-height-lg)-0.5rem)]", // lg: 48px - 8px = 40px (lg uses p-1)
        ],
        tab: [
          // For solid variant, we'll use Button component instead of these styles
          // Keep minimal styles for the Base UI Tab wrapper
          "relative",
        ],
        indicator: [
          // no indicator for solid variant - the button styling handles the active state
          "hidden",
        ],
      },
      line: {
        list: [
          // base
          "relative flex items-center justify-start",
          // bottom border (divider)
          "border-b  dark:border-zinc-800",
        ],
        tab: [

        ],
        indicator: [
          // line indicator - bottom line that sits on the divider
          "-bottom-px left-0 h-px w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] z-10",
          "bg-zinc-900 dark:bg-zinc-50",
        ],
      },
    },
    size: {
      xs: {
        list: "gap-x-2", // very tight spacing for line variant
        tab: "", // very small height and text size for line variant only
      },
      sm: {
        list: "gap-x-3", // tighter spacing for line variant
        tab: "", // smaller height and text size for line variant only
      },
      default: {
        list: "gap-x-4", // spacing for line variant
        tab: "", // height and text size for line variant only
      },
      lg: {
        list: "gap-x-6", // wider spacing for line variant
        tab: "", // larger height and text size for line variant only
      },
    },
    hideDivider: {
      true: {},
    },
    hideBorder: {
      true: {},
    },
  },
  compoundVariants: [
    // Size adjustments for solid variant - override gap with padding
    {
      variant: "solid",
      size: "xs",
      class: {
        list: [
          "gap-x-0 p-0.5 rounded-sm", // Remove gap, very compact for xs
          // Reduce button heights inside tabs for xs size
          "[&_button]:!h-[calc(var(--control-height-xs)-0.25rem)]", // xs: 28px - 4px = 24px
        ],
      },
    },
    {
      variant: "solid",
      size: "sm",
      class: {
        list: [
          "gap-x-0 p-0.5 rounded-md", // Remove gap, keep compact for sm
          // Reduce button heights inside tabs for sm size
          "[&_button]:!h-[calc(var(--control-height-sm)-0.25rem)]", // sm: 36px - 4px = 32px
        ],
      },
    },
    {
      variant: "solid",
      size: "default",
      class: {
        list: [
          "gap-x-0 p-0.5 rounded-lg", // Remove gap, use padding
          // Reduce button heights inside tabs for default size
          "[&_button]:!h-[calc(var(--control-height-base)-0.25rem)]", // default: 40px - 4px = 36px
        ],
      },
    },
    {
      variant: "solid",
      size: "lg",
      class: {
        list: [
          "gap-x-0 p-0.5 rounded-lg", // Remove gap, larger container for lg
          // Reduce button heights inside tabs for lg size (uses p-1 = 8px total)
          "[&_button]:!h-[calc(var(--control-height-lg)-0.5rem)]", // lg: 48px - 8px = 40px
        ],
      },
    },
    {
      variant: "line",
      hideDivider: true,
      class: {
        list: "border-b-0",
      },
    },
    {
      variant: "line",
      hideBorder: true,
      class: {
        indicator: "hidden",
      },
    },
  ],
  defaultVariants: {
    variant: "line",
    size: "default",
    hideDivider: false,
    hideBorder: false,
  },
});

type TabsListVariant = "solid" | "line";

const TabsListVariantContext = React.createContext<TabsListVariant>("line");
const TabsListSizeContext = React.createContext<ButtonSize>(
  "default",
);

type TabsProps = Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Root>, "orientation"> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Root> | null>;
};

type TabsListProps = {
  /**
   * Style variant for the tabs list.
   * "solid" creates button-like tabs in a container, "line" creates underlined tabs with a divider.
   * @default "line"
   */
  variant?: TabsListVariant;
  /**
   * Hide the bottom divider line (only applies to "line" variant).
   * @default false
   */
  hideDivider?: boolean;
  /**
   * Hide the active tab border/indicator (only applies to "line" variant).
   * @default false
   */
  hideBorder?: boolean;
  /**
   * Size for solid variant buttons. Affects padding and text size.
   * @default "default"
   */
  size?: ButtonSize;
} & React.ComponentPropsWithoutRef<typeof BaseTabs.List>;

type TabsTriggerProps = {
  /**
   * Icon component to display on the left side of the tab trigger.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon component to display on the right side of the tab trigger.
   */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Stroke width for icons.
   * @default 1.5
   */
  iconStrokeWidth?: number;
} & React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>;

type TabsContentProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Panel> | null>;
};

/**
 * Root tabs component built on Base UI's Tabs primitive.
 */
const Tabs = ({ ref: forwardedRef, className, ...props }: TabsProps) => {
  const { root } = tabsVariants();
  return (
    <BaseTabs.Root
      ref={forwardedRef}
      className={cx(root(), className)}
      data-testid="tabs"
      {...props}
    />
  );
};

Tabs.displayName = "Tabs";

/**
 * Container for tab triggers with visual indicator.
 * When using solid variant, automatically adjusts the height of sibling buttons to align visually.
 */
const TabsList = (
  { ref: forwardedRef, className, variant = "line", hideDivider = false, hideBorder = false, size = "default", children, ...props }: TabsListProps & { ref?: React.RefObject<React.ElementRef<typeof BaseTabs.List> | null> },
) => {
  const { list } = tabsVariants({ variant, size, hideDivider, hideBorder });

  return (
    <BaseTabs.List
      ref={forwardedRef}
      className={cx(list(), className)}
      {...props}
    >
      <TabsListVariantContext value={variant}>
        <TabsListSizeContext value={size}>
          {children}
          {variant === "line" && (
            <BaseTabs.Indicator
              key={`${variant}-indicator`}
              className={cx(
                tabsVariants({
                  variant,
                  size,
                  hideDivider,
                  hideBorder,
                }).indicator(),
              )}
            />
          )}
        </TabsListSizeContext>
      </TabsListVariantContext>
    </BaseTabs.List>
  );
};

TabsList.displayName = "TabsList";

/**
 * Individual tab trigger button for switching between panels.
 */
const TabsTrigger = (
  { ref: forwardedRef, className, children, leftIcon, rightIcon, iconStrokeWidth, ...props }: TabsTriggerProps & { ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Tab> | null> },
) => {
  const variant = React.use(TabsListVariantContext);
  const size = React.use(TabsListSizeContext);

  // Map tab sizes to button sizes - let button handle its own sizing
  const getButtonSize = (tabSize: ButtonSize) => {
    // Pass sizes directly to button - button component handles these sizes naturally
    return tabSize;
  };

  // For solid variant, use Button component with render prop to get selected state
  if (variant === "solid") {
    return (
      <BaseTabs.Tab
        ref={forwardedRef}
        {...props}
        render={(tabProps, state) => {
          const { ref: _, ...buttonProps } = tabProps;
          return (
            <Button
              {...buttonProps}
              variant={state.selected ? "minimal" : "ghost"}
              size={getButtonSize(size)}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              iconStrokeWidth={iconStrokeWidth}
              shadow={false}
              disabled={state.disabled}
              className={cx(
                {
                  "bg-white dark:bg-zinc-900": state.selected,
                },
                className,
              )}
            >
              {children}
            </Button>
          );
        }}
      />
    );
  }

  // For line variant, use Tab element with Button as child to preserve indicator functionality
  return (
    <BaseTabs.Tab
      ref={forwardedRef}
      className={cx(
        className,
      )}
      {...props}
      render={(tabProps, state) => {
        // Extract ref and other props - need to handle ref forwarding to button element
        const { ref: tabRef, className: tabClassName, ...buttonProps } = tabProps;
        return (
          <Button
            {...buttonProps}
            variant="minimal"
            size={getButtonSize(size)}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            iconStrokeWidth={iconStrokeWidth}
            shadow={false}
            render={<button ref={tabRef} />} // Forward Base UI's ref to the button element
            disabled={state.disabled}
            className={cx(
              tabClassName,
            )}
          >
            {children}
          </Button>
        );
      }}
    />
  );
};

TabsTrigger.displayName = "TabsTrigger";

/**
 * Content panel that displays when its corresponding tab is active.
 */
const TabsContent = ({ ref: forwardedRef, className, ...props }: TabsContentProps) => {
  const { panel } = tabsVariants();

  return (
    <BaseTabs.Panel
      ref={forwardedRef}
      className={cx(panel(), className)}
      {...props}
    />
  );
};

TabsContent.displayName = "TabsContent";

// Export individual components for advanced usage
const TabsRoot = BaseTabs.Root;
const TabsTabsList = BaseTabs.List;
const TabsTab = BaseTabs.Tab;
const TabsIndicator = BaseTabs.Indicator;
const TabsPanel = BaseTabs.Panel;

export {
  Tabs,
  TabsContent,
  type TabsContentProps,
  TabsIndicator,
  TabsList,
  type TabsListProps,
  TabsPanel,
  type TabsProps,
  TabsRoot,
  TabsTab,
  TabsTabsList,
  TabsTrigger,
  type TabsTriggerProps,
  tabsVariants,
};
