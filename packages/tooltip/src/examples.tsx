"use client";

import { Button } from "@patternmode/button";
import { HelpCircle, Info, Settings } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "./component";

export function DefaultExample() {
    return (
        <Tooltip content="This is a helpful tooltip" render={<Button variant="outline" />}>
            Hover me
        </Tooltip>
    );
}

export function PositionsExample() {
	return (
        <div className="flex gap-4 flex-wrap justify-center">
            <Tooltip content="Top tooltip" side="top" render={<Button variant="outline" />}>
                Top
            </Tooltip>
            <Tooltip content="Right tooltip" side="right" render={<Button variant="outline" />}>
                Right
            </Tooltip>
            <Tooltip content="Bottom tooltip" side="bottom" render={<Button variant="outline" />}>
                Bottom
            </Tooltip>
            <Tooltip content="Left tooltip" side="left" render={<Button variant="outline" />}>
                Left
            </Tooltip>
        </div>
    );
}

export function VariantsExample() {
	return (
        <div className="flex gap-4">
            <Tooltip content="Default tooltip with dark background" variant="default" render={<Button variant="outline" />}>
                Default
            </Tooltip>
            <Tooltip
                content="Inverse tooltip with light background"
                variant="inverse"
                render={<Button variant="outline" />}
            >
                Inverse
            </Tooltip>
        </div>
    );
}

export function SizesExample() {
	return (
        <div className="flex gap-4">
            <Tooltip content="Small tooltip" size="sm" render={<Button variant="outline" />}>
                Small
            </Tooltip>
            <Tooltip content="Default size tooltip" size="default" render={<Button variant="outline" />}>
                Default
            </Tooltip>
            <Tooltip content="Large tooltip with more content space" size="lg" render={<Button variant="outline" />}>
                Large
            </Tooltip>
        </div>
    );
}

export function ArrowExample() {
	return (
        <div className="flex gap-4">
            <Tooltip content="Tooltip with arrow" showArrow render={<Button variant="outline" />}>
                With Arrow
            </Tooltip>
            <Tooltip content="Tooltip without arrow" showArrow={false} render={<Button variant="outline" />}>
                No Arrow
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
                render={<Button variant="outline" />}
            >
                Rich Content
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
                render={<Button variant="outline" />}
            >
                With Icon
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
                render={<Button variant="outline" />}
            >
                Controlled Tooltip
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
            <Tooltip content="Fast tooltip (0ms delay)" delayDuration={0} render={<Button variant="outline" />}>
                No Delay
            </Tooltip>
            <Tooltip content="Default tooltip (150ms delay)" delayDuration={150} render={<Button variant="outline" />}>
                Default Delay
            </Tooltip>
            <Tooltip content="Slow tooltip (500ms delay)" delayDuration={500} render={<Button variant="outline" />}>
                Slow Delay
            </Tooltip>
        </div>
    );
}

export function IconButtonsExample() {
	return (
        <div className="flex gap-4">
            <Tooltip content="Get help and documentation" side="bottom" render={<Button variant="ghost" size="icon" />}>
                <HelpCircle size={16} />
            </Tooltip>
            <Tooltip content="Important information about this feature" side="bottom" render={<Button variant="ghost" size="icon" />}>
                <Info size={16} />
            </Tooltip>
            <Tooltip
                content="This action requires caution"
                side="bottom"
                variant="inverse"
                render={<Button variant="ghost" size="icon" />}
            >
                <Settings size={16} />
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
                    <Tooltip content="Start aligned tooltip" side="bottom" align="start" render={<Button variant="outline" />}>
                        Start
                    </Tooltip>
                    <Tooltip
                        content="Center aligned tooltip"
                        side="bottom"
                        align="center"
                        render={<Button variant="outline" />}
                    >
                        Center
                    </Tooltip>
                    <Tooltip content="End aligned tooltip" side="bottom" align="end" render={<Button variant="outline" />}>
                        End
                    </Tooltip>
                </div>
            </div>
            <div>
                <h4 className="text-sm font-medium mb-4">Right Side Alignment</h4>
                <div className="flex flex-col gap-4 items-start">
                    <Tooltip content="Start aligned tooltip" side="right" align="start" render={<Button variant="outline" />}>
                        Start
                    </Tooltip>
                    <Tooltip content="Center aligned tooltip" side="right" align="center" render={<Button variant="outline" />}>
                        Center
                    </Tooltip>
                    <Tooltip content="End aligned tooltip" side="right" align="end" render={<Button variant="outline" />}>
                        End
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
