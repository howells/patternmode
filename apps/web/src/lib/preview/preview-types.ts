// Preview System Types [v1.0.0]
// Self-documenting, extensible preview system for Patternmode components

import type { VariantProps } from "tailwind-variants";

/**
 * Base prop metadata that can be extracted from TypeScript types
 */
export type PropMetadata = {
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
};

/**
 * Variant prop metadata with additional variant-specific information
 */
export type VariantPropMetadata = {
  /** Available variant options */
  options: VariantOption[];
  /** The default variant */
  defaultOption?: string;
} & PropMetadata;

/**
 * Individual variant option metadata
 */
export type VariantOption = {
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
};

/**
 * Event handler prop metadata
 */
export type EventPropMetadata = {
  /** Event handler signature */
  signature: string;
  /** Parameters passed to the event handler */
  parameters: EventParameter[];
  /** When this event is triggered */
  trigger: string;
} & PropMetadata;

/**
 * Event parameter metadata
 */
export type EventParameter = {
  name: string;
  type: string;
  description?: string;
};

/**
 * Slot/children prop metadata
 */
export type SlotPropMetadata = {
  /** Expected child component types */
  acceptedChildren?: string[];
  /** Whether multiple children are allowed */
  multiple?: boolean;
  /** Render prop signature if applicable */
  renderPropSignature?: string;
} & PropMetadata;

/**
 * Complete preview configuration for a component
 */
export type PreviewConfig = {
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
};

/**
 * Example showing specific prop combinations
 */
export type PropExample = {
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
};

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
export type PropDocumentation = {
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
};
