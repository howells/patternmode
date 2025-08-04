"use client";

import React from "react";

import {
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
      <Stack>
        {/* Tabs aligned to left with padding instead of absolute positioning */}
        <div className="flex justify-start">
          <TabsList variant="solid">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" data-testid="component-preview">
          <Stack data-testid="preview-container">
            {previewContent}
          </Stack>
        </TabsContent>

        <TabsContent value="code">
          <Stack>
            <CodeBlock language="tsx">
              {codeContent}
            </CodeBlock>
          </Stack>
        </TabsContent>
      </Stack>
    </Tabs>
  );
};
