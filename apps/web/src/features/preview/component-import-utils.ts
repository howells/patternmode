/**
 * Map componentId to import path
 */
export const getComponentImportPath = (
  componentId: string,
  category?: string,
  componentPath?: string,
): string => {
  console.log(`Debug: getComponentImportPath called with componentId: ${componentId}, category: ${category}, componentPath: ${componentPath}`);

  // Use provided path if available
  if (componentPath) {
    console.log(`Debug: Using provided componentPath: ${componentPath}`);
    return componentPath;
  }

  // Handle example components - all use the standardized three-file structure
  const isExample = componentId.toLowerCase().endsWith("example");
  console.log(`Debug: componentId "${componentId}" ends with "example": ${isExample}`);

  if (isExample) {
    // Remove "Example" from the original componentId first, then convert to kebab-case
    const baseComponent = componentId.replace(/Example$/, "");
    // Convert PascalCase to kebab-case: AlertDialog -> alert-dialog
    const kebabCase = baseComponent
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    // All examples are in component/preview.tsx - use exact pattern from config-utils
    const path = `../../../../../packages/ui/src/components/${kebabCase}/preview.tsx`;
    console.log(`Debug: Generated import path for ${componentId}: ${path}`);
    return path;
  }

  // Convert componentId to kebab-case for directory structure
  const _kebabCase = componentId
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  // Try three-file structure first: component/component.tsx
  console.log(`Debug: Using fallback path for non-example component: @patternmode/ui`);
  return "@patternmode/ui";
};

/**
 * Map kebab-case component names to their actual exported component names
 */
export const getExportedComponentName = (componentId: string): string => {
  // Handle kebab-case to PascalCase conversion
  if (componentId.includes("-")) {
    return componentId
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // Handle already PascalCase names
  return componentId.charAt(0).toUpperCase() + componentId.slice(1);
};

/**
 * Extract component name from componentId
 */
export const getComponentName = (componentId: string): string => {
  // Remove "Example" suffix if present
  const baseComponent = componentId.replace(/Example$/, "");
  return getExportedComponentName(baseComponent);
};
