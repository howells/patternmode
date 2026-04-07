"use client";

import { useMemo } from "react";
import { Combobox, type ComboboxProps } from "../../components/combobox";
import { getCountries, getCountryCode } from "../../lib/countries";

type CountryComboboxProps = Omit<ComboboxProps, "items" | "value"> & {
  /** Current country code (ISO 3166-1 alpha-2) or country name */
  value?: string;
  /** Value change handler - receives ISO country code */
  onValueChange?: (countryCode: string) => void;
};

/**
 * Specialized combobox for country selection
 * Uses ISO 3166-1 alpha-2 country codes from countries-list package
 * Automatically handles country code/name conversion
 *
 * @example
 * ```tsx
 * <CountryCombobox
 *   value="US"
 *   onValueChange={(code) => setCountry(code)}
 * />
 * ```
 *
 * @example With country name
 * ```tsx
 * <CountryCombobox
 *   value="United States"
 *   onValueChange={(code) => setCountry(code)}
 * />
 * ```
 */
export function CountryCombobox({
  value,
  onValueChange,
  placeholder = "Select country…",
  ...props
}: CountryComboboxProps) {
  const countries = useMemo(() => getCountries(), []);

  // Convert country name to code if needed
  const countryCode = useMemo(() => {
    if (!value) {
      return "";
    }
    // If it's already a 2-letter code, use it
    if (value.length === 2) {
      return value.toUpperCase();
    }
    // Otherwise, try to find the code by name
    return getCountryCode(value) ?? "";
  }, [value]);

  return (
    <Combobox
      {...props}
      items={countries}
      onValueChange={onValueChange}
      placeholder={placeholder}
      value={countryCode}
    />
  );
}
