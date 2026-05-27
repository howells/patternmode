"use client";

import { joinClassNames } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { forwardRef, useCallback } from "react";

import { useScrollFrame } from "./ScrollFrameContext";
import type { ScrollFrameViewportProps } from "./ScrollFrameTypes";
import { setRef } from "./ScrollFrameUtils";

export const ScrollFrameViewport = forwardRef<
	HTMLDivElement,
	ScrollFrameViewportProps
>(function ScrollFrameViewport(
	{
		children,
		className,
		contentClassName,
		contentStyle,
		viewportRef,
		...props
	},
	ref,
) {
	const { registerViewport } = useScrollFrame();
	const assignRef = useCallback(
		(node: HTMLDivElement | null) => {
			registerViewport(node);
			setRef(ref, node);
			setRef(viewportRef, node);
		},
		[ref, registerViewport, viewportRef],
	);

	return (
		<RadixScrollArea.Viewport
			{...props}
			className={joinClassNames("patternmode-scrollframe__viewport", className)}
			data-slot="scrollframe-viewport"
			data-testid="scrollframe-viewport"
			ref={assignRef}
		>
			<div
				className={joinClassNames(
					"patternmode-scrollframe__content",
					contentClassName,
				)}
				data-slot="scrollframe-content"
				style={contentStyle}
			>
				{children}
			</div>
		</RadixScrollArea.Viewport>
	);
});
