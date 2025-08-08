import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

import { focusRing } from "../../presentation/focus-ring";
import { cx } from "../../utils/cx";

type NumberFieldProps = {
  /**
   * Optional label text for the field.
   * Displays above the input with interactive scrub area support.
   */
  label?: string;
  /**
   * Placeholder text for the input element.
   * Shows when no value is present to guide user input.
   */
  placeholder?: string;
  /**
   * Whether to show the interactive scrub area on the label.
   * When enabled, users can drag on the label to adjust values.
   */
  showScrubArea?: boolean;
  /**
   * Whether to show increment/decrement buttons.
   * Controls visibility of stepper controls for precise value adjustment.
   */
  showSteppers?: boolean;
  /**
   * Whether the field should take full width of its container.
   * Affects both the input and button group layout.
   */
  fullWidth?: boolean;
  /**
   * Size variant determining height and text size for all components.
   * Controls dimensions to align with other form controls.
   */
  size?: "xs" | "sm" | "base" | "lg";
  /**
   * Additional CSS classes for the container element.
   */
  className?: string;
  /**
   * Additional CSS classes for the input element specifically.
   */
  inputClassName?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>;

/**
 * An advanced numeric input field with stepper controls, interactive scrub area, and comprehensive keyboard navigation.
 */
const NumberField = (
  { ref, label, placeholder, showScrubArea = true, showSteppers = true, fullWidth = false, size = "base", className, inputClassName, id, ...props }: NumberFieldProps & { ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Root> | null> },
) => {
  const generatedId = React.useId();
  const fieldId = id || generatedId;

  return (
    <BaseNumberField.Root
      data-testid="number-field"
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
            <NumberFieldGroup className={fullWidth ? "w-full" : "w-full max-w-sm"}>
              <NumberFieldDecrement size={size} />
              <NumberFieldInput
                size={size}
                placeholder={placeholder}
                className={cx(fullWidth ? "flex-1" : undefined, inputClassName)}
              />
              <NumberFieldIncrement size={size} />
            </NumberFieldGroup>
          )
        : (
            <NumberFieldInput
              size={size}
              placeholder={placeholder}
              className={cx(
                "rounded-md",
                fullWidth ? "w-full" : "w-full max-w-sm",
                inputClassName,
              )}
            />
          )}
    </BaseNumberField.Root>
  );
};
NumberField.displayName = "NumberField";

type NumberFieldLabelProps = {
  /**
   * Reference to the label element.
   */
  ref?: React.RefObject<HTMLLabelElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Content to display within the label.
   */
  children?: React.ReactNode;
  /**
   * Whether to show the interactive scrub area for drag-to-change functionality.
   */
  showScrubArea?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * Label component for NumberField with optional interactive scrub area for drag-to-change functionality.
 */
const NumberFieldLabel = ({ ref, className, children, showScrubArea = true, ...props }: NumberFieldLabelProps) => (
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

type NumberFieldScrubCursorProps = {
  /**
   * Reference to the cursor element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.ScrubAreaCursor> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>;

/**
 * Custom cursor that appears during scrub area interactions for visual feedback.
 */
const NumberFieldScrubCursor = ({ ref, className, ...props }: NumberFieldScrubCursorProps) => (
  <BaseNumberField.ScrubAreaCursor
    ref={ref}
    className={cx("drop-shadow-[0_1px_1px_#0008] filter", className)}
    {...props}
  >
    <CursorGrowIcon />
  </BaseNumberField.ScrubAreaCursor>
);
NumberFieldScrubCursor.displayName = "NumberFieldScrubCursor";

type NumberFieldGroupProps = {
  /**
   * Reference to the group element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Group> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>;

/**
 * Container group for NumberField input and stepper buttons with connected borders.
 */
const NumberFieldGroup = ({ ref, className, ...props }: NumberFieldGroupProps) => (
  <BaseNumberField.Group
    ref={ref}
    className={cx("flex", className)}
    {...props}
  />
);
NumberFieldGroup.displayName = "NumberFieldGroup";

type NumberFieldInputProps = {
  /**
   * Reference to the input element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Input> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Size variant determining height and text size.
   * Controls dimensions to align with other form controls.
   */
  size?: "xs" | "sm" | "base" | "lg";
} & Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>, "size">;

/**
 * The numeric input element with tabular number formatting and proper validation.
 */
const NumberFieldInput = ({ ref, className, size = "base", ...props }: NumberFieldInputProps) => {
  // Size-based styling
  const sizeStyles = {
    xs: "h-control-xs px-2 text-xs",
    sm: "h-control-sm px-2.5 text-sm",
    base: "h-control-base px-3 text-sm",
    lg: "h-control-lg px-4 text-base",
  };

  return (
    <BaseNumberField.Input
      ref={ref}
      className={cx(
        // base
        "w-24 border text-center tabular-nums transition-colors",
        // size-specific styles
        sizeStyles[size],
        // border color
        " dark:border-zinc-700",
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
};
NumberFieldInput.displayName = "NumberFieldInput";

type NumberFieldIncrementProps = {
  /**
   * Reference to the increment button element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Increment> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Custom content for the button (defaults to Plus icon).
   */
  children?: React.ReactNode;
  /**
   * Size variant determining height to match the input field.
   */
  size?: "xs" | "sm" | "base" | "lg";
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>;

/**
 * Increment button to increase the numeric value by the specified step amount.
 */
const NumberFieldIncrement = ({ ref, className, children, size = "base", ...props }: NumberFieldIncrementProps) => {
  // Size-based styling
  const sizeStyles = {
    xs: "h-control-xs w-8 text-xs",
    sm: "h-control-sm w-9 text-sm",
    base: "h-control-base w-10 text-sm",
    lg: "h-control-lg w-12 text-base",
  };

  return (
    <BaseNumberField.Increment
      ref={ref}
      className={cx(
        // base
        "flex items-center justify-center rounded-tr-md rounded-br-md border border-l-0 bg-clip-padding font-medium transition-colors",
        // size-specific styles
        sizeStyles[size],
        // border color
        " dark:border-zinc-700",
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
};
NumberFieldIncrement.displayName = "NumberFieldIncrement";

type NumberFieldDecrementProps = {
  /**
   * Reference to the decrement button element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Decrement> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Custom content for the button (defaults to Minus icon).
   */
  children?: React.ReactNode;
  /**
   * Size variant determining height to match the input field.
   */
  size?: "xs" | "sm" | "base" | "lg";
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>;

/**
 * Decrement button to decrease the numeric value by the specified step amount.
 */
const NumberFieldDecrement = ({ ref, className, children, size = "base", ...props }: NumberFieldDecrementProps) => {
  // Size-based styling
  const sizeStyles = {
    xs: "h-control-xs w-8 text-xs",
    sm: "h-control-sm w-9 text-sm",
    base: "h-control-base w-10 text-sm",
    lg: "h-control-lg w-12 text-base",
  };

  return (
    <BaseNumberField.Decrement
      ref={ref}
      className={cx(
        // base
        "flex items-center justify-center rounded-tl-md rounded-bl-md border border-r-0 bg-clip-padding font-medium transition-colors",
        // size-specific styles
        sizeStyles[size],
        // border color
        " dark:border-zinc-700",
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
};
NumberFieldDecrement.displayName = "NumberFieldDecrement";

/**
 * Cursor icon with grow arrows for scrub area interactions.
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
