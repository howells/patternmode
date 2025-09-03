"use client";

import { Combobox } from "@patternmode/combobox";
import type { ComboboxOption } from "@patternmode/combobox/types";
import type { Size } from "@patternmode/config/sizes";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { getIconComponent, iconNames } from "@patternmode/icons";
import React from "react";

type IconOption = { kebab: string; pascal: string } & ComboboxOption;

export type IconSelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  className?: string;
  iconStrokeWidth?: number;
};

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1")
    .replace(/([a-z])(\d)/g, "$1-$2")
    .toLowerCase()
    .replace(/^-/, "");
}

const SafeDynamicIcon = React.memo(
  ({
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
            className={`${className} flex shrink-0 items-center justify-center rounded bg-zinc-100 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400`}
          >
            ?
          </div>
        ),
      [className, fallback]
    );
    const IconComponent = getIconComponent(name);
    if (!IconComponent) return fallbackElement;
    return (
      <div
        className={`${className} flex shrink-0 items-center justify-center`}
        key={name}
      >
        <IconComponent className="h-5 w-5" strokeWidth={strokeWidth} />
      </div>
    );
  }
);
SafeDynamicIcon.displayName = "SafeDynamicIcon";

export const IconSelect = ({
  value,
  onValueChange,
  placeholder = "Select an icon...",
  size = "base",
  disabled = false,
  className,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
}: IconSelectProps) => {
  const options = React.useMemo<IconOption[]>(
    () =>
      iconNames.map((name) => ({
        id: name,
        value: name,
        label: name,
        kebab: toKebabCase(name),
        pascal: name,
      })),
    []
  );
  const getItemIcon = React.useCallback(
    (item: IconOption) => (
      <SafeDynamicIcon
        className="flex size-5 shrink-0 items-center justify-center text-zinc-700 dark:text-zinc-300"
        name={item.pascal}
        strokeWidth={iconStrokeWidth}
      />
    ),
    [iconStrokeWidth]
  );
  const handleValueChange = React.useCallback(
    (newValue: string | undefined) => {
      onValueChange?.(newValue || "");
    },
    [onValueChange]
  );
  return (
    <div data-testid="icon-select">
      <Combobox<IconOption>
        className={className}
        disabled={disabled}
        emptyMessage="No icons found."
        getItemIcon={getItemIcon}
        getItemLabel={(item) => item.pascal}
        getItemValue={(item) => item.pascal}
        iconStrokeWidth={iconStrokeWidth}
        onValueChange={handleValueChange}
        options={options}
        placeholder={placeholder}
        searchDebounce={300}
        searchPlaceholder="Search icons..."
        size={size}
        value={value}
      />
    </div>
  );
};

export function useIconSelect(initialValue?: string) {
  const [value, setValue] = React.useState(initialValue || "");
  const DynamicIconComponent = React.useMemo(() => {
    if (!value) return null;
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
          className={className}
          name={value}
          strokeWidth={strokeWidth || DEFAULT_ICON_STROKE_WIDTH}
          {...props}
        />
      )
    );
    IconComponent.displayName = `SelectedIcon_${value}`;
    return IconComponent;
  }, [value]);
  return { value, setValue, DynamicIconComponent } as const;
}

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
          className={className}
          fallback={fallback}
          name={name}
          strokeWidth={strokeWidth || DEFAULT_ICON_STROKE_WIDTH}
          {...props}
        />
      );
    }
  );
  DynamicIconWrapper.displayName = `SafeDynamicIcon_${name}`;
  return DynamicIconWrapper;
}

export function isValidLucideIcon(name: string): boolean {
  return (
    typeof name === "string" &&
    name.length > 0 &&
    /^[A-Z][A-Z0-9]*$/i.test(name)
  );
}

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
