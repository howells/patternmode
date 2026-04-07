import { countries } from "countries-list";
import type { ComboboxItem } from "../components/combobox";

/**
 * Get all countries formatted for Combobox
 * Uses ISO 3166-1 alpha-2 country codes from countries-list package
 * Sorted alphabetically by country name
 */
export function getCountries(): ComboboxItem[] {
  return Object.entries(countries)
    .map(([code, data]) => ({
      value: code,
      label: data.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Get country name by ISO code
 */
export function getCountryName(code: string): string | undefined {
  return countries[code as keyof typeof countries]?.name;
}

/**
 * Get country code by name (case-insensitive)
 */
export function getCountryCode(name: string): string | undefined {
  const entry = Object.entries(countries).find(
    ([, data]) => data.name.toLowerCase() === name.toLowerCase(),
  );
  return entry?.[0];
}
