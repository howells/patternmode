"use client";

import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";

/**
 * Embla Carousel API instance type.
 *
 * Provides programmatic control over carousel behavior.
 */
type CarouselApi = UseEmblaCarouselType[1];

/**
 * Parameters for the useEmblaCarousel hook.
 *
 * Extracted for type safety and reusability.
 */
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

/**
 * Configuration options for Embla Carousel.
 *
 * Controls carousel behavior, layout, and interaction patterns.
 */
type CarouselOptions = UseCarouselParameters[0];

/**
 * Plugin configuration for extending carousel functionality.
 *
 * Supports Embla's plugin system for features like autoplay, auto-scroll, etc.
 */
type CarouselPlugin = UseCarouselParameters[1];

/**
 * Props for the Carousel component.
 */
type CarouselProps = {
	/**
	 * Embla Carousel configuration options.
	 * Controls carousel behavior such as loop, alignment, and drag settings.
	 */
	opts?: CarouselOptions;
	/**
	 * Array of Embla plugins to enable.
	 * Plugins extend carousel functionality with features like autoplay, auto-scroll, etc.
	 */
	plugins?: CarouselPlugin;
	/**
	 * Scroll orientation for the carousel.
	 * Determines whether slides scroll horizontally or vertically.
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Callback to access the carousel API instance.
	 * Provides programmatic control over carousel navigation and state.
	 */
	setApi?: (api: CarouselApi) => void;
};

/**
 * Context data for carousel components.
 *
 * Provides carousel state and methods to child components
 * through React context.
 */
type CarouselContextProps = {
	/**
	 * Ref for the carousel container element.
	 */
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	/**
	 * Embla Carousel API instance.
	 */
	api: ReturnType<typeof useEmblaCarousel>[1];
	/**
	 * Function to scroll to previous slide.
	 */
	scrollPrev: () => void;
	/**
	 * Function to scroll to next slide.
	 */
	scrollNext: () => void;
	/**
	 * Whether previous navigation is available.
	 */
	canScrollPrev: boolean;
	/**
	 * Whether next navigation is available.
	 */
	canScrollNext: boolean;
} & CarouselProps;

/**
 * React context for sharing carousel state between components.
 *
 * Provides carousel API and navigation state to child components.
 */
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * Hook to access carousel context and API.
 *
 * Provides carousel state and navigation methods to components
 * within a Carousel provider. Must be used within a Carousel component.
 *
 * @returns Carousel context with API and navigation methods.
 * @throws Error when used outside of Carousel component.
 *
 * @example
 * ```tsx
 * function CustomCarouselControls() {
 *   const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
 *
 *   return (
 *     <div className="flex gap-2">
 *       <button onClick={scrollPrev} disabled={!canScrollPrev}>
 *         Previous
 *       </button>
 *       <button onClick={scrollNext} disabled={!canScrollNext}>
 *         Next
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
function useCarousel() {
	const context = React.use(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

/**
 * Root carousel component built on Embla Carousel with navigation controls and keyboard support.
 */
const Carousel = ({
	ref,
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement> &
	CarouselProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) {
			return;
		}

		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	React.useEffect(() => {
		if (!api || !setApi) {
			return;
		}

		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);

		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext
			value={{
				carouselRef,
				api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				ref={ref}
				onKeyDownCapture={handleKeyDown}
				className={cx("relative", className)}
				// Removed non-standard role/roledescription to satisfy a11y lint
				data-testid="carousel"
				{...props}
			>
				{children}
			</div>
		</CarouselContext>
	);
};
Carousel.displayName = "Carousel";

/**
 * Container for carousel slides with overflow handling.
 *
 * Provides the scrollable container for carousel items with proper
 * overflow clipping and flex layout. Must be used within a Carousel component.
 */
const CarouselContent = ({
	ref,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.RefObject<HTMLDivElement | null>;
}) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cx(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
};
CarouselContent.displayName = "CarouselContent";

/**
 * Individual carousel slide container.
 *
 * Wraps slide content with proper sizing and spacing. Includes accessibility
 * attributes for screen readers. Must be used within CarouselContent.
 */
const CarouselItem = ({
	ref,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.RefObject<HTMLDivElement | null>;
}) => {
	const { orientation } = useCarousel();

	return (
		<div
			ref={ref}
			// Removed non-standard aria-roledescription per lint
			className={cx(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				className,
			)}
			{...props}
		/>
	);
};
CarouselItem.displayName = "CarouselItem";

/**
 * Previous slide navigation button.
 *
 * Automatically positioned and styled button for navigating to the previous slide.
 * Disabled when no previous slides are available. Adapts to carousel orientation.
 */
const CarouselPrevious = ({
	ref,
	className,
	variant = "secondary",
	size = "icon",
	...props
}: React.ComponentProps<typeof Button> & {
	ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			rounded={true}
			leftIcon={ArrowLeft}
			className={cx(
				"absolute",
				orientation === "horizontal"
					? "-left-12 top-1/2 -translate-y-1/2"
					: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<span className="sr-only">Previous slide</span>
		</Button>
	);
};
CarouselPrevious.displayName = "CarouselPrevious";

/**
 * Next slide navigation button.
 *
 * Automatically positioned and styled button for navigating to the next slide.
 * Disabled when no next slides are available. Adapts to carousel orientation.
 */
const CarouselNext = ({
	ref,
	className,
	variant = "secondary",
	size = "icon",
	...props
}: React.ComponentProps<typeof Button> & {
	ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			rounded={true}
			leftIcon={ArrowRight}
			className={cx(
				"absolute",
				orientation === "horizontal"
					? "-right-12 top-1/2 -translate-y-1/2"
					: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<span className="sr-only">Next slide</span>
		</Button>
	);
};
CarouselNext.displayName = "CarouselNext";

export {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselProps,
	useCarousel,
};
