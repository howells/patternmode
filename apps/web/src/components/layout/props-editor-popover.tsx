"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@patternmode/popover";
import React from "react";
import {
	PreviewProvider,
	usePreview,
} from "@/features/preview/preview-context";
import { PreviewControls } from "@/features/preview/preview-controls";
import { getComponentConfig } from "@/registry/components";

type CellData = {
	componentId: string;
	props: Record<string, unknown>;
	position?: {
		colSpan?: number;
		rowSpan?: number;
		colStart?: number;
		rowStart?: number;
	};
};

type PropsEditorPopoverProps = {
	isOpen: boolean;
	onOpenChangeAction: (open: boolean) => void;
	cellData: CellData;
	onUpdatePropsAction: (props: Record<string, unknown>) => void;
	trigger: React.ReactElement;
};

export function PropsEditorPopover({
	isOpen,
	onOpenChangeAction,
	cellData,
	onUpdatePropsAction,
	trigger,
}: PropsEditorPopoverProps) {
	const config = getComponentConfig(cellData.componentId);

	if (!config) {
		return null;
	}

	// Transform config to match PreviewConfig interface
	const previewConfig = {
		componentName: config.name,
		props: {},
	};

	const handlePropsUpdate = (newProps: Record<string, unknown>) => {
		onUpdatePropsAction(newProps);
	};

	return (
		<Popover open={isOpen} onOpenChange={onOpenChangeAction}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="space-y-4">
					<div className="border-b  dark:border-zinc-700 pb-3">
						<h3 className="font-semibold text-sm">{config.name} Props</h3>
						<p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
							Configure the component properties
						</p>
					</div>

					<PreviewProvider
						defaultProps={cellData.props}
						key={cellData.componentId}
					>
						<PreviewControls config={previewConfig} />
						<PropsUpdater onUpdate={handlePropsUpdate} />
					</PreviewProvider>
				</div>
			</PopoverContent>
		</Popover>
	);
}

// Helper component to watch for prop changes and update parent
function PropsUpdater({
	onUpdate,
}: {
	onUpdate: (props: Record<string, unknown>) => void;
}) {
	const { props } = usePreview();

	// Use useEffect to detect prop changes and update parent
	React.useEffect(() => {
		onUpdate(props);
	}, [props, onUpdate]);

	return null;
}

// Re-export the hook for convenience
export { usePreview } from "../../features/preview/preview-context";
