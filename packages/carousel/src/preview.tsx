"use client";

import { Card } from "@patternmode/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./component";

export type CarouselPreviewProps = {
	/**
	 * Number of slides to display.
	 * Controls how many carousel items are shown.
	 */
	slideCount?: 3 | 4 | 5 | 6;
	/**
	 * Carousel orientation.
	 * Controls whether slides move horizontally or vertically.
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Whether to enable infinite loop.
	 * When true, carousel wraps from last to first slide seamlessly.
	 */
	loop?: boolean;
	/**
	 * Whether to show navigation buttons.
	 * Controls visibility of previous/next arrow buttons.
	 */
	showNavigation?: boolean;
	/**
	 * Maximum width of the carousel container.
	 * Controls the overall size constraint of the carousel.
	 */
	maxWidth?: "xs" | "sm" | "md" | "lg";
};

export function CarouselPreview({
	slideCount = 3,
	orientation = "horizontal",
	loop = false,
	showNavigation = true,
	maxWidth = "xs",
}: CarouselPreviewProps = {}) {
	const maxWidthClasses = {
		xs: "max-w-xs",
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
	};

	const slides = Array.from({ length: slideCount }, (_, i) => i + 1);

	return (
		<Carousel
			className={`w-full ${maxWidthClasses[maxWidth]}`}
			opts={{
				loop,
				axis: orientation === "vertical" ? "y" : "x",
			}}
		>
			<CarouselContent
				className={orientation === "vertical" ? "flex-col h-48" : ""}
			>
				{slides.map((slide) => (
					<CarouselItem
						key={slide}
						className={orientation === "vertical" ? "pt-1 basis-1/3" : ""}
					>
						<Card>
							<div className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">{slide}</span>
							</div>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			{showNavigation && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</Carousel>
	);
}

// Preview props for prop explorer
export const carouselPreviewProps = [
	{
		name: "slideCount",
		type: "select",
		description:
			"Number of slides to display - controls how many carousel items are shown.",
		options: [3, 4, 5, 6],
		defaultValue: 3,
	},
	{
		name: "orientation",
		type: "select",
		description:
			"Carousel orientation - controls whether slides move horizontally or vertically.",
		options: ["horizontal", "vertical"],
		defaultValue: "horizontal",
	},
	{
		name: "loop",
		type: "boolean",
		description:
			"Whether to enable infinite loop - when true, carousel wraps from last to first slide seamlessly.",
		defaultValue: false,
	},
	{
		name: "showNavigation",
		type: "boolean",
		description:
			"Whether to show navigation buttons - controls visibility of previous/next arrow buttons.",
		defaultValue: true,
	},
	{
		name: "maxWidth",
		type: "select",
		description:
			"Maximum width of the carousel container - controls the overall size constraint.",
		options: ["xs", "sm", "md", "lg"],
		defaultValue: "xs",
	},
];
