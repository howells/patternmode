import type { ComponentType, ReactNode } from "react";

import type { ResolvedClassNames } from "../renderer-helpers";
import type { SlideValues } from "../stacking";
import type {
	HeaderRenderProps,
	ResolvedConfig,
	SheetItem,
	Side,
	StacksheetLayout,
} from "../types";

export interface SheetPanelProps {
	activeSnapIndex: number;
	// biome-ignore lint/suspicious/noExplicitAny: heterogeneous content component
	Content: ComponentType<any> | undefined;
	classNames: ResolvedClassNames;
	close: () => void;
	config: ResolvedConfig;
	depth: number;
	index: number;
	isNested: boolean;
	isTop: boolean;
	item: SheetItem;
	layout?: StacksheetLayout;
	onSnap: (index: number) => void;
	pop: () => void;
	prefersReducedMotion: boolean;
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
	shouldRender: boolean;
	side: Side;
	slideFrom: SlideValues;
	slideTarget: SlideValues;
	snapHeights: number[];
	spring: Record<string, unknown>;
	stackSpring: Record<string, unknown>;
	swipeClose: () => void;
	swipePop: () => void;
}
