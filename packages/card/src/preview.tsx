"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardHeading,
} from "./component";

export function CardPreview() {
	return (
		<Card>
			<CardHeader>
				<CardHeading>Card Title</CardHeading>
				<CardDescription>Simple card preview</CardDescription>
			</CardHeader>
			<CardContent>Content goes here</CardContent>
		</Card>
	);
}

export const cardPreviewProps = [];
