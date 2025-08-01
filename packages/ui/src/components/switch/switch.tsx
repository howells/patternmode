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
type SwitchProps = {
  /**
   * Optional label text displayed next to the switch.
   */
  label?: string;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
      "children"
    > & VariantProps<typeof switchVariants>;

/**
 * A binary toggle switch component for on/off states with smooth animations and full accessibility support.
 *
 * Built on Base UI's Switch primitive, this component provides an intuitive toggle interface for
 * binary choices. Unlike checkboxes, switches are designed for immediate state changes and are
 * commonly used for settings, preferences, and feature toggles.
 *
 * **Key Features:**
 * - **Smooth Animations**: Fluid thumb movement with CSS transitions
 * - **Keyboard Accessible**: Space and Enter key activation with proper focus management
 * - **Size Variants**: Small and default sizes for different UI contexts
 * - **Optional Labels**: Built-in label support with proper association
 * - **Touch Optimized**: Large touch targets for mobile devices
 * - **Form Integration**: Works seamlessly with forms and controlled/uncontrolled patterns
 * - **Visual States**: Clear on/off visual distinction with color and position changes.
 *
 * **Common Use Cases:**
 * - Settings and preferences panels
 * - Feature toggles and experiments
 * - Notification and privacy controls
 * - Theme switching (dark/light mode)
 * - Form field enables/disables
 * - API endpoint activation
 * - Real-time feature flags.
 *
 * **Accessibility:**
 * - Proper ARIA attributes (role="switch", aria-checked)
 * - Keyboard navigation with space and enter keys
 * - Screen reader announcements for state changes
 * - Focus management and visual focus indicators
 * - Semantic switch role instead of checkbox.
 *
 * @category inputs
 * @icon ToggleLeft
 * @example
 * ```tsx
 * // Basic uncontrolled switch
 * <Switch defaultChecked={false} />
 *
 * // Controlled switch with state management
 * <Switch
 *   checked={notifications}
 *   onCheckedChange={setNotifications}
 * />
 *
 * // Switch with label
 * <Switch
 *   label="Enable email notifications"
 *   checked={emailEnabled}
 *   onCheckedChange={setEmailEnabled}
 * />
 *
 * // Small size for compact layouts
 * <Switch
 *   size="small"
 *   label="Dark mode"
 *   checked={isDarkMode}
 *   onCheckedChange={setIsDarkMode}
 * />
 *
 * // Form integration
 * <form onSubmit={handleSubmit}>
 *   <Switch
 *     name="newsletter"
 *     label="Subscribe to newsletter"
 *     defaultChecked={true}
 *   />
 *   <Switch
 *     name="marketing"
 *     label="Marketing emails"
 *     disabled={!newsletter}
 *   />
 *   <button type="submit">Save Settings</button>
 * </form>
 *
 * // Settings panel with multiple switches
 * <div className="space-y-4">
 *   <div className="flex justify-between items-center">
 *     <span className="font-medium">Privacy Settings</span>
 *   </div>
 *
 *   <Switch
 *     label="Share analytics data"
 *     checked={settings.analytics}
 *     onCheckedChange={(checked) =>
 *       updateSettings({ analytics: checked })
 *     }
 *   />
 *
 *   <Switch
 *     label="Allow marketing communications"
 *     checked={settings.marketing}
 *     onCheckedChange={(checked) =>
 *       updateSettings({ marketing: checked })
 *     }
 *   />
 *
 *   <Switch
 *     label="Enable location tracking"
 *     checked={settings.location}
 *     onCheckedChange={(checked) =>
 *       updateSettings({ location: checked })
 *     }
 *     size="small"
 *   />
 * </div>
 *
 * // Disabled state
 * <Switch
 *   label="Premium feature"
 *   disabled={!isPremiumUser}
 *   checked={false}
 * />
 * ```
 */
/**
 * Toggle switch component for binary on/off state selection.
 *
 * @id switch
 * @name Switch
 * @icon ToggleLeft
 * @category inputs
 * @component
 * @param props - Component properties.
 */
const Switch = ({ ref: forwardedRef, className, size, label, ...props }: SwitchProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null> }) => {
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
const SwitchRoot = BaseSwitch.Root;
const SwitchThumb = BaseSwitch.Thumb;

export { Switch, type SwitchProps, SwitchRoot, SwitchThumb, switchVariants };
