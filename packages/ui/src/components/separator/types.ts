import type { Separator as BaseSeparator } from "@base-ui-components/react/separator";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";

import type { separatorVariants } from "./variants";

/**
 * Props for the Separator component.
 */
export type SeparatorProps = {
	/**
	 * Optional text content to display in the center of the separator.
	 * When provided, creates a labeled separator with text between two separator lines.
	 */
	children?: React.ReactNode;
	/**
	 * Spacing around the separator when used with text labels.
	 * Controls vertical margin for horizontal separators and horizontal margin for vertical separators.
	 */
	spacing?: "none" | "sm" | "md" | "lg";
	/**
	 * Direction of the separator line.
	 * - "horizontal": Creates a horizontal dividing line (default)
	 * - "vertical": Creates a vertical dividing line.
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Visual style variant affecting color intensity.
	 * - "default": Standard separator color
	 * - "subtle": Lighter, more subdued appearance
	 * - "strong": Darker, more prominent appearance.
	 */
	variant?: "default" | "subtle" | "strong";
	/**
	 * Thickness/size of the separator line.
	 * - "sm": Thinnest line (1px)
	 * - "md": Standard thickness (1px)
	 * - "lg": Thicker line (2px).
	 */
	size?: "sm" | "md" | "lg";
} & React.ComponentPropsWithoutRef<typeof BaseSeparator> &
	VariantProps<typeof separatorVariants>;
