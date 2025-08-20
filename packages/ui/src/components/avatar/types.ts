import type { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import type * as React from "react";

export type AvatarProps = {
	/**
	 * Image source URL for the avatar.
	 * When provided, displays the image; when null/undefined, shows fallback.
	 */
	src?: string | null;
	/**
	 * Initials to display when no image is provided.
	 * Automatically uppercased and limited to 2 characters.
	 */
	initials?: string;
	/**
	 * Arbitrary text content to display when no image is provided.
	 * Can be numbers, symbols, or any short text (not automatically uppercased).
	 */
	text?: string;
	/**
	 * Alt text for accessibility.
	 * Used for screen readers and image descriptions.
	 */
	alt?: string;
	/**
	 * Whether to use a dynamic background color based on initials/text/alt text.
	 * Generates consistent colors for different users.
	 */
	dynamicBackground?: boolean;
	/**
	 * Additional CSS classes.
	 * Applied to the avatar container element.
	 */
	className?: string;
	/**
	 * Custom Image component to use (e.g., Next.js Image for optimization).
	 * Defaults to standard HTML img element.
	 */
	ImageComponent?: React.ComponentType<{
		src: string;
		alt: string;
		width: number;
		height: number;
		className?: string;
		[key: string]: unknown;
	}>;
	/**
	 * Additional props to pass to the Image component.
	 * Useful for optimization settings like priority, quality, etc.
	 */
	imageProps?: Record<string, unknown>;
	/**
	 * Size variant of the avatar.
	 * Controls dimensions from very compact (2xs) to very large (3xl).
	 */
	size?: "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
	/**
	 * Whether to use square shape instead of circular.
	 * Useful for brand logos or non-human avatars.
	 */
	square?: boolean;
} & React.ComponentPropsWithoutRef<"span">;

export type AvatarWithFallbackProps = {
	/**
	 * Additional CSS classes.
	 * Applied to the avatar root container.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseAvatar.Root>;

export type AvatarImageProps = {
	/**
	 * Additional CSS classes.
	 * Applied to the avatar image element.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>;

export type AvatarFallbackProps = {
	/**
	 * Additional CSS classes.
	 * Applied to the fallback content element.
	 */
	className?: string;
	/**
	 * Content to display when image fails to load.
	 * Usually initials or placeholder text.
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>;
