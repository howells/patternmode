"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Code, Strong, Text, TextLink, VStack } from "@patternmode/ui";

import React from "react";

export const BasicExample = () => (
  <VStack>
    <Text>This is a paragraph of text.</Text>
    <Text>This is another text example.</Text>
    <Text>This is a third text example.</Text>
  </VStack>
);

export const SizesExample = () => (
  <VStack>
    <Text size="2xs">Extra extra small text (2xs) - 11px</Text>
    <Text>Extra small text (xs) - 13px</Text>
    <Text size="sm">Small text (sm) - 14px</Text>
    <Text size="base">Base text (base) - 16px</Text>
    <Text size="lg">Large text (lg) - 18px</Text>
    <Text size="xl">Extra large text (xl) - 20px</Text>
  </VStack>
);

export const SemanticElementsExample = () => (
  <VStack>
    <Text>
      This is regular text with
      {" "}
      <Strong>strong emphasis</Strong>
      {" "}
      and
      {" "}
      <Code>inline code</Code>
      {" "}
      elements.
    </Text>
    <Text>
      You can also use
      {" "}
      <TextLink href="#">text links</TextLink>
      {" "}
      within
      paragraphs for navigation and references.
    </Text>
    <Text>
      Mix and match:
      {" "}
      <Strong>Bold text</Strong>
      {" "}
      with
      {" "}
      <Code>code snippets</Code>
      {" "}
      and
      {" "}
      <TextLink href="#">clickable links</TextLink>
      {" "}
      all in one paragraph.
    </Text>
  </VStack>
);

export const ColorInheritanceExample = () => (
  <VStack>
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
  </VStack>
);

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "BasicExample",
    title: "Basic",
    description: "Basic example",
    component: BasicExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "SemanticElementsExample",
    title: "Semantic Elements",
    description: "Semantic Elements example",
    component: SemanticElementsExample,
  },
  {
    id: "ColorInheritanceExample",
    title: "Color Inheritance",
    description: "Color Inheritance example",
    component: ColorInheritanceExample,
  },
];
