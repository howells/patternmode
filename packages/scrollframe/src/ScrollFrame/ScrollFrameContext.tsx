import { createContext, useContext } from "react";

import type {
	ScrollFrameAxisState,
	ScrollFrameContextValue,
	ScrollFrameEdgeState,
} from "./ScrollFrameTypes";

const DEFAULT_AXIS_STATE: ScrollFrameAxisState = {
	atEnd: true,
	atStart: true,
	scrollable: false,
};

export const DEFAULT_EDGE_STATE: ScrollFrameEdgeState = {
	horizontal: DEFAULT_AXIS_STATE,
	vertical: DEFAULT_AXIS_STATE,
};

export const ScrollFrameContext = createContext<ScrollFrameContextValue | null>(
	null,
);

export function useScrollFrame(): ScrollFrameContextValue {
	const context = useContext(ScrollFrameContext);
	if (!context) {
		throw new Error("useScrollFrame must be used within <ScrollFrame.Root>.");
	}
	return context;
}
