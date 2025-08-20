"use client";

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
		<div className="space-y-8">
			{/* Mobile-first: defaults to vertical, horizontal on large screens */}
			<div>
				<h4 className="text-sm font-medium text-zinc-700 mb-3">
					Mobile-first (implicit default)
				</h4>
				<p className="text-xs text-zinc-600 mb-3">
					Vertical on mobile → horizontal on lg+
				</p>
				<Stack direction={{ lg: "horizontal" }} gap={4}>
					<div className="p-4 bg-blue-100 rounded flex-1">
						Default: Vertical on mobile
					</div>
					<div className="p-4 bg-green-100 rounded flex-1">
						lg+: Horizontal layout
					</div>
					<div className="p-4 bg-red-100 rounded flex-1">
						Resize to see change!
					</div>
				</Stack>
			</div>

			{/* Explicit default with overrides */}
			<div>
				<h4 className="text-sm font-medium text-zinc-700 mb-3">
					Explicit default
				</h4>
				<p className="text-xs text-zinc-600 mb-3">
					Horizontal on mobile → vertical on lg+
				</p>
				<Stack direction={{ default: "horizontal", lg: "vertical" }} gap={4}>
					<div className="p-4 bg-purple-100 rounded flex-1">
						Default: Horizontal on mobile
					</div>
					<div className="p-4 bg-orange-100 rounded flex-1">
						lg+: Vertical layout
					</div>
				</Stack>
			</div>

			{/* Multi-breakpoint responsive */}
			<div>
				<h4 className="text-sm font-medium text-zinc-700 mb-3">
					Multi-breakpoint
				</h4>
				<p className="text-xs text-zinc-600 mb-3">
					Vertical sm + small gap → horizontal lg + large gap
				</p>
				<Stack
					direction={{ sm: "vertical", lg: "horizontal" }}
					gap={{ sm: 2, md: 4, lg: 6 }}
				>
					<div className="p-4 bg-teal-100 rounded flex-1">
						sm: Vertical with gap-2
					</div>
					<div className="p-4 bg-amber-100 rounded flex-1">
						lg: Horizontal with gap-6
					</div>
				</Stack>
			</div>

			{/* Max-width breakpoints */}
			<div>
				<h4 className="text-sm font-medium text-zinc-700 mb-3">
					Max-width breakpoints
				</h4>
				<p className="text-xs text-zinc-600 mb-3">
					Horizontal default → vertical on max-md and below
				</p>
				<Stack
					direction={{ default: "horizontal", "max-md": "vertical" }}
					gap={4}
				>
					<div className="p-4 bg-pink-100 rounded flex-1">
						Tablet+: Horizontal
					</div>
					<div className="p-4 bg-cyan-100 rounded flex-1">Mobile: Vertical</div>
					<div className="p-4 bg-lime-100 rounded flex-1">
						Responsive direction!
					</div>
				</Stack>
			</div>

			{/* Complex responsive scenario */}
			<div>
				<h4 className="text-sm font-medium text-zinc-700 mb-3">
					Complex responsive
				</h4>
				<p className="text-xs text-zinc-600 mb-3">
					Different directions + gaps + padding at each breakpoint
				</p>
				<Stack
					direction={{ sm: "vertical", md: "horizontal", xl: "vertical" }}
					gap={{ sm: 1, md: 3, lg: 5 }}
					padding={{ sm: 2, md: 4, lg: 6 }}
					className="bg-zinc-50 rounded-lg"
				>
					<div className="p-3 bg-rose-100 rounded text-sm">
						sm: vertical, gap-1, p-2
					</div>
					<div className="p-3 bg-sky-100 rounded text-sm">
						md: horizontal, gap-3, p-4
					</div>
					<div className="p-3 bg-emerald-100 rounded text-sm">
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
