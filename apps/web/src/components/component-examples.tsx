"use client";

import { Callout } from "@patternmode/callout";
import { Card, CardContent, CardHeader } from "@patternmode/card";
import { Stack, VStack } from "@patternmode/stack";
import { Subheading } from "@patternmode/subheading";
import { Text } from "@patternmode/text";
import React from "react";
import { getComponentConfig } from "@/registry/components";

type ComponentExamplesProps = {
  componentId: string;
};

/**
 * Renders examples for a component by getting them from the component's config object.
 * Uses the config-first architecture where examples are imported in the config file.
 */
export function ComponentExamples({ componentId }: ComponentExamplesProps) {
  const config = getComponentConfig(componentId);

  const renderContent = () => {
    // No config found
    if (!config) {
      return (
        <Stack padding={4}>
          <Callout title="Component not found" variant="error">
            No config found for component {componentId}
          </Callout>
        </Stack>
      );
    }

    // Has examples - render them
    if (
      config.examples &&
      Array.isArray(config.examples) &&
      config.examples.length > 0
    ) {
      return config.examples.map((example) => (
        <Card
          className="max-w-full"
          data-testid={`example-${example.id || example.title}`}
          key={example.id || example.title}
          padding={0}
        >
          <CardHeader border>
            <Subheading level={3}>{example.title}</Subheading>
            <Text>{example.description}</Text>
          </CardHeader>

          <CardContent
            className="flex justify-center"
            data-testid="example-content"
          >
            <example.component />
          </CardContent>
        </Card>
      ));
    }

    // No examples available
    return (
      <Stack padding={4}>
        <Callout variant="neutral">
          No examples available for {config.name || componentId}
        </Callout>
      </Stack>
    );
  };

  return (
    <VStack data-testid="component-examples" padding={6}>
      <Subheading level={2}>Examples</Subheading>
      {renderContent()}
    </VStack>
  );
}
