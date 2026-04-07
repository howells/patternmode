"use client";

import { Flex } from "@patternmode/ui/components/flex";
import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

export interface DataGridToolbarProps extends React.ComponentProps<"div"> {
  /**
   * Content aligned to the left side of the toolbar
   */
  left?: React.ReactNode;
  /**
   * Content aligned to the right side of the toolbar
   */
  right?: React.ReactNode;
}

/**
 * DataGridToolbar UI component.
 * Import from "@patternmode/ui/compositions/data-grid".
 */
export function DataGridToolbar({
  className,
  left,
  right,
  children,
  ...props
}: DataGridToolbarProps) {
  return (
    <div
      className={cn("shrink-0 pb-6", className)}
      data-component="data-grid-toolbar"
      data-slot="data-grid-toolbar"
      {...props}
    >
      <Flex align="center" className="h-full" justify="space-between">
        {left && (
          <div className="flex items-center gap-3" data-slot="toolbar-left">
            {left}
          </div>
        )}
        {right && (
          <div className="flex items-center gap-3" data-slot="toolbar-right">
            {right}
          </div>
        )}
        {!(left || right) && children}
      </Flex>
    </div>
  );
}
