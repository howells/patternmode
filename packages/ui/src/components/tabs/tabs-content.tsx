"use client";

import { durations } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { Content } from "@radix-ui/react-tabs";
import { motion } from "motion/react";
import { useTabsContext } from "./tabs-context";

/**
 * TabsContent - renders content for a tab.
 * Use inside TabsPanel for smooth height animations.
 *
 * All TabsContent stack in the same grid cell. Active content is relative
 * (contributes to height), inactive is absolute (doesn't affect height).
 */
export function TabsContent({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof Content>) {
  const { activeValue } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <Content
      asChild
      className={cn(
        "outline-none",
        // Grid stacking: all tabs occupy same cell
        "col-start-1 row-start-1",
        // Active is relative (contributes to height), inactive is absolute (no height contribution)
        isActive ? "relative" : "pointer-events-none absolute inset-0",
        className,
      )}
      data-component="tabs-content"
      data-slot="tabs-content"
      forceMount
      value={value}
      {...props}
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        initial={false}
        transition={{ duration: isActive ? durations.quick : 0 }}
      >
        {children}
      </motion.div>
    </Content>
  );
}
