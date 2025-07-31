// Tremor Switch [v1.0.0] - Base UI

import type { VariantProps } from "tailwind-variants";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import React from "react";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";

const switchVariants = tv({
  slots: {
    root: [
      // base
      "group relative isolate inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-inner outline-hidden ring-1 ring-inset transition-all",
      "bg-zinc-200 dark:bg-zinc-950",
      // ring color
      "ring-black/5 dark:ring-zinc-800",
      // checked
      "data-[checked]:bg-blue-500 dark:data-[checked]:bg-blue-500",
      // disabled
      "data-[disabled]:cursor-default",
      // disabled checked
      "data-[disabled]:data-[checked]:bg-blue-200",
      "data-[disabled]:data-[checked]:ring-zinc-300",
      // disabled checked dark
      "dark:data-[disabled]:data-[checked]:ring-zinc-900",
      "dark:data-[disabled]:data-[checked]:bg-blue-900",
      // disabled unchecked
      "data-[disabled]:data-[unchecked]:ring-zinc-300",
      "data-[disabled]:data-[unchecked]:bg-zinc-100",
      // disabled unchecked dark
      "dark:data-[disabled]:data-[unchecked]:ring-zinc-700",
      "dark:data-[disabled]:data-[unchecked]:bg-zinc-800",
      focusRing,
    ],
    thumb: [
      // base
      "pointer-events-none relative inline-block transform appearance-none rounded-full border-none shadow-lg outline-hidden transition-all duration-150 ease-in-out focus:border-none focus:outline-hidden focus:outline-transparent",
      // background color
      "bg-white dark:bg-zinc-50",
      // disabled
      "group-data-[disabled]:shadow-none",
      "group-data-[disabled]:bg-zinc-50 dark:group-data-[disabled]:bg-zinc-500",
    ],
  },
  variants: {
    size: {
      default: {
        root: "h-5 w-9",
        thumb:
          "h-4 w-4 data-[checked]:translate-x-4 data-[unchecked]:translate-x-0",
      },
      small: {
        root: "h-4 w-7",
        thumb:
          "h-3 w-3 data-[checked]:translate-x-3 data-[unchecked]:translate-x-0",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * Props for the Switch component.
 *
 * @interface SwitchProps
 * @augments Omit<React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>, "children">
 * @augments VariantProps<typeof switchVariants>
 * @example
 * ```tsx
 * <Switch>Enable notifications</Switch>
 * ```
 */
interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
      "children"
    >,
  VariantProps<typeof switchVariants> {
  /**
   * Optional label text displayed next to the switch.
   */
  label?: string;
}

/**
 * A toggle switch component built on Base UI's Switch primitive.
 *
 * Based on Base UI's Switch (https://base-ui.com/react/components/switch),
 * providing accessible on/off controls with smooth animations and focus management.
 * Features multiple sizes and optional label support with Tremor-inspired styling.
 *
 *
 * @id switch
 * @name Switch
 * @component
 * @example
 * ```tsx
 * // Basic switch
 * <Switch />
 *
 * // Controlled switch
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * // With label
 * <Switch label="Enable notifications" />
 *
 * // Different sizes
 * <Switch size="small" />
 * <Switch size="default" />
 *
 * // Form integration
 * <Switch name="newsletter" defaultChecked />
 * ```
 *
 * @see https://base-ui.com/react/components/switch - Base UI documentation
 */
/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * @id switch
 * @name Switch
 * @component
 */
const /**
       *
       */
  Switch = ({ ref: forwardedRef, className, size, label, ...props }: SwitchProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null> }) => {
    const { root, thumb } = switchVariants({ size });

    if (label) {
      return (
        <div className="flex items-center space-x-2">
          <BaseSwitch.Root
            ref={forwardedRef}
            className={cx(root(), className)}
            {...props}
          >
            <BaseSwitch.Thumb className={cx(thumb())} />
          </BaseSwitch.Root>
          <span className="text-sm text-zinc-900 dark:text-zinc-100">
            {label}
          </span>
        </div>
      );
    }

    return (
      <BaseSwitch.Root
        ref={forwardedRef}
        className={cx(root(), className)}
        {...props}
      >
        <BaseSwitch.Thumb className={cx(thumb())} />
      </BaseSwitch.Root>
    );
  };

Switch.displayName = "Switch";

// Export individual components for advanced usage
const /**
       *
       */
  SwitchRoot = BaseSwitch.Root;
const /**
       *
       */
  SwitchThumb = BaseSwitch.Thumb;

export { Switch, SwitchRoot, SwitchThumb, switchVariants };
