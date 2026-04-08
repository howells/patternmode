"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Trigger } from "@radix-ui/react-tabs";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentSize } from "../../lib/size";
import { Dot } from "../dot";
import { Icon } from "../icon";
import { useTabsContext } from "./tabs-context";
import { TabsIndicator } from "./tabs-indicator";
import { tabsTriggerVariants } from "./tabs-variants";

/** Map tab sizes to icon sizes (icons slightly smaller than tab text) */
const TAB_SIZE_TO_ICON_SIZE: Record<ComponentSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "2xs",
  sm: "xs",
  base: "xs",
  lg: "sm",
  xl: "sm",
  "2xl": "base",
  "3xl": "lg",
};

type TabsTriggerProps = React.ComponentProps<typeof Trigger> &
  VariantProps<typeof tabsTriggerVariants> & {
    icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconPlacement?: "start" | "end";
    /** Optional count to display alongside the tab label */
    count?: number;
    /** Dot color indicator (CSS color value) */
    dot?: string;
  };

/** Map tab sizes to dot sizes */
const TAB_SIZE_TO_DOT_SIZE: Record<ComponentSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "2xs",
  sm: "xs",
  base: "xs",
  lg: "sm",
  xl: "sm",
  "2xl": "base",
  "3xl": "lg",
};

/** tabs trigger button */
export function TabsTrigger({
  className,
  icon,
  iconPlacement = "start",
  count,
  dot,
  children,
  value,
  ...props
}: TabsTriggerProps) {
  const { variant, size, activeValue, fullWidth } = useTabsContext();
  const iconSize = TAB_SIZE_TO_ICON_SIZE[size ?? "base"];
  const dotSize = TAB_SIZE_TO_DOT_SIZE[size ?? "base"];
  const iconElement = icon ? <Icon icon={icon} size={iconSize} /> : null;
  const dotElement = dot ? <Dot color={dot} size={dotSize} /> : null;
  const isActive = activeValue === value;
  const hasAnimatedIndicator = variant === "pill" || variant === "line";

  return (
    <Trigger
      className={cn(
        tabsTriggerVariants({ variant, size }),
        "relative",
        fullWidth && "flex-1",
        isActive ? "text-foreground" : "text-muted-foreground",
        className,
      )}
      data-component="tabs-trigger"
      data-slot="tabs-trigger"
      value={value}
      {...props}
    >
      {/* Animated indicator for pill/underline/line variants */}
      {hasAnimatedIndicator && isActive && <TabsIndicator />}
      {/* Content with z-index to appear above indicator */}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {dotElement}
        {iconPlacement === "start" && iconElement}
        {children}
        {count !== undefined && (
          <span className="text-gray-500 tabular-nums">{count}</span>
        )}
        {iconPlacement === "end" && iconElement}
      </span>
    </Trigger>
  );
}
