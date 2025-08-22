"use client";

import { Stack } from "./component";
import type { StackProps } from "./types";

export function StackPreview(props: StackProps) {
	return (
		<Stack {...props}>
			<div className="p-4 bg-blue-100 rounded">Item 1</div>
			<div className="p-4 bg-green-100 rounded">Item 2</div>
			<div className="p-4 bg-yellow-100 rounded">Item 3</div>
		</Stack>
	);
}