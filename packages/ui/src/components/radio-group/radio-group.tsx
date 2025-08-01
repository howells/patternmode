import type { VariantProps } from "tailwind-variants";

import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
// Legacy components for backward compatibility with existing radio-group.tsx usage
// These use the new Radio components from radio.tsx
import { RadioItem } from "../radio/radio";

/**
 * Style variants for radio group layouts.
 *
 * Defines styling options for radio group containers including
 * orientation and spacing between radio items.
 * @example
 * ```tsx
 * <RadioGroup>Content</RadioGroup>
 * ```
 */
const radioGroupVariants = tv({
  base: [
    // base
    "grid gap-2",
  ],
  variants: {
    /**
     * Layout orientation of radio items.
     */
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max gap-4",
    },
    /**
     * Spacing size between radio items.
     */
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
});

/**
 * A container component that manages a group of radio buttons with mutually exclusive selection behavior.
 *
 * RadioGroup provides the essential functionality for managing multiple radio buttons as a cohesive unit,
 * ensuring only one option can be selected at a time. It handles keyboard navigation, focus management,
 * and value synchronization across all radio buttons within the group.
 *
 * **Key Features:**
 * - **Mutually Exclusive Selection**: Automatically manages single-choice selection behavior
 * - **Keyboard Navigation**: Arrow key navigation between radio options
 * - **Flexible Layout**: Support for both vertical and horizontal orientations
 * - **Size Control**: Configurable spacing between radio items
 * - **Form Integration**: Works seamlessly with form libraries and validation systems
 * - **Accessibility**: Full ARIA support with proper group semantics and focus management
 * - **Value Management**: Controlled and uncontrolled modes with change callbacks.
 *
 * **Layout Options:**
 * - **Vertical** (default): Stack radio buttons vertically with consistent spacing
 * - **Horizontal**: Arrange radio buttons in a horizontal row for compact layouts
 * - **Size Variants**: Small, medium, and large spacing options.
 *
 * **Common Use Cases:**
 * - Form field selections (single choice from multiple options)
 * - Settings and preference panels
 * - Survey and questionnaire responses
 * - Plan or tier selection interfaces
 * - Filter options in search interfaces
 * - Configuration choices in onboarding flows
 * - Payment method selection.
 *
 * **Accessibility:**
 * - Proper radiogroup ARIA role with group semantics
 * - Arrow key navigation between radio options
 * - Home/End key support for quick navigation
 * - Screen reader announcements for value changes
 * - Focus management and visual focus indicators
 * - Semantic association between group and individual radios.
 *
 * @category inputs
 * @icon CircleDot
 * @example
 * ```tsx
 * // Basic vertical radio group (default)
 * <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
 *   <RadioGroupItem value="small" />
 *   <RadioGroupItem value="medium" />
 *   <RadioGroupItem value="large" />
 * </RadioGroup>
 *
 * // Horizontal layout for compact forms
 * <RadioGroup
 *   orientation="horizontal"
 *   value={plan}
 *   onValueChange={setPlan}
 *   size="sm"
 * >
 *   <RadioGroupItem value="free" />
 *   <RadioGroupItem value="pro" />
 *   <RadioGroupItem value="enterprise" />
 * </RadioGroup>
 *
 * // Form integration with validation
 * <div className="space-y-2">
 *   <label className="text-sm font-medium">
 *     Choose your preferred contact method
 *   </label>
 *   <RadioGroup
 *     value={contactMethod}
 *     onValueChange={setContactMethod}
 *     orientation="vertical"
 *     size="md"
 *   >
 *     <RadioOption
 *       value="email"
 *       label="Email"
 *       description="We'll send updates to your email address"
 *     />
 *     <RadioOption
 *       value="sms"
 *       label="SMS"
 *       description="Receive text messages for important updates"
 *     />
 *     <RadioOption
 *       value="phone"
 *       label="Phone Call"
 *       description="Get a call for urgent notifications"
 *     />
 *   </RadioGroup>
 *   {errors.contactMethod && (
 *     <p className="text-sm text-red-600">{errors.contactMethod}</p>
 *   )}
 * </div>
 *
 * // Disabled group with default selection
 * <RadioGroup
 *   value="readonly"
 *   disabled
 *   size="lg"
 * >
 *   <RadioOption value="readonly" label="Read Only Mode" />
 *   <RadioOption value="locked" label="Locked State" />
 * </RadioGroup>
 *
 * // Plan selection with card-style options
 * <RadioGroup
 *   value={selectedPlan}
 *   onValueChange={setSelectedPlan}
 *   orientation="vertical"
 *   size="lg"
 * >
 *   <RadioCardOption
 *     value="starter"
 *     title="Starter Plan"
 *     description="Perfect for individuals getting started"
 *   />
 *   <RadioCardOption
 *     value="team"
 *     title="Team Plan"
 *     description="Collaboration features for small teams"
 *   />
 *   <RadioCardOption
 *     value="enterprise"
 *     title="Enterprise Plan"
 *     description="Advanced features for large organizations"
 *   />
 * </RadioGroup>
 * ```
 */
/**
 * Group component for managing mutually exclusive radio button selections.
 *
 * @id radio-group
 * @name RadioGroup
 * @icon Circle
 * @category inputs
 * @component
 * @param props - Component properties.
 */
const RadioGroup = ({ ref, className, orientation, size, ...props }: React.ComponentPropsWithoutRef<typeof BaseRadioGroup>
  & VariantProps<typeof radioGroupVariants> & { ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null> }) => (
  <BaseRadioGroup
    ref={ref}
    className={cx(radioGroupVariants({ orientation, size }), className)}
    {...props}
  />
);
RadioGroup.displayName = "RadioGroup";

/**
 * Legacy radio group item component.
 *
 * Provides backward compatibility by wrapping the RadioItem component
 * from the radio module. For new code, use RadioItem directly from
 * the radio module instead.
 *
 * @deprecated Use RadioItem from "../radio" directly.
 * @see RadioItem in radio.tsx for full documentation
 */
const RadioGroupItem = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof RadioItem> & { ref?: React.RefObject<React.ElementRef<typeof RadioItem> | null> }) => (
  <RadioItem ref={ref} className={className} {...props} />
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioGroupVariants };
