// Prop Explorer System [v1.0.0]
// Self-documenting, extensible prop exploration for Patternmode components

import { VariantProps } from "tailwind-variants";

/**
 * Base prop metadata that can be extracted from TypeScript types
 */
export interface PropMetadata {
  /** The prop name */
  name: string;
  /** TypeScript type definition */
  type: string;
  /** Whether the prop is required */
  required?: boolean;
  /** Human-readable description */
  description?: string;
  /** Whether this prop is deprecated */
  deprecated?: boolean | string;
  /** Version when this prop was added */
  since?: string;
  /** Link to related documentation */
  docLink?: string;
  /** Default value for the prop */
  defaultValue?: unknown;
  /** Options for select/enum types - can be simple strings or complex VariantOption objects */
  options?: string[] | VariantOption[];
  /** Minimum value for number types */
  min?: number;
  /** Maximum value for number types */
  max?: number;
}

/**
 * Variant prop metadata with additional variant-specific information
 */
export interface VariantPropMetadata extends PropMetadata {
  /** Available variant options */
  options: VariantOption[];
  /** The default variant */
  defaultOption?: string;
}

/**
 * Individual variant option metadata
 */
export interface VariantOption {
  /** The option value */
  value: string;
  /** Display label for the option */
  label?: string;
  /** Description of what this option does */
  description?: string;
  /** Visual preview or example */
  preview?: React.ReactNode;
  /** CSS classes applied by this variant */
  classes?: string[];
  /** Whether this option is deprecated */
  deprecated?: boolean | string;
}

/**
 * Event handler prop metadata
 */
export interface EventPropMetadata extends PropMetadata {
  /** Event handler signature */
  signature: string;
  /** Parameters passed to the event handler */
  parameters: EventParameter[];
  /** When this event is triggered */
  trigger: string;
}

/**
 * Event parameter metadata
 */
export interface EventParameter {
  name: string;
  type: string;
  description?: string;
}

/**
 * Slot/children prop metadata
 */
export interface SlotPropMetadata extends PropMetadata {
  /** Expected child component types */
  acceptedChildren?: string[];
  /** Whether multiple children are allowed */
  multiple?: boolean;
  /** Render prop signature if applicable */
  renderPropSignature?: string;
}

/**
 * Complete prop explorer configuration for a component
 */
export interface PropExplorerConfig {
  /** Component name */
  componentName: string;
  /** Component display name */
  displayName?: string;
  /** Component description */
  description?: string;
  /** All props for this component */
  props: PropMetadata[];
  /** Variant props (tailwind-variants) */
  variants?: VariantPropMetadata[];
  /** Event handler props */
  events?: EventPropMetadata[];
  /** Slot/children props */
  slots?: SlotPropMetadata[];
  /** Related components */
  relatedComponents?: string[];
  /** Component examples showing different prop combinations */
  examples?: PropExample[];
}

/**
 * Example showing specific prop combinations
 */
export interface PropExample {
  id: string;
  title: string;
  description?: string;
  /** Props used in this example */
  props: Record<string, unknown>;
  /** React component preview */
  preview: React.ReactNode;
  /** Code snippet */
  code?: string;
  /** Highlighted props in this example */
  highlightedProps?: string[];
}

/**
 * Utility type to extract variant props from tailwind-variants
 */
export type ExtractVariantProps<T> = T extends VariantProps<infer V>
  ? V
  : never;

/**
 * JSDoc-based prop documentation decorator
 * This allows us to add rich documentation directly in component prop interfaces
 */
export interface PropDocumentation {
  /**
   * @description Human-readable description of the prop
   * @category The category this prop belongs to
   * @defaultValue Default value for the prop
   * @example Example usage of the prop
   * @since Version when this prop was added
   * @deprecated Whether this prop is deprecated and why
   * @docLink Link to additional documentation
   */
  [key: string]: unknown;
}

/**
 * Helper to create prop metadata
 */
export function createPropMetadata(
  name: string,
  type: string,
  options: Omit<PropMetadata, "name" | "type"> = {}
): PropMetadata {
  return {
    name,
    type,
    ...options,
  };
}

/**
 * Helper to create event prop metadata
 */
export function createEventPropMetadata(
  name: string,
  signature: string,
  trigger: string,
  parameters: EventParameter[] = [],
  config: Omit<
    EventPropMetadata,
    "name" | "type" | "signature" | "trigger" | "parameters"
  > = {}
): EventPropMetadata {
  return {
    name,
    type: signature,
    signature,
    trigger,
    parameters,

    ...config,
  };
}

/**
 * Type guard to check if prop is a variant prop
 */
export function isVariantProp(prop: PropMetadata): prop is VariantPropMetadata {
  return "options" in prop;
}

/**
 * Type guard to check if prop is an event prop
 */
export function isEventProp(prop: PropMetadata): prop is EventPropMetadata {
  return "signature" in prop;
}

/**
 * Type guard to check if prop is a slot prop
 */
export function isSlotProp(prop: PropMetadata): prop is SlotPropMetadata {
  return "acceptedChildren" in prop || "renderPropSignature" in prop;
}

