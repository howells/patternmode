import type { ComponentConfig } from "@patternmode/config/component-types";
import type { PreviewProps } from "@/types/preview-props";

import { getPreviewProps } from "@/registry/components";

/**
 * Extract the primary component from a config.
 * For multi-component families, returns the component marked as primary.
 * For single components, returns the component name.
 */
export function getPrimaryComponent(config: ComponentConfig): string {
  // Multi-component family
  if (config.components && config.components.length > 0) {
    const primaryComponent = config.components.find(comp => comp.primary);
    return primaryComponent ? primaryComponent.name : config.components[0].name;
  }

  // Single component - use the config name
  return config.name;
}

/**
 * Extract all available props from a config using static registry.
 */
export async function getConfigProps(config: ComponentConfig): Promise<PreviewProps[]> {
  // First try to get props from static registry
  const registryProps = await getPreviewProps(config.id);
  if (registryProps.length > 0) {
    console.log(`Found preview props for ${config.id} from registry:`, registryProps.length, "props");
    return registryProps;
  }

  // For multi-component families, collect props from all components
  if (config.components) {
    const allProps: PreviewProps[] = [];

    config.components.forEach((componentDef) => {
      if (componentDef.props) {
        // Add component name prefix to avoid conflicts
        const prefixedProps = componentDef.props.map(prop => ({
          ...prop,
          name: `${componentDef.name}.${prop.name}`,
          description: `[${componentDef.name}] ${prop.description || ""}`,
        }));
        allProps.push(...prefixedProps);
      }
    });

    return allProps;
  }

  // No props defined - return empty array
  console.log(`No prop metadata found for ${config.id}`);
  return [];
}

/**
 * Get default props from a config.
 * Extracts default values from the props metadata.
 */
export async function getDefaultProps(config: ComponentConfig): Promise<Record<string, unknown>> {
  const props = await getConfigProps(config);
  const defaultProps: Record<string, unknown> = {};

  props.forEach((prop: PreviewProps) => {
    // Check for standard defaultValue
    if (prop.defaultValue !== undefined) {
      defaultProps[prop.name] = prop.defaultValue;
    }
    // Check for variant props with defaultOption
    else if ("defaultOption" in prop && prop.defaultOption !== undefined) {
      defaultProps[prop.name] = prop.defaultOption;
    }
    // Check for options array with first option as default
    else if ("options" in prop && Array.isArray(prop.options) && prop.options.length > 0) {
      const firstOption = prop.options[0];
      // Handle both string arrays and VariantOption objects
      const defaultValue = typeof firstOption === "string" ? firstOption : (firstOption as { value: unknown }).value;
      defaultProps[prop.name] = defaultValue;
    }
  });

  // Add default children if the component supports it
  const childrenProp = props.find((prop: PreviewProps) => prop.name === "children");
  if (childrenProp && childrenProp.defaultValue !== undefined) {
    defaultProps.children = childrenProp.defaultValue;
  }
  else if (childrenProp) {
    // Fallback to component name if no defaultValue is specified
    defaultProps.children = config.name;
  }

  return defaultProps;
}
