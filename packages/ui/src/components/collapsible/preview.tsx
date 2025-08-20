"use client";

import type React from "react";
import { TextList, TextListItem } from "../text-list/component";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./component";

type CollapsibleProps = React.ComponentPropsWithoutRef<typeof Collapsible> & {
	defaultOpen?: boolean;
	disabled?: boolean;
};

export function CollapsiblePreview(props: CollapsibleProps) {
	return (
		<Collapsible defaultOpen {...props}>
			<CollapsibleTrigger>Component Features</CollapsibleTrigger>
			<CollapsibleContent>
				<TextList>
					<TextListItem>Smooth height-based animations</TextListItem>
					<TextListItem>Accessible keyboard navigation</TextListItem>
					<TextListItem>Customizable icons and styling</TextListItem>
					<TextListItem>Support for nested content</TextListItem>
				</TextList>
			</CollapsibleContent>
		</Collapsible>
	);
}

// Preview props for prop explorer
export const collapsiblePreviewProps = [
	{
		name: "defaultOpen",
		type: "boolean",
		description:
			"Whether the collapsible is open by default when first rendered.",
		defaultValue: true,
	},
	{
		name: "disabled",
		type: "boolean",
		description:
			"Whether the collapsible trigger is disabled and cannot be toggled.",
		defaultValue: false,
	},
];
