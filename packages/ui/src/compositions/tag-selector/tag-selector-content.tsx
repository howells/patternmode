"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";
import { PopoverContent } from "../../components/popover";
import { useTagSelectorContext } from "./tag-selector-context";

interface TagSelectorContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TagSelectorContent - Popover content wrapper for the tag selector dropdown.
 * When `coverTrigger` is enabled, the popover overlaps the trigger so the
 * selected tags aren't visually doubled.
 */
export function TagSelectorContent({
  children,
  className,
}: TagSelectorContentProps) {
  const { coverTrigger } = useTagSelectorContext();

  return (
    <PopoverContent
      align="start"
      className={cn(
        "w-[var(--radix-popover-trigger-width)] min-w-[240px] rounded-3xl p-0",
        className,
      )}
      data-component="tag-selector-content"
      data-slot="tag-selector-content"
      sideOffset={coverTrigger ? 0 : 4}
      style={
        coverTrigger
          ? {
              marginTop: "calc(-1 * var(--radix-popover-trigger-height))",
            }
          : undefined
      }
    >
      {children}
    </PopoverContent>
  );
}
