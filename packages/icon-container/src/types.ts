import type {
	SemanticVariant,
	TailwindColor,
} from "@patternmode/constants/variants";
import type { IconSize } from "@patternmode/icon/types";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { iconContainerVariants } from "./variants";

export type IconContainerProps = {
	icon: React.ComponentType<{ size?: number | string; className?: string }>;
	size?: "sm" | "base" | "lg" | "xl";
	variant?: VariantProps<typeof iconContainerVariants>["variant"];
	color?: SemanticVariant | TailwindColor;
	iconSize?: IconSize;
	centered?: boolean;
	className?: string;
	iconClassName?: string;
} & React.ComponentPropsWithoutRef<"div">;
