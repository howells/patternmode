"use client";

import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import React from "react";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";
import { Button, type ButtonSize } from "../button/button";

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
          // base - Geist/line style with bottom border
          "relative flex items-center justify-start",
          // bottom border (divider)
          "border-b border-zinc-200 dark:border-zinc-800",
        ],
        tab: [
          // base
          "relative inline-flex items-center justify-center border-0 font-medium whitespace-nowrap",
          // text color
          "text-zinc-600 dark:text-zinc-400",
          // hover
          "hover:text-zinc-900 dark:hover:text-zinc-200",
          // selected
          "data-[selected]:text-zinc-900 dark:data-[selected]:text-zinc-50",
          // disabled
          "data-[disabled]:pointer-events-none data-[disabled]:text-zinc-400 data-[disabled]:opacity-50 dark:data-[disabled]:text-zinc-600",
          // focus styles
          "outline-none select-none",
          "focus-visible:text-zinc-900 dark:focus-visible:text-zinc-50",
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
        tab: "h-8 text-xs", // very small height and text size for line variant only
      },
      sm: {
        list: "gap-x-3", // tighter spacing for line variant
        tab: "h-10 text-xs", // smaller height and text size for line variant only
      },
      default: {
        list: "gap-x-4", // spacing for line variant
        tab: "h-12 text-sm", // height and text size for line variant only
      },
      lg: {
        list: "gap-x-6", // wider spacing for line variant
        tab: "h-14 text-base", // larger height and text size for line variant only
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
        list: "gap-x-0 p-0.5 rounded-md", // Remove gap, very compact for xs
      },
    },
    {
      variant: "solid",
      size: "sm",
      class: {
        list: "gap-x-0 p-0.5 rounded-md", // Remove gap, keep compact for sm
      },
    },
    {
      variant: "solid",
      size: "default",
      class: {
        list: "gap-x-0 p-0.5 rounded-md", // Remove gap, use padding
      },
    },
    {
      variant: "solid",
      size: "lg",
      class: {
        list: "gap-x-0 p-1 rounded-lg", // Remove gap, larger container for lg
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

/**
 * Root tabs component built on Base UI's Tabs primitive.
 *
 * Based on Base UI's Tabs (https://base-ui.com/react/components/tabs),
 * providing accessible tabbed interfaces for toggling between related panels
 * on the same page. Features keyboard navigation and proper focus management.
 *
 * @extends React.ComponentPropsWithoutRef<typeof BaseTabs.Root>
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 *
 * @param {string} [defaultValue] - The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs.
 * @param {string} [value] - The controlled value of the tab to activate. Should be used along with onValueChange.
 * @param {(value: string) => void} [onValueChange] - Event handler called when the value changes.
 * @param {boolean} [activationMode="automatic"] - Whether tabs are activated automatically on focus or manually.
 * @param {React.ReactNode} [children] - The tabs content.
 * @param {string} [className] - Additional CSS classes to apply to the root element.
 * @param {React.RefObject<React.ElementRef<typeof BaseTabs.Root> | null>} [ref] - Ref to the root element.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 *
 * @id tabs
 * @name Tabs
 * @component
 */
/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time. Features Geist-style design with clean line indicators.
 *
 * @id tabs
 * @name Tabs
 * @component
 */
const Tabs = ({ ref: forwardedRef, className, ...props }: Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Root>, "orientation"> & { ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Root> | null> }) => {
    const { root } = tabsVariants();
    return (
      <BaseTabs.Root
        ref={forwardedRef}
        className={cx(root(), className)}
        {...props}
      />
    );
  };

Tabs.displayName = "Tabs";

/**
 * Props for the TabsList component.
 *
 * @extends React.ComponentPropsWithoutRef<typeof BaseTabs.List>
 * @interface TabsListProps
 *
 * @property {"solid" | "line"} [variant] - Style variant for the tabs list. "solid" creates button-like tabs in a container, "line" creates underlined tabs with a divider.
 * @property {boolean} [hideDivider] - Hide the bottom divider line (only applies to "line" variant).
 * @property {boolean} [hideBorder] - Hide the active tab border/indicator (only applies to "line" variant).
 * @property {ButtonSize} [size] - Size for solid variant buttons. Affects padding and text size.
 * @property {React.ReactNode} [children] - The tab triggers to display.
 * @property {string} [className] - Additional CSS classes to apply to the list element.
 * @property {React.RefObject<React.ElementRef<typeof BaseTabs.List> | null>} [ref] - Ref to the list element.
 */
interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
  /**
   * Style variant for the tabs list.
   */
  variant?: TabsListVariant;
  /**
   * Hide the bottom divider line.
   */
  hideDivider?: boolean;
  /**
   * Hide the active tab border/indicator.
   */
  hideBorder?: boolean;
  /**
   * Size for solid variant buttons.
   */
  size?: ButtonSize;
}

/**
 * Container for tab triggers with visual indicator.
 *
 * Based on Base UI's Tabs.List, providing a styled container for tab buttons
 * with animated indicator that follows the active tab. Supports multiple variants
 * including Geist-style tabs with bottom divider and indicator.
 *
 * @extends React.ComponentPropsWithoutRef<typeof BaseTabs.List>
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 *
 * @param {"solid" | "line"} [variant="line"] - Style variant for the tabs list. "solid" creates button-like tabs in a container, "line" creates underlined tabs with a divider.
 * @param {boolean} [hideDivider=false] - Hide the bottom divider line (only applies to "line" variant).
 * @param {boolean} [hideBorder=false] - Hide the active tab border/indicator (only applies to "line" variant).
 * @param {ButtonSize} [size="default"] - Size for solid variant buttons. Affects padding and text size.
 * @param {React.ReactNode} [children] - The tab triggers to display.
 * @param {string} [className] - Additional CSS classes to apply to the list element.
 * @param {React.RefObject<React.ElementRef<typeof BaseTabs.List> | null>} [ref] - Ref to the list element.
 *
 * @example
 * ```tsx
 * <TabsList variant="line" hideDivider={false}>
 *   <TabsTrigger value="overview">Overview</TabsTrigger>
 *   <TabsTrigger value="details">Details</TabsTrigger>
 * </TabsList>
 *
 * <TabsList variant="solid" size="sm">
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
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
 * Props for the TabsTrigger component.
 *
 * @extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
 * @interface TabsTriggerProps
 *
 * @property {string} value - A unique value that associates the trigger with a content panel.
 * @property {boolean} [disabled] - When true, prevents the user from interacting with the tab.
 * @property {React.ComponentType<{ className?: string; strokeWidth?: number }>} [leftIcon] - Icon component to display on the left side.
 * @property {React.ComponentType<{ className?: string; strokeWidth?: number }>} [rightIcon] - Icon component to display on the right side.
 * @property {number} [iconStrokeWidth] - Stroke width for icons.
 * @property {React.ReactNode} [children] - The content to display in the tab trigger.
 * @property {string} [className] - Additional CSS classes to apply to the trigger element.
 * @property {React.RefObject<React.ElementRef<typeof BaseTabs.Tab> | null>} [ref] - Ref to the trigger element.
 */
interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
  /**
   * Icon component to display on the left side.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon component to display on the right side.
   */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Stroke width for icons.
   */
  iconStrokeWidth?: number;
}