/**
 * Registry for all component prop configurations
 */
export const propExplorerRegistry: Record<string, PropExplorerConfig> = {};

/**
 * Register a component's prop explorer configuration
 */
export function registerPropExplorer(config: PropExplorerConfig): void {
  propExplorerRegistry[config.componentName] = config;
}

/**
 * Get prop explorer configuration for a component
 */
export function getPropExplorerConfig(
  componentName: string
): PropExplorerConfig | undefined {
  return propExplorerRegistry[componentName];
}

/**
 * Get all registered component names
 */
export function getAllPropExplorerComponents(): string[] {
  return Object.keys(propExplorerRegistry);
}

/**
 * Search props by name or description
 */
export function searchProps(
  componentName: string,
  query: string
): PropMetadata[] {
  const config = getPropExplorerConfig(componentName);
  if (!config) return [];

  const allProps = [
    ...config.props,
    ...(config.variants || []),
    ...(config.events || []),
    ...(config.slots || []),
  ];

  const lowercaseQuery = query.toLowerCase();

  return allProps.filter(
    (prop) =>
      prop.name.toLowerCase().includes(lowercaseQuery) ||
      prop.description?.toLowerCase().includes(lowercaseQuery) ||
      prop.type.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Utility to create PropExplorerConfig from variants definition with additional props
 */
export function createPropConfig<
  T extends Record<string, Record<string, unknown>>
>(
  componentName: string,
  displayName: string,
  description: string,
  variantsDefinition: {
    variants: T;
    defaultVariants: Partial<{ [K in keyof T]: string }>;
  },
  additionalProps: PropMetadata[] = []
): PropExplorerConfig {
  // Extract variants from tailwind-variants
  const variants: VariantPropMetadata[] = Object.entries(
    variantsDefinition.variants
  ).map(([variantName, variantOptions]) => ({
    name: variantName,
    type: Object.keys(variantOptions)
      .map((key) => `"${key}"`)
      .join(" | "),
    options: Object.keys(variantOptions).map((key) => ({
      value: key,
      label: key,
    })),
    defaultOption:
      variantsDefinition.defaultVariants[variantName as keyof T] ||
      Object.keys(variantOptions)[0],
    description: `The ${variantName} variant of the component.`,
  }));

  return {
    componentName,
    displayName,
    description,
    variants,
    props: additionalProps,
  };
}

/**
 * Type-safe prop metadata builder
 */
export const createProp = {
  string: (
    name: string,
    description: string,
    defaultValue?: string
  ): PropMetadata => ({
    name,
    type: "string",
    description,
    defaultValue,
  }),

  boolean: (
    name: string,
    description: string,
    defaultValue?: boolean
  ): PropMetadata => ({
    name,
    type: "boolean",
    description,
    defaultValue,
  }),

  select: (
    name: string,
    description: string,
    options: string[],
    defaultValue?: string
  ): PropMetadata => ({
    name,
    type: "select",
    description,
    options,
    defaultValue,
  }),

  icon: (name: string, description: string): PropMetadata => ({
    name,
    type: "icon",
    description,
  }),
};

/**
 * Utility to automatically detect union types and convert them to variant props
 */
export function createVariantFromUnionType(
  name: string,
  type: string,
  description?: string,
  defaultValue?: string
): VariantPropMetadata | null {
  // Check if the type is a union of string literals (e.g., '"left" | "right"')
  const unionMatch = type.match(/^"([^"]+)"(\s*\|\s*"([^"]+)")+$/);

  if (!unionMatch) {
    return null;
  }

  // Extract all quoted values from the union type
  const values =
    type.match(/"([^"]+)"/g)?.map((match) => match.slice(1, -1)) || [];

  if (values.length < 2) {
    return null;
  }

  return {
    name,
    type,
    description: description || `${name} option`,
    options: values.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1), // Capitalize first letter
    })),
    defaultOption: defaultValue || values[0], // Use provided default or first option
  };
}

/**
 * Extract PropExplorerConfig variants from tailwind-variants definition
 */
export function extractVariantsFromTailwindVariants(
  variants: Record<string, Record<string, unknown>>,
  defaultVariants: Record<string, string>
): VariantPropMetadata[] {
  return Object.entries(variants).map(([variantName, options]) => ({
    name: variantName,
    type: Object.keys(options)
      .map((key) => `"${key}"`)
      .join(" | "),
    options: Object.keys(options).map((key) => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })),
    defaultOption: defaultVariants[variantName],
  }));
}

/**
 * Create a complete PropExplorerConfig from tailwind-variants
 */
export function createPropExplorerConfig(
  componentName: string,
  description: string,
  variantsDefinition: {
    variants: Record<string, Record<string, unknown>>;
    defaultVariants: Record<string, string>;
  },
  additionalProps: PropMetadata[] = []
): PropExplorerConfig {
  return {
    componentName,
    displayName: componentName,
    description,
    props: additionalProps,
    variants: extractVariantsFromTailwindVariants(
      variantsDefinition.variants,
      variantsDefinition.defaultVariants
    ),
  };
}
