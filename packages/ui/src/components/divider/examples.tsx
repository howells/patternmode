import { Divider } from "@patternmode/ui";
import React from "react";

// Default divider
export const /**
              *
              */
  DefaultExample = () => (
    <Divider />
  );

// With text
export const /**
              *
              */
  WithTextExample = () => (
    <Divider>or</Divider>
  );

// Vertical divider
export const /**
              *
              */
  VerticalExample = () => (
    <div className="flex items-center h-8">
      <span>Left content</span>
      <Divider orientation="vertical" />
      <span>Right content</span>
    </div>
  );

// Different spacing
export const /**
              *
              */
  SpacingExample = () => (
    <div>
      <div>Content</div>
      <Divider spacing="sm">Small spacing</Divider>
      <div>Content</div>
      <Divider spacing="md">Medium spacing</Divider>
      <div>Content</div>
      <Divider spacing="lg">Large spacing</Divider>
      <div>Content</div>
    </div>
  ); export const /**
                   *
                   */
  DividerExample = DefaultExample;
