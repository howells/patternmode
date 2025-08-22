"use client";

import { Button } from "@patternmode/button";
import { ButtonGroup } from "../button-group/component";
import { Text } from "@patternmode/text";
import type { CardProps } from "./component";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardHeading,
} from "./component";

export function CardPreview(props: CardProps) {
	const { ref: _ref, ...cardProps } = props;

	return (
		<Card {...cardProps}>
			<CardHeader border>
				<CardHeading>{props.children || "Preview Card"}</CardHeading>
				<CardDescription>
					This is how the Card component looks in the preview.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Text>
					This is the main content area of the card component. You can customize
					the card's appearance using the props controls.
				</Text>
			</CardContent>
			<CardFooter border>
				<ButtonGroup>
					<Button>Primary Action</Button>
					<Button variant="outline">Cancel</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
}

// Preview props for prop explorer
export const cardPreviewProps = [
	{
		name: "children",
		type: "string",
		description: "Card title content (used in CardHeading).",
		defaultValue: "Preview Card",
	},
	{
		name: "variant",
		type: "select",
		description: "Visual style variant of the card.",
		options: ["default", "dashed"],
		defaultValue: "default",
	},
	{
		name: "padding",
		type: "number",
		description:
			"Padding scale value (0-24) controlling internal spacing using the 4px grid system.",
		defaultValue: 0,
		min: 0,
		max: 24,
	},
	{
		name: "fillHeight",
		type: "boolean",
		description: "Whether card should fill container height.",
		defaultValue: false,
	},
];
