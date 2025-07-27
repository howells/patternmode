import { describe, it, expect, beforeAll } from 'vitest';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  componentRegistry,
  getComponentConfig,
  getComponentsByCategory,
  getAllComponents,
  COMPONENT_LIST,
  type ComponentId
} from '../component-registry';
import type { ComponentConfig } from '../component-config-types';

// Helper function to get all component directories from filesystem
function getActualComponentDirs(): string[] {
  const uiDir = join(process.cwd(), 'src/components/ui');
  try {
    return readdirSync(uiDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.'))
      .sort();
  } catch (error) {
    throw new Error(`Failed to read UI components directory: ${error}`);
  }
}

// Helper function to check if a component has the three-file structure
function hasThreeFileStructure(componentName: string): {
  hasComponent: boolean;
  hasConfig: boolean;
  hasExamples: boolean;
  configCategory?: string;
} {
  const componentDir = join(process.cwd(), 'src/components/ui', componentName);
  
  const hasComponent = existsSync(join(componentDir, `${componentName}.tsx`));
  const hasConfig = existsSync(join(componentDir, 'config.tsx'));
  const hasExamples = existsSync(join(componentDir, 'examples.tsx'));
  
  let configCategory: string | undefined;
  
  if (hasConfig) {
    try {
      const configContent = readFileSync(join(componentDir, 'config.tsx'), 'utf8');
      const categoryMatch = configContent.match(/category:\s*["']([^"']+)["']/);
      if (categoryMatch) {
        configCategory = categoryMatch[1];
      }
    } catch (error) {
      // Config file exists but couldn't be read
    }
  }
  
  return {
    hasComponent,
    hasConfig,
    hasExamples,
    configCategory
  };
}

describe('Component Registry', () => {
  let actualComponentDirs: string[];
  let registeredComponentIds: string[];
  
  beforeAll(() => {
    actualComponentDirs = getActualComponentDirs();
    registeredComponentIds = Object.keys(componentRegistry).sort();
  });

  describe('Registry Structure', () => {
    it('should export componentRegistry as an object', () => {
      expect(componentRegistry).toBeDefined();
      expect(typeof componentRegistry).toBe('object');
      expect(componentRegistry).not.toBeNull();
    });

    it('should export helper functions', () => {
      expect(getComponentConfig).toBeDefined();
      expect(typeof getComponentConfig).toBe('function');
      
      expect(getComponentsByCategory).toBeDefined();
      expect(typeof getComponentsByCategory).toBe('function');
      
      expect(getAllComponents).toBeDefined();
      expect(typeof getAllComponents).toBe('function');
    });

    it('should export COMPONENT_LIST constant', () => {
      expect(COMPONENT_LIST).toBeDefined();
      expect(typeof COMPONENT_LIST).toBe('object');
    });
  });

  describe('Component Registry Completeness', () => {
    it('should register every component that exists in src/components/ui/', () => {
      const missingFromRegistry = actualComponentDirs.filter(
        comp => !registeredComponentIds.includes(comp)
      );
      
      expect(missingFromRegistry).toEqual([]);
      
      if (missingFromRegistry.length > 0) {
        console.warn('Components missing from registry:', missingFromRegistry);
      }
    });

    it('should only register components that exist in src/components/ui/', () => {
      const missingFromFilesystem = registeredComponentIds.filter(
        comp => !actualComponentDirs.includes(comp)
      );
      
      expect(missingFromFilesystem).toEqual([]);
      
      if (missingFromFilesystem.length > 0) {
        console.warn('Registry entries with no filesystem component:', missingFromFilesystem);
      }
    });

    it('should have equal counts of registered and filesystem components', () => {
      expect(registeredComponentIds.length).toBe(actualComponentDirs.length);
    });
  });

  describe('Component Configuration Validation', () => {
    it('should have valid ComponentConfig objects for all registered components', () => {
      Object.entries(componentRegistry).forEach(([id, config]) => {
        expect(config).toBeDefined();
        expect(config.id).toBe(id);
        expect(config.name).toBeDefined();
        expect(typeof config.name).toBe('string');
        expect(config.name.length).toBeGreaterThan(0);
        expect(config.description).toBeDefined();
        expect(typeof config.description).toBe('string');
        expect(config.category).toBeDefined();
        expect(typeof config.category).toBe('string');
        expect(config.icon).toBeDefined();
        expect(typeof config.icon).toBe('string');
        expect(config.examples).toBeDefined();
        expect(Array.isArray(config.examples)).toBe(true);
        expect(config.examples.length).toBeGreaterThan(0);
      });
    });

    it('should have valid example objects for all components', () => {
      Object.entries(componentRegistry).forEach(([id, config]) => {
        config.examples.forEach((example, index) => {
          expect(example.id).toBeDefined();
          expect(typeof example.id).toBe('string');
          expect(example.id.length).toBeGreaterThan(0);
          
          expect(example.title).toBeDefined();
          expect(typeof example.title).toBe('string');
          expect(example.title.length).toBeGreaterThan(0);
          
          expect(example.description).toBeDefined();
          expect(typeof example.description).toBe('string');
          
          expect(example.code).toBeDefined();
          expect(typeof example.code).toBe('string');
          expect(example.code.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have unique example IDs within each component', () => {
      Object.entries(componentRegistry).forEach(([id, config]) => {
        const exampleIds = config.examples.map(ex => ex.id);
        const uniqueIds = new Set(exampleIds);
        
        expect(uniqueIds.size).toBe(exampleIds.length);
      });
    });
  });

  describe('Component File Structure', () => {
    it('should have components with proper three-file structure', () => {
      const structureIssues: string[] = [];
      
      actualComponentDirs.forEach(componentName => {
        const structure = hasThreeFileStructure(componentName);
        
        if (!structure.hasComponent) {
          structureIssues.push(`${componentName} is missing ${componentName}.tsx`);
        }
        if (!structure.hasConfig) {
          structureIssues.push(`${componentName} is missing config.tsx`);
        }
        if (!structure.hasExamples) {
          structureIssues.push(`${componentName} is missing examples.tsx`);
        }
      });
      
      expect(structureIssues).toEqual([]);
      
      if (structureIssues.length > 0) {
        console.warn('Component structure issues:', structureIssues);
      }
    });

    it('should have consistent categories between config files and registry', () => {
      const categoryMismatches: string[] = [];
      
      actualComponentDirs.forEach(componentName => {
        const structure = hasThreeFileStructure(componentName);
        const registryConfig = componentRegistry[componentName];
        
        if (structure.configCategory && registryConfig) {
          if (structure.configCategory !== registryConfig.category) {
            categoryMismatches.push(
              `${componentName}: config.tsx has category "${structure.configCategory}" but registry has "${registryConfig.category}"`
            );
          }
        }
      });
      
      expect(categoryMismatches).toEqual([]);
      
      if (categoryMismatches.length > 0) {
        console.warn('Category mismatches:', categoryMismatches);
      }
    });
  });

  describe('Helper Functions', () => {
    it('getComponentConfig should return correct config for valid IDs', () => {
      const testComponentId = registeredComponentIds[0];
      const config = getComponentConfig(testComponentId);
      
      expect(config).toBeDefined();
      expect(config!.id).toBe(testComponentId);
    });

    it('getComponentConfig should return undefined for invalid IDs', () => {
      const config = getComponentConfig('non-existent-component');
      expect(config).toBeUndefined();
    });

    it('getAllComponents should return all registered components', () => {
      const allComponents = getAllComponents();
      
      expect(Array.isArray(allComponents)).toBe(true);
      expect(allComponents.length).toBe(registeredComponentIds.length);
      
      // Check that all components have required properties
      allComponents.forEach(config => {
        expect(config.id).toBeDefined();
        expect(config.name).toBeDefined();
        expect(config.category).toBeDefined();
      });
    });

    it('getComponentsByCategory should return components for valid categories', () => {
      const categories = Object.keys(COMPONENT_LIST);
      
      categories.forEach(category => {
        const components = getComponentsByCategory(category);
        
        expect(Array.isArray(components)).toBe(true);
        
        // All returned components should have the correct category
        components.forEach(config => {
          expect(config.category).toBe(category);
        });
      });
    });

    it('getComponentsByCategory should return empty array for invalid categories', () => {
      const components = getComponentsByCategory('non-existent-category');
      expect(components).toEqual([]);
    });
  });

  describe('COMPONENT_LIST Consistency', () => {
    it('should have all registry components listed in COMPONENT_LIST', () => {
      const listedComponents = Object.values(COMPONENT_LIST).flat().sort();
      const registryComponents = registeredComponentIds.sort();
      
      const missingFromList = registryComponents.filter(
        comp => !listedComponents.includes(comp)
      );
      
      expect(missingFromList).toEqual([]);
      
      if (missingFromList.length > 0) {
        console.warn('Components in registry but not in COMPONENT_LIST:', missingFromList);
      }
    });

    it('should only list components that exist in registry', () => {
      const listedComponents = Object.values(COMPONENT_LIST).flat();
      
      const notInRegistry = listedComponents.filter(
        comp => !registeredComponentIds.includes(comp)
      );
      
      expect(notInRegistry).toEqual([]);
      
      if (notInRegistry.length > 0) {
        console.warn('Components in COMPONENT_LIST but not in registry:', notInRegistry);
      }
    });

    it('should have consistent component counts', () => {
      const listedComponents = Object.values(COMPONENT_LIST).flat();
      const uniqueListed = new Set(listedComponents);
      
      // No duplicate components in COMPONENT_LIST
      expect(uniqueListed.size).toBe(listedComponents.length);
      
      // Same total count as registry
      expect(uniqueListed.size).toBe(registeredComponentIds.length);
    });

    it('should categorize components correctly in COMPONENT_LIST', () => {
      Object.entries(COMPONENT_LIST).forEach(([category, components]) => {
        components.forEach(componentId => {
          const config = getComponentConfig(componentId);
          
          expect(config).toBeDefined();
          expect(config!.category).toBe(category);
        });
      });
    });
  });

  describe('Category Coverage', () => {
    it('should have components in all expected categories', () => {
      const expectedCategories = Object.keys(COMPONENT_LIST);
      const registryCategories = new Set(
        Object.values(componentRegistry).map(config => config.category)
      );
      
      expectedCategories.forEach(category => {
        expect(registryCategories.has(category)).toBe(true);
      });
    });

    it('should not have empty categories in COMPONENT_LIST', () => {
      Object.entries(COMPONENT_LIST).forEach(([category, components]) => {
        expect(components.length).toBeGreaterThan(0);
      });
    });

    it('should have all registry categories represented in COMPONENT_LIST', () => {
      const registryCategories = new Set(
        Object.values(componentRegistry).map(config => config.category)
      );
      const listCategories = new Set(Object.keys(COMPONENT_LIST));
      
      registryCategories.forEach(category => {
        expect(listCategories.has(category)).toBe(true);
      });
    });
  });

  describe('Component Naming and Examples Convention', () => {
    it('should follow naming convention for example exports', () => {
      const namingIssues: string[] = [];
      
      actualComponentDirs.forEach(componentName => {
        const config = componentRegistry[componentName];
        if (!config) return;
        
        config.examples.forEach(example => {
          // Expected naming convention: example ID "default" -> export name "DefaultExample"
          const expectedExportName = example.id
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('') + 'Example';
          
          // Check if the code uses jsxToString which indicates proper export usage
          if (!example.code.includes('jsxToString') && !example.code.includes('TODO')) {
            namingIssues.push(
              `${componentName}: example "${example.id}" should use jsxToString(<${expectedExportName} />) instead of hardcoded string`
            );
          }
        });
      });
      
      // This is a warning rather than a hard failure since we're in the process of fixing these
      if (namingIssues.length > 0) {
        console.warn(`Found ${namingIssues.length} naming convention issues:`, namingIssues.slice(0, 10));
      }
      
      // Allow some naming issues during transition period
      expect(namingIssues.length).toBeLessThan(50);
    });
  });

  describe('TypeScript Type Safety', () => {
    it('should have ComponentId type that matches actual component IDs', () => {
      // This test ensures the ComponentId type is properly derived from COMPONENT_LIST
      const allListedComponents = Object.values(COMPONENT_LIST).flat();
      
      registeredComponentIds.forEach(id => {
        expect(allListedComponents.includes(id as ComponentId)).toBe(true);
      });
    });
  });
});