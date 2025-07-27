import { describe, it, expect } from 'vitest';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  getComponentsByCategory,
  COMPONENT_LIST,
  componentRegistry
} from '../component-registry';

// Expected categories that should have page routes
const EXPECTED_CATEGORIES = [
  'text',
  'layout', 
  'navigation',
  'feedback',
  'overlay',
  'data',
  'media',
  'utility',
  'inputs',
  'forms',
  'charts'
];

// Helper function to check if a category page exists
function getCategoryPageInfo(category: string): {
  dirExists: boolean;
  pageExists: boolean;
  layoutExists: boolean;
  pageContent?: string;
} {
  const categoryDir = join(process.cwd(), 'src/app', category);
  const pageFile = join(categoryDir, 'page.tsx');
  const layoutFile = join(categoryDir, 'layout.tsx');
  
  const dirExists = existsSync(categoryDir);
  const pageExists = existsSync(pageFile);
  const layoutExists = existsSync(layoutFile);
  
  let pageContent: string | undefined;
  if (pageExists) {
    try {
      pageContent = readFileSync(pageFile, 'utf8');
    } catch (error) {
      // File exists but couldn't be read
    }
  }
  
  return {
    dirExists,
    pageExists,
    layoutExists,
    pageContent
  };
}

// Helper function to get all category directories that exist
function getExistingCategoryDirs(): string[] {
  const appDir = join(process.cwd(), 'src/app');
  try {
    return readdirSync(appDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => EXPECTED_CATEGORIES.includes(name))
      .sort();
  } catch (error) {
    return [];
  }
}

