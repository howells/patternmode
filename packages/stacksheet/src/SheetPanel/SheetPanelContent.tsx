import { type ComponentType, memo, type ReactNode } from "react";

import type { HeaderRenderProps, StacksheetLayout } from "../types";
import { DefaultHeader } from "./DefaultHeader";

export const PanelInnerContent = memo(function PanelInnerContent({
	isComposable,
	shouldRender,
	Content,
	data,
	renderHeader,
	headerProps,
	headerClassName,
}: {
	isComposable: boolean;
	shouldRender: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: heterogeneous content component
	Content: ComponentType<any> | undefined;
	data: Record<string, unknown>;
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
	headerProps: HeaderRenderProps;
	headerClassName: string | undefined;
}) {
	if (isComposable) {
		return shouldRender && Content ? <Content {...data} /> : null;
	}

	return (
		<>
			{renderHeader ? (
				renderHeader(headerProps)
			) : (
				<DefaultHeader {...headerProps} className={headerClassName} />
			)}
			{shouldRender && Content && (
				<div
					className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
					data-stacksheet-no-drag=""
				>
					<Content {...data} />
				</div>
			)}
		</>
	);
});

PanelInnerContent.displayName = "PanelInnerContent";

export function resolvePanelLayout(
	layout: StacksheetLayout | undefined,
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode),
): StacksheetLayout {
	if (layout) {
		return layout;
	}
	return renderHeader === false ? "composable" : "classic";
}
