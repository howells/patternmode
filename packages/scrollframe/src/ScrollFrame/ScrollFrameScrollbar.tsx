"use client";

import { joinClassNames } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useScrollFrame } from "./ScrollFrameContext";

export const ScrollFrameScrollbar = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof RadixScrollArea.Scrollbar>
>(function ScrollFrameScrollbar({ className, orientation, ...props }, ref) {
	const { axes, scrollbars } = useScrollFrame();
	const resolvedOrientation =
		orientation ?? (axes === "horizontal" ? "horizontal" : "vertical");
	return (
		<RadixScrollArea.Scrollbar
			{...props}
			className={joinClassNames(
				"patternmode-scrollframe__scrollbar",
				className,
			)}
			data-hidden={scrollbars === "hidden" ? "true" : undefined}
			data-slot="scrollframe-scrollbar"
			orientation={resolvedOrientation}
			ref={ref}
		/>
	);
});

export const ScrollFrameThumb = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof RadixScrollArea.Thumb>
>(function ScrollFrameThumb({ className, ...props }, ref) {
	return (
		<RadixScrollArea.Thumb
			{...props}
			className={joinClassNames("patternmode-scrollframe__thumb", className)}
			data-slot="scrollframe-thumb"
			ref={ref}
		/>
	);
});

export const ScrollFrameCorner = RadixScrollArea.Corner;