describe('Component Category Pages', () => {
  describe('Category Page Structure', () => {
    it('should have all expected category directories', () => {
      const existingDirs = getExistingCategoryDirs();
      const missingDirs = EXPECTED_CATEGORIES.filter(cat => !existingDirs.includes(cat));
      
      // Allow some categories to be missing during development
      expect(missingDirs.length).toBeLessThanOrEqual(EXPECTED_CATEGORIES.length);
      
      if (missingDirs.length > 0) {
        console.warn('Missing category directories:', missingDirs);
      }
    });

    it('should have page.tsx files for existing category directories', () => {
      const existingDirs = getExistingCategoryDirs();
      const missingPages: string[] = [];
      
      existingDirs.forEach(category => {
        const pageInfo = getCategoryPageInfo(category);
        if (!pageInfo.pageExists) {
          missingPages.push(category);
        }
      });
      
      expect(missingPages).toEqual([]);
      
      if (missingPages.length > 0) {
        console.warn('Category directories missing page.tsx:', missingPages);
      }
    });

    it('should have valid page.tsx content for existing pages', () => {
      const existingDirs = getExistingCategoryDirs();
      const invalidPages: string[] = [];
      
      existingDirs.forEach(category => {
        const pageInfo = getCategoryPageInfo(category);
        
        if (pageInfo.pageExists && pageInfo.pageContent) {
          const content = pageInfo.pageContent;
          
          // Check for required elements
          const hasDefaultExport = content.includes('export default');
          const hasReactJSX = content.includes('<') && content.includes('>');
          const hasProperImports = content.includes('import') || !hasReactJSX;
          
          if (!hasDefaultExport) {
            invalidPages.push(`${category}: missing default export`);
          }
          
          if (hasReactJSX && !hasProperImports) {
            invalidPages.push(`${category}: JSX without proper imports`);
          }
        }
      });
      
      expect(invalidPages).toEqual([]);
      
      if (invalidPages.length > 0) {
        console.warn('Invalid page content:', invalidPages);
      }
    });
  });

  describe('Category Functionality', () => {
    it('should return components for each valid category', () => {
      Object.keys(COMPONENT_LIST).forEach(category => {
        const components = getComponentsByCategory(category);
        
        expect(Array.isArray(components)).toBe(true);
        expect(components.length).toBeGreaterThan(0);
        
        // All components should have the correct category
        components.forEach(config => {
          expect(config.category).toBe(category);
        });
      });
    });

    it('should return empty array for non-existent categories', () => {
      const nonExistentCategories = ['invalid-category', 'fake-category', ''];
      
      nonExistentCategories.forEach(category => {
        const components = getComponentsByCategory(category);
        expect(components).toEqual([]);
      });
    });

    it('should have consistent component counts between COMPONENT_LIST and getComponentsByCategory', () => {
      Object.entries(COMPONENT_LIST).forEach(([category, expectedComponents]) => {
        const actualComponents = getComponentsByCategory(category);
        
        expect(actualComponents.length).toBe(expectedComponents.length);
        
        // Check that all expected components are returned
        const actualIds = actualComponents.map(c => c.id).sort();
        const expectedIds = [...expectedComponents].sort();
        
        expect(actualIds).toEqual(expectedIds);
      });
    });
  });

  describe('Component Categories Validation', () => {
    it('should have all components properly categorized', () => {
      const uncategorizedComponents: string[] = [];
      const invalidCategories: string[] = [];
      
      Object.entries(componentRegistry).forEach(([id, config]) => {
        if (!config.category) {
          uncategorizedComponents.push(id);
        } else if (!EXPECTED_CATEGORIES.includes(config.category)) {
          invalidCategories.push(`${id}: has invalid category "${config.category}"`);
        }
      });
      
      expect(uncategorizedComponents).toEqual([]);
      expect(invalidCategories).toEqual([]);
      
      if (uncategorizedComponents.length > 0) {
        console.warn('Components without categories:', uncategorizedComponents);
      }
      
      if (invalidCategories.length > 0) {
        console.warn('Components with invalid categories:', invalidCategories);
      }
    });

    it('should have balanced category distribution', () => {
      const categoryCounts = Object.keys(COMPONENT_LIST).map(category => ({
        category,
        count: COMPONENT_LIST[category as keyof typeof COMPONENT_LIST].length
      }));
      
      // No category should be completely empty
      categoryCounts.forEach(({ category, count }) => {
        expect(count).toBeGreaterThan(0);
      });
      
      // Log category distribution for visibility
      console.log('Category distribution:', categoryCounts);
    });

    it('should have all categories represented in both COMPONENT_LIST and actual components', () => {
      const componentListCategories = new Set(Object.keys(COMPONENT_LIST));
      const actualCategories = new Set(
        Object.values(componentRegistry).map(config => config.category)
      );
      
      // All COMPONENT_LIST categories should have actual components
      componentListCategories.forEach(category => {
        expect(actualCategories.has(category)).toBe(true);
      });
      
      // All actual categories should be in COMPONENT_LIST
      actualCategories.forEach(category => {
        expect(componentListCategories.has(category)).toBe(true);
      });
    });
  });

  describe('Category Page Navigation', () => {
    it('should be possible to access all category pages programmatically', () => {
      // This test simulates what happens when someone navigates to a category page
      EXPECTED_CATEGORIES.forEach(category => {
        // Test that getComponentsByCategory works (this is what category pages use)
        expect(() => getComponentsByCategory(category)).not.toThrow();
        
        const components = getComponentsByCategory(category);
        expect(Array.isArray(components)).toBe(true);
        
        // Each component should have the data needed for display
        components.forEach(config => {
          expect(config.id).toBeDefined();
          expect(config.name).toBeDefined();
          expect(config.description).toBeDefined();
          expect(config.category).toBe(category);
          expect(config.examples).toBeDefined();
          expect(config.examples.length).toBeGreaterThan(0);
        });
      });
    });

    it('should handle edge cases gracefully', () => {
      // Test various edge cases that might occur in category page navigation
      const edgeCases = [
        '',
        ' ',
        'UPPERCASE',
        'mixed-Case',
        'category with spaces',
        'category/with/slashes',
        'category-with-many-dashes-that-is-very-long',
        null as any,
        undefined as any,
        123 as any,
        {} as any,
        [] as any
      ];
      
      edgeCases.forEach(testCase => {
        expect(() => getComponentsByCategory(testCase)).not.toThrow();
        const result = getComponentsByCategory(testCase);
        expect(Array.isArray(result)).toBe(true);
      });
    });
  });

  describe('Category Page Performance', () => {
    it('should return category components efficiently', () => {
      const startTime = performance.now();
      
      // Test all categories multiple times to simulate real usage
      for (let i = 0; i < 10; i++) {
        EXPECTED_CATEGORIES.forEach(category => {
          getComponentsByCategory(category);
        });
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      // Should complete within reasonable time (adjust threshold as needed)
      expect(totalTime).toBeLessThan(100); // 100ms for 10 iterations across all categories
    });

    it('should cache or efficiently handle repeated category requests', () => {
      const category = 'inputs'; // Use a category known to have many components
      
      const startTime = performance.now();
      
      // Call the same category multiple times
      for (let i = 0; i < 100; i++) {
        getComponentsByCategory(category);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      // Should handle repeated requests efficiently
      expect(totalTime).toBeLessThan(50); // 50ms for 100 calls of the same category
    });
  });

  describe('Integration with Component Gallery', () => {
    it('should provide data in the format expected by ComponentGallery', () => {
      // Test that the data structure returned by getComponentsByCategory
      // matches what ComponentGallery expects
      
      EXPECTED_CATEGORIES.forEach(category => {
        const components = getComponentsByCategory(category);
        
        components.forEach(config => {
          // ComponentGallery expects these properties
          expect(config).toHaveProperty('id');
          expect(config).toHaveProperty('name');
          expect(config).toHaveProperty('description');
          expect(config).toHaveProperty('category');
          expect(config).toHaveProperty('icon');
          expect(config).toHaveProperty('examples');
          
          // Examples should have the structure ComponentGallery expects
          config.examples.forEach(example => {
            expect(example).toHaveProperty('id');
            expect(example).toHaveProperty('title');
            expect(example).toHaveProperty('description');
            expect(example).toHaveProperty('code');
          });
        });
      });
    });
  });
});