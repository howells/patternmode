"use client";

import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { getFlag } from "./country-flags";

/**
 * countrySelectVariants variant class helper for CountrySelect.
 * Import from "@patternmode/ui/compositions/country-select".
 * Uses variant-based styling via class-variance-authority.
 */
const countrySelectVariants = cva(
  "relative flex items-center gap-1.5 border-border border-r bg-transparent pr-2 pl-3 text-muted-foreground",
  {
    variants: {
      size: {
        "2xs": "mr-1.5 pr-1.5 pl-2",
        xs: "mr-2 pr-2 pl-2.5",
        sm: "mr-2 pr-2 pl-2.5",
        base: "mr-2.5 pr-2.5 pl-3",
        lg: "mr-3 pr-3 pl-3.5",
        xl: "mr-3.5 pr-3.5 pl-4",
        "2xl": "mr-4 pr-4 pl-5",
        "3xl": "mr-6 pr-6 pl-7",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

/**
 * flagVariants variant class helper for CountrySelect.
 * Import from "@patternmode/ui/compositions/country-select".
 * Uses variant-based styling via class-variance-authority.
 */
const flagVariants = cva("shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      "2xs": "size-2.5",
      xs: "size-3",
      sm: "size-3.5",
      base: "size-4",
      lg: "size-5",
      xl: "size-5",
      "2xl": "size-6",
      "3xl": "size-7",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

/** ISO 3166-1 alpha-2 country code */
type CountryCode = string;

interface CountryOption<T extends string = string> {
  /** Display label for the country */
  label: string;
  /** Country code (ISO 3166-1 alpha-2) */
  value: T;
}

interface CountrySelectProps<T extends string = string> {
  /** Accessible label for the select */
  "aria-label"?: string;
  /** Additional class name */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when country changes */
  onChange: (value: T) => void;
  /** Available country options */
  options: CountryOption<T>[];
  /** Component size */
  size?: ComponentSize | null;
  /** Currently selected country code */
  value?: T;
}

/**
 * Country selector with flag display.
 *
 * @example
 * ```tsx
 * const [country, setCountry] = useState("US");
 *
 * <CountrySelect
 *   value={country}
 *   onChange={setCountry}
 *   options={[
 *     { value: "US", label: "United States" },
 *     { value: "GB", label: "United Kingdom" },
 *   ]}
 * />
 * ```
 */
function CountrySelect<T extends string = string>({
  value,
  onChange,
  options,
  disabled,
  size,
  className,
  "aria-label": ariaLabel = "Select country",
}: CountrySelectProps<T>) {
  const selectedOption = options.find((opt) => opt.value === value);
  const FlagComponent = value ? getFlag(value as CountryCode) : null;

  return (
    <div className={cn(countrySelectVariants({ size }), className)}>
      <span
        className={cn(
          flagVariants({ size }),
          "inline-flex items-center justify-center",
        )}
      >
        {FlagComponent ? (
          <FlagComponent
            className="h-full w-full object-cover"
            title={selectedOption?.label ?? value}
          />
        ) : (
          <span className="text-muted-foreground">🌐</span>
        )}
      </span>
      <select
        aria-label={ariaLabel}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as T)}
        value={value ?? ""}
      >
        {options.map((option) => (
          <option key={option.value || "intl"} value={option.value ?? ""}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="h-3 w-3 opacity-50" />
    </div>
  );
}

export type { CountryCode, CountryOption, CountrySelectProps };
export { CountrySelect, countrySelectVariants, flagVariants };
