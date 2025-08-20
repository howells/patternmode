"use client";

import type { PreviewCardProps } from "./component";
import {
	PreviewCard,
	PreviewCardContent,
	PreviewCardPortal,
	PreviewCardPositioner,
	PreviewCardTrigger,
} from "./component";

export function PreviewCardPreview(props: PreviewCardProps) {
	return (
		<PreviewCard {...props}>
			<PreviewCardTrigger>Hover for preview</PreviewCardTrigger>
			<PreviewCardPortal>
				<PreviewCardPositioner>
					<PreviewCardContent>
						<div className="p-4">
							<h3 className="font-semibold">Preview Content</h3>
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								This is the preview content that appears on hover.
							</p>
						</div>
					</PreviewCardContent>
				</PreviewCardPositioner>
			</PreviewCardPortal>
		</PreviewCard>
	);
}

// Preview props for prop explorer
export const previewCardPreviewProps = [
	{
		name: "sideOffset",
		type: "number",
		description: "Distance from trigger element in pixels.",
		defaultValue: 8,
	},
	{
		name: "collisionPadding",
		type: "number",
		description: "Padding for collision detection boundaries.",
		defaultValue: 5,
	},
];
