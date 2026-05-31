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

export const SWATCH_SHAPES = ["circle", "pill", "square", "block"] as const;

export const SWATCH_TEXTURES = ["atmosphere"] as const;

export type SwatchSize = (typeof SWATCH_SIZES)[number];
export type SwatchShape = (typeof SWATCH_SHAPES)[number];
export type SwatchTexture = (typeof SWATCH_TEXTURES)[number];
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
	/**
	 * Atmosphere density (0 = diffuse wash, 1 = dense pools). Only applies when
	 * `texture="atmosphere"`. Default 0.5.
	 */
	density?: number;
	/**
	 * Render a precise, flat color block: no top-to-bottom scrim gradient and
	 * no drop shadow. Use for data visualisation where the fill must read as
	 * the exact color value.
	 */
	flat?: boolean;
	/**
	 * Atmosphere gravity (-1 = pools sink, 1 = pools rise). Only applies when
	 * `texture="atmosphere"`. Default 0.
	 */
	gravity?: number;
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
	/**
	 * Render supplied colors as a soft, layered radial atmosphere — overlapping
	 * color pools — instead of a ratio-encoded weighted palette. Pair with
	 * `density` and `gravity` to shape the pools.
	 */
	texture?: SwatchTexture;
	unavailable?: boolean;
}
