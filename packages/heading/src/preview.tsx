"use client";

import type { HeadingProps } from "./component";
import { Heading } from "./component";

export function HeadingPreview(props: HeadingProps) {
	return <Heading {...props}>{props.children || "Heading"}</Heading>;
}

export const headingPreviewProps = [
	{
		name: "children",
		type: "string",
		description: "Heading text content.",
		defaultValue: "Heading",
	},
	{
		name: "level",
		type: "select",
		description: "HTML heading level (h1-h6).",
		options: [1, 2, 3, 4, 5, 6],
		defaultValue: 1,
	},
];
