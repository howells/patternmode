"use client";

import React from "react";
import { Code, Strong, Text, TextLink } from "./component";

export const BasicExample = () => (
  <div className="space-y-4">
    <Text>This is a paragraph of text.</Text>
    <Text>This is another text example.</Text>
    <Text>This is a third text example.</Text>
  </div>
);

export const SizesExample = () => (
  <div className="space-y-2">
    <Text size="xs">Extra small text (xs)</Text>
    <Text size="sm">Small text (sm)</Text>
    <Text size="base">Base text (base)</Text>
    <Text size="lg">Large text (lg)</Text>
  </div>
);

export const SemanticElementsExample = () => (
  <div className="space-y-4">
    <Text>
      This is regular text with{" "}
      <Strong>strong emphasis</Strong>{" "}
      and{" "}
      <Code>inline code</Code>{" "}
      elements.
    </Text>
    <Text>
      You can also use{" "}
      <TextLink href="#">text links</TextLink>{" "}
      within paragraphs for navigation and references.
    </Text>
    <Text>
      Mix and match:{" "}
      <Strong>Bold text</Strong>{" "}
      with{" "}
      <Code>code snippets</Code>{" "}
      and{" "}
      <TextLink href="#">clickable links</TextLink>{" "}
      all in one paragraph.
    </Text>
  </div>
);

export const ColorInheritanceExample = () => (
  <div className="space-y-4">
    <div className="text-blue-600">
      <Text>This text inherits blue color from its parent</Text>
    </div>
    <div className="text-green-700">
      <Text>This text inherits green color from its parent</Text>
    </div>
    <div className="text-red-500">
      <Text>This text inherits red color from its parent</Text>
    </div>
    <div className="text-zinc-500">
      <Text>This text inherits muted zinc color from its parent</Text>
    </div>
  </div>
);

export const TechnicalDocumentationExample = () => (
  <div className="space-y-4">
    <Text>
      Use the <Code>useState</Code> hook to manage component state in React applications.
    </Text>
    <Text>
      For more information, see the{" "}
      <TextLink href="https://react.dev/reference/react/useState">
        official React documentation
      </TextLink>.
    </Text>
    <Text size="sm">
      <Strong>Note:</Strong> Remember to import <Code>useState</Code> from React
      before using it in your components.
    </Text>
  </div>
);
