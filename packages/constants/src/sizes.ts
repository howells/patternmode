/**
 * Universal sizes used across all components, with human-readable labels.
 */
export const sizes = {
	"2xs": "2X Small",
	xs: "X Small",
	sm: "Small",
	base: "Base",
	lg: "Large",
} as const;

export type Size = keyof typeof sizes;
