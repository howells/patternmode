"use client";

import { Heading } from "@patternmode/heading";
import { VStack } from "@patternmode/stack";
import { Text } from "@patternmode/text";
import { PreviewProvider } from "@/features/preview/preview-context";
import { PreviewControls } from "@/features/preview/preview-controls";
import { PreviewDisplay } from "@/features/preview/preview-render";
import { getComponentConfig, getPreviewProps } from "@/registry/components";

export default function ComboboxPage() {
  const config = getComponentConfig("combobox");
  const previewProps = getPreviewProps("combobox");

  // Transform preview props to the format expected by PreviewControls
  const previewConfig = {
    componentName: config?.name || "Combobox",
    props: previewProps.reduce(
      (acc, prop) => {
        acc[prop.name as string] = prop;
        return acc;
      },
      {} as Record<string, any>
    ),
  };

  return (
    <div className="min-h-screen bg-white p-8 dark:bg-zinc-950">
      <VStack className="mx-auto max-w-4xl" gap={8}>
        <VStack as="header" gap={2}>
          <Heading level={1}>Combobox</Heading>
          <Text size="base">
            Searchable select component with single and multi-select support.
          </Text>
        </VStack>

        <PreviewProvider
          defaultProps={{
            dataType: "frameworks",
            placeholder: "Select a framework...",
            size: "base",
          }}
        >
          <VStack gap={4}>
            <Text size="sm">
              Interactive combobox preview with configurable props.
            </Text>
            <PreviewDisplay componentId="combobox" />
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Props Explorer</Heading>
            <Text size="sm">
              Available configuration options for the Combobox component.
            </Text>

            <PreviewControls config={previewConfig} />
          </VStack>
        </PreviewProvider>
      </VStack>
    </div>
  );
}
