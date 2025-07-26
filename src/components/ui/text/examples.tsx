import React from "react";
import { Code, Strong, Text, TextLink } from "./text";

export function Basic() {
  return (
    <div className="space-y-2">
      <Text>This is a paragraph of text.</Text>
      <Text>This is another text example.</Text>
      <Text>This is a third text example.</Text>
    </div>
  );
}

export function SizesExample() {
  return (
    <div className="space-y-3">
      <Text size="2xs">Extra extra small text (2xs) - 11px</Text>
      <Text size="xs">Extra small text (xs) - 13px - default</Text>
      <Text size="sm">Small text (sm) - 14px</Text>
      <Text size="base">Base text (base) - 16px</Text>
      <Text size="lg">Large text (lg) - 18px</Text>
      <Text size="xl">Extra large text (xl) - 20px</Text>
    </div>
  );
}

export function SemanticElementsExample() {
  return (
    <div className="space-y-3">
      <Text>
        This is regular text with <Strong>strong emphasis</Strong> and{" "}
        <Code>inline code</Code> elements.
      </Text>
      <Text>
        You can also use <TextLink href="#">text links</TextLink> within
        paragraphs for navigation and references.
      </Text>
      <Text>
        Mix and match: <Strong>Bold text</Strong> with{" "}
        <Code>code snippets</Code> and{" "}
        <TextLink href="#">clickable links</TextLink> all in one paragraph.
      </Text>
    </div>
  );
}

export function ColorInheritanceExample() {
  return (
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
}
