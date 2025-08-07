import { componentRegistry } from "@patternmode/ui/components/registry";

export function getComponentConfig(componentId: string) {
  return componentRegistry[componentId];
}

export function getAllComponentConfigs() {
  return Object.values(componentRegistry);
}

export function getComponentsByCategory(category: string) {
  return Object.values(componentRegistry).filter(
    config => config.category === category,
  );
}

export function createComponentConfig(
  id: string,
  name: string,
  description: string,
  category: string,
  options: {
    examples?: Array<{
      id: string;
      title: string;
      description: string;
      code?: string;
      preview?: React.ReactNode;
      component?: React.ComponentType;
    }>;
  } = {},
) {
  return {
    id,
    name,
    description,
    category,
    examples: options.examples || [],
    components: [],
    badge: undefined,
  };
}