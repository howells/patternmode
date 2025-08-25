"use client";

import React from "react";
import { Textarea } from "./component";

export const DefaultExample = () => (
	<Textarea placeholder="Enter your message..." />
);

export const WithContentExample = () => (
	<Textarea defaultValue={"This is some pre-filled content."} />
);

export const WithErrorExample = () => (
	<Textarea placeholder="Has error" hasError />
);

export const WithRowConstraintsExample = () => (
	<Textarea
		autoResize
		minRows={3}
		maxRows={6}
		placeholder="Auto-resize with row constraints"
	/>
);

export const DisabledExample = () => (
	<Textarea placeholder="Disabled" disabled />
);

export const FixedHeightExample = () => (
	<Textarea
		autoResize={false}
		style={{ height: 120 }}
		placeholder="Fixed height, scrolls when content grows"
	/>
);

export const WithHeightCallbackExample = () => {
	const [height, setHeight] = React.useState(0);
	return (
		<div className="space-y-2">
			<Textarea
				autoResize
				onHeightChange={(h) => setHeight(h)}
				placeholder="Typing here will report height changes..."
			/>
			<div className="text-xs text-zinc-500">
				Current height: {Math.round(height)}px
			</div>
		</div>
	);
};
