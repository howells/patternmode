"use client";

import type { ComboboxOption } from "../combobox/types";

import React from "react";

import { config } from "../../lib/config";
import type { Size } from "../../lib/component-config-types";
import { getIconComponent, iconNames } from "../../lib/icon-registry";
import { Combobox } from "../combobox/component";

// Icon data structure that extends ComboboxOption
type IconOption = {
  kebab: string;
  pascal: string;
} & ComboboxOption;

/**
 * Props for the IconSelect component.
 */
export type IconSelectProps = {
  /**
   * Currently selected icon name in PascalCase format.
   * This is the icon name as it appears in the Lucide React library.
   */
  value?: string;

  /**
   * Callback fired when the icon selection changes.
   * Receives the PascalCase icon name as a parameter.
   */
  onValueChange?: (value: string) => void;

  /**
   * Placeholder text displayed when no icon is selected.
   * Provides guidance to users about the expected input.
   */
  placeholder?: string;

  /**
   * Size variant determining height and text size.
   * Controls the overall dimensions of the icon select component.
   */
  size?: Size;

  /**
   * Whether the icon select is disabled.
   * When true, prevents user interaction and applies disabled styling.
   */
  disabled?: boolean;

  /**
   * Additional CSS classes to apply to the component.
   * Allows for custom styling and layout adjustments.
   */
  className?: string;

  /**
   * Stroke width for icon rendering.
   * Controls the thickness of icon outlines. Defaults to the global config value (typically 1).
   */
  iconStrokeWidth?: number;
};

/**
 * Get all Lucide icon names from the static registry.
 * This is the most reliable method - no dynamic imports or runtime analysis needed.
 */
function getAllLucideIcons(): string[] {
  return iconNames;
}

/**
 * Client-side icon filtering and pagination for virtual scrolling.
 * Uses the static icon registry - fast and reliable.
 */
function fetchIcons({
  pageParam = 0,
  search = "",
}: {
  pageParam?: number;
  search?: string;
  signal?: AbortSignal;
}) {
  const limit = 100; // Larger page size since virtual scrolling handles performance

  // Get all icons from static registry
  const allIconNames = getAllLucideIcons();

  // Filter icons based on search
  const filteredIcons = search
    ? allIconNames.filter(name =>
        name.toLowerCase().includes(search.toLowerCase()),
      )
    : allIconNames;

  // Paginate the results
  const startIndex = pageParam * limit;
  const endIndex = startIndex + limit;
  const pageIcons = filteredIcons.slice(startIndex, endIndex);

  // Transform to IconOption interface
  const iconOptions: IconOption[] = pageIcons.map(name => ({
    id: name,
    value: name,
    label: name,
    kebab: toKebabCase(name),
    pascal: name,
  }));

  const result = {
    data: iconOptions,
    hasNextPage: endIndex < filteredIcons.length,
    nextCursor: endIndex < filteredIcons.length ? pageParam + 1 : undefined,
  };

  return Promise.resolve(result); // Return a resolved promise to maintain the async interface
}

/**
 * Convert PascalCase icon name to kebab-case for DynamicIcon.
 * Handles both letters and numbers properly (e.g., FileJson2 -> file-json-2).
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1") // Add dash before capital letters
    .replace(/([a-z])(\d)/g, "$1-$2") // Add dash before numbers
    .toLowerCase()
    .replace(/^-/, ""); // Remove leading dash
}

/**
 * Safe DynamicIcon wrapper using the static icon registry.
 * Simple, reliable, and fast - no async loading needed.
 */
const SafeDynamicIcon = React.memo(({
  name,
  className,
  strokeWidth,
  fallback,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
  fallback?: React.ReactNode;
}) => {
  const fallbackElement = React.useMemo(
    () =>
      fallback || (
        <div
          className={`${className} flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-500 dark:text-zinc-400 shrink-0`}
        >
          ?
        </div>
      ),
    [className, fallback],
  );

  // Get icon component from static registry
  const IconComponent = getIconComponent(name);

  // Show fallback if icon not found
  if (!IconComponent) {
    return fallbackElement;
  }

  // Render the icon
  return (
    <div
      key={name}
      className={`${className} shrink-0 flex items-center justify-center`}
    >
      <IconComponent
        className="w-5 h-5"
        strokeWidth={strokeWidth}
      />
    </div>
  );
});

