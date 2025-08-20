import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { calloutVariants } from "./variants";

export type CalloutProps = {
	/**
	 * Optional title text for the callout.
	 * Displays prominently at the top of the callout to summarize the message.
	 */
	title?: string;
	/**
	 * Optional icon component to display.
	 * Shows at the left side of the callout to provide visual context for the message type.
	 */
	icon?: React.ComponentType<{ className?: string }>;
	/**
	 * Visual style variant of the callout.
	 * Controls the color scheme to indicate the type of message (info, success, error, warning, neutral).
	 */
	variant?: VariantProps<typeof calloutVariants>["variant"];
} & React.ComponentPropsWithoutRef<"div">;