/**
 * Individual tab trigger button for switching between panels.
 *
 * Based on Base UI's Tabs.Tab, providing clickable tab buttons with proper
 * keyboard navigation and accessibility. Automatically inherits styling variant
 * from parent TabsList and supports disabled states. Uses Button components
 * for both variants to ensure consistent icon support and sizing.
 *
 * @extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 *
 * @param {string} value - A unique value that associates the trigger with a content panel.
 * @param {boolean} [disabled] - When true, prevents the user from interacting with the tab.
 * @param {React.ComponentType<{ className?: string; strokeWidth?: number }>} [leftIcon] - Icon component to display on the left side.
 * @param {React.ComponentType<{ className?: string; strokeWidth?: number }>} [rightIcon] - Icon component to display on the right side.
 * @param {number} [iconStrokeWidth] - Stroke width for icons.
 * @param {React.ReactNode} [children] - The content to display in the tab trigger.
 * @param {string} [className] - Additional CSS classes to apply to the trigger element.
 * @param {React.RefObject<React.ElementRef<typeof BaseTabs.Tab> | null>} [ref] - Ref to the trigger element.
 *
 * @example
 * ```tsx
 * <TabsTrigger value="settings">Settings</TabsTrigger>
 * <TabsTrigger value="profile" disabled>Profile</TabsTrigger>
 * <TabsTrigger value="grouped" leftIcon={Rows3}>Grouped</TabsTrigger>
 * ```
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
                variant={state.selected ? "outline" : "ghost"}
                size={getButtonSize(size)}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                iconStrokeWidth={iconStrokeWidth}
                shadow={false}
                className={cx(
                  "data-[disabled]:pointer-events-none",
                  "inset-ring-0 shadow-none",
                  state.selected && "hover:bg-white dark:hover:bg-zinc-950",
                  !state.selected && "opacity-50 hover:opacity-100",
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
          // Base tab styles for line variant - ensure proper sizing for indicator
          "relative inline-flex items-center justify-center",
          // Apply the size-specific height to the tab container for indicator positioning
          size === "xs" && "h-8",
          size === "sm" && "h-10",
          size === "default" && "h-12",
          size === "lg" && "h-14",
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
 *
 * Based on Base UI's Tabs.Panel, providing accessible content containers
 * that show/hide based on the active tab selection. Features proper focus
 * management and screen reader support.
 *
 * @extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 *
 * @param {string} value - The value that associates the panel with a trigger tab.
 * @param {React.ReactNode} [children] - The content to display when this panel is active.
 * @param {string} [className] - Additional CSS classes to apply to the panel element.
 * @param {React.RefObject<React.ElementRef<typeof BaseTabs.Panel> | null>} [ref] - Ref to the panel element.
 *
 * @example
 * ```tsx
 * <TabsContent value="general">
 *   <h2>General Settings</h2>
 *   <p>Configure your general preferences here.</p>
 * </TabsContent>
 * ```
 */
const TabsContent = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> & { ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Panel> | null> }) => {
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

/**
 * Direct export of Base UI's Tabs.Root component for advanced usage.
 *
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 */
const TabsRoot = BaseTabs.Root;

/**
 * Direct export of Base UI's Tabs.List component for advanced usage.
 *
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 */
const TabsTabsList = BaseTabs.List;

/**
 * Direct export of Base UI's Tabs.Tab component for advanced usage.
 *
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 */
const TabsTab = BaseTabs.Tab;

/**
 * Direct export of Base UI's Tabs.Indicator component for advanced usage.
 *
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 */
const TabsIndicator = BaseTabs.Indicator;

/**
 * Direct export of Base UI's Tabs.Panel component for advanced usage.
 *
 * @see {@link https://base-ui.com/react/components/tabs} Base UI Tabs documentation
 */
const TabsPanel = BaseTabs.Panel;

export {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTab,
  TabsTabsList,
  TabsTrigger,
  tabsVariants
};
