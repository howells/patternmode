"use client";

import { Card, CardContent, CardHeader, CodeBlock, Divider, Subheading, Tabs, TabsContent, TabsList, TabsTrigger, Text, VStack } from "@patternmode/ui";
import React from "react";
import { getComponentConfig } from "../../../../packages/ui/src/component-registry";
import { ComponentExampleRenderer } from "./component-example-renderer";

interface ComponentExamplesProps {
  componentId: string;
}

export function ComponentExamples({ componentId }: ComponentExamplesProps) {
  const config = getComponentConfig(componentId);

  if (!config) {
    return (
      <div className="text-red-500 p-4">
        No configuration found for component: {componentId}
      </div>
    );
  }

  if (!config.examples || config.examples.length === 0) {
    return (
      <div className="text-zinc-500 p-4">
        No examples available for {config.name}
      </div>
    );
  }

  return (
    <VStack className="p-6" data-testid="component-examples">
      <Subheading level={2}>Examples</Subheading>
      {config.examples.map((example, index) => (
        <Card key={example.id} padding={0} data-testid={`example-${example.id}`}>
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
