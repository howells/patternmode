"use client";

import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import type { Popover as BasePopover } from "@base-ui-components/react/popover";
import type { useRender } from "@base-ui-components/react/use-render";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { floatingItemVariants } from "@patternmode/utils/floating-item";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { Check, ChevronRight, Circle, CircleDot } from "lucide-react";
import type * as React from "react";

const Menu = (props: React.ComponentPropsWithoutRef<typeof BaseMenu.Root>) => (
  <BaseMenu.Root data-testid="menu" {...props} />
);

type MenuTriggerProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Trigger> | null>;
  className?: string;
  render?: useRender.RenderProp<Record<string, unknown>>;
} & React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>;

const MenuTrigger = ({
  ref,
  className,
  children,
  render,
  ...props
}: MenuTriggerProps) => {
  const defaultRender = <Button />;
  return (
    <BaseMenu.Trigger ref={ref} render={render || defaultRender} {...props}>
      {children}
    </BaseMenu.Trigger>
  );
};
MenuTrigger.displayName = "MenuTrigger";

const MenuGroup = BaseMenu.Group;
const MenuSubmenu = BaseMenu.SubmenuRoot;
const MenuRadioGroup = BaseMenu.RadioGroup;

type MenuSubmenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.SubmenuTrigger
> & {
  ref?: React.RefObject<React.ElementRef<
    typeof BaseMenu.SubmenuTrigger
  > | null>;
};

const MenuSubmenuTrigger = ({
  ref: forwardedRef,
  className,
  children,
  ...props
}: MenuSubmenuTriggerProps) => (
  <BaseMenu.SubmenuTrigger
    className={cx(
      floatingItemVariants({ size: "sm" }),
      "pr-1 pl-2 data-[popup-open]:bg-zinc-100 dark:data-[popup-open]:bg-zinc-800",
      className
    )}
    ref={forwardedRef}
    {...props}
  >
    {children}
    <ChevronRight aria-hidden="true" className="ml-auto" />
  </BaseMenu.SubmenuTrigger>
);
MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";

type MenuSubmenuContentProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.Popup
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Popup> | null>;
};

const MenuSubmenuContent = ({
  ref: forwardedRef,
  className,
  ...props
}: MenuSubmenuContentProps) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner collisionPadding={8} sideOffset={8}>
      <BaseMenu.Popup
        className={cx(
          floatingSurfaceVariants({
            density: "compact",
            width: "sm",
            clamp: "none",
          }).base(),
          "relative will-change-[transform,opacity]",
          "max-h-[var(--menu-available-height)]",
          "data-[ending-style]:animate-hide data-[starting-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className
        )}
        ref={forwardedRef}
        {...props}
      />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
);
MenuSubmenuContent.displayName = "MenuSubmenuContent";

type MenuContentProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.Popup
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Popup> | null>;
  sideOffset?: number;
  collisionPadding?: number;
  align?: "start" | "center" | "end";
};

const MenuContent = ({
  ref: forwardedRef,
  className,
  sideOffset = 8,
  collisionPadding = 8,
  align = "center",
  ...props
}: MenuContentProps) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner
      align={align}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
    >
      <BaseMenu.Popup
        className={cx(
          floatingSurfaceVariants({
            density: "compact",
            width: "md",
            clamp: "none",
          }).base(),
          "relative will-change-[transform,opacity]",
          "max-h-[var(--menu-available-height)]",
          "data-[ending-style]:animate-hide data-[starting-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className
        )}
        ref={forwardedRef}
        {...props}
      />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
);
MenuContent.displayName = "MenuContent";

type MenuItemProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Item> & {
  shortcut?: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Item> | null>;
};

const MenuItem = ({
  ref: forwardedRef,
  className,
  shortcut,
  hint,
  icon: Icon,
  children,
  ...props
}: MenuItemProps) => (
  <BaseMenu.Item
    className={cx(
      floatingItemVariants({ size: "sm" }),
      Icon ? "pr-1 pl-8" : "pr-1 pl-2",
      className
    )}
    ref={forwardedRef}
    tremor-id="tremor-raw"
    {...props}
  >
    {Icon && (
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <Icon className="text-zinc-600 group-data-disabled/MenuItem:text-zinc-400 dark:text-zinc-400 dark:group-data-disabled/MenuItem:text-zinc-700" />
      </span>
    )}
    {children}
    {hint && (
      <span
        className={cx("ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600")}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx("ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600")}
      >
        {shortcut}
      </span>
    )}
  </BaseMenu.Item>
);
MenuItem.displayName = "MenuItem";

type MenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.CheckboxItem
> & {
  shortcut?: string;
  hint?: string;
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.CheckboxItem> | null>;
};

const MenuCheckboxItem = ({
  ref: forwardedRef,
  className,
  hint,
  shortcut,
  children,
  checked,
  ...props
}: MenuCheckboxItemProps) => (
  <BaseMenu.CheckboxItem
    checked={checked}
    className={cx(
      floatingItemVariants({ size: "sm" }),
      "gap-x-2 pr-1 pl-8",
      className
    )}
    ref={forwardedRef}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <Check
        aria-hidden="true"
        className="size-full text-zinc-800 dark:text-zinc-200"
      />
    </span>
    {children}
    {hint && (
      <span
        className={cx(
          "ml-auto font-normal text-sm text-zinc-400 dark:text-zinc-600"
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "ml-auto font-normal text-sm text-zinc-400 tracking-widest dark:border-zinc-800 dark:text-zinc-600"
        )}
      >
        {shortcut}
      </span>
    )}
  </BaseMenu.CheckboxItem>
);
MenuCheckboxItem.displayName = "MenuCheckboxItem";

type MenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.RadioItem
> & {
  shortcut?: string;
  hint?: string;
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.RadioItem> | null>;
};

const MenuRadioItem = ({
  ref: forwardedRef,
  className,
  hint,
  shortcut,
  children,
  ...props
}: MenuRadioItemProps) => (
  <BaseMenu.RadioItem
    className={cx(
      floatingItemVariants({ size: "sm" }),
      "gap-x-2 pr-1 pl-8",
      className
    )}
    ref={forwardedRef}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <CircleDot
        aria-hidden="true"
        className="size-full text-blue-500 dark:text-blue-500"
      />
      <span className="data-checked:hidden">
        <Circle
          aria-hidden="true"
          className="size-full text-zinc-300 dark:text-zinc-700"
        />
      </span>
    </span>
    {children}
    {hint && (
      <span
        className={cx(
          "ml-auto font-normal text-sm text-zinc-400 dark:text-zinc-600"
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "ml-auto font-normal text-sm text-zinc-400 tracking-widest dark:border-zinc-800 dark:text-zinc-600"
        )}
      >
        {shortcut}
      </span>
    )}
  </BaseMenu.RadioItem>
);
MenuRadioItem.displayName = "MenuRadioItem";

type MenuLabelProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.GroupLabel
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.GroupLabel> | null>;
};

const MenuLabel = ({
  ref: forwardedRef,
  className,
  ...props
}: MenuLabelProps) => (
  <BaseMenu.GroupLabel
    className={cx(
      "px-2 py-2 font-medium text-xs tracking-wide",
      "text-zinc-400 dark:text-zinc-500",
      className
    )}
    ref={forwardedRef}
    {...props}
  />
);
MenuLabel.displayName = "MenuLabel";

type MenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof BaseMenu.Separator
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Separator> | null>;
};

const MenuSeparator = ({
  ref: forwardedRef,
  className,
  ...props
}: MenuSeparatorProps) => (
  <BaseMenu.Separator
    className={cx("-mx-1 my-1 h-px border-t dark:border-zinc-800", className)}
    ref={forwardedRef}
    {...props}
  />
);
MenuSeparator.displayName = "MenuSeparator";

export {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
};

// Back-compat aliases for menu-bar package expectations
const MenuBar = Menu;
const MenuBarMenu = MenuSubmenu;
const MenuBarTrigger = MenuTrigger;
const MenuBarContent = MenuContent;
const MenuBarItem = MenuItem as typeof MenuItem;
const MenuBarSeparator = MenuSeparator;
const MenuBarSubmenu = MenuSubmenu;
const MenuBarSubmenuTrigger = MenuSubmenuTrigger;
const MenuBarSubmenuContent = MenuSubmenuContent;

export {
  MenuBar,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarSeparator,
  MenuBarSubmenu,
  MenuBarSubmenuContent,
  MenuBarSubmenuTrigger,
  MenuBarTrigger,
};
