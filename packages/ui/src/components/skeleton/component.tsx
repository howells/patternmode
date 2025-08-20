import type React from "react";
import { tv } from "tailwind-variants";
import { focusRing } from "../../presentation/focus-ring";

const skeletonVariants = tv({
	base: [
		"animate-pulse",
		"rounded-[--skeleton-radius]",
		"bg-[--skeleton-bg]",
		focusRing,
	],
	variants: {
		variant: {
			default:
				"[--skeleton-bg:theme(--color-gray-200)] dark:[--skeleton-bg:theme(--color-gray-800)]",
			shimmer: [
				"[--skeleton-bg:theme(--color-gray-200)] dark:[--skeleton-bg:theme(--color-gray-800)]",
				"relative",
				"overflow-hidden",
				"after:absolute",
				"after:inset-0",
				"after:-translate-x-full",
				"after:animate-[shimmer_2s_infinite]",
				"after:bg-gradient-to-r",
				"after:from-transparent",
				"after:via-white/10",
				"after:to-transparent",
			],
		},
		rounded: {
			none: "[--skeleton-radius:0px]",
			sm: "[--skeleton-radius:theme(--radius-sm)]",
			md: "[--skeleton-radius:theme(--radius-md)]",
			lg: "[--skeleton-radius:theme(--radius-lg)]",
			xl: "[--skeleton-radius:theme(--radius-xl)]",
			full: "[--skeleton-radius:9999px]",
		},
	},
	defaultVariants: {
		variant: "default",
		rounded: "md",
	},
});

type SkeletonProps = {
	/**
	 * Visual style variant of the skeleton.
	 * @default "default"
	 */
	variant?: "default" | "shimmer";
	/**
	 * Border radius style of the skeleton.
	 * @default "md"
	 */
	rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Loading placeholder that shows a skeleton of content while data is being fetched.
 */
export const Skeleton = ({
	variant,
	rounded,
	className,
	...props
}: SkeletonProps) => {
	return (
		<div
			data-testid="skeleton"
			className={skeletonVariants({ variant, rounded, className })}
			{...props}
		/>
	);
};

export { skeletonVariants };
export type { SkeletonProps };
