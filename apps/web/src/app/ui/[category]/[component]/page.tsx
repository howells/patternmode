import { notFound } from "next/navigation";
import React from "react";

import { Separator } from "@patternmode/ui";
import { COMPONENT_LIST, componentRegistry, getComponentConfig } from "@patternmode/ui/components/registry";

import { ComponentExamples } from "../../../../components/component-examples";
import { PageHeader } from "../../../../components/page-header";
import { ComponentPropExplorer } from "../../../../features/prop-explorer/component-prop-explorer";
import { createComponentConfig } from "../../../../lib/config-helpers";

type ComponentPageProps = {
  params: Promise<{
    category: string;
    component: string;
  }>;
};

/**
 * Dynamically loads component configuration for a given component and category.
 */
async function loadComponentConfig(componentId: string, category: string) {
  // First try to get existing config
  const config = getComponentConfig(componentId);

  if (config) {
    return config;
  }

  // Component configs are only in the web app, not the UI package
  // Skip trying to load from @patternmode/ui as it only exports components

  // Create placeholder config if component exists in our list
  const componentList = COMPONENT_LIST[category as keyof typeof COMPONENT_LIST];
  if (componentList?.includes(componentId as never)) {
    const name = componentId
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return createComponentConfig(
      componentId,
      name,
      `${name} component - documentation coming soon.`,
      category as "ui" | "inputs" | "forms" | "charts",
      {
        examples: [
          {
            id: "placeholder",
            title: "Coming Soon",
            description: "Documentation for this component is being prepared.",
            component: () => React.createElement("div", { className: "text-zinc-500" }, `${name} example coming soon`),
          },
        ],
      },
    );
  }

  return null;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { category, component } = await params;

  // Load component configuration
  const config = await loadComponentConfig(component, category);

  // Check if component exists and belongs to the correct category
  if (!config || config.category !== category) {
    notFound();
  }

  // Create a serializable version of the config for the client component
  // Remove non-serializable properties like icon (React components)
  const serializableConfig = {
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

      {/* Main Content - Use ComponentPropExplorer */}
      <ComponentPropExplorer
        config={serializableConfig}
        category={category}
        component={component}
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
  Object.keys(componentRegistry).forEach((componentId) => {
    const config = componentRegistry[componentId];
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
