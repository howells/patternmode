import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import { getColorFromName } from "@patternmode/utils/colors";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { imageSizeMap } from "./constants";
import type {
	AvatarFallbackProps,
	AvatarImageProps,
	AvatarProps,
	AvatarWithFallbackProps,
} from "./types";
import { avatarVariants } from "./variants";

const DEFAULT_IMAGE_PROPS = {};

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
	const displayText =
		text || (initials ? initials.slice(0, 2).toUpperCase() : undefined);
	const backgroundColor = dynamicBackground
		? getColorFromName(initials || text || alt || "default")
		: undefined;
	const imageSize = imageSizeMap[size || "base"];
	const ImageEl = ImageComponent || "img";
	const filteredImageProps = ImageComponent
		? imageProps
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
					<title>{alt || displayText}</title>
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
