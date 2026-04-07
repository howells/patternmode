"use client";

import { Icon } from "@patternmode/ui/components/icon";
import { Kbd, KbdGroup } from "@patternmode/ui/components/kbd";
import {
  MENU_ITEM_ICON_SIZES,
  MENU_ITEM_KBD_SIZES,
  menuItemVariants,
} from "@patternmode/ui/components/menu-item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@patternmode/ui/components/tooltip";
import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { Children, cloneElement, isValidElement } from "react";
import type { ComponentSize } from "../../lib/size";
import { SIDEBAR_TRANSITION } from "./sidebar-motion-config";
import { useSidebar } from "./sidebar-provider";

/** Maps component size to button height in pixels */
const COLLAPSED_HEIGHT_PX: Record<ComponentSize, number> = {
  "2xs": 24,
  xs: 28,
  sm: 32,
  base: 36,
  lg: 40,
  xl: 44,
  "2xl": 48,
  "3xl": 56,
};

/**
 * Collapsed width in pixels - uses menuItemVariants padding so icons don't shift.
 * Width = (menuItemVariants horizontal padding * 2) + icon size
 * This keeps the icon at the exact same left position in both expanded and collapsed states.
 */
const COLLAPSED_WIDTH_PX: Record<ComponentSize, number> = {
  "2xs": 28, // px-2 (8*2) + 12px icon
  xs: 32, // px-2.5 (10*2) + 12px icon
  sm: 36, // px-2.5 (10*2) + 16px icon
  base: 40, // px-3 (12*2) + 16px icon
  lg: 46, // px-3.5 (14*2) + 18px icon
  xl: 50, // px-4 (16*2) + 18px icon
  "2xl": 60, // px-5 (20*2) + 20px icon
  "3xl": 60, // px-5 (20*2) + 20px icon
};

type SidebarMenuButtonProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  /** Control tooltip visibility. Use `false` to hide tooltip (e.g., when a dropdown is open). */
  tooltipOpen?: boolean;
  size?: ComponentSize;
  variant?: "default" | "input" | "outline";
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon to show when sidebar is collapsed (overrides icon) */
  collapsedIcon?:
    | LucideIcon
    | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Custom content to show when sidebar is collapsed (e.g., Avatar). Takes precedence over collapsedIcon. */
  collapsedContent?: React.ReactNode;
  suffixIcon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  kbd?: string[];
  children?: React.ReactNode;
};

/**
 * SidebarMenuButton UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Built on Radix UI primitives for accessible behavior.
 */
export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "input",
  size = "base",
  icon,
  collapsedIcon,
  collapsedContent,
  suffixIcon,
  kbd,
  tooltip,
  tooltipOpen,
  className,
  children,
  style,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state, hasHydrated } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;
  const iconSize = MENU_ITEM_ICON_SIZES[size];
  const kbdSize = MENU_ITEM_KBD_SIZES[size];
  const collapsedHeightPx = COLLAPSED_HEIGHT_PX[size];
  const collapsedWidthPx = COLLAPSED_WIDTH_PX[size];

  // When collapsed, text content is removed from the DOM.
  // Derive an aria-label from the tooltip so screen readers still identify the element.
  const collapsedAriaLabel =
    isCollapsed && tooltip && typeof tooltip === "string" ? tooltip : undefined;

  // Compute styles and classes based on collapsed state
  const buttonStyle: React.CSSProperties = {
    width: isCollapsed ? collapsedWidthPx : "100%",
    minHeight: collapsedHeightPx,
    ...style,
  };

  const buttonClassName = cn(
    menuItemVariants({
      size,
      variant,
      radius: "rounded",
    }),
    "overflow-hidden transition-[width] duration-300 ease-out",
    className,
  );

  // Build inner content
  // Priority when collapsed: collapsedContent > collapsedIcon > icon
  const iconElement = (() => {
    if (collapsedContent) {
      if (isCollapsed) {
        return <span className="shrink-0">{collapsedContent}</span>;
      }
      // When expanded, show icon if provided, otherwise nothing
      return icon ? (
        <Icon className="shrink-0" icon={icon} size={iconSize} />
      ) : null;
    }
    const activeIcon = isCollapsed && collapsedIcon ? collapsedIcon : icon;
    return activeIcon ? (
      <Icon className="shrink-0" icon={activeIcon} size={iconSize} />
    ) : null;
  })();

  // Always render content - animated when sidebar expands
  const labelElement =
    children !== null && children !== undefined ? (
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            animate={{ opacity: 1 }}
            className="flex min-w-0 flex-1 items-center overflow-hidden"
            exit={{ opacity: 0 }}
            initial={hasHydrated ? { opacity: 0 } : false}
            transition={SIDEBAR_TRANSITION}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    ) : null;

  const suffixElement = suffixIcon ? (
    <Icon className="shrink-0" icon={suffixIcon} size={iconSize} />
  ) : null;

  const showKbd = !(isCollapsed || suffixIcon) && kbd && kbd.length > 0;
  const kbdElement = showKbd ? (
    <KbdGroup className="ml-auto shrink-0" size={kbdSize}>
      {kbd.map((key) => (
        <Kbd key={key} variant="secondary">
          {key}
        </Kbd>
      ))}
    </KbdGroup>
  ) : null;

  const Comp = asChild ? Slot : "button";
  const buttonProps = asChild ? {} : { type: "button" as const };

  // For asChild, we need to inject our content into the child element
  const enhancedChildren = (() => {
    if (!asChild) {
      return (
        <>
          {iconElement}
          {labelElement}
          {suffixElement}
          {kbdElement}
        </>
      );
    }

    // Clone the child and inject icon/label/suffix/kbd as its children
    const child = Children.only(children);
    if (
      !isValidElement<{ children?: React.ReactNode; "aria-label"?: string }>(
        child,
      )
    ) {
      return children;
    }

    // Always render all content - animated when sidebar expands
    return cloneElement(
      child,
      collapsedAriaLabel ? { "aria-label": collapsedAriaLabel } : {},
      iconElement,
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            animate={{ opacity: 1 }}
            className="flex min-w-0 flex-1 items-center overflow-hidden"
            exit={{ opacity: 0 }}
            initial={hasHydrated ? { opacity: 0 } : false}
            transition={SIDEBAR_TRANSITION}
          >
            {child.props.children}
          </motion.span>
        )}
      </AnimatePresence>,
      suffixElement,
      kbdElement,
    );
  })();

  const button = (
    <Comp
      aria-label={collapsedAriaLabel}
      className={buttonClassName}
      data-active={isActive}
      data-component="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
      style={buttonStyle}
      {...buttonProps}
      {...props}
    >
      {enhancedChildren}
    </Comp>
  );

  if (!tooltip) {
    return button;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip open={tooltipOpen === false ? false : undefined}>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        align="center"
        hidden={state !== "collapsed" || isMobile}
        side="right"
        {...tooltipProps}
      />
    </Tooltip>
  );
}

export type { SidebarMenuButtonProps };
