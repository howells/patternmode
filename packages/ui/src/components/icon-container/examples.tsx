"use client";

import {
	Box,
	CheckCircle,
	Database,
	MessageSquare,
	Palette,
	Star,
	Zap,
} from "lucide-react";
import { IconContainer } from "./component";

// Basic icon container
export const DefaultExample = () => <IconContainer icon={Box} />;

// With semantic variant
export const WithVariantExample = () => (
	<IconContainer icon={CheckCircle} variant="success" />
);

// With custom color
export const WithCustomColorExample = () => (
	<IconContainer icon={Star} color="purple" />
);

// Large size
export const LargeSizeExample = () => (
	<IconContainer icon={Star} size="lg" variant="warning" />
);

// Extra large with custom icon size
export const ExtraLargeExample = () => (
	<IconContainer icon={Zap} size="xl" color="orange" iconSize="xl" />
);

// Semantic variants showcase
export const SemanticVariantsExample = () => (
	<div className="flex gap-4">
		<IconContainer icon={Box} variant="default" />
		<IconContainer icon={CheckCircle} variant="success" />
		<IconContainer icon={Database} variant="info" />
		<IconContainer icon={MessageSquare} variant="warning" />
		<IconContainer icon={Palette} variant="error" />
		<IconContainer icon={Star} variant="critical" />
	</div>
);

// Custom colors showcase
export const CustomColorsExample = () => (
	<div className="flex gap-4">
		<IconContainer icon={Box} color="blue" />
		<IconContainer icon={CheckCircle} color="emerald" />
		<IconContainer icon={Database} color="purple" />
		<IconContainer icon={MessageSquare} color="orange" />
		<IconContainer icon={Palette} color="red" />
		<IconContainer icon={Star} color="indigo" />
	</div>
);

// Size variants showcase
export const SizeVariantsExample = () => (
	<div className="flex items-center gap-4">
		<IconContainer icon={Box} size="sm" variant="info" />
		<IconContainer icon={Box} size="base" variant="info" />
		<IconContainer icon={Box} size="lg" variant="info" />
		<IconContainer icon={Box} size="xl" variant="info" />
	</div>
);

// Centered container
export const CenteredExample = () => (
	<div className="w-full">
		<IconContainer icon={Star} size="lg" variant="warning" centered />
	</div>
);
