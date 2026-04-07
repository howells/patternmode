"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentSize } from "../../lib/size";
import { Icon } from "../icon";
import { useTabsContext } from "../tabs/tabs-context";
import { TabsIndicator } from "../tabs/tabs-indicator";
import { tabsTriggerVariants } from "../tabs/tabs-variants";

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

export interface TabNavigationLinkProps
  extends Omit<React.ComponentProps<"a">, "href">,
    VariantProps<typeof tabsTriggerVariants> {
  active?: boolean;
  asChild?: boolean;
  href: string;
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPlacement?: "start" | "end";
}

/**
 * TabNavigationLink UI component for router-based navigation.
 * Import from "@patternmode/ui/components/tab-navigation".
 * Uses the same styling as TabsTrigger component with animated indicator.
 */
export function TabNavigationLink({
  className,
  active = false,
  asChild = false,
  icon,
  iconPlacement = "start",
  children,
  ...props
}: TabNavigationLinkProps) {
  const { variant, size, fullWidth } = useTabsContext();
  const iconSize = TAB_SIZE_TO_ICON_SIZE[size ?? "base"];
  const iconElement = icon ? <Icon icon={icon} size={iconSize} /> : null;
  const hasAnimatedIndicator = variant === "pill" || variant === "line";

  const triggerClassName = cn(
    tabsTriggerVariants({ variant, size }),
    "relative z-10",
    fullWidth && "flex-1",
    className,
  );

  // When asChild is true, the Slot merges props onto the child (e.g. <Link>).
  // We wrap in a relative <li> so the indicator can use absolute inset-0.
  // The <li> inherits its size from the trigger content — no explicit height needed.
  if (asChild) {
    return (
      <li className="relative flex items-center" role="presentation">
        {hasAnimatedIndicator && active && <TabsIndicator />}
        <Slot
          aria-selected={active}
          className={triggerClassName}
          data-component="tab-navigation-link"
          data-slot="tab-navigation-link"
          data-state={active ? "active" : "inactive"}
          role="tab"
          {...props}
        >
          {children}
        </Slot>
      </li>
    );
  }

  return (
    <li role="presentation">
      <a
        aria-selected={active}
        className={triggerClassName}
        data-component="tab-navigation-link"
        data-slot="tab-navigation-link"
        data-state={active ? "active" : "inactive"}
        role="tab"
        {...props}
      >
        {hasAnimatedIndicator && active && <TabsIndicator />}
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {iconPlacement === "start" && iconElement}
          {children}
          {iconPlacement === "end" && iconElement}
        </span>
      </a>
    </li>
  );
}
