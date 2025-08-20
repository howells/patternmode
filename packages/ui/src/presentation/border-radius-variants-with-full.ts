import { borderRadiusVariants } from "./border-radius-variants";

/**
 * Extended border radius options including full rounded
 */
export const borderRadiusVariantsWithFull = {
	...borderRadiusVariants,
	full: "rounded-full",
} as const;
