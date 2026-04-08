"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, type LucideIcon } from "lucide-react";
import type * as React from "react";
import { RADIUS_CLASSES } from "../../lib/radius";
import type { ComponentSize } from "../../lib/size";
import { Dot, type DotProps } from "../dot";
import { Icon } from "../icon";
import { Kbd, KbdGroup, type KbdProps } from "../kbd";
import { Spinner } from "../spinner";

/**
 * Size classes for menu items - shared across MenuItem, DropdownMenuItem, etc.
 */
const MENU_ITEM_SIZE_CLASSES: Record<ComponentSize, string> = {
  "2xs": "min-h-6 px-2 py-0.5 text-xs gap-1.5",
  xs: "min-h-8 px-2.5 py-1 text-app gap-2",
  sm: "min-h-9 px-3 py-1.5 text-sm gap-2.5",
  base: "min-h-9 px-3 py-2 text-sm gap-2",
  lg: "min-h-10 px-3.5 py-2.5 text-sm gap-2.5",
  xl: "min-h-11 px-4 py-3 text-base gap-3",
  "2xl": "min-h-12 px-5 py-3.5 text-base gap-3",
  "3xl": "min-h-14 px-5 py-4 text-lg gap-4",
};

/**
 * Icon size mapping for menu items.
 */
const MENU_ITEM_ICON_SIZES: Record<ComponentSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "2xs",
  sm: "xs",
  base: "xs",
  lg: "sm",
  xl: "sm",
  "2xl": "base",
  "3xl": "base",
};

/**
 * Icon container size classes for centering dots within icon space.
 */
const MENU_ITEM_ICON_CONTAINER_CLASSES: Record<ComponentSize, string> = {
  "2xs": "size-3", // matches Icon 2xs
  xs: "size-3", // matches Icon 2xs
  sm: "size-4", // matches Icon xs
  base: "size-4", // matches Icon xs
  lg: "size-4.5", // matches Icon sm
  xl: "size-4.5", // matches Icon sm
  "2xl": "size-5", // matches Icon base
  "3xl": "size-5", // matches Icon base
};

/**
 * Kbd size mapping for menu items.
 */
const MENU_ITEM_KBD_SIZES: Record<ComponentSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "2xs",
  sm: "xs",
  base: "xs",
  lg: "sm",
  xl: "sm",
  "2xl": "base",
  "3xl": "base",
};

/**
 * Inset padding for menu items without icons (aligns with items that have icons).
 */
const MENU_ITEM_INSET_CLASSES: Record<ComponentSize, string> = {
  "2xs": "pl-6",
  xs: "pl-7",
  sm: "pl-8",
  base: "pl-9",
  lg: "pl-11",
  xl: "pl-12",
  "2xl": "pl-14",
  "3xl": "pl-16",
};

/**
 * Indicator container size for checkbox/radio items.
 */
const MENU_ITEM_INDICATOR_SIZE: Record<ComponentSize, string> = {
  "2xs": "size-3",
  xs: "size-3",
  sm: "size-3.5",
  base: "size-4",
  lg: "size-4.5",
  xl: "size-5",
  "2xl": "size-5",
  "3xl": "size-6",
};

/**
 * Indicator left position for checkbox/radio items.
 */
const MENU_ITEM_INDICATOR_LEFT: Record<ComponentSize, string> = {
  "2xs": "left-1",
  xs: "left-1.5",
  sm: "left-2",
  base: "left-2.5",
  lg: "left-3",
  xl: "left-3.5",
  "2xl": "left-4",
  "3xl": "left-5",
};

/**
 * Radio indicator outer size classes (visual-only radio for menu items).
 */
const RADIO_INDICATOR_SIZE: Record<ComponentSize, string> = {
  "2xs": "size-3.5",
  xs: "size-4",
  sm: "size-4.5",
  base: "size-5",
  lg: "size-5.5",
  xl: "size-6",
  "2xl": "size-7",
  "3xl": "size-8",
};

/**
 * Radio indicator inner dot size classes.
 */
const RADIO_DOT_SIZE: Record<ComponentSize, string> = {
  "2xs": "size-1.5",
  xs: "size-1.5",
  sm: "size-2",
  base: "size-2",
  lg: "size-2.5",
  xl: "size-3",
  "2xl": "size-3.5",
  "3xl": "size-4",
};

/** Visual-only radio indicator (no RadioGroup context needed). */
function MenuItemRadio({
  checked,
  size,
}: {
  checked?: boolean;
  size: ComponentSize;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-xs",
        checked && "border-primary",
        RADIO_INDICATOR_SIZE[size],
      )}
    >
      {checked && (
        <span className={cn("rounded-full bg-primary", RADIO_DOT_SIZE[size])} />
      )}
    </span>
  );
}

/**
 * Checkbox size classes matching the Checkbox component's visual sizing.
 * Uses `<span>` instead of Radix's `<button>` to avoid nested-button issues
 * when rendered inside MenuItem (which is already a `<button>`).
 */
