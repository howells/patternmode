"use client";

import { ArrowRight, Check, Heart, Search, Star, User } from "lucide-react";
import { Stack } from "@patternmode/stack";
import { Icon } from "./component";

// Basic icons
export const DefaultExample = () => {
	return (
		<Stack direction="horizontal" align="center" gap={4}>
			<Icon icon={User} />
			<Icon icon={Heart} />
			<Icon icon={Star} />
			<Icon icon={Check} />
		</Stack>
	);
};

// Different sizes
export const SizesExample = () => {
	return (
		<Stack direction="horizontal" align="center" gap={2}>
			<Icon icon={Star} size="xs" />
			<Icon icon={Star} size="sm" />
			<Icon icon={Star} size="base" />
			<Icon icon={Star} size="lg" />
			<Icon icon={Star} size="xl" />
		</Stack>
	);
};

// Icons with backgrounds
export const WithBackgroundExample = () => {
	return (
		<Stack direction="horizontal" align="center" gap={2}>
			<Stack direction="horizontal" align="center" gap={2} className="p-3 border rounded">
				<Icon icon={User} />
				<span>Profile</span>
			</Stack>

			<div className="flex items-center p-3 border rounded">
				<Icon icon={Heart} className="text-red-500" />
			</div>

			<Stack direction="horizontal" align="center" gap={1}>
				<Icon icon={Star} className="text-yellow-500" size="sm" />
				<span className="text-sm">4.5</span>
			</Stack>

			<Stack direction="horizontal" align="center" gap={3}>
				<span>Next</span>
				<Icon icon={ArrowRight} size="sm" />
			</Stack>
		</Stack>
	);
};

export function CustomStrokeExample() {
	return (
		<Stack direction="horizontal" align="center" gap={4}>
			<Icon icon={Star} strokeWidth={1} />
			<Icon icon={Star} strokeWidth={1.5} />
			<Icon icon={Star} strokeWidth={2} />
			<Icon icon={Star} strokeWidth={2.5} />
		</Stack>
	);
}

export function LayoutExample() {
	return (
		<div className="space-y-4">
			{/* Stack with gap */}
			<Stack direction="horizontal" align="center" gap={2} className="p-3 border rounded">
				<Icon icon={Search} />
				<span>Search with stack gap</span>
			</Stack>

			{/* Manual margin */}
			<div className="flex items-center p-3 border rounded">
				<Icon icon={User} className="mr-2" />
				<span>User with margin-right</span>
			</div>

			{/* Different gap sizes */}
			<Stack gap={2}>
				<Stack direction="horizontal" align="center" gap={1}>
					<Icon icon={Star} size="sm" />
					<span className="text-sm">Small gap</span>
				</Stack>
				<Stack direction="horizontal" align="center" gap={3}>
					<Icon icon={Heart} />
					<span>Large gap</span>
				</Stack>
			</Stack>
		</div>
	);
}
