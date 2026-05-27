import {
	type ObjectFit,
	PATTERNMODE_SIZES,
	type PatternmodeSize,
} from "@patternmode/system";
import type { ComponentType, HTMLAttributes, SVGProps } from "react";

export const SWATCH_SIZES = PATTERNMODE_SIZES;

export const SWATCH_SHAPES = ["circle", "pill", "square"] as const;

export type SwatchSize = PatternmodeSize;
export type SwatchShape = (typeof SWATCH_SHAPES)[number];
export type SwatchColorStop = string | { color: string; ratio?: number };
type SwatchIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface SwatchProps extends HTMLAttributes<HTMLSpanElement> {
	background?: string;
	color?: string;
	colors?: SwatchColorStop[];
	icon?: SwatchIcon;
	isLight?: boolean;
	objectFit?: ObjectFit;
	objectPosition?: string;
	onRemove?: () => void;
	raised?: boolean;
	selected?: boolean;
	shape?: SwatchShape;
	showRing?: boolean;
	size?: SwatchSize;
	unavailable?: boolean;
}
