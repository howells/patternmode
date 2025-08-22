"use client";

import type { Size } from "@patternmode/config/sizes";
import { SIZES as sizes } from "@patternmode/config/sizes";
import { Text } from "@patternmode/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component";

export type TabsPreviewProps = {
	/**
	 * Style variant for the tabs list.
	 * "solid" creates button-like tabs in a container, "line" creates underlined tabs with a divider.
	 */
	variant?: "solid" | "line";
	/**
	 * Hide the bottom divider line (only applies to "line" variant).
	 * Controls visibility of the dividing line under tabs.
	 */
	hideDivider?: boolean;
	/**
	 * Size variant for tabs (applies to "solid" variant).
	 * Controls the size of button-style tabs.
	 */
	size?: Size;
	/**
	 * Default tab to display.
	 * Determines which tab is initially active.
	 */
	defaultValue?: "tab1" | "tab2" | "tab3";
};

export function TabsPreview({
	variant = "line",
	hideDivider = false,
	size = "base",
	defaultValue = "tab1",
}: TabsPreviewProps = {}) {
	return (
		<div className="max-w-2xl w-full">
			<Tabs defaultValue={defaultValue}>
				<TabsList variant={variant} hideDivider={hideDivider} size={size}>
					<TabsTrigger value="tab1">Overview</TabsTrigger>
					<TabsTrigger value="tab2">Analytics</TabsTrigger>
					<TabsTrigger value="tab3">Reports</TabsTrigger>
				</TabsList>

				<TabsContent value="tab1" className="py-4">
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur.
					</Text>
				</TabsContent>
				<TabsContent value="tab2" className="py-4">
					<Text>
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit anim id est laborum. Sed ut perspiciatis
						unde omnis iste natus error sit voluptatem accusantium doloremque
						laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
						veritatis et quasi architecto beatae vitae dicta sunt explicabo.
					</Text>
				</TabsContent>
				<TabsContent value="tab3" className="py-4">
					<Text>
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
						fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
						ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
						numquam eius modi tempora incidunt ut labore et dolore magnam
						aliquam.
					</Text>
				</TabsContent>
			</Tabs>
		</div>
	);
}

// Preview props for prop explorer
export const tabsPreviewProps = [
	{
		name: "variant",
		type: "select",
		description:
			"Tabs style variant - controls the visual appearance of the tab triggers.",
		options: ["solid", "line"],
		defaultValue: "line",
	},
	{
		name: "size",
		type: "select",
		description:
			"Tabs size variant - affects padding and text size of the tab triggers.",
		options: sizes,
		defaultValue: "base",
	},
	{
		name: "hideDivider",
		type: "boolean",
		description: "Hide the bottom divider line (only applies to line variant).",
		defaultValue: false,
	},
];
