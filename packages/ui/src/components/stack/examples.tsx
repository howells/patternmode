"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { HStack, Stack, VStack } from "@patternmode/ui";

import React from "react";

// Default example - matches config "default" id
export function DefaultExample() {
  return (
    <Stack direction="vertical" gap={4}>
      <div className="p-4 bg-blue-100 rounded">Item 1</div>
      <div className="p-4 bg-green-100 rounded">Item 2</div>
      <div className="p-4 bg-red-100 rounded">Item 3</div>
    </Stack>
  );
}

// Horizontal example - matches config "horizontal" id
export function HorizontalExample() {
  return (
    <Stack direction="horizontal" gap={6}>
      <div className="p-4 bg-blue-100 rounded">Item 1</div>
      <div className="p-4 bg-green-100 rounded">Item 2</div>
      <div className="p-4 bg-red-100 rounded">Item 3</div>
    </Stack>
  );
}

// Custom spacing example - matches config "custom-spacing" id
export function CustomSpacingExample() {
  return (
    <div className="space-y-8">
      <Stack gap={1}>
        <div className="rounded bg-blue-100 p-2">Small Spacing (gap-1)</div>
        <div className="rounded bg-blue-100 p-2">Small Spacing (gap-1)</div>
      </Stack>
      <Stack gap={8}>
        <div className="rounded bg-green-100 p-2">Large Spacing (gap-8)</div>
        <div className="rounded bg-green-100 p-2">Large Spacing (gap-8)</div>
      </Stack>
    </div>
  );
}

// Alignment example - matches config "alignment" id
export function AlignmentExample() {
  return (
    <Stack align="center" className="h-32 bg-zinc-50">
      <div className="rounded bg-purple-100 px-4 py-2">Centered Item 1</div>
      <div className="rounded bg-purple-100 px-6 py-2">Centered Item 2</div>
      <div className="rounded bg-purple-100 px-12 py-2">Centered Item 3</div>
    </Stack>
  );
}

// Additional examples that were in the original file
export function StackExample() {
  return (
    <Stack
      direction={{ sm: "vertical", lg: "horizontal" }}
      gap={{ sm: 2, md: 4, lg: 6 }}
    >
      <div className="p-4 bg-blue-100 rounded flex-1">
        Mobile: Stacked vertically with gap-2
      </div>
      <div className="p-4 bg-green-100 rounded flex-1">
        Desktop: Side by side with gap-6
      </div>
      <div className="p-4 bg-red-100 rounded flex-1">Responsive behavior!</div>
    </Stack>
  );
}

export function ResponsiveGapExample() {
  return (
    <Stack direction="vertical" gap={{ sm: 1, md: 3, lg: 6, xl: 10 }}>
      <div className="p-3 bg-purple-100 rounded">
        Gap increases with screen size
      </div>
      <div className="p-3 bg-purple-100 rounded">sm: gap-1 (4px)</div>
      <div className="p-3 bg-purple-100 rounded">md: gap-3 (12px)</div>
      <div className="p-3 bg-purple-100 rounded">lg: gap-6 (24px)</div>
      <div className="p-3 bg-purple-100 rounded">xl: gap-10 (40px)</div>
    </Stack>
  );
}

export function HelperComponentsExample() {
  return (
    <div className="space-y-6">
      <VStack gap={3}>
        <div className="p-3 bg-purple-100 rounded">VStack Item 1</div>
        <div className="p-3 bg-purple-100 rounded">VStack Item 2</div>
      </VStack>

      <HStack gap={3}>
        <div className="p-3 bg-orange-100 rounded">HStack Item 1</div>
        <div className="p-3 bg-orange-100 rounded">HStack Item 2</div>
      </HStack>
    </div>
  );
}

export function WithPaddingExample() {
  return (
    <Stack
      direction="vertical"
      gap={3}
      padding={{ sm: 3, md: 6, lg: 8 }}
      className="bg-zinc-100 rounded"
    >
      <div className="p-3 bg-white rounded shadow">Item 1</div>
      <div className="p-3 bg-white rounded shadow">Item 2</div>
      <div className="p-3 bg-white rounded shadow">Item 3</div>
    </Stack>
  );
}

export function WrappingExample() {
  return (
    <Stack direction="horizontal" gap={3} wrap className="max-w-md">
      <div className="p-3 bg-blue-100 rounded">Tag 1</div>
      <div className="p-3 bg-green-100 rounded">Tag 2</div>
      <div className="p-3 bg-red-100 rounded">Tag 3</div>
      <div className="p-3 bg-yellow-100 rounded">Tag 4</div>
      <div className="p-3 bg-purple-100 rounded">Tag 5</div>
      <div className="p-3 bg-pink-100 rounded">Tag 6</div>
    </Stack>
  );
}

export function ComplexResponsiveExample() {
  return (
    <Stack
      direction={{
        sm: "vertical",
        md: "horizontal",
        lg: "vertical",
        xl: "horizontal",
      }}
      gap={{ sm: 2, md: 4, lg: 6, xl: 8 }}
      padding={{ sm: 4, lg: 8 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
    >
      <div className="p-4 bg-white rounded shadow flex-1">
        <h3 className="font-semibold mb-2">Responsive Card 1</h3>
        <p className="text-sm text-zinc-600">
          This layout adapts at multiple breakpoints
        </p>
      </div>
      <div className="p-4 bg-white rounded shadow flex-1">
        <h3 className="font-semibold mb-2">Responsive Card 2</h3>
        <p className="text-sm text-zinc-600">Try resizing to see the changes</p>
      </div>
      <div className="p-4 bg-white rounded shadow flex-1">
        <h3 className="font-semibold mb-2">Responsive Card 3</h3>
        <p className="text-sm text-zinc-600">
          sm: vertical, md: horizontal, lg: vertical, xl: horizontal
        </p>
      </div>
    </Stack>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "HorizontalExample",
    title: "Horizontal",
    description: "Horizontal example",
    component: HorizontalExample,
  },
  {
    id: "CustomSpacingExample",
    title: "Custom Spacing",
    description: "Custom Spacing example",
    component: CustomSpacingExample,
  },
  {
    id: "AlignmentExample",
    title: "Alignment",
    description: "Alignment example",
    component: AlignmentExample,
  },
  {
    id: "StackExample",
    title: "Stack",
    description: "Stack example",
    component: StackExample,
  },
  {
    id: "ResponsiveGapExample",
    title: "Responsive Gap",
    description: "Responsive Gap example",
    component: ResponsiveGapExample,
  },
  {
    id: "HelperComponentsExample",
    title: "Helper Components",
    description: "Helper Components example",
    component: HelperComponentsExample,
  },
  {
    id: "WithPaddingExample",
    title: "With Padding",
    description: "With Padding example",
    component: WithPaddingExample,
  },
  {
    id: "WrappingExample",
    title: "Wrapping",
    description: "Wrapping example",
    component: WrappingExample,
  },
  {
    id: "ComplexResponsiveExample",
    title: "Complex Responsive",
    description: "Complex Responsive example",
    component: ComplexResponsiveExample,
  },
];
