import {
	type ObjectFit,
	PATTERNMODE_SIZE_VALUES,
	PATTERNMODE_SIZES,
} from "@patternmode/system";
import type { ComponentType, HTMLAttributes, SVGProps } from "react";

export const SWATCH_SIZES = [
	...PATTERNMODE_SIZES,
	"4xl",
	"5xl",
	"6xl",
	"7xl",
] as const;

export const SWATCH_SIZE_VALUES = {
	...PATTERNMODE_SIZE_VALUES,
	"4xl": "4.5rem",
	"5xl": "5rem",
	"6xl": "5.5rem",
	"7xl": "6rem",
} as const satisfies Record<SwatchSize, string>;

export const SWATCH_SHAPES = ["circle", "pill", "square"] as const;

export type SwatchSize = (typeof SWATCH_SIZES)[number];
export type SwatchShape = (typeof SWATCH_SHAPES)[number];
export type SwatchColorStop = string | { color: string; ratio?: number };
type SwatchIcon = ComponentType<SVGProps<SVGSVGElement>>;

export function getSwatchSizeVariableStyle(
	size: SwatchSize,
	variableName = "--patternmode-swatch-size",
): Record<string, string> {
	return {
		[variableName]: SWATCH_SIZE_VALUES[size],
	};
}

export interface SwatchProps extends HTMLAttributes<HTMLElement> {
	background?: string;
	color?: string;
	colors?: SwatchColorStop[];
	icon?: SwatchIcon;
	isLight?: boolean;
	objectFit?: ObjectFit;
	objectPosition?: string;
	onRemove?: () => void;
	raised?: boolean;
	removeLabel?: string;
	selected?: boolean;
	shape?: SwatchShape;
	showRing?: boolean;
	size?: SwatchSize;
	unavailable?: boolean;
}
