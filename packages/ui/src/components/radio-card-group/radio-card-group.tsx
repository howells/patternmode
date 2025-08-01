// Tremor Radio Card Group [v1.0.0] - Base UI

// Use Base UI components directly to avoid cross-component dependencies
import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import React from "react";

import { cx, focusInput, focusRing } from "../../lib/utils";

/**
 * A radio group component that presents options as prominent, selectable cards with enhanced visual design.
 *
 * RadioCardGroup provides the same mutually exclusive selection behavior as a standard radio group,
 * but presents each option as a visually prominent card. This design pattern is ideal for presenting
 * choices that benefit from additional visual space, such as pricing plans, feature comparisons,
 * or options that need rich content like descriptions, icons, or pricing information.
 *
 * **Key Features:**
 * - **Card-Based Design**: Each option is presented as a bordered, shadowed card
 * - **Enhanced Selection**: Clear visual feedback with border highlighting and focus states
 * - **Rich Content Support**: Ample space for descriptions, pricing, icons, and complex layouts
 * - **Mutually Exclusive**: Standard radio button behavior with single selection
 * - **Keyboard Navigation**: Full keyboard accessibility with arrow key navigation
 * - **Flexible Layout**: Support for both vertical and horizontal arrangements
 * - **Visual States**: Hover, focus, selected, and disabled states with clear distinctions.
 *
 * **Design Benefits:**
 * - **Higher Engagement**: Cards provide more prominent click targets
 * - **Better Scannability**: Clear visual separation between options
 * - **Content Flexibility**: Support for rich content layouts within each card
 * - **Professional Appearance**: Elevated design for premium experiences.
 *
 * **Common Use Cases:**
 * - Pricing plan selection and tier comparisons
 * - Feature package selection with detailed descriptions
 * - Shipping method selection with pricing and timing
 * - Payment method selection with card details
 * - Template or theme selection with previews
 * - Service level selection (basic, premium, enterprise)
 * - Configuration options with detailed explanations.
 *
 * **Accessibility:**
 * - Full radio group semantics with ARIA radiogroup role
 * - Keyboard navigation between cards with arrow keys
 * - Proper focus management and visual focus indicators
 * - Screen reader support with clear option announcements
 * - Semantic selection state communication.
 *
 * @category inputs
 * @icon CircleDot
 * @example
 * ```tsx
 * // Pricing plan selection
 * <RadioCardGroup value={selectedPlan} onValueChange={setSelectedPlan}>
 *   <RadioCardItem value="starter">
 *     <div className="flex items-center justify-between">
 *       <div>
 *         <div className="font-semibold text-lg">Starter Plan</div>
 *         <div className="text-sm text-zinc-600 mt-1">
 *           Perfect for individuals getting started
 *         </div>
 *         <div className="mt-2">
 *           <span className="text-2xl font-bold">$9</span>
 *           <span className="text-zinc-500">/month</span>
 *         </div>
 *       </div>
 *       <RadioCardIndicator />
 *     </div>
 *   </RadioCardItem>
 *
 *   <RadioCardItem value="team">
 *     <div className="flex items-center justify-between">
 *       <div>
 *         <div className="font-semibold text-lg">Team Plan</div>
 *         <div className="text-sm text-zinc-600 mt-1">
 *           Collaboration features for growing teams
 *         </div>
 *         <div className="mt-2">
 *           <span className="text-2xl font-bold">$29</span>
 *           <span className="text-zinc-500">/month</span>
 *         </div>
 *       </div>
 *       <RadioCardIndicator />
 *     </div>
 *   </RadioCardItem>
 * </RadioCardGroup>
 *
 * // Shipping method selection
 * <RadioCardGroup value={shippingMethod} onValueChange={setShippingMethod}>
 *   <RadioCardItem value="standard">
 *     <div className="flex justify-between items-center">
 *       <div>
 *         <div className="font-medium">Standard Shipping</div>
 *         <div className="text-sm text-zinc-500">5-7 business days</div>
 *       </div>
 *       <div className="text-right">
 *         <div className="font-semibold">$5.99</div>
 *         <RadioCardIndicator />
 *       </div>
 *     </div>
 *   </RadioCardItem>
 *
 *   <RadioCardItem value="express">
 *     <div className="flex justify-between items-center">
 *       <div>
 *         <div className="font-medium">Express Shipping</div>
 *         <div className="text-sm text-zinc-500">2-3 business days</div>
 *       </div>
 *       <div className="text-right">
 *         <div className="font-semibold">$12.99</div>
 *         <RadioCardIndicator />
 *       </div>
 *     </div>
 *   </RadioCardItem>
 * </RadioCardGroup>
 *
 * // Feature comparison with rich content
 * <RadioCardGroup value={selectedFeature} onValueChange={setSelectedFeature}>
 *   <RadioCardItem value="basic">
 *     <div className="space-y-3">
 *       <div className="flex items-center justify-between">
 *         <h3 className="font-semibold">Basic Features</h3>
 *         <RadioCardIndicator />
 *       </div>
 *       <ul className="text-sm text-zinc-600 space-y-1">
 *         <li>✓ Core functionality</li>
 *         <li>✓ Email support</li>
 *         <li>✓ Basic analytics</li>
 *       </ul>
 *     </div>
 *   </RadioCardItem>
 *
 *   <RadioCardItem value="premium">
 *     <div className="space-y-3">
 *       <div className="flex items-center justify-between">
 *         <h3 className="font-semibold">Premium Features</h3>
 *         <RadioCardIndicator />
 *       </div>
 *       <ul className="text-sm text-zinc-600 space-y-1">
 *         <li>✓ All basic features</li>
 *         <li>✓ Priority support</li>
 *         <li>✓ Advanced analytics</li>
 *         <li>✓ Custom integrations</li>
 *       </ul>
 *     </div>
 *   </RadioCardItem>
 * </RadioCardGroup>
 *
 * // Disabled option
 * <RadioCardGroup value={currentPlan} onValueChange={setPlan}>
 *   <RadioCardItem value="free">
 *     <div className="flex items-center justify-between">
 *       <span>Free Plan</span>
 *       <RadioCardIndicator />
 *     </div>
 *   </RadioCardItem>
 *
 *   <RadioCardItem value="enterprise" disabled>
 *     <div className="flex items-center justify-between opacity-50">
 *       <div>
 *         <span>Enterprise Plan</span>
 *         <div className="text-sm text-zinc-500">Coming Soon</div>
 *       </div>
 *       <RadioCardIndicator />
 *     </div>
 *   </RadioCardItem>
 * </RadioCardGroup>
 * ```
 */
