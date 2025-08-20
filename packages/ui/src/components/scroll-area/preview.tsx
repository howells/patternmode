"use client";

import type { ScrollAreaProps } from "./component";
import { ScrollArea } from "./component";

export function ScrollAreaPreview(props: ScrollAreaProps) {
	return (
		<ScrollArea className="h-32 w-48 border rounded" {...props}>
			<div className="p-4">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<p>
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
				<p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
				<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
			</div>
		</ScrollArea>
	);
}

// Preview props for prop explorer
export const scrollAreaPreviewProps = [
	{
		name: "orientation",
		type: "select",
		description:
			"Scroll orientation determining which direction(s) content can be scrolled.",
		defaultValue: "vertical",
		options: ["vertical", "horizontal", "both"],
	},
];
