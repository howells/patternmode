"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import { SEGMENTED_INDICATOR_CLASS } from "../../compositions/segmented";
import { useTabsContext } from "./tabs-context";

type TabsIndicatorVariant = "pill" | "line";

const indicatorStyles: Record<TabsIndicatorVariant, string> = {
  pill: cn("absolute inset-0 rounded-full", SEGMENTED_INDICATOR_CLASS),
  line: "absolute inset-x-0 bottom-0 h-px bg-primary dark:bg-gray-100",
};

/**
 * Animated indicator for tabs that smoothly transitions between active tabs.
 * Uses layoutId for shared element transitions.
 *
 * @internal Used by TabsTrigger for animated variants
 */
export function TabsIndicator() {
  const { variant, instanceId } = useTabsContext();

  return (
    <motion.span
      aria-hidden
      className={cn(indicatorStyles[variant])}
      data-slot="tabs-indicator"
      layoutId={`tabs-indicator-${instanceId}`}
      transition={springs.snappy}
    />
  );
}
