"use client";

import { Avatar } from "./component";
import type { AvatarProps } from "./types";

export function AvatarPreview(props: AvatarProps) {
	return <Avatar {...props} />;
}

export const avatarPreviewProps = [
	{
		name: "size",
		type: "select",
		description: "Avatar size.",
		options: ["xs", "sm", "base", "lg"],
		defaultValue: "base",
	},
	{
		name: "square",
		type: "boolean",
		description: "Square shape instead of circle.",
		defaultValue: false,
	},
	{
		name: "src",
		type: "string",
		description: "Image source URL.",
		defaultValue: "",
	},
	{
		name: "initials",
		type: "string",
		description: "Initials to display.",
		defaultValue: "PM",
	},
	{
		name: "text",
		type: "string",
		description: "Text used for initials/background color.",
		defaultValue: "",
	},
	{
		name: "alt",
		type: "string",
		description: "Alt text for the image.",
		defaultValue: "",
	},
	{
		name: "dynamicBackground",
		type: "boolean",
		description: "Generate background color from text/initials.",
		defaultValue: false,
	},
];
