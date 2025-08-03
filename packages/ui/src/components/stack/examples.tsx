"use client";

import React from "react";
import { HStack, Stack, VStack } from "./component";

export function DefaultExample() {
  return (
    <Stack direction="vertical" gap={4}>
      <div className="p-4 bg-blue-100 rounded">Item 1</div>
      <div className="p-4 bg-green-100 rounded">Item 2</div>
      <div className="p-4 bg-red-100 rounded">Item 3</div>
    </Stack>
  );
}

export function HorizontalExample() {
  return (
    <Stack direction="horizontal" gap={6}>
      <div className="p-4 bg-blue-100 rounded">Item 1</div>
      <div className="p-4 bg-green-100 rounded">Item 2</div>
      <div className="p-4 bg-red-100 rounded">Item 3</div>
    </Stack>
  );
}

export function CustomSpacingExample() {
  return (
    <VStack>
      <Stack gap={1}>
        <div className="rounded bg-blue-100 p-2">Small Spacing (gap-1)</div>
        <div className="rounded bg-blue-100 p-2">Small Spacing (gap-1)</div>
      </Stack>
      <Stack gap={8}>
        <div className="rounded bg-green-100 p-2">Large Spacing (gap-8)</div>
        <div className="rounded bg-green-100 p-2">Large Spacing (gap-8)</div>
      </Stack>
    </VStack>
  );
}

export function AlignmentExample() {
  return (
    <Stack align="center" className="h-32 bg-zinc-50">
      <div className="rounded bg-purple-100 px-4 py-2">Centered Item 1</div>
      <div className="rounded bg-purple-100 px-6 py-2">Centered Item 2</div>
      <div className="rounded bg-purple-100 px-12 py-2">Centered Item 3</div>
    </Stack>
  );
}

export function ResponsiveExample() {
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
