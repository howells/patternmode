import { ContextMenu as BaseContextMenu } from "@base-ui-components/react/context-menu";
import { Icon as IconComponent } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import { floatingItemVariants } from "@patternmode/utils/floating-item";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { Check, ChevronRight, Circle, CircleDot } from "lucide-react";
import type * as React from "react";

type ContextMenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Root>,
  "open" | "defaultOpen" | "onOpenChange" | "children"
> & {
    ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Root> | null>;
  };

type ContextMenuContentProps = {
  sideOffset?: number;
  collisionPadding?: number;
  align?: "start" | "center" | "end";
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup> & {
    ref?: React.RefObject<React.ElementRef<
      typeof BaseContextMenu.Popup
    > | null>;
  };

type ContextMenuItemProps = {
  shortcut?: string;
  hint?: string;
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item> & {
    ref?: React.RefObject<React.ElementRef<typeof BaseContextMenu.Item> | null>;
  };

type ContextMenuCheckboxItemProps = {
  shortcut?: string;
  hint?: string;
  checked?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem> & {
    ref?: React.RefObject<React.ElementRef<
      typeof BaseContextMenu.CheckboxItem
    > | null>;
  };

type ContextMenuRadioItemProps = {
  shortcut?: string;
  hint?: string;
} & React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem> & {
    ref?: React.RefObject<React.ElementRef<
      typeof BaseContextMenu.RadioItem
    > | null>;
  };

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
  ref?: React.RefObject<React.ElementRef<
    typeof BaseContextMenu.SubmenuTrigger
  > | null>;
}) => (
  <BaseContextMenu.SubmenuTrigger
    className={cx(
      floatingItemVariants({ size: "sm" }),
      "pr-1 pl-2 data-[popup-open]:bg-zinc-100 dark:data-[popup-open]:bg-zinc-800",
      className
    )}
    ref={forwardedRef}
    {...props}
  >
    {children}
    <IconComponent aria-hidden="true" className="ml-auto" icon={ChevronRight} />
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
    <BaseContextMenu.Positioner collisionPadding={8} sideOffset={8}>
      <BaseContextMenu.Popup
        className={cx(
          floatingSurfaceVariants({
            density: "compact",
            width: "sm",
            clamp: "none",
          }).base(),
          "relative will-change-[transform,opacity]",
          "max-h-[var(--context-menu-available-height)]",
          "data-[ending-style]:animate-hide data-[starting-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className
        )}
        ref={forwardedRef}
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
      align={align}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
    >
      <BaseContextMenu.Popup
        className={cx(
          floatingSurfaceVariants({
            density: "compact",
            width: "md",
            clamp: "none",
          }).base(),
          "relative will-change-[transform,opacity]",
          "max-h-[var(--context-menu-available-height)]",
          "data-[ending-style]:animate-hide data-[starting-style]:animate-hide",
          "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
          className
        )}
        ref={forwardedRef}
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
    className={cx(floatingItemVariants({ size: "sm" }), "pr-1 pl-2", className)}
    ref={forwardedRef}
    tremor-id="tremor-raw"
    {...props}
  >
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
      <BaseContextMenu.CheckboxItemIndicator>
        <IconComponent
          aria-hidden="true"
          className="size-full text-zinc-800 dark:text-zinc-200"
          icon={Check}
        />
      </BaseContextMenu.CheckboxItemIndicator>
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
    className={cx(
      floatingItemVariants({ size: "sm" }),
      "gap-x-2 pr-1 pl-8",
      className
    )}
    ref={forwardedRef}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <BaseContextMenu.RadioItemIndicator>
        <IconComponent
          aria-hidden="true"
          className="size-full text-blue-500 dark:text-blue-500"
          icon={CircleDot}
        />
      </BaseContextMenu.RadioItemIndicator>
      <span className="data-checked:hidden">
        <IconComponent
          aria-hidden="true"
          className="size-full text-zinc-300 dark:text-zinc-700"
          icon={Circle}
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
  </BaseContextMenu.RadioItem>
);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuLabel = ({
  ref: forwardedRef,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel> & {
  ref?: React.RefObject<React.ElementRef<
    typeof BaseContextMenu.GroupLabel
  > | null>;
}) => (
  <BaseContextMenu.GroupLabel
    className={cx(
      "px-2 py-2 font-medium text-xs tracking-wide",
      "text-zinc-500 dark:text-zinc-500",
      className
    )}
    ref={forwardedRef}
    {...props}
  />
);
ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = ({
  ref: forwardedRef,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator> & {
  ref?: React.RefObject<React.ElementRef<
    typeof BaseContextMenu.Separator
  > | null>;
}) => (
  <BaseContextMenu.Separator
    className={cx("-mx-1 my-1 h-px border-t dark:border-zinc-800", className)}
    ref={forwardedRef}
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
        "text-zinc-600 dark:text-zinc-400",
        "group-data-disabled/ContextMenuItem:text-zinc-400 dark:group-data-disabled/ContextMenuItem:text-zinc-700",
        className
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
