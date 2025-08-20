import type { LucideIcon } from "lucide-react";
import type React from "react";

export type CopyButtonProps = {
	/**
	 * Text content to copy to clipboard.
	 * The string that will be written to the user's clipboard when the button is clicked.
	 */
	text: string;
	/**
	 * Label text for the copy state.
	 * Text displayed on the button before copying (default: "Copy").
	 */
	copyLabel?: string;
	/**
	 * Label text for the copied state.
	 * Text displayed on the button after successful copying (default: "Copied").
	 */
	copiedLabel?: string;
	/**
	 * Icon component for the copy state.
	 * Lucide icon displayed before copying (default: Copy icon).
	 */
	copyIcon?: LucideIcon;
	/**
	 * Icon component for the copied state.
	 * Lucide icon displayed after successful copying (default: Check icon).
	 */
	copiedIcon?: LucideIcon;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
		ref?: React.RefObject<HTMLButtonElement | null>;
	};
