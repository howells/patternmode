// NumberField Component [v1.0.0] - Tremor Style

import { cx, focusRing } from "../../lib/utils";
import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

/**
 * Props for the NumberField component.
 *
 * @interface NumberFieldProps
 * @extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>
 * @example
 * ```tsx
 * <NumberField>Content</NumberField>
 * ```
 */
interface NumberFieldProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> {
  /** Optional label text */
  label?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether to show the interactive scrub area on the label */
  showScrubArea?: boolean;
  /** Whether to show increment/decrement buttons */
  showSteppers?: boolean;
  /** Whether the field should take full width */
  fullWidth?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the input element */
  inputClassName?: string;
}

/**
 * A numeric input field built on Base UI's NumberField primitive.
 *
 * Based on Base UI's NumberField (https://base-ui.com/react/components/number-field),
 * providing advanced numeric input with increment/decrement buttons and interactive
 * scrub area for precise value manipulation. Features locale-aware formatting,
 * validation, and smooth user interactions.
 *
 * @param value - Current numeric value
 * @param defaultValue - Default value for uncontrolled mode
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param step - Step increment for changes
 * @param label - Optional label text
 * @param placeholder - Placeholder text
 * @param showScrubArea - Whether to enable drag-to-change on label
 * @param showSteppers - Whether to show +/- buttons
 * @param fullWidth - Whether field should take full width
 * @param disabled - Whether the field is disabled
 *
 *
 * @id number-field
 * @name Number Field
 * @component
 * @example
 * ```tsx
 * // Basic number field
 * <NumberField label="Quantity" defaultValue={1} min={0} max={100} />
 *
 * // With custom step and range
 * <NumberField
 *   label="Price"
 *   defaultValue={9.99}
 *   min={0}
 *   step={0.01}
 *   placeholder="0.00"
 * />
 *
 * // Without steppers (input only)
 * <NumberField
 *   label="ID Number"
 *   showSteppers={false}
 *   placeholder="Enter ID"
 * />
 *
 * // Full width with scrub area disabled
 * <NumberField
 *   label="Amount"
 *   fullWidth
 *   showScrubArea={false}
 *   defaultValue={50}
 * />
 *
 * // Controlled with validation
 * <NumberField
 *   label="Age"
 *   value={age}
 *   onValueChange={setAge}
 *   min={0}
 *   max={120}
 *   step={1}
 * />
 *
 * // Disabled state
 * <NumberField
 *   label="Read Only"
 *   value={42}
 *   disabled
 * />
 * ```
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
/**
 * A number input field built on Base UI with stepper controls, scrubbing functionality, and full keyboard navigation.
 *
 * @id number-field
 * @name Number Field
 * @component
 */
const NumberField = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Root>,
  NumberFieldProps
>(
  (
    {
      label,
      placeholder,
      showScrubArea = true,
      showSteppers = true,
      fullWidth = false,
      className,
      inputClassName,
      id,
      ...props
    },
    ref
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

        {showSteppers ? (
          <NumberFieldGroup className={fullWidth ? "w-full" : undefined}>
            <NumberFieldDecrement />
            <NumberFieldInput
              placeholder={placeholder}
              className={cx(fullWidth ? "flex-1" : undefined, inputClassName)}
            />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        ) : (
          <NumberFieldInput
            placeholder={placeholder}
            className={cx(
              "rounded-md",
              fullWidth ? "w-full" : undefined,
              inputClassName
            )}
          />
        )}
      </BaseNumberField.Root>
    );
  }
);
NumberField.displayName = "NumberField";

/**
 * Label component for NumberField with optional interactive scrub area.
 *
 * Based on Base UI's NumberField.ScrubArea, allowing users to click and drag
 * on the label to adjust the numeric value. Features visual cursor feedback
 * and smooth value changes using the Pointer Lock API.
 *
 * @param showScrubArea - Whether to enable drag-to-change functionality
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
const NumberFieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    /** Whether to show the interactive scrub area */
    showScrubArea?: boolean;
  }
>(({ className, children, showScrubArea = true, ...props }, ref) => (
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
            className
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
          className
        )}
        {...props}
      >
        {children}
      </label>
    )}
  </>
));
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
const NumberFieldScrubCursor = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.ScrubAreaCursor>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>
>(({ className, ...props }, ref) => (
  <BaseNumberField.ScrubAreaCursor
    ref={ref}
    className={cx("drop-shadow-[0_1px_1px_#0008] filter", className)}
    {...props}
  >
    <CursorGrowIcon />
  </BaseNumberField.ScrubAreaCursor>
));
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
const NumberFieldGroup = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Group>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>
>(({ className, ...props }, ref) => (
  <BaseNumberField.Group
    ref={ref}
    className={cx("flex", className)}
    {...props}
  />
));
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
const NumberFieldInput = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Input>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>
>(({ className, ...props }, ref) => (
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
      className
    )}
    {...props}
  />
));
NumberFieldInput.displayName = "NumberFieldInput";

/**
 * Increment button to increase the numeric value.
 *
 * Based on Base UI's NumberField.Increment, providing an accessible button
 * to increase the field value by the specified step amount. Features proper
 * hover states, keyboard navigation, and disabled state handling.
 *
 * @param children - Custom content (defaults to Plus icon)
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldIncrement = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Increment>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>
>(({ className, children, ...props }, ref) => (
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
      className
    )}
    {...props}
  >
    {children || <Plus className="h-4 w-4" />}
  </BaseNumberField.Increment>
));
NumberFieldIncrement.displayName = "NumberFieldIncrement";

/**
 * Decrement button to decrease the numeric value.
 *
 * Based on Base UI's NumberField.Decrement, providing an accessible button
 * to decrease the field value by the specified step amount. Features proper
 * hover states, keyboard navigation, and disabled state handling.
 *
 * @param children - Custom content (defaults to Minus icon)
 *
 * @see https://base-ui.com/react/components/number-field - Base UI documentation
 */
const NumberFieldDecrement = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Decrement>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>
>(({ className, children, ...props }, ref) => (
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
      className
    )}
    {...props}
  >
    {children || <Minus className="h-4 w-4" />}
  </BaseNumberField.Decrement>
));
NumberFieldDecrement.displayName = "NumberFieldDecrement";

/**
 * Cursor icon with grow arrows for scrub area interactions.
 *
 * Provides visual feedback during drag operations, showing horizontal
 * resize arrows to indicate the interactive nature of the scrub area.
 *
 * @param props - Standard SVG props
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
  NumberFieldScrubCursor,
  type NumberFieldProps,
};