const MENU_ITEM_CHECKBOX_SIZES: Record<ComponentSize, string> = {
  "2xs": "size-3.5 rounded-sm [&_svg]:size-2.5",
  xs: "size-4 rounded-sm [&_svg]:size-2.5",
  sm: "size-4.5 [&_svg]:size-3",
  base: "size-5 [&_svg]:size-3.5",
  lg: "size-5.5 [&_svg]:size-4",
  xl: "size-6 [&_svg]:size-4.5",
  "2xl": "size-7 [&_svg]:size-5",
  "3xl": "size-8 [&_svg]:size-6",
};

/** Visual-only checkbox (span-based, no nested button). */
function MenuItemCheckbox({
  checked,
  size,
}: {
  checked?: boolean;
  size: ComponentSize;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md border border-border bg-input shadow-xs",
        checked && "border-primary bg-primary text-primary-foreground",
        MENU_ITEM_CHECKBOX_SIZES[size],
      )}
    >
      {checked && <Check />}
    </span>
  );
}

/**
 * menuItemVariants variant class helper for MenuItem.
 * Import from "@patternmode/ui/components/menu-item".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 */
const menuItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center whitespace-nowrap text-left font-medium outline-none transition-colors duration-100 hover:duration-0 focus:duration-0 focus-visible:duration-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: MENU_ITEM_SIZE_CLASSES,
      variant: {
        default:
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground",
        input:
          "hover:bg-input hover:text-foreground focus:bg-input focus:text-foreground focus-visible:bg-input focus-visible:text-foreground data-[active=true]:bg-input data-[active=true]:font-medium data-[active=true]:text-foreground",
        outline:
          "bg-background ring-1 ring-border hover:bg-accent hover:text-accent-foreground hover:ring-accent focus:bg-accent focus:text-accent-foreground focus:ring-accent focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-accent data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground data-[active=true]:ring-accent",
        destructive:
          "text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive [&_svg:not([class*='text-'])]:text-destructive",
      },
      radius: RADIUS_CLASSES,
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { inset: true, size: "2xs", className: MENU_ITEM_INSET_CLASSES["2xs"] },
      { inset: true, size: "xs", className: MENU_ITEM_INSET_CLASSES.xs },
      { inset: true, size: "sm", className: MENU_ITEM_INSET_CLASSES.sm },
      { inset: true, size: "base", className: MENU_ITEM_INSET_CLASSES.base },
      { inset: true, size: "lg", className: MENU_ITEM_INSET_CLASSES.lg },
      { inset: true, size: "xl", className: MENU_ITEM_INSET_CLASSES.xl },
      { inset: true, size: "2xl", className: MENU_ITEM_INSET_CLASSES["2xl"] },
      { inset: true, size: "3xl", className: MENU_ITEM_INSET_CLASSES["3xl"] },
      // Smaller border radius for smallest sizes when using rounded
      { radius: "rounded", size: "2xs", className: "rounded-sm" },
      { radius: "rounded", size: "xs", className: "rounded-sm" },
    ],
    defaultVariants: {
      size: "sm",
      variant: "default",
      radius: "rounded",
      inset: false,
    },
  },
);

type MenuItemProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof menuItemVariants> & {
    /** Render as child element using Slot */
    asChild?: boolean;
    /** Whether the item is in an active/selected state */
    isActive?: boolean;
    /** Visual indicator for active state. "dot" shows grey dot normally, green when active. "check" shows green checkmark only when active. */
    activeIndicator?: "dot" | "check" | "none";
    /** Show loading spinner in place of icon */
    loading?: boolean;
    /** Indicator element for checkbox/radio items (absolutely positioned on left). Automatically enables inset. */
    indicator?: React.ReactNode;
    /** Selection visual: "checkbox" renders Checkbox, "radio" renders radio circle. Defaults to "checkbox" when `checked` is set. */
    selectionMode?: "checkbox" | "radio";
    /** Checked state. Renders the selectionMode indicator inline. When undefined, no indicator renders. */
    checked?: boolean;
    /** Avatar element to display at the start (takes precedence over icon and dot) */
    avatar?: React.ReactNode;
    /** Dot variant to display at the start, centered in the icon space (takes precedence over icon) */
    dot?: DotProps["variant"];
    /** Custom CSS color for the dot. Overrides the semantic dot variant color. */
    dotColor?: string;
    /** Icon to display at the start */
    icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    /** Additional className for the icon */
    iconClassName?: string;
    /** Icon to display at the end (e.g., checkmark, chevron). Takes precedence over kbd. */
    suffixIcon?:
      | LucideIcon
      | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    /** Keyboard shortcut keys to display (e.g., ["⌘", "C"]). Ignored if suffixIcon is provided. */
    kbd?: string[];
    /** Variant to use for kbd elements. Options: "default", "primary", "secondary", "destructive", "brand", "ghost". */
    kbdVariant?: KbdProps["variant"];
    /** Content to display at the end after suffixIcon/kbd (e.g., custom content) */
    suffix?: React.ReactNode;
    /** Text label for the menu item. Use `icon` prop for icons, not children. When using asChild, pass a single React element. */
    children?: React.ReactElement | string | number;
  };

