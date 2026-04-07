"use client";

import { Skeleton } from "@patternmode/ui/components/skeleton";
import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";
import { useId, useMemo } from "react";

const SKELETON_WIDTH_BASE = 50;
const SKELETON_WIDTH_SPREAD = 40;

/**
 * Generate a deterministic pseudo-random width based on a seed.
 * Uses a simple hash to get consistent values between server and client.
 */
function getSeededWidth(seed: number): string {
  const hash = Math.abs((seed * 1_103_515_245 + 12_345) % 2_147_483_647) % 100;
  return `${SKELETON_WIDTH_BASE + (hash % SKELETON_WIDTH_SPREAD)}%`;
}

type SidebarMenuSkeletonProps = React.ComponentProps<"div"> & {
  showIcon?: boolean;
  /** Index for deterministic width (prevents SSR hydration mismatch) */
  index?: number;
};

/**
 * SidebarMenuSkeleton UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  index,
  ...props
}: SidebarMenuSkeletonProps) {
  // Use React's useId for stable seed when index not provided
  const id = useId();
  const width = useMemo(() => {
    if (index !== undefined) {
      return getSeededWidth(index);
    }
    // Hash the id string to get a numeric seed
    const idSeed = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return getSeededWidth(idSeed);
  }, [index, id]);

  return (
    <div
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      data-component="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      data-slot="sidebar-menu-skeleton"
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export type { SidebarMenuSkeletonProps };
