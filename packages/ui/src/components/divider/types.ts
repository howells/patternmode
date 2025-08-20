import type React from "react";

export type DividerProps = {
	/**
	 * Optional text content to display in the center of the divider.
	 * When provided, creates a labeled divider with text between two lines.
	 */
	children?: React.ReactNode;
	/**
	 * Divider orientation - horizontal spans full width, vertical spans full height.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Vertical spacing around the divider (ignored for vertical orientation).
	 * Controls margin top and bottom for horizontal dividers.
	 * @default "md"
	 */
	spacing?: "none" | "sm" | "md" | "lg";
} & React.ComponentPropsWithoutRef<"div">;
