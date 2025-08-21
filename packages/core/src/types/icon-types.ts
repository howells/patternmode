import type React from "react";

/**
 * Standard icon component type used across all components.
 * Compatible with Lucide icons and other icon libraries.
 */
export type IconComponent = React.ComponentType<{
	className?: string;
	strokeWidth?: number;
}>;