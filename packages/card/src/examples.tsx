"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardHeading,
} from "./component";

export const DefaultExample = () => (
	<Card>
		<CardHeader>
			<CardHeading>Title</CardHeading>
			<CardDescription>Description text</CardDescription>
		</CardHeader>
		<CardContent>Content</CardContent>
	</Card>
);

export const WithFooterExample = () => (
	<Card>
		<CardHeader>
			<CardHeading>Header</CardHeading>
			<CardDescription>Something descriptive</CardDescription>
		</CardHeader>
		<CardContent>Body</CardContent>
		<CardFooter border>Footer Actions</CardFooter>
	</Card>
);
