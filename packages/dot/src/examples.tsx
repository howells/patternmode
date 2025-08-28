"use client";

import { Dot } from "./component";

export const BasicExample = () => (
	<div className="flex gap-3 items-center">
		<Dot variant="default" />
		<Dot variant="success" />
		<Dot variant="warning" />
		<Dot variant="error" />
		<Dot variant="info" />
	</div>
);

export const SemanticVariantsExample = () => (
	<div className="flex gap-3 items-center">
		<Dot variant="success" label="Online" />
		<Dot variant="warning" label="Away" />
		<Dot variant="error" label="Offline" />
	</div>
);

export const ColorVariantsExample = () => (
	<div className="flex gap-3 items-center">
		<Dot variant="blue" />
		<Dot variant="purple" />
		<Dot variant="emerald" />
	</div>
);

export const SizesExample = () => (
	<div className="flex gap-3 items-center">
		<Dot size="sm" />
		<Dot size="default" />
		<Dot size="lg" />
	</div>
);

export const WithLabelsExample = () => (
	<div className="flex gap-4 items-center">
		<Dot variant="success" label="Up" />
		<Dot variant="error" label="Down" />
	</div>
);

export const WithoutLabelsExample = () => (
	<div className="flex gap-3 items-center">
		<Dot />
		<Dot />
		<Dot />
	</div>
);

export const AnimatedExample = () => (
	<div className="flex gap-3 items-center">
		<Dot variant="info" animated label="Live" />
	</div>
);

export const DotExample = () => (
	<div className="flex gap-3 items-center">
		<Dot variant="success" label="Deployed" />
		<Dot variant="warning" label="Rolling" animated />
		<Dot variant="error" label="Failed" />
	</div>
);
