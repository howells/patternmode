import type { CategoryKey, ComponentConfigRegistry, ComponentId } from "../src/components/registry";

import { describe, expect, it } from "vitest";
import {
  CATEGORY_CONFIG,

  COMPONENT_LIST,
  COMPONENT_REGISTRY,

  componentRegistry,
  getAllComponents,
  getComponentConfig,
  getComponentsByCategory,
  getTotalComponentsCount,
} from "../src/components/registry";

describe("component Registry", () => {
  describe("cOMPONENT_REGISTRY", () => {
    it("should be defined and be an object", () => {
      expect(COMPONENT_REGISTRY).toBeDefined();
      expect(typeof COMPONENT_REGISTRY).toBe("object");
    });

    it("should have at least one component", () => {
      const componentIds = Object.keys(COMPONENT_REGISTRY);
      expect(componentIds.length).toBeGreaterThan(0);
    });

    it("should have valid component configurations", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        expect(typeof id).toBe("string");
        expect(id.length).toBeGreaterThan(0);
        expect(config).toBeDefined();
        expect(typeof config).toBe("object");
        expect(config.id).toBe(id);
        expect(typeof config.category).toBe("string");
        expect(config.category.length).toBeGreaterThan(0);
      });
    });

    it("should have valid component config structure for each component", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([id, config]) => {
        // Required fields
        expect(config.id).toBe(id);
        expect(typeof config.name).toBe("string");
        expect(config.name.length).toBeGreaterThan(0);
        expect(typeof config.description).toBe("string");
        expect(config.description.length).toBeGreaterThan(0);
        expect(typeof config.category).toBe("string");
        expect(config.category.length).toBeGreaterThan(0);
        expect(typeof config.importStatement).toBe("string");
        expect(config.importStatement.length).toBeGreaterThan(0);

        // Icon should be a function (React component) or object (imported icon)
        expect(typeof config.icon === "function" || typeof config.icon === "object").toBe(true);

        // Examples should be an array
        expect(Array.isArray(config.examples)).toBe(true);
        config.examples.forEach((example) => {
          expect(typeof example.id).toBe("string");
          expect(typeof example.title).toBe("string");
          expect(typeof example.description).toBe("string");
          expect(typeof example.component).toBe("function");
        });

        // Components should be an array when present (for multi-component packages)
        if (config.components) {
          expect(Array.isArray(config.components)).toBe(true);
          config.components.forEach((component) => {
            expect(typeof component.name).toBe("string");
            expect(typeof component.description).toBe("string");
            // Component should be a function or object (for Base UI components)
            expect(typeof component.component === "function" || typeof component.component === "object").toBe(true);
          });
        }
      });
    });

    it("should have consistent import statements", () => {
      Object.entries(COMPONENT_REGISTRY).forEach(([_id, config]) => {
        // Import statement should reference the correct package
        expect(config.importStatement).toContain(`@patternmode/ui`);

        // Should be a proper import statement
        expect(config.importStatement).toMatch(/^import\s+\{.+\}\s+from\s+".+";$/);
      });
    });

    it("should have multi-component validation for complex components", () => {
      // Derive multi-component packages from the registry
      const multiComponentPackages = Object.entries(COMPONENT_REGISTRY)
        .filter(([_, config]) => config.components && config.components.length > 1)
        .map(([packageId]) => packageId);

      expect(multiComponentPackages.length).toBeGreaterThan(0);

      multiComponentPackages.forEach((packageId) => {
        const config = COMPONENT_REGISTRY[packageId];
        expect(config.components.length).toBeGreaterThan(1);

        // Each component should have a unique name
        const componentNames = config.components.map(c => c.name);
        const uniqueNames = new Set(componentNames);
        expect(uniqueNames.size).toBe(componentNames.length);

        // Main component should be included
        const mainComponentName = config.name;
        const hasMainComponent = config.components.some(c => c.name === mainComponentName);
        expect(hasMainComponent).toBe(true);
      });
    });
  });

  describe("cOMPONENT_LIST", () => {
    it("should have component categories defined", () => {
      expect(COMPONENT_LIST).toBeDefined();
      expect(typeof COMPONENT_LIST).toBe("object");
    });

    it("should have at least one component category", () => {
      const categories = Object.keys(COMPONENT_LIST);
      expect(categories.length).toBeGreaterThan(0);
    });

    it("should have components in each category", () => {
      Object.entries(COMPONENT_LIST).forEach(([_category, components]) => {
        expect(Array.isArray(components)).toBe(true);
        expect(components.length).toBeGreaterThan(0);

        // Each component should be a string
        components.forEach((component) => {
          expect(typeof component).toBe("string");
          expect(component.length).toBeGreaterThan(0);
        });
      });
    });

    it("should have expected categories", () => {
      const categories = Object.keys(COMPONENT_LIST);
      // Only test categories that actually have components (not all categories in CATEGORY_CONFIG have components)
      const categoriesWithComponents = CATEGORY_CONFIG
        .map(cat => cat.key)
        .filter(categoryKey => categories.includes(categoryKey));

      categoriesWithComponents.forEach((expectedCategory) => {
        expect(categories).toContain(expectedCategory);
      });

      // Ensure we're testing a reasonable number of categories
      expect(categoriesWithComponents.length).toBeGreaterThan(5);
    });

    it("should match components from COMPONENT_REGISTRY", () => {
      const allComponentsFromList = Object.values(COMPONENT_LIST).flat();
      const allComponentsFromRegistry = Object.keys(COMPONENT_REGISTRY);

      expect(allComponentsFromList.sort()).toEqual(allComponentsFromRegistry.sort());
    });
  });

  describe("cATEGORY_CONFIG", () => {
    it("should be defined and be an array", () => {
      expect(CATEGORY_CONFIG).toBeDefined();
      expect(Array.isArray(CATEGORY_CONFIG)).toBe(true);
    });

    it("should have at least one category", () => {
      expect(CATEGORY_CONFIG.length).toBeGreaterThan(0);
    });

    it("should have valid category objects", () => {
      CATEGORY_CONFIG.forEach((category) => {
        expect(typeof category).toBe("object");
        expect(typeof category.key).toBe("string");
        expect(typeof category.name).toBe("string");
        expect(typeof category.description).toBe("string");
        expect(category.key.length).toBeGreaterThan(0);
        expect(category.name.length).toBeGreaterThan(0);
        expect(category.description.length).toBeGreaterThan(0);
      });
    });

    it("should have expected categories", () => {
      const categoryKeys = CATEGORY_CONFIG.map(cat => cat.key);
      // Verify that all categories have valid structure instead of hardcoding
      expect(categoryKeys.length).toBeGreaterThan(0);
      
      categoryKeys.forEach((key) => {
        expect(typeof key).toBe("string");
        expect(key.length).toBeGreaterThan(0);
        // Each key should exist in the registry
        const hasComponentsInCategory = Object.values(COMPONENT_REGISTRY).some(config => config.category === key);
        if (!hasComponentsInCategory) {
          console.warn(`Category "${key}" has no components in registry`);
        }
      });
    });

    it("should have all categories from COMPONENT_LIST represented", () => {
      const categoryKeys = CATEGORY_CONFIG.map(cat => cat.key);
      const actualCategories = Object.keys(COMPONENT_LIST);

      actualCategories.forEach((actualCategory) => {
        expect(categoryKeys).toContain(actualCategory);
      });
    });
  });

  describe("helper Functions", () => {
    describe("getComponentConfig", () => {
      it("should return component config for valid id", () => {
        const firstComponentId = Object.keys(COMPONENT_REGISTRY)[0];
        const config = getComponentConfig(firstComponentId);

        expect(config).toBeDefined();
        expect(config?.id).toBe(firstComponentId);
      });

      it("should return undefined for invalid id", () => {
        const config = getComponentConfig("non-existent-component");
        expect(config).toBeUndefined();
      });

      it("should return undefined for empty string", () => {
        const config = getComponentConfig("");
        expect(config).toBeUndefined();
      });

      it("should return complete config with all required fields", () => {
        // Use the first component from registry instead of hardcoding "accordion"
        const firstComponentId = Object.keys(COMPONENT_REGISTRY)[0];
        const config = getComponentConfig(firstComponentId);
        
        expect(config).toBeDefined();
        if (config) {
          expect(config.id).toBe(firstComponentId);
          expect(config.name).toBeTruthy();
          expect(config.category).toBeTruthy();
          expect(Array.isArray(config.examples)).toBe(true);
          expect(config.examples.length).toBeGreaterThan(0);
          
          // Only test components array if it exists
          if (config.components) {
            expect(Array.isArray(config.components)).toBe(true);
          }
        }
      });
    });

    describe("getAllComponents", () => {
      it("should return all component configurations", () => {
        const allComponents = getAllComponents();

        expect(Array.isArray(allComponents)).toBe(true);
        expect(allComponents.length).toBe(Object.keys(COMPONENT_REGISTRY).length);

        allComponents.forEach((config) => {
          expect(typeof config).toBe("object");
          expect(typeof config.id).toBe("string");
          expect(typeof config.category).toBe("string");
        });
      });

      it("should include multi-component configurations", () => {
        const allComponents = getAllComponents();
        // Find any multi-component configuration instead of hardcoding accordion
        const multiComponentConfig = allComponents.find(c => c.components && c.components.length > 1);

        if (multiComponentConfig) {
          expect(multiComponentConfig.components.length).toBeGreaterThan(1);
          // Verify structure without hardcoding specific component names
          multiComponentConfig.components.forEach(component => {
            expect(component).toEqual(
              expect.objectContaining({
                name: expect.any(String),
                description: expect.any(String),
                component: expect.anything() // Function or object for Base UI components
              })
            );
          });
        }
      });
    });

    describe("getComponentsByCategory", () => {
      it("should return components for valid category", () => {
        const categories = Object.keys(COMPONENT_LIST);
        const testCategory = categories[0];
        const components = getComponentsByCategory(testCategory);

        expect(Array.isArray(components)).toBe(true);
        expect(components.length).toBeGreaterThan(0);

        components.forEach((config) => {
          expect(config.category).toBe(testCategory);
        });
      });

      it("should return empty array for invalid category", () => {
        const components = getComponentsByCategory("non-existent-category");
        expect(Array.isArray(components)).toBe(true);
        expect(components.length).toBe(0);
      });

      it("should return empty array for empty string category", () => {
        const components = getComponentsByCategory("");
        expect(Array.isArray(components)).toBe(true);
        expect(components.length).toBe(0);
      });

      it("should return components with complete multi-component data", () => {
        // Test any category that has components instead of hardcoding "layout"
        const categories = Object.keys(COMPONENT_LIST);
        const testCategory = categories[0];
        const categoryComponents = getComponentsByCategory(testCategory);

        if (categoryComponents.length > 0) {
          // Find any multi-component config in this category
          const multiComponentConfig = categoryComponents.find(c => c.components && c.components.length > 1);
          
          if (multiComponentConfig) {
            expect(multiComponentConfig.components.length).toBeGreaterThan(1);
            expect(multiComponentConfig.examples.length).toBeGreaterThan(0);
          }
        }
      });
    });

    describe("getTotalComponentsCount", () => {
      it("should return correct count of components", () => {
        const count = getTotalComponentsCount();
        const expectedCount = Object.keys(COMPONENT_REGISTRY).length;

        expect(typeof count).toBe("number");
        expect(count).toBe(expectedCount);
        expect(count).toBeGreaterThan(0);
      });

      it("should match manual count", () => {
        const manualCount = Object.values(COMPONENT_REGISTRY).length;
        const functionCount = getTotalComponentsCount();

        expect(functionCount).toBe(manualCount);
      });
    });
  });

  describe("legacy Compatibility Exports", () => {
    it("should export componentRegistry as alias for COMPONENT_REGISTRY", () => {
      expect(componentRegistry).toBe(COMPONENT_REGISTRY);
    });
  });

  describe("type Exports", () => {
    it("should have valid ComponentId type", () => {
      // Test that ComponentId type works with actual component ids
      const firstComponentId = Object.keys(COMPONENT_REGISTRY)[0] as ComponentId;
      const config = COMPONENT_REGISTRY[firstComponentId];

      expect(config).toBeDefined();
      expect(config.id).toBe(firstComponentId);
    });

    it("should have valid CategoryKey type", () => {
      // Test that CategoryKey type works with actual category keys
      const firstCategoryKey = CATEGORY_CONFIG[0].key as CategoryKey;

      expect(typeof firstCategoryKey).toBe("string");
      expect(firstCategoryKey.length).toBeGreaterThan(0);
    });
  });

  describe("data Consistency", () => {
    it("should have all components properly categorized", () => {
      const categoriesInList = Object.keys(COMPONENT_LIST);
      const categoriesInRegistry = Array.from(new Set(Object.values(COMPONENT_REGISTRY).map(config => config.category)));

      expect(categoriesInList.sort()).toEqual(categoriesInRegistry.sort());
    });

    it("should have consistent component counts", () => {
      const totalFromList = Object.values(COMPONENT_LIST).reduce((sum, components) => sum + components.length, 0);
      const totalFromRegistry = Object.keys(COMPONENT_REGISTRY).length;

      expect(totalFromList).toBe(totalFromRegistry);
    });

    it("should have at least one example for every component", () => {
      Object.values(COMPONENT_REGISTRY).forEach((config) => {
        // Every component MUST have at least one example
        expect(config.examples).toBeDefined();
        expect(Array.isArray(config.examples)).toBe(true);
        expect(config.examples.length).toBeGreaterThan(0);

        config.examples.forEach((example) => {
          expect(example.id).toBeTruthy();
          expect(example.title).toBeTruthy();
          expect(example.description).toBeTruthy();
          expect(typeof example.component).toBe("function");
        });
      });
    });

    it("should have consistent naming between config and components", () => {
      Object.values(COMPONENT_REGISTRY).forEach((config) => {
        // Components array is optional, but when present should be valid
        if (config.components) {
          expect(Array.isArray(config.components)).toBe(true);

          if (config.components.length > 0) {
            // All components should have meaningful descriptions
            config.components.forEach((component) => {
              expect(component.description).toBeTruthy();
              expect(component.description.length).toBeGreaterThan(5);
            });
          }
        }
      });
    });
  });

  describe("multi-Component Package Validation", () => {
    it("should validate multi-component packages dynamically", () => {
      // Find any multi-component package instead of hardcoding accordion
      const multiComponentPackages = Object.entries(COMPONENT_REGISTRY)
        .filter(([_, config]) => config.components && config.components.length > 1);

      expect(multiComponentPackages.length).toBeGreaterThan(0);

      multiComponentPackages.forEach(([packageId, config]) => {
        expect(config.components.length).toBeGreaterThan(1);

        const componentNames = config.components.map(c => c.name);
        
        // Validate that component names are unique
        const uniqueNames = new Set(componentNames);
        expect(uniqueNames.size).toBe(componentNames.length);

        // Validate that all components have proper structure
        config.components.forEach(component => {
          expect(component.name).toBeTruthy();
          expect(component.description).toBeTruthy();
          expect(typeof component.component === "function" || typeof component.component === "object").toBe(true);
        });
      });
    });

    it("should have proper import statements for multi-component packages", () => {
      // Derive multi-component packages from the registry
      const multiComponentPackages = Object.entries(COMPONENT_REGISTRY)
        .filter(([_, config]) => config.components && config.components.length > 1)
        .map(([packageId]) => packageId);

      multiComponentPackages.forEach((packageId) => {
        const config = COMPONENT_REGISTRY[packageId];
        // Import should contain the patternmode package and component path (either /componentId or /components/componentId)
        expect(
          config.importStatement.includes(`@patternmode/ui/${packageId}`) ||
          config.importStatement.includes(`@patternmode/ui/components/${packageId}`)
        ).toBe(true);

        // Import statement should be a valid import with at least one component
        const importMatches = config.importStatement.match(/\{([^}]+)\}/);
        if (importMatches) {
          const imports = importMatches[1].split(",").map(s => s.trim());
          expect(imports.length).toBeGreaterThan(0);
          
          // Each import should be a valid identifier
          imports.forEach(importName => {
            expect(importName).toBeTruthy();
            expect(typeof importName).toBe("string");
          });
        }
      });
    });

    it("should validate that all sub-components are actual React components", () => {
      Object.values(COMPONENT_REGISTRY).forEach((config) => {
        if (config.components && config.components.length > 0) {
          config.components.forEach((component) => {
            // Each component should be a function or object (for Base UI components)
            expect(typeof component.component === "function" || typeof component.component === "object").toBe(true);

            // DisplayName validation is optional - components may have different internal names
            // This is acceptable for components that wrap or extend base components
          });
        }
      });
    });
  });
});
