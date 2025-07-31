"use client";

import { Card, CardContent, CardHeader, CodeBlock, Divider, Subheading, Tabs, TabsContent, TabsList, TabsTrigger, Text, VStack } from "@patternmode/ui";
import React from "react";
import { getComponentConfig } from "../../../../packages/ui/src/component-registry";
import { ComponentExampleRenderer } from "./component-example-renderer";

interface ComponentExamplesProps {
  componentId: string;
}

interface ExampleWithMetadata {
  id?: string; // Optional, auto-generated from component name
  title: string;
  description: string;
  component: React.ComponentType;
}

export function ComponentExamples({ componentId }: ComponentExamplesProps) {
  const [examples, setExamples] = React.useState<ExampleWithMetadata[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const config = getComponentConfig(componentId);

  React.useEffect(() => {
    async function loadSelfContainedExamples() {
      try {
        setLoading(true);
        setError(null);

        console.log(`ComponentExamples: Loading examples for ${componentId}`);
        const examplesModule = await import(`@patternmode/ui/components/${componentId}/examples`);

        console.log('ComponentExamples: Examples module keys:', Object.keys(examplesModule));

        // Look for any exported array that ends with "_EXAMPLES"
        const examplesRegistryKey = Object.keys(examplesModule).find(key =>
          key.endsWith('_EXAMPLES') && Array.isArray(examplesModule[key as keyof typeof examplesModule])
        );

        if (examplesRegistryKey) {
          const examplesRegistry = examplesModule[examplesRegistryKey as keyof typeof examplesModule] as ExampleWithMetadata[];
          console.log(`ComponentExamples: Found ${examplesRegistry.length} examples in registry`);
          setExamples(examplesRegistry);
        } else {
          console.log('ComponentExamples: No examples registry found');
          setError("No self-contained examples found");
        }
      } catch (err) {
        console.error("ComponentExamples: Error loading self-contained examples:", err);
        setError(`Failed to load examples: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    }

    loadSelfContainedExamples();
  }, [componentId]);

  // Show loading state
  if (loading) {
    return (
      <VStack className="p-6" data-testid="component-examples">
        <Subheading level={2}>Examples</Subheading>
        <div className="text-zinc-500">Loading examples...</div>
      </VStack>
    );
  }

  // If we have self-contained examples, render them in cards
  if (examples.length > 0) {
    return (
      <VStack className="p-6" data-testid="component-examples">
        <Subheading level={2}>Examples</Subheading>
        {examples.map((example) => (
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
        ))}
      </VStack>
    );
  }

  // Fallback to config-based examples if available
  if (config?.examples && config.examples.length > 0) {
    return (
      <VStack className="p-6" data-testid="component-examples">
        <Subheading level={2}>Examples</Subheading>
        {config.examples.map((example) => (
          <Card key={example.id || example.title} padding={0} data-testid={`example-${example.id || example.title}`}>
            <CardHeader border>
              <Subheading level={3}>{example.title}</Subheading>
              <Text>{example.description}</Text>
            </CardHeader>

            <CardContent data-testid="example-content">
              <ComponentExampleRenderer
                componentId={componentId}
                exampleId={example.id}
              />
            </CardContent>
          </Card>
        ))}
      </VStack>
    );
  }

  // Show error or no examples message
  return (
    <VStack className="p-6" data-testid="component-examples">
      <Subheading level={2}>Examples</Subheading>
      <div className="text-zinc-500 p-4">
        {error ? (
          <div>
            <p>Unable to load examples for {config?.name || componentId}</p>
            <p className="text-xs mt-1 text-zinc-400">{error}</p>
          </div>
        ) : (
          <p>No examples available for {config?.name || componentId}</p>
        )}
      </div>
    </VStack>
  );
}
