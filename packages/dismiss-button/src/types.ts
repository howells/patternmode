import type React from "react";

export type DismissButtonProps = {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	iconStrokeWidth?: number;
	size?: "xs" | "sm" | "base" | "lg";
	"aria-label"?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
