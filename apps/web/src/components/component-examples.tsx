"use client";

import React from "react";

import type { ComponentExample } from "@patternmode/ui/lib/component-config-types";

import { Callout, Card, CardContent, CardHeader, Loader, Subheading, Text, VStack } from "@patternmode/ui";
import { getComponentConfig } from "@patternmode/ui/component-registry";

type ComponentExamplesProps = {
  componentId: string;
};

/**
 * Renders examples for a component by loading them from the component's examples.tsx file.
 * Supports both the new EXAMPLES export pattern and legacy _EXAMPLES patterns.
 */
export function ComponentExamples({ componentId }: ComponentExamplesProps) {
  const [examples, setExamples] = React.useState<ComponentExample[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const config = getComponentConfig(componentId);

  React.useEffect(() => {
    /**
     * Loads examples from the component's examples.tsx file using dynamic imports.
     */
    async function loadSelfContainedExamples() {
      try {
        setLoading(true);
        setError(null);

        console.log(`ComponentExamples: Loading examples for ${componentId}`);
        const examplesModule = await import(`@patternmode/ui/components/${componentId}/examples`);

        console.log("ComponentExamples: Examples module keys:", Object.keys(examplesModule));

        // First, look for the new standard "EXAMPLES" export
        if (examplesModule.EXAMPLES && Array.isArray(examplesModule.EXAMPLES)) {
          console.log(`ComponentExamples: Found ${examplesModule.EXAMPLES.length} examples in EXAMPLES export`);
          setExamples(examplesModule.EXAMPLES);
        }
        // Fallback: Look for any exported array that ends with "_EXAMPLES" (legacy pattern)
        else {
          const examplesRegistryKey = Object.keys(examplesModule).find(key =>
            key.endsWith("_EXAMPLES") && Array.isArray(examplesModule[key as keyof typeof examplesModule]),
          );

          if (examplesRegistryKey) {
            const examplesRegistry = examplesModule[examplesRegistryKey as keyof typeof examplesModule] as ComponentExample[];
            console.log(`ComponentExamples: Found ${examplesRegistry.length} examples in legacy registry ${examplesRegistryKey}`);
            setExamples(examplesRegistry);
          }
          else {
            console.log("ComponentExamples: No examples registry found");
            setError("No self-contained examples found");
          }
        }
      }
      catch (err) {
        console.error("ComponentExamples: Error loading self-contained examples:", err);
        setError(`Failed to load examples: ${(err as Error).message}`);
      }
      finally {
        setLoading(false);
      }
    }

    loadSelfContainedExamples();
  }, [componentId]);

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
