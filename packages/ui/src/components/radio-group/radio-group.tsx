// Tremor RadioGroup [v1.0.0] - Base UI

import { cx } from "../../lib/utils";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Style variants for radio group layouts.
 * 
 * Defines styling options for radio group containers including
 * orientation and spacing between radio items.
 */
const radioGroupVariants = tv({
  base: [
    // base
    "grid gap-2",
  ],
  variants: {
    /** Layout orientation of radio items */
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max gap-4",
    },
    /** Spacing size between radio items */
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
 * A radio group component for managing radio button selections.
 * 
 * Based on Base UI's RadioGroup (https://base-ui.com/react/components/radio),
 * providing accessible group management for radio buttons with keyboard navigation
 * and focus management. Ensures only one radio can be selected at a time.
 *
 * @param orientation - Layout direction (vertical or horizontal)
 * @param size - Spacing size between items
 * @param value - Currently selected value
 * @param onValueChange - Callback when selection changes
 * @param disabled - Whether the entire group is disabled
 *
 * @component
 * @example
 * ```tsx
 * // Vertical radio group (default)
 * <RadioGroup value={size} onValueChange={setSize}>
 *   <RadioGroupItem value="sm">Small</RadioGroupItem>
 *   <RadioGroupItem value="md">Medium</RadioGroupItem>
 *   <RadioGroupItem value="lg">Large</RadioGroupItem>
 * </RadioGroup>
 *
 * // Horizontal layout
 * <RadioGroup 
 *   orientation="horizontal" 
 *   value={plan} 
 *   onValueChange={setPlan}
 * >
 *   <RadioGroupItem value="free">Free</RadioGroupItem>
 *   <RadioGroupItem value="pro">Pro</RadioGroupItem>
 *   <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
 * </RadioGroup>
 *
 * // Large spacing
 * <RadioGroup size="lg" value={preference} onValueChange={setPreference}>
 *   <RadioGroupItem value="opt1">Option 1</RadioGroupItem>
 *   <RadioGroupItem value="opt2">Option 2</RadioGroupItem>
 * </RadioGroup>
 *
 * // Disabled group
 * <RadioGroup disabled value={locked} onValueChange={setLocked}>
 *   <RadioGroupItem value="readonly">Read Only</RadioGroupItem>
 *   <RadioGroupItem value="locked">Locked</RadioGroupItem>
 * </RadioGroup>
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof BaseRadioGroup>,
  React.ComponentPropsWithoutRef<typeof BaseRadioGroup> &
    VariantProps<typeof radioGroupVariants>
>(({ className, orientation, size, ...props }, ref) => (
  <BaseRadioGroup
    ref={ref}
    className={cx(radioGroupVariants({ orientation, size }), className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

// Legacy components for backward compatibility with existing radio-group.tsx usage
// These use the new Radio components from radio.tsx
import { RadioItem } from "../radio/radio";

/**
 * Legacy radio group item component.
 * 
 * Provides backward compatibility by wrapping the RadioItem component
 * from the radio module. For new code, use RadioItem directly from
 * the radio module instead.
 *
 * @deprecated Use RadioItem from "../radio" directly
 * @see RadioItem in radio.tsx for full documentation
 */
const RadioGroupItem: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof RadioItem> & React.RefAttributes<React.ElementRef<typeof RadioItem>>
> = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, ...props }, ref) => (
  <RadioItem ref={ref} className={className} {...props} />
));
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioGroupVariants };