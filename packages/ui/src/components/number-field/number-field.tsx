// NumberField Component [v1.0.0] - Tremor Style

import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

import { cx, focusRing } from "../../lib/utils";

/**
 * Props for the NumberField component.
 *
 * @interface NumberFieldProps
 * @augments React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>
 * @example
 * ```tsx
 * <NumberField>Content</NumberField>
 * ```
 */
type NumberFieldProps = {
  /**
   * Optional label text.
   */
  label?: string;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Whether to show the interactive scrub area on the label.
   */
  showScrubArea?: boolean;
  /**
   * Whether to show increment/decrement buttons.
   */
  showSteppers?: boolean;
  /**
   * Whether the field should take full width.
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Additional CSS classes for the input element.
   */
  inputClassName?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>;

/**
 * An advanced numeric input field with stepper controls, interactive scrub area, and comprehensive keyboard navigation.
 *
 * Built on Base UI's NumberField primitive, this component provides sophisticated numeric input capabilities
 * including increment/decrement buttons, drag-to-change functionality on labels, and precise value control.
 * Features locale-aware number formatting, validation, range constraints, and smooth user interactions
 * suitable for professional applications.
 *
 * **Key Features:**
 * - **Stepper Controls**: Optional increment/decrement buttons for precise value adjustment
 * - **Interactive Scrub Area**: Drag-to-change functionality on labels for quick value modification
 * - **Keyboard Navigation**: Full keyboard support with arrow keys, page up/down, home/end
 * - **Range Validation**: Configurable min/max values with automatic constraint enforcement
 * - **Step Control**: Customizable step increments for different precision requirements
 * - **Format Support**: Locale-aware number formatting and decimal precision handling
 * - **Accessibility**: Full ARIA support with proper semantic roles and announcements.
 *
 * **Advanced Interactions:**
 * - **Scrub Area**: Click and drag on labels to adjust values with pointer lock
 * - **Step Buttons**: Visual increment/decrement controls with proper touch targets
 * - **Keyboard Shortcuts**: Arrow keys for fine adjustment, Page Up/Down for larger steps
 * - **Mouse Wheel**: Scroll over the field to adjust values (when focused).
 *
 * **Common Use Cases:**
 * - Quantity selectors in e-commerce and inventory systems
 * - Price inputs with decimal precision for financial applications
 * - Configuration settings with numeric parameters
 * - Form fields requiring precise numeric input
 * - Design tool properties (opacity, size, position values)
 * - Gaming and simulation parameter controls
 * - Scientific and engineering measurement inputs.
 *
 * **Accessibility:**
 * - Proper ARIA labels and number field semantics
 * - Keyboard navigation with arrow keys and page controls
 * - Screen reader announcements for value changes and constraints
 * - Focus management and visual focus indicators
 * - Support for assistive input methods.
 *
 * @category inputs
 * @icon Hash
 * @example
 * ```tsx
 * // Basic quantity selector
 * <NumberField
 *   label="Quantity"
 *   defaultValue={1}
 *   min={1}
 *   max={99}
 *   step={1}
 * />
 *
 * // Price input with decimal precision
 * <NumberField
 *   label="Price ($)"
 *   defaultValue={9.99}
 *   min={0}
 *   step={0.01}
 *   placeholder="0.00"
 *   fullWidth
 * />
 *
 * // Clean input without steppers
 * <NumberField
 *   label="Employee ID"
 *   showSteppers={false}
 *   placeholder="Enter ID number"
 *   min={1000}
 *   max={9999}
 * />
 *
 * // Interactive scrub area disabled
 * <NumberField
 *   label="Budget Limit"
 *   showScrubArea={false}
 *   defaultValue={5000}
 *   step={100}
 *   min={0}
 *   max={50000}
 * />
 *
 * // Controlled with form integration
 * <NumberField
 *   label="Age"
 *   value={formData.age}
 *   onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}
 *   min={18}
 *   max={120}
 *   step={1}
 *   fullWidth
 * />
 *
 * // Design tool property with scrub area
 * <NumberField
 *   label="Opacity (%)"
 *   value={opacity}
 *   onValueChange={setOpacity}
 *   min={0}
 *   max={100}
 *   step={1}
 *   showScrubArea={true}
 * />
 *
 * // Percentage input with validation
 * <NumberField
 *   label="Discount Rate"
 *   value={discount}
 *   onValueChange={setDiscount}
 *   min={0}
 *   max={100}
 *   step={0.1}
 *   placeholder="0.0"
 *   className={errors.discount ? "border-red-500" : ""}
 * />
 *
 * // Disabled state for display
 * <NumberField
 *   label="Current Balance"
 *   value={balance}
 *   disabled
 *   showSteppers={false}
 *   placeholder="Loading..."
 * />
 *
 * // Large range scientific input
 * <NumberField
 *   label="Sample Size"
 *   defaultValue={1000}
 *   min={1}
 *   max={1000000}
 *   step={100}
 *   showScrubArea={true}
 *   fullWidth
 * />
 * ```
 */
/**
 * Numeric input field with increment/decrement controls and validation.
 *
 * @id number-field
 * @name NumberField
 * @icon Hash
 * @category inputs
 * @component
 * @param props - Component properties.
 */
const NumberField = (
  { ref, label, placeholder, showScrubArea = true, showSteppers = true, fullWidth = false, className, inputClassName, id, ...props }: NumberFieldProps & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Root> | null> },
) => {
  const generatedId = React.useId();
  const fieldId = id || generatedId;

  return (
    <BaseNumberField.Root
      ref={ref}
      id={fieldId}
      className={cx("flex flex-col items-start gap-1", className)}
      {...props}
    >
      {label && (
        <NumberFieldLabel htmlFor={fieldId} showScrubArea={showScrubArea}>
          {label}
        </NumberFieldLabel>
      )}

      {showSteppers
        ? (
            <NumberFieldGroup className={fullWidth ? "w-full" : undefined}>
              <NumberFieldDecrement />
              <NumberFieldInput
                placeholder={placeholder}
                className={cx(fullWidth ? "flex-1" : undefined, inputClassName)}
              />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          )
        : (
            <NumberFieldInput
              placeholder={placeholder}
              className={cx(
                "rounded-md",
                fullWidth ? "w-full" : undefined,
                inputClassName,
              )}
            />
          )}
    </BaseNumberField.Root>
  );
};
NumberField.displayName = "NumberField";

/**
 * Label component for NumberField with optional interactive scrub area.
 *
 * Based on Base UI's NumberField.ScrubArea, allowing users to click and drag
 * on the label to adjust the numeric value. Features visual cursor feedback
 * and smooth value changes using the Pointer Lock API.
 *
 * @param showScrubArea - Whether to enable drag-to-change functionality.
 *
 * @example
 * ```tsx
 * // Interactive label (default)
 * <NumberFieldLabel htmlFor="field-id">Draggable Value</NumberFieldLabel>
 *
 * // Static label
 * <NumberFieldLabel showScrubArea={false}>Static Label</NumberFieldLabel>
 * ```
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldLabel = ({ ref, className, children, showScrubArea = true, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * Whether to show the interactive scrub area.
   */
  showScrubArea?: boolean;
} & { ref?: React.RefObject<HTMLLabelElement | null> }) => (
  <>
    {showScrubArea ? (
      <BaseNumberField.ScrubArea className="cursor-ew-resize">
        <label
          ref={ref}
          className={cx(
            // base
            "cursor-ew-resize text-sm font-medium leading-6",
            // text color
            "text-zinc-900 dark:text-zinc-50",
            className,
          )}
          {...props}
        >
          {children}
        </label>
        <NumberFieldScrubCursor />
      </BaseNumberField.ScrubArea>
    ) : (
      <label
        ref={ref}
        className={cx(
          // base
          "text-sm font-medium leading-6",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          className,
        )}
        {...props}
      >
        {children}
      </label>
    )}
  </>
);
NumberFieldLabel.displayName = "NumberFieldLabel";

/**
 * Custom cursor that appears during scrub area interactions.
 *
 * Based on Base UI's NumberField.ScrubAreaCursor, providing visual feedback
 * when users are actively dragging to change values. Shows a resize cursor
 * with arrow indicators.
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldScrubCursor = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor> & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.ScrubAreaCursor> | null> }) => (
  <BaseNumberField.ScrubAreaCursor
    ref={ref}
    className={cx("drop-shadow-[0_1px_1px_#0008] filter", className)}
    {...props}
  >
    <CursorGrowIcon />
  </BaseNumberField.ScrubAreaCursor>
);
NumberFieldScrubCursor.displayName = "NumberFieldScrubCursor";

/**
 * Container group for NumberField input and stepper buttons.
 *
 * Based on Base UI's NumberField.Group, providing layout structure
 * for the decrement button, input field, and increment button as
 * a cohesive unit with connected borders.
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldGroup = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNumberField.Group> & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Group> | null> }) => (
  <BaseNumberField.Group
    ref={ref}
    className={cx("flex", className)}
    {...props}
  />
);
NumberFieldGroup.displayName = "NumberFieldGroup";

/**
 * The numeric input element with tabular number formatting.
 *
 * Based on Base UI's NumberField.Input, providing a styled numeric input
 * with proper focus states, validation styling, and group integration.
 * Features center-aligned text and monospace numbers for consistency.
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldInput = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BaseNumberField.Input> & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Input> | null> }) => (
  <BaseNumberField.Input
    ref={ref}
    className={cx(
      // base
      "py-2 w-24 border text-center text-sm tabular-nums transition-colors",
      // border color
      "border-zinc-200 dark:border-zinc-700",
      // background color
      "bg-white dark:bg-zinc-950",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // placeholder color
      "placeholder-zinc-400 dark:placeholder-zinc-500",
      // focus
      focusRing,
      // disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // group context (when used with steppers)
      "group-[]:border-t group-[]:border-b group-[]:rounded-none group-[]:focus:z-10",
      className,
    )}
    {...props}
  />
);
NumberFieldInput.displayName = "NumberFieldInput";

/**
 * Increment button to increase the numeric value.
 *
 * Based on Base UI's NumberField.Increment, providing an accessible button
 * to increase the field value by the specified step amount. Features proper
 * hover states, keyboard navigation, and disabled state handling.
 *
 * @param children - Custom content (defaults to Plus icon).
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldIncrement = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment> & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Increment> | null> }) => (
  <BaseNumberField.Increment
    ref={ref}
    className={cx(
      // base
      "flex py-2 w-10 items-center justify-center rounded-tr-md rounded-br-md border border-l-0 bg-clip-padding text-sm font-medium transition-colors",
      // border color
      "border-zinc-200 dark:border-zinc-700",
      // background color
      "bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:active:bg-zinc-700",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // focus
      focusRing,
      // disabled
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-50 dark:disabled:hover:bg-zinc-800",
      className,
    )}
    {...props}
  >
    {children || <Plus className="h-4 w-4" />}
  </BaseNumberField.Increment>
);
NumberFieldIncrement.displayName = "NumberFieldIncrement";

/**
 * Decrement button to decrease the numeric value.
 *
 * Based on Base UI's NumberField.Decrement, providing an accessible button
 * to decrease the field value by the specified step amount. Features proper
 * hover states, keyboard navigation, and disabled state handling.
 *
 * @param children - Custom content (defaults to Minus icon).
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldDecrement = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement> & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Decrement> | null> }) => (
  <BaseNumberField.Decrement
    ref={ref}
    className={cx(
      // base
      "flex py-2 w-10 items-center justify-center rounded-tl-md rounded-bl-md border border-r-0 bg-clip-padding text-sm font-medium transition-colors",
      // border color
      "border-zinc-200 dark:border-zinc-700",
      // background color
      "bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:active:bg-zinc-700",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // focus
      focusRing,
      // disabled
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-50 dark:disabled:hover:bg-zinc-800",
      className,
    )}
    {...props}
  >
    {children || <Minus className="h-4 w-4" />}
  </BaseNumberField.Decrement>
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

/**
 * Cursor icon with grow arrows for scrub area interactions.
 *
 * Provides visual feedback during drag operations, showing horizontal
 * resize arrows to indicate the interactive nature of the scrub area.
 *
 * @param props - Standard SVG props.
 */
function CursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
  type NumberFieldProps,
  NumberFieldScrubCursor,
};
