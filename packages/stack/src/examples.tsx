"use client";

import { HStack, Stack, VStack } from "./component";

export function DefaultExample() {
  return (
    <Stack direction="vertical" gap={4}>
      <div className="rounded bg-blue-100 p-4">Item 1</div>
      <div className="rounded bg-green-100 p-4">Item 2</div>
      <div className="rounded bg-red-100 p-4">Item 3</div>
    </Stack>
  );
}

export function HorizontalExample() {
  return (
    <Stack direction="horizontal" gap={6}>
      <div className="rounded bg-blue-100 p-4">Item 1</div>
      <div className="rounded bg-green-100 p-4">Item 2</div>
      <div className="rounded bg-red-100 p-4">Item 3</div>
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
    <div className="space-y-8">
      {/* Mobile-first: defaults to vertical, horizontal on large screens */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Mobile-first (implicit default)
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          Vertical on mobile → horizontal on lg+
        </p>
        <Stack direction={{ lg: "horizontal" }} gap={4}>
          <div className="flex-1 rounded bg-blue-100 p-4">
            Default: Vertical on mobile
          </div>
          <div className="flex-1 rounded bg-green-100 p-4">
            lg+: Horizontal layout
          </div>
          <div className="flex-1 rounded bg-red-100 p-4">
            Resize to see change!
          </div>
        </Stack>
      </div>

      {/* Explicit default with overrides */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Explicit default
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          Horizontal on mobile → vertical on lg+
        </p>
        <Stack direction={{ default: "horizontal", lg: "vertical" }} gap={4}>
          <div className="flex-1 rounded bg-purple-100 p-4">
            Default: Horizontal on mobile
          </div>
          <div className="flex-1 rounded bg-orange-100 p-4">
            lg+: Vertical layout
          </div>
        </Stack>
      </div>

      {/* Multi-breakpoint responsive */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Multi-breakpoint
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          Vertical sm + small gap → horizontal lg + large gap
        </p>
        <Stack
          direction={{ sm: "vertical", lg: "horizontal" }}
          gap={{ sm: 2, md: 4, lg: 6 }}
        >
          <div className="flex-1 rounded bg-teal-100 p-4">
            sm: Vertical with gap-2
          </div>
          <div className="flex-1 rounded bg-amber-100 p-4">
            lg: Horizontal with gap-6
          </div>
        </Stack>
      </div>

      {/* Max-width breakpoints */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Max-width breakpoints
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          Horizontal default → vertical on max-md and below
        </p>
        <Stack
          direction={{ default: "horizontal", "max-md": "vertical" }}
          gap={4}
        >
          <div className="flex-1 rounded bg-pink-100 p-4">
            Tablet+: Horizontal
          </div>
          <div className="flex-1 rounded bg-cyan-100 p-4">Mobile: Vertical</div>
          <div className="flex-1 rounded bg-lime-100 p-4">
            Responsive direction!
          </div>
        </Stack>
      </div>

      {/* Complex responsive scenario */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Complex responsive
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          Different directions + gaps + padding at each breakpoint
        </p>
        <Stack
          className="rounded-lg bg-zinc-50"
          direction={{ sm: "vertical", md: "horizontal", xl: "vertical" }}
          gap={{ sm: 1, md: 3, lg: 5 }}
          padding={{ sm: 2, md: 4, lg: 6 }}
        >
          <div className="rounded bg-rose-100 p-3 text-sm">
            sm: vertical, gap-1, p-2
          </div>
          <div className="rounded bg-sky-100 p-3 text-sm">
            md: horizontal, gap-3, p-4
          </div>
          <div className="rounded bg-emerald-100 p-3 text-sm">
            xl: vertical, gap-5, p-6
          </div>
        </Stack>
      </div>
    </div>
  );
}

export function HelperComponentsExample() {
  return (
    <div className="space-y-6">
      <VStack gap={3}>
        <div className="rounded bg-purple-100 p-3">VStack Item 1</div>
        <div className="rounded bg-purple-100 p-3">VStack Item 2</div>
      </VStack>

      <HStack gap={3}>
        <div className="rounded bg-orange-100 p-3">HStack Item 1</div>
        <div className="rounded bg-orange-100 p-3">HStack Item 2</div>
      </HStack>
    </div>
  );
}

export function WithPaddingExample() {
  return (
    <Stack
      className="rounded bg-zinc-100"
      direction="vertical"
      gap={3}
      padding={{ sm: 3, md: 6, lg: 8 }}
    >
      <div className="rounded bg-white p-3 shadow">Item 1</div>
      <div className="rounded bg-white p-3 shadow">Item 2</div>
      <div className="rounded bg-white p-3 shadow">Item 3</div>
    </Stack>
  );
}

export function WrappingExample() {
  return (
    <Stack className="max-w-md" direction="horizontal" gap={3} wrap>
      <div className="rounded bg-blue-100 p-3">Tag 1</div>
      <div className="rounded bg-green-100 p-3">Tag 2</div>
      <div className="rounded bg-red-100 p-3">Tag 3</div>
      <div className="rounded bg-yellow-100 p-3">Tag 4</div>
      <div className="rounded bg-purple-100 p-3">Tag 5</div>
      <div className="rounded bg-pink-100 p-3">Tag 6</div>
    </Stack>
  );
}
