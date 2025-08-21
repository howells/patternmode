import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import type * as React from "react";
import { getColorFromName } from "../../presentation/colors";
import { cx } from "@patternmode/core/utils/cx";
import { imageSizeMap } from "./constants";
import type {
	AvatarFallbackProps,
	AvatarImageProps,
	AvatarProps,
	AvatarWithFallbackProps,
} from "./types";
import { avatarVariants } from "./variants";

const DEFAULT_IMAGE_PROPS = {};

/**
 * User profile image component with fallback initials and various size options.
 */
const Avatar = ({
	ref,
	src = null,
	size = "base",
	square = false,
	initials,
	text,
	alt = "",
	dynamicBackground = false,
	className,
	ImageComponent,
	imageProps = DEFAULT_IMAGE_PROPS,
	...props
}: AvatarProps & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
	// Determine what text to display and how to format it
	const displayText =
		text || (initials ? initials.slice(0, 2).toUpperCase() : undefined);

	// Generate background color from initials/text or alt text when dynamicBackground is true
	const backgroundColor = dynamicBackground
		? getColorFromName(initials || text || alt || "default")
		: undefined;

	// Get image dimensions for the current size
	const imageSize = imageSizeMap[size || "base"];

	// Use custom ImageComponent if provided, otherwise default to img
	const ImageEl = ImageComponent || "img";

	// Filter out invalid props (numeric keys, functions, etc.) for HTML elements
	const filteredImageProps = ImageComponent
		? imageProps // If using custom component, pass all props
		: Object.fromEntries(
				Object.entries(imageProps).filter(
					([key]) =>
						typeof key === "string" &&
						Number.isNaN(Number(key)) &&
						key !== "children",
				),
			);

	return (
		<span
			ref={ref}
			{...props}
			className={cx(avatarVariants({ size, square }), className)}
			style={backgroundColor ? { backgroundColor } : undefined}
			data-testid="avatar"
		>
			{displayText && (
				<svg
					className="size-full fill-current p-[5%] text-[36px] font-medium select-none"
					viewBox="0 0 100 100"
					aria-hidden={alt ? undefined : "true"}
				>
					{alt && <title>{alt}</title>}
					<text
						x="50%"
						y="50%"
						alignmentBaseline="middle"
						dominantBaseline="middle"
						textAnchor="middle"
						dy=".125em"
						fill={dynamicBackground ? "white" : "currentColor"}
					>
						{displayText}
					</text>
				</svg>
			)}
			{src && (
				<ImageEl
					className="size-full object-cover"
					src={src}
					alt={alt}
					width={imageSize.width}
					height={imageSize.height}
					{...filteredImageProps}
				/>
			)}
		</span>
	);
};
Avatar.displayName = "Avatar";

/**
 * Alternative avatar implementation using Base UI primitives with built-in fallback.
 */
const AvatarWithFallback = ({
	ref,
	className,
	...props
}: AvatarWithFallbackProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Root> | null>;
}) => (
	<BaseAvatar.Root
		ref={ref}
		className={cx(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			"outline -outline-offset-1 outline-black/5 dark:outline-white/5",
			className,
		)}
		{...props}
	/>
);
AvatarWithFallback.displayName = "AvatarWithFallback";

/**
 * Image component for use within AvatarWithFallback.
 */
const AvatarImage = ({
	ref,
	className,
	...props
}: AvatarImageProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Image> | null>;
}) => (
	<BaseAvatar.Image
		ref={ref}
		className={cx("aspect-square h-full w-full object-cover", className)}
		{...props}
	/>
);
AvatarImage.displayName = "AvatarImage";

/**
 * Fallback component for use within AvatarWithFallback when image fails to load.
 */
const AvatarFallback = ({
	ref,
	className,
	...props
}: AvatarFallbackProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Fallback> | null>;
}) => (
	<BaseAvatar.Fallback
		ref={ref}
		className={cx(
			"flex h-full w-full items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-900",
			"dark:bg-zinc-800 dark:text-zinc-50",
			className,
		)}
		{...props}
	/>
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback, AvatarImage, AvatarWithFallback };
