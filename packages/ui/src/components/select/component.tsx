import type { VariantProps } from "tailwind-variants";

import { Select as BaseSelect } from "@base-ui-components/react/select";
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { tv } from "tailwind-variants";

import { config } from "../../lib/config";
import { cx, focusInput, hasErrorInput } from "../../lib/utils";
import { Icon } from "../icon";

const Select = ({ ref, ...props }: React.ComponentPropsWithoutRef<typeof BaseSelect.Root> & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Root> | null> }) => (
  <BaseSelect.Root ref={ref} data-testid="select" {...props} />
);
Select.displayName = "Select";
const SelectGroup = BaseSelect.Group;

/**
 * Displays the selected value or placeholder text in the trigger.
 */
const SelectValue = BaseSelect.Value;

const selectTriggerVariants = tv({
  base: [
    // base
    "group/trigger flex w-full max-w-sm select-none items-center justify-between gap-2 truncate rounded-md border shadow-xs outline-hidden transition",
    // border color
    " dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder
    "data-[placeholder]:text-zinc-500 dark:data-[placeholder]:text-zinc-500",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "data-[disabled]:bg-zinc-100 data-[disabled]:text-zinc-400",
    "dark:data-[disabled]:border-zinc-700 dark:data-[disabled]:bg-zinc-800 dark:data-[disabled]:text-zinc-500",
    // readonly
    "data-[readonly]:cursor-default data-[readonly]:hover:bg-white dark:data-[readonly]:hover:bg-zinc-950",
    focusInput,
  ],
  variants: {
    size: {
      xs: "px-2 h-control-xs text-xs",
      sm: "px-2.5 h-control-sm text-sm",
      default: "px-3 h-control-base text-sm",
      lg: "px-4 h-control-lg text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * Props for the SelectTrigger component.
 */
type SelectTriggerProps = {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;
  /**
   * Size variant determining height and text size.
   * - "xs": Extra small height and text size for very compact layouts
   * - "sm": Small height and text size for compact layouts
   * - "default": Regular height and text size for most use cases
   * - "lg": Large height and text size for prominent displays
   */
  size?: "xs" | "sm" | "default" | "lg";
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> & VariantProps<typeof selectTriggerVariants>;

/**
 * Clickable trigger that opens the select dropdown and displays the current value.
 */
const SelectTrigger = ({ ref, className, hasError, size, children, ...props }: SelectTriggerProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Trigger> | null> }) => {
  return (
    <BaseSelect.Trigger
      ref={ref}
      className={cx(
        selectTriggerVariants({ size }),
        hasError ? hasErrorInput : "",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <BaseSelect.Icon>
        <ChevronsUpDown
          className={cx(
            // base
            "shrink-0",
            // size based on trigger size
            size === "sm" ? "size-3" : "size-4",
            // text color
            "text-zinc-400 dark:text-zinc-600",
            // disabled
            "group-data-[disabled]/trigger:text-zinc-300 dark:group-data-[disabled]/trigger:text-zinc-600",
          )}
          aria-hidden="true"
        />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
};
SelectTrigger.displayName = "SelectTrigger";

/**
 * Props for the SelectScrollUpButton component.
 */
type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>;

/**
 * Scroll up button that appears when there are more options above the visible area.
 */
const SelectScrollUpButton = ({ ref, className, ...props }: SelectScrollUpButtonProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.ScrollUpArrow> | null> }) => (
  <BaseSelect.ScrollUpArrow
    ref={ref}
    className={cx(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <Icon icon={ChevronUp} size="sm" aria-hidden="true" />
  </BaseSelect.ScrollUpArrow>
);
SelectScrollUpButton.displayName = "SelectScrollUpButton";

/**
 * Props for the SelectScrollDownButton component.
 */
type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>;

/**
 * Scroll down button that appears when there are more options below the visible area.
 */
const SelectScrollDownButton = ({ ref, className, ...props }: SelectScrollDownButtonProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.ScrollDownArrow> | null> }) => (
  <BaseSelect.ScrollDownArrow
    ref={ref}
    className={cx(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <Icon
      icon={ChevronDown}
      size="sm"
      strokeWidth={config.getIconStrokeWidth()}
      aria-hidden="true"
    />
  </BaseSelect.ScrollDownArrow>
);
SelectScrollDownButton.displayName = "SelectScrollDownButton";

/**
 * Props for the SelectBackdrop component.
 */
type SelectBackdropProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Backdrop>;

/**
 * Optional backdrop that appears behind the select dropdown.
 */
const SelectBackdrop = ({ ref, className, ...props }: SelectBackdropProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Backdrop> | null> }) => (
  <BaseSelect.Backdrop
    ref={ref}
    className={cx(
      // base
      "fixed inset-0 z-40",
      // background
      "bg-black/20 dark:bg-black/40",
      // animations
      "data-[starting-style]:animate-in data-[ending-style]:animate-out",
      "data-[starting-style]:fade-in data-[ending-style]:fade-out",
      className,
    )}
    {...props}
  />
);
SelectBackdrop.displayName = "SelectBackdrop";

const SelectPortal = BaseSelect.Portal;

/**
 * Props for the SelectPositioner component.
 */
type SelectPositionerProps = {
  /**
   * Distance from the trigger element in pixels.
   */
  sideOffset?: number;
  /**
   * Padding for collision detection in pixels.
   */
  collisionPadding?: number;
  /**
   * Whether to align the item with the trigger (for better visual alignment).
   */
  alignItemWithTrigger?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>;

/**
 * Positioner component that handles dropdown placement and collision detection.
 */
const SelectPositioner = ({ ref, sideOffset = 8, collisionPadding = 10, alignItemWithTrigger = true, ...props }: SelectPositionerProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Positioner> | null> }) => (
  <BaseSelect.Positioner
    ref={ref}
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    alignItemWithTrigger={alignItemWithTrigger}
    {...props}
  />
);
SelectPositioner.displayName = "SelectPositioner";

/**
 * Props for the SelectContent component.
 */
type SelectContentProps = {
  /**
   * Distance from the trigger element in pixels.
   */
  sideOffset?: number;
  /**
   * Padding for collision detection in pixels.
   */
  collisionPadding?: number;
  /**
   * Preferred placement side relative to the trigger.
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Alignment relative to the trigger element.
   */
  align?: "start" | "center" | "end";
  /**
   * Whether to align the item with the trigger (for better visual alignment).
   */
  alignItemWithTrigger?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>;

/**
 * Dropdown content container that holds the select options.
 */
const SelectContent = (
  { ref, className, children, sideOffset = 8, collisionPadding = 10, side = "bottom", align = "start", alignItemWithTrigger = true, ...props }: SelectContentProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Popup> | null> },
) => (
  <SelectPortal>
    <SelectPositioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      alignItemWithTrigger={alignItemWithTrigger}
    >
      <SelectScrollUpButton />
      <BaseSelect.Popup
        ref={ref}
        className={cx(
          // base
          "relative z-50 overflow-hidden rounded-md border shadow-xl shadow-black/[2.5%]",
          // widths
          "min-w-[var(--anchor-width)] max-w-[95vw]",
          // heights
          "max-h-[var(--available-height)]",
          // background color
          "bg-white dark:bg-zinc-950",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          // border color
          " dark:border-zinc-800",
          // animations
          "data-[starting-style]:animate-in data-[ending-style]:animate-out",
          "data-[starting-style]:fade-in data-[ending-style]:fade-out",
          "data-[starting-style]:zoom-in-95 data-[ending-style]:zoom-out-95",
          "data-[side=bottom]:data-[starting-style]:slide-in-from-top-2 data-[side=bottom]:data-[ending-style]:slide-out-to-top-2",
          "data-[side=left]:data-[starting-style]:slide-in-from-right-2 data-[side=left]:data-[ending-style]:slide-out-to-right-2",
          "data-[side=right]:data-[starting-style]:slide-in-from-left-2 data-[side=right]:data-[ending-style]:slide-out-to-left-2",
          "data-[side=top]:data-[starting-style]:slide-in-from-bottom-2 data-[side=top]:data-[ending-style]:slide-out-to-bottom-2",
          className,
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </BaseSelect.Popup>
      <SelectScrollDownButton />
    </SelectPositioner>
  </SelectPortal>
);
SelectContent.displayName = "SelectContent";

/**
 * Props for the SelectGroupLabel component.
 */
type SelectGroupLabelProps = React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>;

/**
 * Label component for grouping related select options.
 */
const SelectGroupLabel = ({ ref, className, ...props }: SelectGroupLabelProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.GroupLabel> | null> }) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cx(
      // base
      "px-3 py-2 text-xs font-medium tracking-wide",
      // text color
      "text-zinc-500 dark:text-zinc-500",
      className,
    )}
    {...props}
  />
);
SelectGroupLabel.displayName = "SelectGroupLabel";

/**
 * Props for the SelectItem component.
 */
type SelectItemProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Item>;

/**
 * Individual selectable option within the dropdown.
 */
const SelectItem = ({ ref, className, children, ...props }: SelectItemProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Item> | null> }) => {
  return (
    <BaseSelect.Item
      ref={ref}
      className={cx(
        // base
        "grid cursor-pointer grid-cols-[1fr_20px] gap-x-2 rounded-sm px-3 py-2 outline-hidden transition-colors data-[selected]:font-semibold sm:text-sm",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // disabled
        "data-[disabled]:pointer-events-none data-[disabled]:text-zinc-400 data-[disabled]:hover:bg-none dark:data-[disabled]:text-zinc-600",
        // focus/highlight
        "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-900",
        // hover
        "hover:bg-zinc-100 dark:hover:bg-zinc-900",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText className="flex-1 truncate">
        {children}
      </BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>
        <Icon
          icon={Check}
          size="lg"
          className="text-zinc-800 dark:text-zinc-200"
          aria-hidden="true"
        />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
};
SelectItem.displayName = "SelectItem";

/**
 * Props for the SelectSeparator component.
 */
type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>;

/**
 * Visual separator for dividing groups of select options.
 */
const SelectSeparator = ({ ref, className, ...props }: SelectSeparatorProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Separator> | null> }) => (
  <BaseSelect.Separator
    ref={ref}
    className={cx(
      // base
      "-mx-1 my-1 h-px",
      // background color
      "bg-zinc-300 dark:bg-zinc-700",
      className,
    )}
    {...props}
  />
);
SelectSeparator.displayName = "SelectSeparator";

/**
 * Props for the SelectArrow component.
 */
type SelectArrowProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Arrow>;

/**
 * Arrow pointer that connects the dropdown to the trigger element.
 */
const SelectArrow = ({ ref, className, ...props }: SelectArrowProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Arrow> | null> }) => (
  <BaseSelect.Arrow
    ref={ref}
    className={cx(
      // base
      "flex transition-all duration-200 ease-out",
      // positioning based on side
      "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
      "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
      className,
    )}
    {...props}
  >
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-white dark:fill-zinc-950"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-zinc-200 dark:fill-zinc-700"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-zinc-300 dark:fill-zinc-600"
      />
    </svg>
  </BaseSelect.Arrow>
);
SelectArrow.displayName = "SelectArrow";

export {
  Select,
  SelectArrow,
  type SelectArrowProps,
  SelectBackdrop,
  type SelectBackdropProps,
  SelectContent,
  type SelectContentProps,
  SelectGroup,
  SelectGroupLabel,
  type SelectGroupLabelProps,
  SelectItem,
  type SelectItemProps,
  SelectPortal,
  SelectPositioner,
  type SelectPositionerProps,
  type SelectScrollDownButtonProps,
  type SelectScrollUpButtonProps,
  SelectSeparator,
  type SelectSeparatorProps,
  SelectTrigger,
  type SelectTriggerProps,
  selectTriggerVariants,
  SelectValue,
};
