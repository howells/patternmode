// Tremor Radio Card Group [v1.0.0] - Base UI

import { cx, focusInput, focusRing } from "../../lib/utils";
import React from "react";

// Use Base UI components directly to avoid cross-component dependencies
import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

/**
 * A radio group component with card-style presentation.
 *
 * Based on Base UI's RadioGroup with styled card containers for each option.
 * Provides the same functionality as RadioGroup but with enhanced visual
 * presentation using card layouts for better prominence and selection clarity.
 *
 * @param orientation - Layout direction (vertical or horizontal)
 * @param size - Spacing size between items
 * @param value - Currently selected value
 * @param onValueChange - Callback when selection changes
 * @param disabled - Whether the entire group is disabled
 *
 *
 * @id radio-card-group
 * @name Radio Card Group
 * @component
 * @example
 * ```tsx
 * // Basic radio card group
 * <RadioCardGroup value={plan} onValueChange={setPlan}>
 *   <RadioCardItem value="basic">
 *     <div className="flex items-center justify-between">
 *       <div>
 *         <div className="font-medium">Basic Plan</div>
 *         <div className="text-sm text-zinc-500">$10/month</div>
 *       </div>
 *       <RadioCardIndicator />
 *     </div>
 *   </RadioCardItem>
 *   <RadioCardItem value="pro">
 *     <div className="flex items-center justify-between">
 *       <div>
 *         <div className="font-medium">Pro Plan</div>
 *         <div className="text-sm text-zinc-500">$25/month</div>
 *       </div>
 *       <RadioCardIndicator />
 *     </div>
 *   </RadioCardItem>
 * </RadioCardGroup>
 *
 * // Horizontal layout
 * <RadioCardGroup
 *   orientation="horizontal"
 *   value={size}
 *   onValueChange={setSize}
 * >
 *   <RadioCardItem value="sm">Small</RadioCardItem>
 *   <RadioCardItem value="md">Medium</RadioCardItem>
 *   <RadioCardItem value="lg">Large</RadioCardItem>
 * </RadioCardGroup>
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
/**
 * A group of selectable cards that behave like radio buttons.
 *
 * @id radio-card-group
 * @name Radio Card Group
 * @component
 */
const RadioCardGroup = React.forwardRef<
  React.ElementRef<typeof BaseRadioGroup>,
  React.ComponentPropsWithoutRef<typeof BaseRadioGroup>
>(({ className, ...props }, ref) => (
  <BaseRadioGroup ref={ref} className={cx("grid gap-2", className)} {...props} />
));
RadioCardGroup.displayName = "RadioCardGroup";

/**
 * Individual radio card item with enhanced styling.
 *
 * Based on Base UI's Radio component with card-style presentation including
 * padding, borders, shadows, and visual states. Provides a prominent,
 * clickable area for radio selections with clear visual feedback.
 *
 * @param value - The value this radio represents
 * @param disabled - Whether this option is disabled
 * @param children - Content to display inside the card
 *
 * @example
 * ```tsx
 * // Simple card item
 * <RadioCardItem value="option1">
 *   Option 1
 *   <RadioCardIndicator />
 * </RadioCardItem>
 *
 * // Rich content card
 * <RadioCardItem value="premium">
 *   <div className="flex items-start gap-3">
 *     <div className="flex-1">
 *       <div className="font-semibold">Premium Plan</div>
 *       <div className="text-sm text-zinc-600 mt-1">
 *         Advanced features, priority support
 *       </div>
 *       <div className="text-lg font-bold mt-2">$29/mo</div>
 *     </div>
 *     <RadioCardIndicator />
 *   </div>
 * </RadioCardItem>
 *
 * // Disabled card
 * <RadioCardItem value="enterprise" disabled>
 *   <div className="opacity-50">
 *     Enterprise - Coming Soon
 *   </div>
 * </RadioCardItem>
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioCardItem = React.forwardRef<
  React.ElementRef<typeof Radio.Root>,
  React.ComponentPropsWithoutRef<typeof Radio.Root>
>(({ className, children, ...props }, ref) => (
  <Radio.Root
    ref={ref}
    className={cx(
      // base
      "group relative w-full rounded-md border p-4 text-left shadow-xs transition cursor-pointer focus:outline-hidden",
      // background color
      "bg-white dark:bg-zinc-950",
      // border color
      "border-zinc-200 dark:border-zinc-800",
      // checked
      "data-[checked]:border-blue-500 dark:data-[checked]:border-blue-500",
      // disabled
      "data-[disabled]:border-zinc-100 dark:data-[disabled]:border-zinc-800",
      "data-[disabled]:bg-zinc-50 data-[disabled]:shadow-none dark:data-[disabled]:bg-zinc-900",
      "data-[disabled]:cursor-not-allowed",
      // focus
      focusInput,
      className
    )}
    {...props}
  >
    {children}
  </Radio.Root>
));
RadioCardItem.displayName = "RadioCardItem";

/**
 * Visual indicator for radio card selection state.
 *
 * Based on Base UI's RadioIndicator with enhanced styling for card layouts.
 * Shows a circular radio button indicator that displays selection state
 * with proper hover, focus, and disabled styling.
 *
 * @example
 * ```tsx
 * <RadioCardItem value="option1">
 *   <div className="flex items-center justify-between">
 *     <span>Select this option</span>
 *     <RadioCardIndicator />
 *   </div>
 * </RadioCardItem>
 *
 * // Indicator automatically shows selection state
 * // No props needed - state comes from parent RadioCardItem
 * <RadioCardItem value="selected">
 *   Content here
 *   <RadioCardIndicator />
 * </RadioCardItem>
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioCardIndicator = React.forwardRef<
  React.ElementRef<typeof Radio.Indicator>,
  React.ComponentPropsWithoutRef<typeof Radio.Indicator>
>(({ className, ...props }, ref) => (
  <Radio.Indicator
    ref={ref}
    className={cx(
      // base
      "relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-full border shadow-xs outline-hidden",
      // border color
      "border-zinc-200 dark:border-zinc-800",
      // background color
      "bg-white dark:bg-zinc-950",
      // checked
      "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
      // disabled
      "group-data-[disabled]:border-zinc-200 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400",
      "dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
      // focus
      focusRing,
      className
    )}
    {...props}
  >
    <div
      className={cx(
        // base
        "size-1.5 shrink-0 rounded-full opacity-0",
        // indicator - shows when checked
        "bg-white group-data-[checked]:opacity-100",
        // disabled
        "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500"
      )}
    />
  </Radio.Indicator>
));
RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardGroup, RadioCardIndicator, RadioCardItem };