/**
 * Card-style radio group with enhanced visual presentation for option selection.
 *
 * @id radio-card-group
 * @name RadioCardGroup
 * @icon Circle
 * @category inputs
 * @component
 * @param props - Component properties.
 */
const RadioCardGroup = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & { ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null> }) => (
  <BaseRadioGroup ref={ref} className={cx("grid gap-2", className)} {...props} />
);
RadioCardGroup.displayName = "RadioCardGroup";

/**
 * Individual radio card item with enhanced styling.
 *
 * Based on Base UI's Radio component with card-style presentation including
 * padding, borders, shadows, and visual states. Provides a prominent,
 * clickable area for radio selections with clear visual feedback.
 *
 * @param value - The value this radio represents.
 * @param disabled - Whether this option is disabled.
 * @param children - Content to display inside the card.
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
const RadioCardItem = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof Radio.Root> & { ref?: React.RefObject<React.ElementRef<typeof Radio.Root> | null> }) => (
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
      className,
    )}
    {...props}
  >
    {children}
  </Radio.Root>
);
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
const RadioCardIndicator = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof Radio.Indicator> & { ref?: React.RefObject<React.ElementRef<typeof Radio.Indicator> | null> }) => (
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
      className,
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
        "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
      )}
    />
  </Radio.Indicator>
);
RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardGroup, RadioCardIndicator, RadioCardItem };
