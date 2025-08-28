"use client";

import { Button } from "@patternmode/button";
import { HelpCircle, Info, Settings } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "./component";

export function DefaultExample() {
	return (
		<Tooltip content="This is a helpful tooltip">
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	);
}

export function PositionsExample() {
	return (
		<div className="flex gap-4 flex-wrap justify-center">
			<Tooltip content="Top tooltip" side="top">
				<Button variant="outline">Top</Button>
			</Tooltip>
			<Tooltip content="Right tooltip" side="right">
				<Button variant="outline">Right</Button>
			</Tooltip>
			<Tooltip content="Bottom tooltip" side="bottom">
				<Button variant="outline">Bottom</Button>
			</Tooltip>
			<Tooltip content="Left tooltip" side="left">
				<Button variant="outline">Left</Button>
			</Tooltip>
		</div>
	);
}

export function VariantsExample() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Default tooltip with dark background" variant="default">
				<Button variant="outline">Default</Button>
			</Tooltip>
			<Tooltip
				content="Inverse tooltip with light background"
				variant="inverse"
			>
				<Button variant="outline">Inverse</Button>
			</Tooltip>
		</div>
	);
}

export function SizesExample() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Small tooltip" size="sm">
				<Button variant="outline">Small</Button>
			</Tooltip>
			<Tooltip content="Default size tooltip" size="default">
				<Button variant="outline">Default</Button>
			</Tooltip>
			<Tooltip content="Large tooltip with more content space" size="lg">
				<Button variant="outline">Large</Button>
			</Tooltip>
		</div>
	);
}

export function ArrowExample() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Tooltip with arrow" showArrow>
				<Button variant="outline">With Arrow</Button>
			</Tooltip>
			<Tooltip content="Tooltip without arrow" showArrow={false}>
				<Button variant="outline">No Arrow</Button>
			</Tooltip>
		</div>
	);
}

export function RichContentExample() {
	return (
		<div className="flex gap-4">
			<Tooltip
				content={
					<div className="space-y-2">
						<div className="">Rich Content Tooltip</div>
						<div className="text-sm">
							This tooltip contains multiple elements and formatted text.
						</div>
					</div>
				}
				size="lg"
			>
				<Button variant="outline">Rich Content</Button>
			</Tooltip>
			<Tooltip
				content={
					<div className="flex items-center gap-2">
						<Info size={16} />
						<div>
							<div className="">Info Tooltip</div>
							<div className="text-xs opacity-80">Additional context here</div>
						</div>
					</div>
				}
				variant="inverse"
			>
				<Button variant="outline">With Icon</Button>
			</Tooltip>
		</div>
	);
}

export function ControlledExample() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex gap-4">
			<Tooltip
				content="This tooltip is controlled externally"
				open={open}
				onOpenChange={setOpen}
			>
				<Button variant="outline">Controlled Tooltip</Button>
			</Tooltip>
			<Button onClick={() => setOpen(!open)} variant="secondary">
				{open ? "Close" : "Open"} Tooltip
			</Button>
		</div>
	);
}

export function DelayExample() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Fast tooltip (0ms delay)" delayDuration={0}>
				<Button variant="outline">No Delay</Button>
			</Tooltip>
			<Tooltip content="Default tooltip (150ms delay)" delayDuration={150}>
				<Button variant="outline">Default Delay</Button>
			</Tooltip>
			<Tooltip content="Slow tooltip (500ms delay)" delayDuration={500}>
				<Button variant="outline">Slow Delay</Button>
			</Tooltip>
		</div>
	);
}

export function IconButtonsExample() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Get help and documentation" side="bottom">
				<Button variant="ghost" size="icon">
					<HelpCircle size={16} />
				</Button>
			</Tooltip>
			<Tooltip content="Important information about this feature" side="bottom">
				<Button variant="ghost" size="icon">
					<Info size={16} />
				</Button>
			</Tooltip>
			<Tooltip
				content="This action requires caution"
				side="bottom"
				variant="inverse"
			>
				<Button variant="ghost" size="icon">
					<Settings size={16} />
				</Button>
			</Tooltip>
		</div>
	);
}

export function AlignmentExample() {
	return (
		<div className="space-y-8">
			<div>
				<h4 className="text-sm font-medium mb-4">Bottom Side Alignment</h4>
				<div className="flex gap-4 justify-center">
					<Tooltip content="Start aligned tooltip" side="bottom" align="start">
						<Button variant="outline">Start</Button>
					</Tooltip>
					<Tooltip
						content="Center aligned tooltip"
						side="bottom"
						align="center"
					>
						<Button variant="outline">Center</Button>
					</Tooltip>
					<Tooltip content="End aligned tooltip" side="bottom" align="end">
						<Button variant="outline">End</Button>
					</Tooltip>
				</div>
			</div>
			<div>
				<h4 className="text-sm font-medium mb-4">Right Side Alignment</h4>
				<div className="flex flex-col gap-4 items-start">
					<Tooltip content="Start aligned tooltip" side="right" align="start">
						<Button variant="outline">Start</Button>
					</Tooltip>
					<Tooltip content="Center aligned tooltip" side="right" align="center">
						<Button variant="outline">Center</Button>
					</Tooltip>
					<Tooltip content="End aligned tooltip" side="right" align="end">
						<Button variant="outline">End</Button>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}
