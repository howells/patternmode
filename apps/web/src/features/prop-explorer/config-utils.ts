import type { ComponentConfig, PropMetadata } from "@patternmode/ui/lib/component-config-types";

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
 * Extract all available props from a config.
 * Dynamically imports prop metadata from preview files.
 */
export async function getConfigProps(config: ComponentConfig) {
  // Try to dynamically import prop metadata from preview file
  try {
    // Use relative path that works with Next.js bundler
    const previewModule = await import(`../../../../../packages/ui/src/components/${config.id}/preview.tsx`);

    // Look for component-specific preview props first
    const previewPropsKey = `${config.id}PreviewProps`;
    if (previewModule[previewPropsKey]) {
      console.log(`Found preview props: ${previewPropsKey}`, previewModule[previewPropsKey]);
      return previewModule[previewPropsKey];
    }

    // Fallback: look for any export ending with 'PreviewProps'
    const previewExports = Object.keys(previewModule).filter(key =>
      key.endsWith("PreviewProps") || key.endsWith("previewProps"),
    );

    if (previewExports.length > 0) {
      const firstPreviewProps = previewModule[previewExports[0]];
      console.log(`Found preview props: ${previewExports[0]}`, firstPreviewProps);
      return firstPreviewProps;
    }

    console.log(`No preview props found for ${config.id}. Available exports:`, Object.keys(previewModule));
  }
  catch (error) {
    console.log(`No preview props found for ${config.id}:`, error);
  }

  // Fallback: If config has direct props, return them
  if (config.props && config.props.length > 0) {
    return config.props;
  }

  // For multi-component families, collect props from all components
  if (config.components) {
    const allProps: typeof config.props = [];

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

  props.forEach((prop) => {
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
      const defaultValue = typeof firstOption === "string" ? firstOption : firstOption.value;
      defaultProps[prop.name] = defaultValue;
    }
  });

  // Add default children if the component supports it
  const childrenProp = props.find(prop => prop.name === "children");
  if (childrenProp && childrenProp.defaultValue !== undefined) {
    defaultProps.children = childrenProp.defaultValue;
  }
  else if (childrenProp) {
    // Fallback to component name if no defaultValue is specified
    defaultProps.children = config.name;
  }

  return defaultProps;
}
