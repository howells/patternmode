"use client";

import React from "react";

import type { ComponentExample } from "@patternmode/ui/lib/component-config-types";

import { Callout, Card, CardContent, CardHeader, Loader, Subheading, Text, VStack } from "@patternmode/ui";
import { getComponentConfig } from "@patternmode/ui/components/registry";

type ComponentExamplesProps = {
  componentId: string;
};

/**
 * Renders examples for a component by getting them from the component's config object.
 * Uses the config-first architecture where examples are imported in the config file.
 */
export function ComponentExamples({ componentId }: ComponentExamplesProps) {
  const [examples, setExamples] = React.useState<ComponentExample[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const config = getComponentConfig(componentId);

  React.useEffect(() => {
    /**
     * Loads examples from the component config object.
     */
    async function loadExamplesFromConfig() {
      try {
        setLoading(true);
        setError(null);

        console.log(`ComponentExamples: Loading examples for ${componentId} from config`);

        if (!config) {
          setError(`No config found for component ${componentId}`);
          return;
        }

        if (config.examples && Array.isArray(config.examples) && config.examples.length > 0) {
          console.log(`ComponentExamples: Found ${config.examples.length} examples in config`);
          setExamples(config.examples);
        }
        else {
          console.log("ComponentExamples: No examples found in config");
          setError("No examples found in config");
        }
      }
      catch (err) {
        console.error("ComponentExamples: Error loading examples from config:", err);
        setError(`Failed to load examples: ${(err as Error).message}`);
      }
      finally {
        setLoading(false);
      }
    }

    loadExamplesFromConfig();
  }, [componentId, config]);

  const renderContent = () => {
    // Show loading state
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8 text-zinc-500">
          <Loader size="sm" label="Loading examples..." />
        </div>
      );
    }

    // If we have self-contained examples, render them directly
    if (examples.length > 0) {
      return examples.map(example => (
        <Card key={example.id || example.title} padding={0} data-testid={`example-${example.id || example.title}`}>
          <CardHeader border>
            <Subheading level={3}>{example.title}</Subheading>
            <Text>{example.description}</Text>
          </CardHeader>

          <CardContent data-testid="example-content">
            <div className="flex justify-center">
              <example.component />
            </div>
          </CardContent>
        </Card>
      ));
    }

    // Show error or no examples message
    return (
      <div className="p-4">
        {error
          ? (
              <Callout variant="error" title="Failed to load examples">
                Unable to load examples for
                {" "}
                {config?.name || componentId}
                :
                {" "}
                {error}
              </Callout>
            )
          : (
              <Callout variant="neutral">
                No examples available for
                {" "}
                {config?.name || componentId}
              </Callout>
            )}
      </div>
    );
  };

  return (
    <VStack data-testid="component-examples" padding={6}>
      <Subheading level={2}>Examples</Subheading>
      {renderContent()}
    </VStack>
  );
}
