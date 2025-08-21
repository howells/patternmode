import type { Size } from "@patternmode/styles/constants/sizes";

/**
 * Text size variant controlling font size.
 * Uses the global size scale.
 */
export type TextSize = Size;

export type TextProps = {
	/**
	 * Text size variant controlling font size.
	 * Uses the global size scale.
	 */
	size?: TextSize;
} & React.ComponentPropsWithoutRef<"p">;

export type TextLinkProps = React.ComponentPropsWithoutRef<"a">;
export type StrongProps = React.ComponentPropsWithoutRef<"strong">;
export type CodeProps = React.ComponentPropsWithoutRef<"code">;
