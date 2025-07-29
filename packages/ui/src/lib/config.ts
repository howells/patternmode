/**
 * Component Library Configuration
 *
 * Centralized configuration for design tokens, component defaults, and customization options.
 * This file serves as the single source of truth for library-wide settings.
 */

// Type definitions for configuration
export interface IconConfig {
  strokeWidth: {
    default: number;
    thin: number;
    normal: number;
    thick: number;
  };
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
}

export interface ComponentConfig {
  // Global icon stroke width - used by all components for consistency
  iconStrokeWidth: number;
}

export interface LibraryConfig {
  icons: IconConfig;
  components: ComponentConfig;
  theme: {
    cssPrefix: string;
    useCssCustomProperties: boolean;
  };
}

// Default configuration
const defaultConfig: LibraryConfig = {
  icons: {
    strokeWidth: {
      default: 1,
      thin: 1,
      normal: 1.5,
      thick: 2,
    },
    sizes: {
      xs: "size-2.5", // 10px
      sm: "size-3", // 12px
      base: "size-3.5", // 14px
      lg: "size-4", // 16px
      xl: "size-5", // 20px
    },
  },
  components: {
    // Global icon stroke width for all components
    iconStrokeWidth: 1,
  },
  theme: {
    cssPrefix: "--ui",
    useCssCustomProperties: false,
  },
};

// Current configuration (mutable)
let currentConfig: LibraryConfig = { ...defaultConfig };

// Utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep merge utility
function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue)
    ) {
      if (
        targetValue &&
        typeof targetValue === "object" &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue) as T[typeof key];
      } else {
        result[key] = sourceValue as T[typeof key];
      }
    } else {
      result[key] = sourceValue as T[typeof key];
    }
  }

  return result;
}

/**
 * Configuration management utilities
 */
export const config = {
  /**
   * Get the current configuration
   */
  get: (): LibraryConfig => currentConfig,

  /**
   * Update the configuration (deep merge)
   */
  setConfig: (newConfig: DeepPartial<LibraryConfig>): void => {
    currentConfig = deepMerge(currentConfig, newConfig);
  },

  /**
   * Reset configuration to defaults
   */
  reset: (): void => {
    currentConfig = { ...defaultConfig };
  },

  /**
   * Get global icon stroke width (consistent across all components)
   */
  getIconStrokeWidth: (): number => {
    return currentConfig.components.iconStrokeWidth;
  },

  /**
   * Convenience getters for common values
   */
  icons: {
    get strokeWidth() {
      return currentConfig.icons.strokeWidth;
    },
    get sizes() {
      return currentConfig.icons.sizes;
    },
  },

  /**
   * Generate CSS custom properties from current configuration
   */
  toCssCustomProperties: (): string => {
    const { cssPrefix } = currentConfig.theme;
    const properties: string[] = [];

    // Icon stroke widths
    Object.entries(currentConfig.icons.strokeWidth).forEach(([key, value]) => {
      properties.push(`${cssPrefix}-icon-stroke-${key}: ${value};`);
    });

    // Global component stroke width
    properties.push(
      `${cssPrefix}-component-icon-stroke: ${currentConfig.components.iconStrokeWidth};`
    );

    return properties.join(" ");
  },
};

// Export default configuration for reference
export { defaultConfig };
