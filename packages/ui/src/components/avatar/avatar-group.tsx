"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { ComponentSize } from "../../lib/size";
import { AVATAR_SIZE_PX } from "./avatar-root";

export type AvatarGroupVariant = "default" | "outline" | "ghost" | "pill";

export interface AvatarGroupProps {
  /** Enable hover animation */
  animate?: boolean;
  /** Child elements */
  children: ReactNode;
  /** CSS class name */
  className?: string;
  /** Accessibility labels for each avatar */
  labels?: string[];
  /** Maximum number of avatars to display before showing surplus */
  max?: number;
  /** Selection change handler */
  onSelect?: (index: number) => void;
  /** Custom render function for surplus count */
  renderSurplus?: (count: number) => ReactNode;
  /** Enable avatar selection */
  selectable?: boolean;
  /** Selected avatar index */
  selectedIndex?: number;
  /** Component size - aligns with button sizes */
  size?: ComponentSize | number;
  /** Spacing between avatars */
  spacing?: "tight" | "normal" | "loose";
  /** Visual variant - controls borders and surplus styling */
  variant?: AvatarGroupVariant;
}

const SPACING_CLASS = {
  tight: "-space-x-2",
  normal: "-space-x-1",
  loose: "-space-x-0.5",
};

const HOVER_SPACING = {
  tight: "hover:space-x-0",
  normal: "hover:space-x-0.5",
  loose: "hover:space-x-1",
};

const AVATAR_RING_VARIANT = {
  default: "ring-2 ring-background",
  outline: "ring-1 ring-border",
  ghost: "",
  pill: "ring-2 ring-background",
};

const SURPLUS_VARIANT = {
  default: "bg-muted text-muted-foreground ring-2 ring-background",
  outline: "bg-transparent text-muted-foreground ring-1 ring-border",
  ghost: "bg-transparent text-muted-foreground",
  pill: "bg-white text-muted-foreground ring-2 ring-white",
};

function pxToComponentSize(px: number): ComponentSize {
  const sizeMap: ComponentSize[] = [
    "2xs",
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
  ];
  const sizes = sizeMap.map((s) => AVATAR_SIZE_PX[s]);
  const closestIndex = sizes.reduce(
    (closest, s, index) =>
      Math.abs(s - px) < Math.abs((sizes[closest] ?? 0) - px) ? index : closest,
    0,
  );
  return sizeMap[closestIndex] ?? "base";
}

/**
 * AvatarGroup displays a collection of avatars with overflow handling.
 *
 * @param variant - Visual style: "default" (ring), "outline" (border), "ghost" (no decoration), "pill" (bordered rounded container, animate not supported)
 * @param size - Size matching button scale: "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl"
 * @param max - Maximum avatars to show before displaying "+N" surplus
 * @param spacing - Overlap amount: "tight" | "normal" | "loose"
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3} variant="outline" size="sm">
 *   <Avatar><AvatarImage src="..." /></Avatar>
 *   <Avatar><AvatarImage src="..." /></Avatar>
 *   <Avatar><AvatarImage src="..." /></Avatar>
 *   <Avatar><AvatarImage src="..." /></Avatar>
 * </AvatarGroup>
 * ```
 */
export function AvatarGroup({
  children,
  className,
  max,
  size = "base",
  spacing = "normal",
  animate = false,
  variant = "default",
  renderSurplus,
  selectable = false,
  selectedIndex,
  onSelect,
  labels,
  ...props
}: AvatarGroupProps) {
  const childArray = Children.toArray(children);
  const totalCount = childArray.length;
  const displayCount =
    max === undefined ? totalCount : Math.min(max, totalCount);
  const surplusCount =
    max !== undefined && totalCount > max ? totalCount - max : 0;

  // Handle size as either ComponentSize or number (pixels)
  const componentSize: ComponentSize =
    typeof size === "number" ? pxToComponentSize(size) : size;
  const px = typeof size === "number" ? size : AVATAR_SIZE_PX[componentSize];

  const ringClass = AVATAR_RING_VARIANT[variant];

  const displayChildren = childArray
    .slice(0, displayCount)
    .map((child, index) => {
      if (!isValidElement(child)) {
        return child;
      }

      const isSelected = selectable && selectedIndex === index;
      const label = labels?.[index];

      // Clone the avatar and ensure it has the right size
      const clonedChild = cloneElement(
        child as ReactElement,
        {
          size: componentSize,
          "data-avatar-index": index,
        } as never,
      );

      const handleClick = () => {
        if (selectable && onSelect) {
          onSelect(index);
        }
      };

      // Use child's key if available, otherwise use label + index as fallback
      const elementKey =
        (child as ReactElement).key ??
        (label ? `${label}-${index}` : `avatar-${index}`);

      if (selectable) {
        return (
          <button
            aria-label={label}
            aria-pressed={isSelected}
            className={cn(
              "relative inline-flex shrink-0 rounded-full border-0 bg-transparent p-0",
              ringClass,
              animate && "transition-all duration-200",
              "cursor-pointer hover:ring-primary/50",
              isSelected && "ring-2 ring-accent-foreground ring-offset-2",
            )}
            key={elementKey}
            onClick={handleClick}
            style={{
              width: px,
              height: px,
              zIndex: isSelected ? displayCount + 1 : displayCount - index,
            }}
            type="button"
          >
            {clonedChild}
          </button>
        );
      }

      return (
        <div
          className={cn(
            "relative inline-flex shrink-0 rounded-full",
            ringClass,
            animate && "transition-all duration-200",
          )}
          key={elementKey}
          style={{
            width: px,
            height: px,
            zIndex: displayCount - index,
          }}
        >
          {clonedChild}
        </div>
      );
    });

  const surplusElement = surplusCount > 0 && (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full",
        "font-medium text-xs",
        SURPLUS_VARIANT[variant],
        animate && "transition-all duration-200",
      )}
      data-component="avatar-surplus"
      style={{
        width: px,
        height: px,
        zIndex: 0,
      }}
    >
      {renderSurplus ? renderSurplus(surplusCount) : `+${surplusCount}`}
    </div>
  );

  const content = (
    <>
      {displayChildren}
      {surplusElement}
    </>
  );

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-full border border-border bg-white px-1.5 py-1",
          className,
        )}
        data-component="avatar-group"
        data-variant={variant}
        {...props}
      >
        <div className={cn("flex items-center", SPACING_CLASS[spacing])}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center",
        SPACING_CLASS[spacing],
        animate && ["*:transition-all *:duration-200", HOVER_SPACING[spacing]],
        className,
      )}
      data-component="avatar-group"
      data-variant={variant}
      {...props}
    >
      {content}
    </div>
  );
}
