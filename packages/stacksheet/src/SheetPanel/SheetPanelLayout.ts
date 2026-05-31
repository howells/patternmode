import type { ReactNode } from "react";
import type { HeaderRenderProps, StacksheetLayout } from "../types";

export function resolvePanelLayout(
	layout: StacksheetLayout | undefined,
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode),
): StacksheetLayout {
	if (layout) {
		return layout;
	}
	return renderHeader === false ? "composable" : "classic";
}
