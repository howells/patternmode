"use client";

import { durations, easings } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";

/**
 * TabsPanel - wrapper for TabsContent that animates height transitions.
 *
 * Uses CSS grid stacking so all tab contents occupy the same space,
 * with only the active tab visible and contributing to height.
 * The motion.div with layout prop animates height changes smoothly.
 */
export function TabsPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("grid", className)}
      data-component="tabs-panel"
      layout
      transition={{
        layout: {
          duration: durations.normal,
          ease: easings.smooth,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
