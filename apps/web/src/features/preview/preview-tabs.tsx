"use client";

import React from "react";

import {
  Button,
  CodeBlock,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui";

type PreviewTabsProps = {
  previewContent: React.ReactNode;
  codeContent: string;
};

/**
 * Component that provides tabbed interface for preview and code views
 */
export const PreviewTabs: React.FC<PreviewTabsProps> = ({
  previewContent,
  codeContent,
}) => {
  return (
    <Tabs defaultValue="preview">
      <Stack gap={6}>
        {/* Tabs aligned to left with padding instead of absolute positioning */}
        <div className="flex justify-start">
          <TabsList variant="solid">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <Button>Test</Button>
        </div>

        <TabsContent value="preview" data-testid="component-preview">
          {previewContent}
        </TabsContent>

        <TabsContent value="code">
          <CodeBlock language="tsx">
            {codeContent}
          </CodeBlock>
        </TabsContent>
      </Stack>
    </Tabs>
  );
};
