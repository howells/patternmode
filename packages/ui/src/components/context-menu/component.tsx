import { ContextMenu as BaseContextMenu } from "@base-ui-components/react/context-menu";
import { Check, ChevronRight, Circle, CircleDot } from "lucide-react";
import * as React from "react";

import { cx } from "../../lib/utils";
import { Icon as IconComponent } from "../icon";

type ContextMenuProps = {
  /**
   * Whether the context menu is open when controlled.
   * When provided, the menu becomes controlled and requires onOpenChange.
   */
  open?: boolean;
  /**
   * Whether the context menu is open by default when uncontrolled.
   * Only used when open prop is not provided.
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when the open state changes.
   * Required when using controlled mode (open prop).
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Content to render within the context menu trigger area.
   */
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Root>, "open" | "defaultOpen" | "onOpenChange" | "children"> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Root> | null>;
};

type ContextMenuContentProps = {
  /**
   * Distance from trigger element in pixels.
   * Controls spacing between trigger and menu popup.
   */
  sideOffset?: number;
  /**
   * Padding for collision detection in pixels.
   * Prevents menu from appearing too close to viewport edges.
   */
  collisionPadding?: number;
  /**
   * Menu alignment relative to trigger.
   * Controls how the menu aligns with its trigger element.
   */
  align?: "start" | "center" | "end";
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Popup> | null>;
};

type ContextMenuItemProps = {
  /**
   * Keyboard shortcut text to display on the right side.
   * Commonly used for showing hotkey combinations like "⌘C" or "Ctrl+C".
   */
  shortcut?: string;
  /**
   * Hint text to display on the right side.
   * Used for additional context or status information.
   */
  hint?: string;
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Item> | null>;
};

type ContextMenuCheckboxItemProps = {
  /**
   * Keyboard shortcut text to display on the right side.
   * Commonly used for showing hotkey combinations.
   */
  shortcut?: string;
  /**
   * Hint text to display on the right side.
   * Used for additional context or status information.
   */
  hint?: string;
  /**
   * Whether the checkbox is checked.
   * Controls the visual state and accessibility attributes.
   */
  checked?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.CheckboxItem> | null>;
};

type ContextMenuRadioItemProps = {
  /**
   * Keyboard shortcut text to display on the right side.
   * Commonly used for showing hotkey combinations.
   */
  shortcut?: string;
  /**
   * Hint text to display on the right side.
   * * Used for additional context or status information.
   */
  hint?: string;
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.RadioItem> | null>;
};

/**
 * Right-click contextual menu component with hierarchical action items.
 */
const ContextMenu = ({ ref: _forwardedRef, ...props }: ContextMenuProps) => (
  <BaseContextMenu.Root data-testid="context-menu" {...props}>
    {props.children}
  </BaseContextMenu.Root>
);

ContextMenu.displayName = "ContextMenu";

const ContextMenuTrigger = BaseContextMenu.Trigger;

const ContextMenuGroup = BaseContextMenu.Group;

const ContextMenuSubmenu = BaseContextMenu.SubmenuRoot;

const ContextMenuRadioGroup = BaseContextMenu.RadioGroup;

const ContextMenuSubmenuTrigger = ({
  ref: forwardedRef,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuTrigger> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.SubmenuTrigger> | null>;
}) => (
  <BaseContextMenu.SubmenuTrigger
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
      "data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
      className,
    )}
    {...props}
  >
    {children}
    <IconComponent icon={ChevronRight} className="ml-auto" aria-hidden="true" />
  </BaseContextMenu.SubmenuTrigger>
);

ContextMenuSubmenuTrigger.displayName = "ContextMenuSubmenuTrigger";

const ContextMenuSubmenuContent = ({
  ref: forwardedRef,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Popup> | null>;
}) => (
  <BaseContextMenu.Portal>
    <BaseContextMenu.Positioner sideOffset={8} collisionPadding={8}>
      <BaseContextMenu.Popup
        ref={forwardedRef}
        className={cx(
          // base
          "relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
          // widths
          "min-w-32",
          // heights
          "max-h-[var(--context-menu-available-height)]",
          // background color
          "bg-white dark:bg-zinc-950",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          // border color
          " dark:border-zinc-800",
          // transition
          "will-change-[transform,opacity]",
          "data-[starting-style]:animate-hide",
          "data-[ending-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className,
        )}
        {...props}
      />
    </BaseContextMenu.Positioner>
  </BaseContextMenu.Portal>
);

ContextMenuSubmenuContent.displayName = "ContextMenuSubmenuContent";

