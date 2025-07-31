// Tremor Menu [v1.0.0] - Base UI

"use client";

import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import { Check, ChevronRight, Circle, CircleDot } from "lucide-react";
import * as React from "react";

import { cx } from "../../lib/utils";
import { Icon as IconComponent } from "../icon/icon";

/**
 * Dropdown menu component built on Base UI with support for nested submenus, radio groups, checkboxes, and keyboard navigation.
 *
 * Menu
 *
 * @component
 * @id menu
 * @name Menu
 * @example
 * ```tsx
 * <MenuSubmenuTrigger>Content</MenuSubmenuTrigger>
 * ```
 */
const Menu = BaseMenu.Root;

const MenuTrigger = BaseMenu.Trigger;

const MenuGroup = BaseMenu.Group;

const MenuSubmenu = BaseMenu.SubmenuRoot;

const MenuRadioGroup = BaseMenu.RadioGroup;

const MenuSubmenuTrigger = React.forwardRef<
  React.ElementRef<typeof BaseMenu.SubmenuTrigger>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>
>(({ className, children, ...props }, forwardedRef) => (
  <BaseMenu.SubmenuTrigger
    ref={forwardedRef}
    className={cx(
      // base
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
      // focus
      "focus-visible:bg-zinc-100 data-[popup-open]:bg-zinc-100 dark:focus-visible:bg-zinc-900 dark:data-[popup-open]:bg-zinc-900",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-900",
      className
    )}
    {...props}
  >
    {children}
    <IconComponent icon={ChevronRight} className="ml-auto" aria-hidden="true" />
  </BaseMenu.SubmenuTrigger>
));
MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";

const MenuSubmenuContent = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>
>(({ className, ...props }, forwardedRef) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner sideOffset={8} collisionPadding={8}>
      <BaseMenu.Popup
        ref={forwardedRef}
        className={cx(
          // base
          "relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
          // widths
          "min-w-32",
          // heights
          "max-h-[var(--menu-available-height)]",
          // background color
          "bg-white dark:bg-zinc-950",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          // border color
          "border-zinc-200 dark:border-zinc-800",
          // transition
          "will-change-[transform,opacity]",
          "data-[starting-style]:animate-hide",
          "data-[ending-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className
        )}
        {...props}
      />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
MenuSubmenuContent.displayName = "MenuSubmenuContent";

const MenuContent = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup> & {
    sideOffset?: number;
    collisionPadding?: number;
    align?: "start" | "center" | "end";
  }
>(
  (
    {
      className,
      sideOffset = 8,
      collisionPadding = 8,
      align = "center",
      ...props
    },
    forwardedRef
  ) => (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
      >
        <BaseMenu.Popup
          ref={forwardedRef}
          className={cx(
            // base
            "relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
            // widths
            "min-w-48",
            // heights
            "max-h-[var(--menu-available-height)]",
            // background color
            "bg-white dark:bg-zinc-950",
            // text color
            "text-zinc-900 dark:text-zinc-50",
            // border color
            "border-zinc-200 dark:border-zinc-800",
            // transition
            "will-change-[transform,opacity]",
            "data-[starting-style]:animate-hide",
            "data-[ending-style]:animate-hide",
            "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
            className
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
);
MenuContent.displayName = "MenuContent";

const MenuItem = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Item>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item> & {
    shortcut?: string;
    hint?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }
>(
  (
    { className, shortcut, hint, icon: Icon, children, ...props },
    forwardedRef
  ) => (
    <BaseMenu.Item
      ref={forwardedRef}
      className={cx(
        // base
        "group/MenuItem relative flex cursor-pointer select-none items-center rounded-sm py-1.5 outline-hidden transition-colors sm:text-sm",
        // adjust padding based on whether icon is present
        Icon ? "pl-8 pr-1" : "pl-2 pr-1",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // disabled
        "data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
        // focus
        "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
        // hover
        "data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
        className
      )}
      tremor-id="tremor-raw"
      {...props}
    >
      {Icon && (
        <span className="absolute left-2 flex size-4 items-center justify-center">
          <IconComponent
            icon={Icon}
            className="text-zinc-600 dark:text-zinc-400 group-data-disabled/MenuItem:text-zinc-400 dark:group-data-disabled/MenuItem:text-zinc-700"
          />
        </span>
      )}
      {children}
      {hint && (
        <span
          className={cx(
            "ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600"
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cx(
            "ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600"
          )}
        >
          {shortcut}
        </span>
      )}
    </BaseMenu.Item>
  )
);
MenuItem.displayName = "MenuItem";

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof BaseMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem> & {
    shortcut?: string;
    hint?: string;
  }
>(
  (
    { className, hint, shortcut, children, checked, ...props },
    forwardedRef
  ) => (
    <BaseMenu.CheckboxItem
      ref={forwardedRef}
      className={cx(
        // base
        "relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // disabled
        "data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
        // focus
        "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
        // hover
        "data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.CheckboxItemIndicator>
          <IconComponent
            icon={Check}
            aria-hidden="true"
            className="size-full text-zinc-800 dark:text-zinc-200"
          />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
      {hint && (
        <span
          className={cx(
            "ml-auto text-sm font-normal text-zinc-400 dark:text-zinc-600"
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cx(
            "ml-auto text-sm font-normal tracking-widest text-zinc-400 dark:border-zinc-800 dark:text-zinc-600"
          )}
        >
          {shortcut}
        </span>
      )}
    </BaseMenu.CheckboxItem>
  )
);
MenuCheckboxItem.displayName = "MenuCheckboxItem";

const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof BaseMenu.RadioItem>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem> & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, hint, shortcut, children, ...props }, forwardedRef) => (
  <BaseMenu.RadioItem
    ref={forwardedRef}
    className={cx(
      // base
      "group/MenuRadioItem relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
      // focus
      "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
      // hover
      "data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <BaseMenu.RadioItemIndicator>
        <IconComponent
          icon={CircleDot}
          aria-hidden="true"
          className="size-full text-blue-500 dark:text-blue-500"
        />
      </BaseMenu.RadioItemIndicator>
      <span className="data-checked:hidden">
        <IconComponent
          icon={Circle}
          aria-hidden="true"
          className="size-full text-zinc-300 dark:text-zinc-700"
        />
      </span>
    </span>
    {children}
    {hint && (
      <span
        className={cx(
          "ml-auto text-sm font-normal text-zinc-400 dark:text-zinc-600"
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "ml-auto text-sm font-normal tracking-widest text-zinc-400 dark:border-zinc-800 dark:text-zinc-600"
        )}
      >
        {shortcut}
      </span>
    )}
  </BaseMenu.RadioItem>
));
MenuRadioItem.displayName = "MenuRadioItem";

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof BaseMenu.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>
>(({ className, ...props }, forwardedRef) => (
  <BaseMenu.GroupLabel
    ref={forwardedRef}
    className={cx(
      // base
      "px-2 py-2 text-xs font-medium tracking-wide",
      // text color
      "text-zinc-500 dark:text-zinc-500",
      className
    )}
    {...props}
  />
));
MenuLabel.displayName = "MenuLabel";

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>
>(({ className, ...props }, forwardedRef) => (
  <BaseMenu.Separator
    ref={forwardedRef}
    className={cx(
      "-mx-1 my-1 h-px border-t border-zinc-200 dark:border-zinc-800",
      className
    )}
    {...props}
  />
));
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
