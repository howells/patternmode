"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { LayoutGroup } from "motion/react";
import { useId } from "react";
import { useTabsContext } from "../tabs/tabs-context";
import { tabsListVariants } from "../tabs/tabs-variants";

/**
 * TabNavigationList UI component.
 * Import from "@patternmode/ui/components/tab-navigation".
 * Uses the same styling as TabsList component.
 */
export function TabNavigationList({
  className,
  ...props
}: React.ComponentProps<"ul"> & VariantProps<typeof tabsListVariants>) {
  const { variant, size, fullWidth } = useTabsContext();
  const layoutId = useId();

  return (
    <LayoutGroup id={layoutId}>
      <ul
        className={cn(
          tabsListVariants({ variant, size }),
          fullWidth && "w-full",
          className,
        )}
        data-component="tab-navigation-list"
        data-slot="tab-navigation-list"
        {...props}
      />
    </LayoutGroup>
  );
}