/**
 * A standalone menu item component for use in popovers, sheets, and custom menus.
 * This is the base component that DropdownMenuItem and other menu items build upon.
 *
 * Supports icons, dots, avatars, keyboard shortcuts, checkboxes, and radio indicators.
 *
 * @example
 * ```tsx
 * <MenuItem icon={Settings}>Settings</MenuItem>
 * <MenuItem icon={Trash2} variant="destructive">Delete</MenuItem>
 * <MenuItem icon={Copy} kbd={["⌘", "C"]}>Copy</MenuItem>
 * <MenuItem checked={isSelected} selectionMode="checkbox">Option</MenuItem>
 * ```
 */
function MenuItem({
  className,
  size = "sm",
  variant,
  radius,
  inset,
  asChild = false,
  isActive = false,
  activeIndicator = "none",
  loading = false,
  indicator,
  selectionMode,
  checked,
  avatar,
  dot,
  dotColor,
  icon,
  iconClassName,
  suffixIcon,
  kbd,
  kbdVariant,
  suffix,
  children,
  disabled,
  ...props
}: MenuItemProps) {
  const resolvedSize = size ?? "sm";
  const iconSize = MENU_ITEM_ICON_SIZES[resolvedSize];
  const iconContainerClass = MENU_ITEM_ICON_CONTAINER_CLASSES[resolvedSize];
  const kbdSize = MENU_ITEM_KBD_SIZES[resolvedSize];

  // Auto-enable inset when indicator is present
  const resolvedInset = indicator ? true : inset;

  // Disable when loading
  const isDisabled = loading || disabled;

  // When asChild, pass through to child element without internal structure
  if (asChild) {
    return (
      <Slot
        className={cn(
          menuItemVariants({
            size,
            variant,
            radius,
            inset: resolvedInset,
            className,
          }),
        )}
        data-active={isActive}
        data-component="menu-item"
        data-slot="menu-item"
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      className={cn(
        menuItemVariants({
          size,
          variant,
          radius,
          inset: resolvedInset,
          className,
        }),
      )}
      data-active={isActive}
      data-component="menu-item"
      data-slot="menu-item"
      disabled={isDisabled}
      type="button"
      {...props}
    >
      {indicator && (
        <span
          className={cn(
            "pointer-events-none absolute flex items-center justify-center",
            MENU_ITEM_INDICATOR_SIZE[resolvedSize],
            MENU_ITEM_INDICATOR_LEFT[resolvedSize],
          )}
        >
          {indicator}
        </span>
      )}
      {checked !== undefined && selectionMode === "radio" && (
        <MenuItemRadio checked={checked} size={iconSize} />
      )}
      {checked !== undefined && selectionMode !== "radio" && (
        <MenuItemCheckbox checked={checked} size={iconSize} />
      )}
      {isActive && activeIndicator === "dot" && (
        <Dot className="shrink-0" size="base" variant="affirmative" />
      )}
      {isActive && activeIndicator === "check" && (
        <Check className="size-4 shrink-0 text-affirmative" />
      )}
      {loading && <Spinner className="shrink-0" size={iconSize} />}
      {!loading && avatar && <span className="shrink-0">{avatar}</span>}
      {!(loading || avatar) && dot && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            iconContainerClass,
          )}
        >
          <Dot color={dotColor} size="sm" variant={dot} />
        </span>
      )}
      {!(loading || avatar || dot) && icon && (
        <Icon
          className={cn("shrink-0", iconClassName)}
          icon={icon}
          size={iconSize}
        />
      )}
      {children !== null && children !== undefined ? (
        <span className="flex-1 truncate">{children}</span>
      ) : null}
      {suffixIcon ? (
        <Icon className="shrink-0" icon={suffixIcon} size={iconSize} />
      ) : null}
      {!suffixIcon && kbd && kbd.length > 0 ? (
        <KbdGroup size={kbdSize}>
          {kbd.map((key) => (
            <Kbd key={key} variant={kbdVariant}>
              {key}
            </Kbd>
          ))}
        </KbdGroup>
      ) : null}
      {suffix}
    </button>
  );
}

export type { MenuItemProps };
export {
  MENU_ITEM_ICON_CONTAINER_CLASSES,
  MENU_ITEM_ICON_SIZES,
  MENU_ITEM_INDICATOR_LEFT,
  MENU_ITEM_INDICATOR_SIZE,
  MENU_ITEM_INSET_CLASSES,
  MENU_ITEM_KBD_SIZES,
  MENU_ITEM_SIZE_CLASSES,
  MenuItem,
  menuItemVariants,
};
