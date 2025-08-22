"use client";

import React from "react";
import { Button } from "@patternmode/button";
import { ButtonGroup } from "../button-group/component";
import { VStack } from "@patternmode/stack";
import { Code, Text } from "@patternmode/text";
import { TextList, TextListItem } from "../text-list/component";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./component";

// Default collapsible
export const DefaultExample = () => (
	<Collapsible>
		<CollapsibleTrigger>What is PatternMode?</CollapsibleTrigger>
		<CollapsibleContent>
			PatternMode is a modern React component library built on Base UI
			primitives.
		</CollapsibleContent>
	</Collapsible>
);

// Default open
export const DefaultOpenExample = () => (
	<Collapsible defaultOpen>
		<CollapsibleTrigger>System Requirements</CollapsibleTrigger>
		<CollapsibleContent>
			<TextList>
				<TextListItem>React 18 or higher</TextListItem>
				<TextListItem>Node.js 16 or higher</TextListItem>
				<TextListItem>TypeScript 4.9 or higher</TextListItem>
			</TextList>
		</CollapsibleContent>
	</Collapsible>
);

// Disabled collapsible
export const DisabledExample = () => (
	<Collapsible disabled>
		<CollapsibleTrigger>Coming Soon</CollapsibleTrigger>
		<CollapsibleContent>
			This feature is currently under development.
		</CollapsibleContent>
	</Collapsible>
);

// Rich content
export const NestedContentExample = () => (
	<Collapsible className="max-w-md">
		<CollapsibleTrigger>Installation Guide</CollapsibleTrigger>
		<CollapsibleContent>
			<VStack>
				<Text>Install PatternMode in your project:</Text>
				<Code className="block bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-sm">
					pnpm add patternmode
				</Code>
				<Text>Then import components as needed:</Text>
				<Code className="block bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-sm">
					{`import { Button } from "patternmode"`}
				</Code>
			</VStack>
		</CollapsibleContent>
	</Collapsible>
);

// Controlled collapsible
export const ControlledExample = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<VStack className="min-w-md">
			<ButtonGroup size="xs">
				<Button variant="secondary" onClick={() => setOpen(true)}>
					Open
				</Button>
				<Button variant="secondary" onClick={() => setOpen(false)}>
					Close
				</Button>
				<Button variant="secondary" onClick={() => setOpen(!open)}>
					Toggle
				</Button>
			</ButtonGroup>

			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger>Controlled Content</CollapsibleTrigger>
				<CollapsibleContent>
					<Text>This collapsible is controlled by the buttons above.</Text>
				</CollapsibleContent>
			</Collapsible>
		</VStack>
	);
};

// Nested collapsibles
export const NestedExample = () => (
	<Collapsible defaultOpen>
		<CollapsibleTrigger>Parent Section</CollapsibleTrigger>
		<CollapsibleContent>
			<VStack>
				<Text>This is the parent content.</Text>

				<Collapsible>
					<CollapsibleTrigger>Child Section 1</CollapsibleTrigger>
					<CollapsibleContent>
						<Text>This is nested content 1.</Text>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible>
					<CollapsibleTrigger>Child Section 2</CollapsibleTrigger>
					<CollapsibleContent>
						<Text>This is nested content 2.</Text>
					</CollapsibleContent>
				</Collapsible>
			</VStack>
		</CollapsibleContent>
	</Collapsible>
);
