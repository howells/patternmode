import type React from "react";
import type { Size } from "../../constants/sizes";

export type DescriptionListProps = {
	/**
	 * Additional CSS classes for styling.
	 * Applied to the root dl element.
	 */
	className?: string;
	/**
	 * Override grid columns at the `sm` breakpoint and above, e.g. "200px 1fr" or
	 * "min(35%,24rem) 1fr". When provided, this takes precedence over the default template
	 * of `min(50%, --spacing(80)) auto`.
	 */
	columns?: string;
	/**
	 * Convenience prop to set the term column width at the `sm` breakpoint and above.
	 * Accepts any valid CSS width (e.g. "14rem", "220px", "min(40%, 20rem)").
	 * If `columns` is also provided, `columns` wins.
	 */
	termWidth?: string;
	/**
	 * Optional value column width paired with `termWidth`. Defaults to `1fr`.
	 */
	valueWidth?: string;
	/**
	 * Controls vertical spacing for rows using the shared `Size` scale from `@patternmode/ui/constants/sizes`.
	 * Defaults to `"base"`.
	 */
	size?: Size;
	/**
	 * Whether to render borders between rows. Defaults to `true`.
	 */
	border?: boolean;
	/**
	 * Truncate long term labels (dt) when horizontal space is limited.
	 * Applies Tailwind's truncate utilities to the term column.
	 * Defaults to `false`.
	 */
	truncateTerms?: boolean;
} & React.ComponentPropsWithoutRef<"dl">;

export type DescriptionTermProps = {
	/**
	 * Additional CSS classes for styling.
	 * Applied to the dt element for term labels.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"dt">;

export type DescriptionDetailsProps = {
	/**
	 * Additional CSS classes for styling.
	 * Applied to the dd element for term descriptions.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<"dd">;