SafeDynamicIcon.displayName = "SafeDynamicIcon";

/**
 * Icon picker component with virtual scrolling for optimal performance with 1700+ icons.
 */
export const IconSelect = ({
  value,
  onValueChange,
  placeholder = "Select an icon...",
  size = "base",
  disabled = false,
  className,
  iconStrokeWidth = config.getIconStrokeWidth(),
}: IconSelectProps) => {
  // Function to render the icon for each item
  const getItemIcon = React.useCallback(
    (item: IconOption) => (
      <SafeDynamicIcon
        name={item.pascal}
        className="size-5 shrink-0 flex items-center justify-center text-zinc-700 dark:text-zinc-300"
        strokeWidth={iconStrokeWidth}
      />
    ),
    [iconStrokeWidth],
  );

  const handleValueChange = React.useCallback(
    (newValue: string | undefined) => {
      onValueChange?.(newValue || "");
    },
    [onValueChange],
  );

  return (
    <div data-testid="icon-select">
      <Combobox<IconOption>
        queryKey={["icons"]}
        fetchData={fetchIcons}
        value={value}
        onValueChange={handleValueChange}
        placeholder={placeholder}
        searchPlaceholder="Search icons..."
        emptyMessage="No icons found."
        size={size}
        disabled={disabled}
        className={className}
        searchDebounce={300} // 300ms search debounce
        iconStrokeWidth={iconStrokeWidth}
        getItemValue={item => item.pascal}
        getItemLabel={item => item.pascal}
        getItemIcon={getItemIcon}
      />
    </div>
  );
};

/**
 * Custom hook for managing icon selection state.
 * Uses the static registry for reliable icon access.
 */
export function useIconSelect(initialValue?: string) {
  const [value, setValue] = React.useState(initialValue || "");

  // Create a memoized DynamicIcon component for the selected icon
  const DynamicIconComponent = React.useMemo(() => {
    if (!value) {
      return null;
    }

    const IconComponent = React.memo(
      ({
        className,
        strokeWidth,
        ...props
      }: {
        className?: string;
        strokeWidth?: number;
        [key: string]: unknown;
      }) => (
        <SafeDynamicIcon
          name={value} // Use PascalCase name directly
          className={className}
          strokeWidth={strokeWidth || config.getIconStrokeWidth()}
          {...props}
        />
      ),
    );
    IconComponent.displayName = `SelectedIcon_${value}`;
    return IconComponent;
  }, [value]);

  return {
    value,
    setValue,
    DynamicIconComponent,
  };
}

/**
 * Utility function to create a DynamicIcon component by name.
 * Uses the static registry for reliable icon access.
 */
export function getDynamicIconByName(name: string) {
  const DynamicIconWrapper = React.memo(
    ({
      className,
      strokeWidth,
      fallback,
      ...props
    }: {
      className?: string;
      strokeWidth?: number;
      fallback?: React.ReactNode;
      [key: string]: unknown;
    }) => {
      return (
        <SafeDynamicIcon
          name={name} // Use name directly (static registry handles PascalCase)
          className={className}
          strokeWidth={strokeWidth || config.getIconStrokeWidth()}
          fallback={fallback}
          {...props}
        />
      );
    },
  );
  DynamicIconWrapper.displayName = `SafeDynamicIcon_${name}`;
  return DynamicIconWrapper;
}

/**
 * Check if an icon name is valid (basic client-side validation).
 */
export function isValidLucideIcon(name: string): boolean {
  return (
    typeof name === "string"
    && name.length > 0
    && /^[A-Z][A-Z0-9]*$/i.test(name)
  );
}

/**
 * Get statistics about the icon collection.
 */
export const iconStats = {
  totalIcons: iconNames.length.toLocaleString(),
  bundleImpact: "Tree-shakable - only used icons are included in bundle",
  loadingStrategy: "Static registry with virtual scrolling",
  performance: "Optimal - no runtime analysis or dynamic imports",
  searchCapability: "Real-time search with debouncing",
  features: [
    "Complete Lucide React library (static registry)",
    "Tree-shakable loading with static imports",
    "Client-side pagination and search",
    "Automatic sync with Lucide updates",
    "Direct PascalCase component access",
    "Zero async loading - immediate icon access",
  ],
};
