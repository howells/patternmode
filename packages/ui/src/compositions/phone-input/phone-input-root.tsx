"use client";

import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import { cva, type VariantProps } from "class-variance-authority";
import { type RefObject, useCallback, useMemo } from "react";
import ReactPhoneInput, {
  type Country,
  type Value as E164Number,
} from "react-phone-number-input";
import type { WithTestId } from "../../lib/types";
import { CountrySelect } from "../country-select";

const phoneInputVariants = cva(
  "relative flex w-full items-center border border-border bg-input shadow-xs transition-colors",
  {
    variants: {
      size: {
        "2xs": "h-6 text-xs",
        xs: "h-7 text-xs",
        sm: "h-8 text-sm",
        base: "h-9 text-sm",
        lg: "h-10 text-base",
        xl: "h-11 text-base",
        "2xl": "h-12 text-lg",
        "3xl": "h-14 text-xl",
      },
      radius: {
        rounded: "rounded-lg",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      { radius: "rounded", size: ["2xs", "xs"], class: "rounded-md" },
    ],
    defaultVariants: {
      size: "base",
      radius: "rounded",
    },
  },
);

const inputVariants = cva(
  "min-w-0 flex-1 border-none bg-transparent outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        "2xs": "pr-2 text-xs",
        xs: "pr-2.5 text-xs",
        sm: "pr-2.5 text-sm",
        base: "pr-3 text-sm",
        lg: "pr-3.5 text-base",
        xl: "pr-4 text-base",
        "2xl": "pr-5 text-lg",
        "3xl": "pr-6 text-xl",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

type PhoneInputProps = WithTestId<
  VariantProps<typeof phoneInputVariants> & {
    /** Current phone number value */
    value?: E164Number;
    /** Callback when phone number changes */
    onChange?: (value: E164Number | undefined) => void;
    /** Show error styling */
    hasError?: boolean;
    /** Additional class name for the container */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Default country code (e.g., "US", "GB"). Defaults to "US". */
    defaultCountry?: Country;
    /** Placeholder text */
    placeholder?: string;
  }
>;

/** Internal input component for custom styling */
const StyledInput = function StyledInputImpl({
  inputSize,
  className,
  ref,
  ...props
}: React.ComponentProps<"input"> & { inputSize?: ComponentSize | null } & {
  ref?: RefObject<HTMLInputElement | null>;
}) {
  return (
    <input
      {...props}
      className={cn(inputVariants({ size: inputSize }), className)}
      ref={ref}
    />
  );
};

/**
 * Phone number input with country selector.
 *
 * @example
 * ```tsx
 * const [phone, setPhone] = useState<E164Number | undefined>();
 *
 * <PhoneInput
 *   value={phone}
 *   onChange={setPhone}
 *   defaultCountry="US"
 *   placeholder="+1 (555) 000-0000"
 * />
 * ```
 */
function PhoneInput({
  className,
  testId,
  size,
  radius,
  hasError,
  value,
  onChange,
  disabled,
  defaultCountry = "US",
  placeholder,
}: PhoneInputProps) {
  const handleChange = useCallback(
    (newValue?: E164Number) => {
      onChange?.(newValue);
    },
    [onChange],
  );

  // Memoize input component to prevent recreation on every render
  const InputComponent = useMemo(
    () =>
      function PhoneInputField({
        ref,
        ...inputProps
      }: React.ComponentProps<"input"> & {
        ref?: RefObject<HTMLInputElement | null>;
      }) {
        return <StyledInput {...inputProps} inputSize={size} ref={ref} />;
      },
    [size],
  );

  // Memoize country select component to prevent recreation on every render
  const CountrySelectComponent = useMemo(
    () =>
      function PhoneCountrySelect({
        value: countryValue,
        onChange: onCountryChange,
        options,
        disabled: selectDisabled,
      }: {
        value?: Country;
        onChange: (value: Country) => void;
        options: { value: Country; label: string }[];
        disabled?: boolean;
      }) {
        return (
          <CountrySelect
            disabled={selectDisabled}
            onChange={onCountryChange}
            options={options}
            size={size}
            value={countryValue}
          />
        );
      },
    [size],
  );

  return (
    <div
      aria-invalid={hasError || undefined}
      className={cn(
        phoneInputVariants({ size, radius }),
        focusInput(),
        hasError === true && hasErrorInput,
        "focus-within:border-border focus-within:ring-2 focus-within:ring-ring/5",
        disabled === true &&
          "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      data-component="phone-input"
      data-slot="phone-input"
      data-testid={testId}
    >
      <ReactPhoneInput
        className="flex h-full w-full items-center"
        countrySelectComponent={CountrySelectComponent}
        defaultCountry={defaultCountry}
        disabled={disabled}
        inputComponent={InputComponent}
        international
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export type { Value as E164Number } from "react-phone-number-input";
export type { PhoneInputProps };
export { PhoneInput };
