"use client";

import { Button } from "@patternmode/button";
import { HStack, Stack, VStack } from "@patternmode/stack";
import { Code, Text } from "@patternmode/text";
import { Badge } from "@patternmode/ui/components/badge";
import { Callout } from "@patternmode/ui/components/callout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardHeading,
} from "@patternmode/ui/components/card";
import { CodeBlock } from "@patternmode/ui/components/code-block";
import { Grid, GridCell } from "@patternmode/ui/components/grid";
import { Heading } from "@patternmode/ui/components/heading";
import { IconContainer } from "@patternmode/ui/components/icon-container";
import { Subheading } from "@patternmode/ui/components/subheading";
import {
	TextList,
	TextListIndicator,
	TextListItem,
} from "@patternmode/ui/components/text-list";
import { cx } from "@patternmode/utils/cx";
import type {
	GlobalSemanticVariant,
	TailwindColor,
} from "@patternmode/utils/variants";
import type { LucideIcon } from "lucide-react";
// Temporarily removed lucide-react icons due to compatibility issues
// import {
//   Box,
//   CheckCircle,
//   Database,
//   FormInput,
//   MessageSquare,
//   Package,
// } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "../components/page-header";

type CategoryCardProps = {
	icon: LucideIcon;
	title: string;
	description: string;
	items: string[];
	variant?: GlobalSemanticVariant;
	color?: GlobalSemanticVariant | TailwindColor;
	headerBorder?: boolean;
	useHorizontalLayout?: boolean;
};

function CategoryCard({
	icon: Icon,
	title,
	description,
	items,
	variant = "default",
	color,
	headerBorder = false,
	useHorizontalLayout = false,
}: CategoryCardProps) {
	if (useHorizontalLayout) {
		return (
			<Card>
				<CardHeader border={headerBorder}>
					<HStack align="center">
						<IconContainer
							icon={Icon}
							size="lg"
							variant={variant}
							color={color}
						/>
						<VStack gap={1}>
							<CardHeading>{title}</CardHeading>
							<CardDescription>{description}</CardDescription>
						</VStack>
					</HStack>
				</CardHeader>
				<CardContent>
					<TextList>
						{items.map((item, index) => (
							<TextListItem key={index}>{item}</TextListItem>
						))}
					</TextList>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<IconContainer icon={Icon} size="lg" variant={variant} color={color} />
				<CardHeading>{title}</CardHeading>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<TextList>
					{items.map((item, index) => (
						<TextListItem key={index}>{item}</TextListItem>
					))}
				</TextList>
			</CardContent>
		</Card>
	);
}

// Temporarily using a placeholder icon function until lucide-react issues are resolved
const PlaceholderIcon = () => (
	<div className="w-6 h-6 bg-gray-300 rounded">📦</div>
);

const componentCategories = [
	{
		icon: PlaceholderIcon as any,
		title: "UI Components",
		description: "Essential building blocks",
		items: [
			"Buttons & Cards",
			"Navigation & Layout",
			"Modals & Drawers",
			"Icons & Badges",
		],
		variant: "default" as const,
		headerBorder: true,
		useHorizontalLayout: true,
	},
	{
		icon: PlaceholderIcon as any,
		title: "Form Components",
		description: "Complete form toolkit",
		items: [
			"Inputs & Textareas",
			"Selects & Comboboxes",
			"Checkboxes & Radios",
			"Date Pickers",
		],
		variant: "success" as const,
		headerBorder: true,
		useHorizontalLayout: true,
	},
	{
		icon: PlaceholderIcon as any,
		title: "Data Display",
		description: "Data visualization tools",
		items: [
			"Tables & Lists",
			"Charts & Graphs",
			"Progress Indicators",
			"Empty States",
		],
		color: "purple" as const,
		headerBorder: true,
		useHorizontalLayout: true,
	},
	{
		icon: PlaceholderIcon as any,
		title: "Feedback",
		description: "User communication",
		items: [
			"Toast Notifications",
			"Alert Dialogs",
			"Tooltips & Popovers",
			"Callouts",
		],
		color: "orange" as const,
		headerBorder: true,
		useHorizontalLayout: true,
	},
];

export default function Home() {
	return (
		<div className={cx("p-16")}>
			<h1 className="font-serif text-4xl max-w-prose">
				Patternmode is a very opinionated component library based on the best
				bits of Base UI, Shadcn UI, Tailwind, and more.
			</h1>
		</div>
	);
}