const ContextMenuContent = ({
  ref: forwardedRef,
  className,
  sideOffset = 8,
  collisionPadding = 8,
  align = "center",
  ...props
}: ContextMenuContentProps) => (
  <BaseContextMenu.Portal>
    <BaseContextMenu.Positioner
      sideOffset={sideOffset}
      align={align}
      collisionPadding={collisionPadding}
    >
      <BaseContextMenu.Popup
        ref={forwardedRef}
        className={cx(
          // base
          "relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
          // widths
          "min-w-48",
          // heights
          "max-h-[var(--context-menu-available-height)]",
          // background color
          "bg-white dark:bg-zinc-950",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          // border color
          " dark:border-zinc-800",
          // transition
          "will-change-[transform,opacity]",
          "data-[starting-style]:animate-hide",
          "data-[ending-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className,
        )}
        {...props}
      />
    </BaseContextMenu.Positioner>
  </BaseContextMenu.Portal>
);

ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuItem = ({
  ref: forwardedRef,
  className,
  shortcut,
  hint,
  children,
  ...props
}: ContextMenuItemProps) => (
  <BaseContextMenu.Item
    ref={forwardedRef}
    className={cx(
      // base
      "group/ContextMenuItem relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-1 outline-hidden transition-colors sm:text-sm",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
      // focus
      "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
      // hover
      "data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
      className,
    )}
    tremor-id="tremor-raw"
    {...props}
  >
    {children}
    {hint && (
      <span className={cx("ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600")}>
        {hint}
      </span>
    )}
    {shortcut && (
      <span className={cx("ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600")}>
        {shortcut}
      </span>
    )}
  </BaseContextMenu.Item>
);

ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuCheckboxItem = ({
  ref: forwardedRef,
  className,
  hint,
  shortcut,
  children,
  checked,
  ...props
}: ContextMenuCheckboxItemProps) => (
  <BaseContextMenu.CheckboxItem
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
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <BaseContextMenu.CheckboxItemIndicator>
        <IconComponent
          icon={Check}
          aria-hidden="true"
          className="size-full text-zinc-800 dark:text-zinc-200"
        />
      </BaseContextMenu.CheckboxItemIndicator>
    </span>
    {children}
    {hint && (
      <span
        className={cx(
          "ml-auto text-sm font-normal text-zinc-400 dark:text-zinc-600",
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "ml-auto text-sm font-normal tracking-widest text-zinc-400 dark:border-zinc-800 dark:text-zinc-600",
        )}
      >
        {shortcut}
      </span>
    )}
  </BaseContextMenu.CheckboxItem>
);

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

const ContextMenuRadioItem = ({
  ref: forwardedRef,
  className,
  hint,
  shortcut,
  children,
  ...props
}: ContextMenuRadioItemProps) => (
  <BaseContextMenu.RadioItem
    ref={forwardedRef}
    className={cx(
      // base
      "group/ContextMenuRadioItem relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
      // focus
      "focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
      // hover
      "data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <BaseContextMenu.RadioItemIndicator>
        <IconComponent
          icon={CircleDot}
          aria-hidden="true"
          className="size-full text-blue-500 dark:text-blue-500"
        />
      </BaseContextMenu.RadioItemIndicator>
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
          "ml-auto text-sm font-normal text-zinc-400 dark:text-zinc-600",
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "ml-auto text-sm font-normal tracking-widest text-zinc-400 dark:border-zinc-800 dark:text-zinc-600",
        )}
      >
        {shortcut}
      </span>
    )}
  </BaseContextMenu.RadioItem>
);

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuLabel = ({
  ref: forwardedRef,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.GroupLabel> | null>;
}) => (
  <BaseContextMenu.GroupLabel
    ref={forwardedRef}
    className={cx(
      // base
      "px-2 py-2 text-xs font-medium tracking-wide",
      // text color
      "text-zinc-500 dark:text-zinc-500",
      className,
    )}
    {...props}
  />
);

ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = ({
  ref: forwardedRef,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Separator> | null>;
}) => (
  <BaseContextMenu.Separator
    ref={forwardedRef}
    className={cx(
      // base
      "-mx-1 my-1 h-px border-t  dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

const ContextMenuIconWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cx(
        // text color
        "text-zinc-600 dark:text-zinc-400",
        // disabled
        "group-data-disabled/ContextMenuItem:text-zinc-400 dark:group-data-disabled/ContextMenuItem:text-zinc-700",
        className,
      )}
      {...props}
    />
  );
};

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuIconWrapper,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuContent,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
};
