import { COMPONENT_REGISTRY, getComponentConfig } from "@/registry/components";
import { Separator } from "@patternmode/separator";
import { notFound } from "next/navigation";
import React from "react";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";
export const dynamic = "force-dynamic";

type ComponentPageProps = {
  params: Promise<{
    category: string;
    component: string;
  }>;
};

/**
 * Loads component configuration from the registry.
 */
async function loadComponentConfig(componentId: string, category: string) {
  const config = getComponentConfig(componentId);

  // Verify component exists and belongs to the correct category
  if (!config || config.category !== category) {
    return null;
  }

  return config;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { category, component } = await params;

  // Load component configuration
  const config = await loadComponentConfig(component, category);

  if (!config) {
    notFound();
  }

  // Create a serializable version of the config for the client component
  // Remove non-serializable properties like icon (React components)
  const _serializableConfig = {
    ...config,
    icon: undefined, // Remove icon to avoid serialization issues
    components: config.components?.map(comp => ({
      ...comp,
      component: undefined, // Remove component references
    })),
    examples: config.examples?.map(example => ({
      ...example,
      component: undefined, // Remove component functions
    })),
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title={config.name}
        description={config.description}
        badge={config.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId={component as any}
        componentName={config.name}
        category={category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId={component} />
    </div>
  );
}

// Generate static paths for all components (optional for performance)
export async function generateStaticParams() {
  const paths: { category: string; component: string }[] = [];

  // Generate paths for all components in each category
  const COMPONENT_LIST: Record<string, string[]> = {};
  Object.keys(COMPONENT_REGISTRY).forEach((componentId) => {
    const config = COMPONENT_REGISTRY[componentId as keyof typeof COMPONENT_REGISTRY];
    const category = config.category || "ui";
    if (!COMPONENT_LIST[category]) {
      COMPONENT_LIST[category] = [];
    }
    COMPONENT_LIST[category].push(componentId);
  });

  Object.entries(COMPONENT_LIST).forEach(([category, components]) => {
    components.forEach((component) => {
      paths.push({ category, component });
    });
  });

  return paths;
}
