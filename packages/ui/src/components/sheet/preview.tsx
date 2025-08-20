"use client";

import type { ButtonVariant } from "../../constants/variants";
import { Button } from "../button/component";
import { buttonVariants } from "../button/types";
import { DismissButton } from "../dismiss-button/component";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./component";

export type SheetPreviewProps = {
	/**
	 * Sheet slide-in direction.
	 * Controls which side of the screen the sheet slides in from.
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Sheet size variant.
	 * Controls the width or height of the sheet.
	 */
	size?: "sm" | "md" | "lg" | "xl" | "full";
	/**
	 * Whether to show the sheet footer.
	 * Displays action buttons at the bottom when enabled.
	 */
	showFooter?: boolean;
	/**
	 * Whether to show the close button.
	 * Displays a close button in the header when enabled.
	 */
	showCloseButton?: boolean;
	/**
	 * Trigger button variant.
	 * Controls the styling of the sheet trigger button.
	 */
	triggerVariant?: ButtonVariant;
	/**
	 * Content complexity level.
	 * Determines how much content is displayed in the sheet.
	 */
	contentLevel?: "simple" | "navigation" | "settings";
};

export function SheetPreview({
	side = "right",
	size: _size = "md",
	showFooter = true,
	showCloseButton = true,
	triggerVariant = "primary",
	contentLevel = "simple",
}: SheetPreviewProps = {}) {
	const getContent = () => {
		switch (contentLevel) {
			case "simple":
				return (
					<div className="py-4">
						<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
							This is a simple sheet with basic content. Perfect for displaying
							supplementary information.
						</p>
						<div className="space-y-2">
							<div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md">
								<p className="text-sm font-medium">Note</p>
								<p className="text-xs text-zinc-500">
									Additional information goes here
								</p>
							</div>
						</div>
					</div>
				);
			case "navigation":
				return (
					<div className="py-4">
						<nav className="space-y-1">
							<a
								href="#"
								className="block px-3 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
							>
								Dashboard
							</a>
							<a
								href="#"
								className="block px-3 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
							>
								Projects
							</a>
							<a
								href="#"
								className="block px-3 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
							>
								Team
							</a>
							<a
								href="#"
								className="block px-3 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
							>
								Settings
							</a>
						</nav>
						<div className="mt-6 pt-6 border-t  dark:border-zinc-800">
							<a
								href="#"
								className="block px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10"
							>
								Sign Out
							</a>
						</div>
					</div>
				);
			case "settings":
				return (
					<div className="py-4 space-y-6">
						<div>
							<h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">
								Profile Settings
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
										Display Name
									</label>
									<input
										type="text"
										placeholder="Enter display name"
										className="w-full px-3 py-2 border  dark:border-zinc-700 rounded-md text-sm"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
										Email
									</label>
									<input
										type="email"
										placeholder="Enter email address"
										className="w-full px-3 py-2 border  dark:border-zinc-700 rounded-md text-sm"
									/>
								</div>
							</div>
						</div>
						<div>
							<h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">
								Preferences
							</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm">Email Notifications</span>
									<Button variant="outline" size="sm">
										Enable
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Dark Mode</span>
									<Button variant="outline" size="sm">
										Toggle
									</Button>
								</div>
							</div>
						</div>
					</div>
				);
		}
	};

	return (
		<Sheet>
			<SheetTrigger
				render={<Button variant={triggerVariant}>Open Sheet</Button>}
			/>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						{contentLevel === "navigation"
							? "Navigation"
							: contentLevel === "settings"
								? "Settings"
								: "Sheet Preview"}
					</SheetTitle>
					<SheetDescription>
						This demonstrates a {side} sheet with {contentLevel} content.
					</SheetDescription>
					{showCloseButton && (
						<SheetClose
							render={<DismissButton className="absolute right-4 top-4" />}
						/>
					)}
				</SheetHeader>
				{getContent()}
				{showFooter && (
					<SheetFooter className="mt-6">
						<div className="flex gap-2 justify-end">
							<SheetClose render={<Button variant="outline">Close</Button>} />
							{contentLevel === "settings" && (
								<Button variant="primary">Save Changes</Button>
							)}
						</div>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	);
}

// Preview props for prop explorer
export const sheetPreviewProps = [
	{
		name: "side",
		type: "select",
		description:
			"Sheet opening direction - controls which side of the screen the sheet slides in from.",
		options: ["top", "right", "bottom", "left"],
		defaultValue: "right",
	},
	{
		name: "showFooter",
		type: "boolean",
		description:
			"Whether to show the footer with actions - displays action buttons at the bottom when enabled.",
		defaultValue: true,
	},
	{
		name: "showCloseButton",
		type: "boolean",
		description:
			"Whether to show the close button - displays a close button in the header when enabled.",
		defaultValue: true,
	},
	{
		name: "triggerVariant",
		type: "select",
		description:
			"Trigger button variant - controls the styling of the sheet trigger button.",
		options: [...buttonVariants],
		defaultValue: "primary",
	},
	{
		name: "contentLevel",
		type: "select",
		description:
			"Content complexity level - determines how much content is displayed in the sheet.",
		options: ["simple", "form", "detailed"],
		defaultValue: "simple",
	},
];
