/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod/v4";
import {
  PropExplorerConfig,
  PropMetadata,
  VariantPropMetadata,
} from "./prop-explorer";

/**
 * Generate PropExplorer configuration from a Zod v4 schema
 */
export function generatePropConfigFromZod(
  componentName: string,
  displayName: string,
  description: string,
  schema: any // Zod v4 object type
): PropExplorerConfig {
  const variants: VariantPropMetadata[] = [];
  const props: PropMetadata[] = [];

  // Get the shape of the schema (v4 uses .shape)
  const shape = schema.shape;

  for (const [propName, propSchema] of Object.entries(shape)) {
    const zodSchema = propSchema as any;

    // Get description from Zod schema
    const propDescription = getZodDescription(zodSchema);

    // Check if this is an enum (should be a variant)
    if (
      isZodEnum(zodSchema) ||
      (isZodDefault(zodSchema) && isZodEnum(zodSchema.def.innerType))
    ) {
      const enumSchema = isZodDefault(zodSchema)
        ? zodSchema.def.innerType
        : zodSchema;

      // In Zod v4, enum values are in .options array
      const enumValues = enumSchema.options || [];
      const defaultValue = isZodDefault(zodSchema)
        ? zodSchema.def.defaultValue // Property, not function in v4
        : enumValues[0];

      variants.push({
        name: propName,
        type: enumValues.map((v: string) => `"${v}"`).join(" | "),
        description: propDescription,
        options: enumValues.map((value: string) => ({
          value,
          label: value.charAt(0).toUpperCase() + value.slice(1),
        })),
        defaultOption: defaultValue,
      });
    } else {
      // Regular prop
      const typeString = getZodTypeString(zodSchema);

      props.push({
        name: propName,
        type: typeString,
        description: propDescription,
        required: !isZodOptional(zodSchema),
      });
    }
  }

  return {
    componentName,
    displayName,
    description,
    variants,
    props,
  };
}

/**
 * Check if schema is a Zod enum (v4)
 */
function isZodEnum(schema: any): boolean {
  return schema?.def?.type === "enum";
}

/**
 * Check if schema is a Zod default (v4)
 */
function isZodDefault(schema: any): boolean {
  return schema?.def?.type === "default";
}

/**
 * Check if schema is optional (v4)
 */
function isZodOptional(schema: any): boolean {
  // Check def.type first (more reliable)
  if (schema?.def?.type === "optional") {
    return true;
  }

  // Fallback to isOptional method if available
  if (schema?.isOptional && typeof schema.isOptional === "function") {
    return schema.isOptional();
  }

  return false;
}

/**
 * Extract description from Zod v4 schema
 */
function getZodDescription(schema: any): string | undefined {
  // Check for description in the schema
  if (schema?.def?.description) {
    return schema.def.description;
  }

  // Check for description in nested schemas (like ZodDefault)
  if (schema?.def?.innerType) {
    return getZodDescription(schema.def.innerType);
  }

  return undefined;
}

/**
 * Convert Zod v4 type to TypeScript type string
 */
function getZodTypeString(schema: any): string {
  if (!schema?.def?.type) return "unknown";

  switch (schema.def.type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "array":
      return "array";
    case "object":
      return "object";
    case "enum":
      // In Zod v4, enum values are in .options
      const values = schema.options || [];
      return values.map((v: string) => `"${v}"`).join(" | ");
    case "default":
      return getZodTypeString(schema.def.innerType);
    case "optional":
      return getZodTypeString(schema.def.innerType);
    default:
      return "unknown";
  }
}

/**
 * Helper to create enum schemas with descriptions and defaults (v4)
 */
export function createEnumVariant(
  values: readonly string[],
  defaultValue: string,
  description?: string
) {
  const enumSchema = z.enum(values as [string, ...string[]]);
  const withDefault = enumSchema.default(defaultValue);

  if (description) {
    return withDefault.describe(description);
  }

  return withDefault;
}

/**
 * Helper to create optional props with descriptions (v4)
 */
export function createOptionalProp(schema: any, description?: string) {
  // In Zod v4, some schemas don't have .optional() method
  // Use z.optional(schema) as a fallback
  const optional = schema.optional ? schema.optional() : z.optional(schema);

  if (description) {
    return optional.describe(description);
  }

  return optional;
}
