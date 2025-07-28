"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card/card";
import { CodeBlock } from "@/components/ui/code-block/code-block";
import { Divider } from "@/components/ui/divider/divider";
import { VStack } from "@/components/ui/stack";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { getComponentConfig } from "@/lib/component-registry";
import React from "react";
import { ComponentExampleRenderer } from "./component-example-renderer";
import { Subheading } from "./ui/subheading/subheading";
import { Text } from "./ui/text";

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
