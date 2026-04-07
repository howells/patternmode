"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { List } from "@radix-ui/react-tabs";
import type { VariantProps } from "class-variance-authority";
import { LayoutGroup } from "motion/react";
import { useId } from "react";
import { ScrollArea } from "../scroll-area";
import { useTabsContext } from "./tabs-context";
import { tabsListVariants } from "./tabs-variants";

/**
 * TabsList UI component.
 * Import from "@patternmode/ui/components/tabs".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 * Includes motion-based animations.
 * Automatically scrolls horizontally when tabs overflow.
 */
export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof List> & VariantProps<typeof tabsListVariants>) {
  const { variant, size, fullWidth } = useTabsContext();
  const layoutId = useId();

  return (
    <ScrollArea hideScrollbar orientation="horizontal">
      <LayoutGroup id={layoutId}>
        <List
          className={cn(
            tabsListVariants({ variant, size }),
            fullWidth && "w-full",
            className,
          )}
          data-component="tabs-list"
          data-slot="tabs-list"
          {...props}
        />
      </LayoutGroup>
    </ScrollArea>
  );
}
