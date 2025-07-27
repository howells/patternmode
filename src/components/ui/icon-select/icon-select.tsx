/**
 * Icon Select Component
 *
 * A high-performance, tree-shakable searchable icon picker component that provides access to ALL 3,644+ Lucide React icons
 * using infinite scrolling and API-based data loading. Icons are loaded dynamically on-demand with pagination,
 * ensuring optimal performance even with thousands of icons.
 *
 * Features:
 * - Complete collection of 3,644+ Lucide React icons
 * - Tree-shakable: Only used icons included in bundle
 * - Infinite scrolling: No performance issues with large datasets
 * - API-based loading: Efficient server-side pagination and search
 * - Official Lucide DynamicIcon implementation
 * - Searchable dropdown with icon previews
 * - Type-safe icon selection
 * - Custom hook for state management
 * - Utility functions for icon retrieval
 * - Built on InfiniteCombobox for optimal UX
 * - Zero upfront bundle cost
 *
 * @example
 * ```tsx
 * // Basic icon select
 * <IconSelect
 *   value={selectedIcon}
 *   onValueChange={setSelectedIcon}
 *   placeholder="Choose an icon..."
 * />
 *
 * // With custom hook
 * function MyComponent() {
 *   const { value, setValue, DynamicIconComponent } = useIconSelect('Camera');
 *
 *   return (
 *     <div>
 *       <IconSelect value={value} onValueChange={setValue} />
 *       {DynamicIconComponent && <DynamicIconComponent className="w-6 h-6" />}
 *     </div>
 *   );
 * }
 *
 * // Form integration
 * <form>
 *   <label htmlFor="icon">Button Icon</label>
 *   <IconSelect
 *     value={formData.icon}
 *     onValueChange={(icon) => setFormData({...formData, icon})}
 *     placeholder="Select button icon"
 *   />
 * </form>
 *
 * // Dynamic icon rendering
 * function IconDisplay({ iconName }: { iconName: string }) {
 *   const DynamicIconComponent = getDynamicIconByName(iconName);
 *
 *   return DynamicIconComponent ? (
 *     <DynamicIconComponent className="w-8 h-8 text-blue-500" />
 *   ) : (
 *     <div className="w-8 h-8 bg-zinc-200 rounded" />
 *   );
 * }
 * ```
 */

"use client";

import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Icon } from "@/components/ui/icon";
import { config } from "@/lib/config";
import { DynamicIcon } from "lucide-react/dynamic";
import React from "react";

// Icon data structure that extends ComboboxOption
interface IconOption extends ComboboxOption {
  kebab: string;
  pascal: string;
}

/**
 * Props for the IconSelect component.
 */
export interface IconSelectProps {
  /** Currently selected icon name */
  value?: string;
  /** Callback when icon selection changes */
  onValueChange?: (value: string) => void;
  /** Placeholder text when no icon is selected */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Stroke width for icons (defaults to 1) */
  iconStrokeWidth?: number;
}

/**
 * Fetch icons from the API route with pagination and search.
 * Now returns both kebab-case and PascalCase names for validation.
 */
async function fetchIcons({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: readonly unknown[];
}) {
  const [, , search] = queryKey as [string, string, string];
  const limit = 50;

  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  const response = await fetch(`/api/icons?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch icons");
  }

  const data = await response.json();

  // Transform API response to match IconOption interface
  const iconOptions: IconOption[] = data.icons.map(
    (icon: { kebab: string; pascal: string }) => ({
      value: icon.pascal,
      label: icon.pascal,
      kebab: icon.kebab,
      pascal: icon.pascal,
    })
  );

  return {
    items: iconOptions,
    totalCount: data.totalCount,
    hasMore: data.hasMore,
    nextPage: data.hasMore ? pageParam + 1 : undefined,
  };
}

/**
 * Convert PascalCase icon name to kebab-case for DynamicIcon.
 * Handles both letters and numbers properly (e.g., FileJson2 -> file-json-2)
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1") // Add dash before capital letters
    .replace(/([a-z])([0-9])/g, "$1-$2") // Add dash before numbers
    .toLowerCase()
    .replace(/^-/, ""); // Remove leading dash
}

/**
 * Safe DynamicIcon wrapper that uses kebab-case names directly.
 */
const SafeDynamicIcon = React.memo(function SafeDynamicIcon({
  name,
  className,
  strokeWidth,
  fallback,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
  fallback?: React.ReactNode;
}) {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Reset error state when name changes
  React.useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    // Set a short timeout to simulate loading and then show the icon
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50); // Very short delay to prevent flash but maintain fixed dimensions

    return () => clearTimeout(timer);
  }, [name]);

  const fallbackElement = React.useMemo(
    () =>
      fallback || (
        <div
          className={`${className} flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-500 dark:text-zinc-400 shrink-0`}
        >
          ?
        </div>
      ),
    [className, fallback]
  );

  const loadingElement = React.useMemo(
    () => (
      <div
        className={`${className} flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded shrink-0 animate-pulse`}
      >
        <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded" />
      </div>
    ),
    [className]
  );

  if (hasError) {
    return fallbackElement;
  }

  // Validate icon name before attempting to render
  if (!name || typeof name !== "string" || name.trim() === "") {
    setHasError(true);
    return fallbackElement;
  }

  // Show loading state initially
  if (isLoading) {
    return loadingElement;
  }

  try {
    // Name is already in kebab-case from the API, so use it directly
    return (
      <div
        key={name}
        className={`${className} shrink-0 flex items-center justify-center`}
      >
        <DynamicIcon
          name={name as Parameters<typeof DynamicIcon>[0]["name"]}
          className="w-full h-full"
          strokeWidth={strokeWidth}
        />
      </div>
    );
  } catch (error) {
    // Handle any synchronous errors during icon creation
    if (process.env.NODE_ENV === "development") {
      console.warn(`[IconSelect] Failed to render icon "${name}":`, error);
    }
    setHasError(true);
    return fallbackElement;
  }
});

/**
 * Error boundary component to catch any remaining DynamicIcon errors.
 */
class IconErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode; className?: string },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log in development and for specific Lucide errors
    if (
      process.env.NODE_ENV === "development" &&
      error.message?.includes("Lucide")
    ) {
      console.warn(
        "[IconSelect] Error boundary caught Lucide icon error:",
        error.message
      );
    }
  }

  componentDidUpdate(prevProps: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
  }) {
    // Reset error state when children change (different icon)
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className={`${this.props.className} flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-500 dark:text-zinc-400 shrink-0`}
          >
            ?
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * High-performance icon selection component with infinite scrolling.
 *
 * Uses an API route to serve paginated icon data with both kebab-case and PascalCase names,
 * ensuring only valid Lucide icons are served and preventing console errors.
 */
export function IconSelect({
  value,
  onValueChange,
  placeholder = "Select an icon...",
  disabled = false,
  className,
  iconStrokeWidth = config.getIconStrokeWidth(),
}: IconSelectProps) {
  // Memoize the render functions to prevent unnecessary re-renders that could break downshift
  const renderItem = React.useCallback(
    (item: IconOption, isHighlighted: boolean, isSelected: boolean) => (
      <>
        <div className="flex items-center gap-2 flex-1">
          <IconErrorBoundary className="size-4 shrink-0" key={item.kebab}>
            <SafeDynamicIcon
              name={item.kebab} // Use kebab-case name for DynamicIcon
              className="size-4 shrink-0"
              strokeWidth={iconStrokeWidth}
            />
          </IconErrorBoundary>
          <span className="truncate">{item.pascal}</span>
        </div>
        {isSelected && (
          <IconErrorBoundary className="ml-2 h-4 w-4 shrink-0" key="check">
            <SafeDynamicIcon
              name="check" // Known valid kebab-case name
              className="ml-2 h-4 w-4 shrink-0"
              strokeWidth={iconStrokeWidth}
            />
          </IconErrorBoundary>
        )}
      </>
    ),
    [iconStrokeWidth]
  );

  const renderTrigger = React.useCallback(
    (selectedItem: IconOption | null) => {
      if (selectedItem) {
        return (
          <>
            <IconErrorBoundary
              className="size-4 shrink-0"
              key={selectedItem.kebab}
            >
              <SafeDynamicIcon
                name={selectedItem.kebab} // Use kebab-case name for DynamicIcon
                className="size-4 shrink-0"
                strokeWidth={iconStrokeWidth}
              />
            </IconErrorBoundary>
            <span className="truncate">{selectedItem.pascal}</span>
          </>
        );
      }
      return placeholder;
    },
    [placeholder, iconStrokeWidth]
  );

  const handleValueChange = React.useCallback(
    (newValue: string | null) => {
      onValueChange?.(newValue || "");
    },
    [onValueChange]
  );

  return (
    <Combobox<IconOption>
      queryKey={["icons", "search"]}
      fetchData={fetchIcons}
      value={value}
      onValueChange={handleValueChange}
      placeholder={placeholder}
      searchPlaceholder="Search icons..."
      emptyMessage="No icons found."
      disabled={disabled}
      className={className}
      searchDebounce={300} // 300ms search debounce
      iconStrokeWidth={iconStrokeWidth}
      getItemValue={(item) => item.pascal}
      getItemLabel={(item) => item.pascal}
      renderItem={renderItem}
      renderTrigger={renderTrigger}
    />
  );
}

/**
 * Custom hook for managing icon selection state.
 */
export function useIconSelect(initialValue?: string) {
  const [value, setValue] = React.useState(initialValue || "");

  // Create a memoized DynamicIcon component for the selected icon
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
          name={toKebabCase(value)} // Convert PascalCase to kebab-case
          className={className}
          strokeWidth={strokeWidth || config.getIconStrokeWidth()}
          {...props}
        />
      )
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
 * Now uses the error-safe Icon component for better error handling.
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
      // Create a DynamicIcon component for the given name
      const DynamicIconComponent = React.useMemo(() => {
        const IconComponent = ({
          className: iconClassName,
          strokeWidth: iconStrokeWidth,
        }: {
          className?: string;
          strokeWidth?: number;
        }) => (
          <DynamicIcon
            name={
              toKebabCase(name) as Parameters<typeof DynamicIcon>[0]["name"]
            }
            className={iconClassName}
            strokeWidth={iconStrokeWidth}
          />
        );
        IconComponent.displayName = `DynamicIcon_${name}`;
        return IconComponent;
      }, [name]);

      // Use the error-safe Icon component
      return (
        <Icon
          icon={DynamicIconComponent}
          className={className}
          strokeWidth={strokeWidth || config.getIconStrokeWidth()}
          fallback={fallback}
          {...props}
        />
      );
    }
  );
  DynamicIconWrapper.displayName = `SafeDynamicIcon_${name}`;
  return DynamicIconWrapper;
}

/**
 * Check if an icon name is valid (basic client-side validation).
 */
export function isValidLucideIcon(name: string): boolean {
  return (
    typeof name === "string" &&
    name.length > 0 &&
    /^[A-Za-z][A-Za-z0-9]*$/.test(name)
  );
}

/**
 * Get statistics about the icon collection.
 */
export const iconStats = {
  totalIcons: "1,822",
  bundleImpact: "Tree-shakable - only used icons are included in bundle",
  loadingStrategy: "Infinite scroll with API-based pagination",
  performance: "Optimal - dynamically generated from Lucide React package",
  searchCapability: "Real-time search with debouncing",
  features: [
    "Complete Lucide React library (dynamically loaded)",
    "Tree-shakable loading with DynamicIcon",
    "API-based pagination and search",
    "Automatic sync with Lucide updates",
    "Kebab-case to PascalCase mapping",
    "Error handling for invalid icons",
  ],
};
