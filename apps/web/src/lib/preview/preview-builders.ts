/**
 * Preview Configuration Builders
 *
 * Utilities for creating preview configurations from various sources,
 * including tailwind-variants definitions and manual prop specifications.
 */

import type {
  EventParameter,
  EventPropMetadata,
  PreviewConfig,
  PropMetadata,
  VariantPropMetadata,
} from "./preview-types";

/**
 * Helper to create prop metadata
 */
export function createPropMetadata(
  name: string,
  type: string,
  options: Omit<PropMetadata, "name" | "type"> = {},
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
  > = {},
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
 * Utility to create PreviewConfig from variants definition with additional props
 */
export function createPropConfig<
  T extends Record<string, Record<string, unknown>>,
>(
  componentName: string,
  displayName: string,
  description: string,
  variantsDefinition: {
    variants: T;
    defaultVariants: Partial<{ [K in keyof T]: string }>;
  },
  additionalProps: PropMetadata[] = [],
): PreviewConfig {
  // Extract variants from tailwind-variants
  const variants: VariantPropMetadata[] = Object.entries(
    variantsDefinition.variants,
  ).map(([variantName, variantOptions]) => ({
    name: variantName,
    type: Object.keys(variantOptions)
      .map(key => `"${key}"`)
      .join(" | "),
    options: Object.keys(variantOptions).map(key => ({
      value: key,
      label: key,
    })),
    defaultOption:
      variantsDefinition.defaultVariants[variantName as keyof T]
      || Object.keys(variantOptions)[0],
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
    defaultValue?: string,
  ): PropMetadata => ({
    name,
    type: "string",
    description,
    defaultValue,
  }),

  boolean: (
    name: string,
    description: string,
    defaultValue?: boolean,
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
    defaultValue?: string,
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
  defaultValue?: string,
): VariantPropMetadata | null {
  // Check if the type is a union of string literals (e.g., '"left" | "right"')
  const unionMatch = type.match(/^"([^"]+)"(\s*\|\s*"([^"]+)")+$/);

  if (!unionMatch) {
    return null;
  }

  // Extract all quoted values from the union type
  const values
    = type.match(/"([^"]+)"/g)?.map(match => match.slice(1, -1)) || [];

  if (values.length < 2) {
    return null;
  }

  return {
    name,
    type,
    description: description || `${name} option`,
    options: values.map(value => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1), // Capitalize first letter
    })),
    defaultOption: defaultValue || values[0], // Use provided default or first option
  };
}

/**
 * Extract PreviewConfig variants from tailwind-variants definition
 */
export function extractVariantsFromTailwindVariants(
  variants: Record<string, Record<string, unknown>>,
  defaultVariants: Record<string, string>,
): VariantPropMetadata[] {
  return Object.entries(variants).map(([variantName, options]) => ({
    name: variantName,
    type: Object.keys(options)
      .map(key => `"${key}"`)
      .join(" | "),
    options: Object.keys(options).map(key => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })),
    defaultOption: defaultVariants[variantName],
  }));
}

/**
 * Create a complete PreviewConfig from tailwind-variants
 */
export function createPreviewConfig(
  componentName: string,
  description: string,
  variantsDefinition: {
    variants: Record<string, Record<string, unknown>>;
    defaultVariants: Record<string, string>;
  },
  additionalProps: PropMetadata[] = [],
): PreviewConfig {
  return {
    componentName,
    displayName: componentName,
    description,
    props: additionalProps,
    variants: extractVariantsFromTailwindVariants(
      variantsDefinition.variants,
      variantsDefinition.defaultVariants,
    ),
  };
}
