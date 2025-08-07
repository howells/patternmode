/**
 * Preview System Registry and Search
 *
 * Manages component registration, storage, and searching for the preview system.
 */

import type { PreviewConfig, PropMetadata } from "./preview-types";

/**
 * Registry for all component prop configurations
 */
export const previewRegistry: Record<string, PreviewConfig> = {};

/**
 * Register a component's preview configuration
 */
export function registerPreview(config: PreviewConfig): void {
  previewRegistry[config.componentName] = config;
}

/**
 * Get preview configuration for a component
 */
export function getPreviewConfig(
  componentName: string,
): PreviewConfig | undefined {
  return previewRegistry[componentName];
}

/**
 * Get all registered component names
 */
export function getAllPreviewComponents(): string[] {
  return Object.keys(previewRegistry);
}

/**
 * Search props by name or description
 */
export function searchProps(
  componentName: string,
  query: string,
): PropMetadata[] {
  const config = getPreviewConfig(componentName);
  if (!config) {
    return [];
  }

  const allProps = [
    ...config.props,
    ...(config.variants || []),
    ...(config.events || []),
    ...(config.slots || []),
  ];

  const lowercaseQuery = query.toLowerCase();

  return allProps.filter(
    prop =>
      prop.name.toLowerCase().includes(lowercaseQuery)
      || prop.description?.toLowerCase().includes(lowercaseQuery)
      || prop.type.toLowerCase().includes(lowercaseQuery),
  );
}
