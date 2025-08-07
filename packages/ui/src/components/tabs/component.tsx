"use client";

import type { Size } from "../../lib/component-config-types";
import type { TabsContentProps, TabsListProps, TabsListVariant, TabsProps, TabsTriggerProps } from "./types";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";

import { cx } from "@patternmode/ui/cx";
import React from "react";
import { Button } from "../button/component";
import { tabsVariants } from "./variants";

const TabsListVariantContext = React.createContext<TabsListVariant>("line");
const TabsListSizeContext = React.createContext<Size>("base");

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
  { ref: forwardedRef, className, variant = "line", hideDivider = false, hideBorder = false, size = "base", children, ...props }: TabsListProps & { ref?: React.RefObject<React.ElementRef<typeof BaseTabs.List> | null> },
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
          {(variant === "line" || variant === "solid") && (
            <BaseTabs.Indicator
              key={`${variant}-${size}-indicator`}
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
  const getButtonSize = (tabSize: Size) => {
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
              variant="minimal"
              size={getButtonSize(size)}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              iconStrokeWidth={iconStrokeWidth}
              disabled={state.disabled}
              className={cx(
                "relative z-10",
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

            render={<button type="button" ref={tabRef} />} // Forward Base UI's ref to the button element
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
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTab,
  TabsTabsList,
  TabsTrigger,
};
