import { describe, expect, it } from 'vitest';
import { COMPONENT_LIST } from '../../../../packages/ui/src/component-registry';

describe('Component Registry', () => {
  it('should have component categories defined', () => {
    expect(COMPONENT_LIST).toBeDefined();
    expect(typeof COMPONENT_LIST).toBe('object');
  });

  it('should have at least one component category', () => {
    const categories = Object.keys(COMPONENT_LIST);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should have components in each category', () => {
    Object.entries(COMPONENT_LIST).forEach(([category, components]) => {
      expect(Array.isArray(components)).toBe(true);
      expect(components.length).toBeGreaterThan(0);

      // Each component should be a string
      components.forEach(component => {
        expect(typeof component).toBe('string');
        expect(component.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have expected categories', () => {
    const categories = Object.keys(COMPONENT_LIST);
    const expectedCategories = ['inputs', 'layout', 'navigation'];

    expectedCategories.forEach(expectedCategory => {
      expect(categories).toContain(expectedCategory);
    });
  });
});