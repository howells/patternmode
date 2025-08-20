"use client";

import {
	Bold,
	Bookmark,
	Eye,
	EyeOff,
	Heart,
	Italic,
	Pause,
	Play,
	Star,
	Underline,
	Volume2,
	VolumeX,
} from "lucide-react";
import React from "react";

import { Toggle } from "./component";

export function DefaultExample() {
	const [isPressed, setIsPressed] = React.useState(false);

	return (
		<Toggle pressed={isPressed} onPressedChange={setIsPressed}>
			Toggle me
		</Toggle>
	);
}

export function WithIconExample() {
	const [isBold, setIsBold] = React.useState(false);

	return (
		<Toggle pressed={isBold} onPressedChange={setIsBold}>
			<Bold className="h-4 w-4" />
		</Toggle>
	);
}

export function WithIconAndTextExample() {
	const [isVisible, setIsVisible] = React.useState(true);

	return (
		<Toggle pressed={isVisible} onPressedChange={setIsVisible}>
			{isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
			{isVisible ? "Hide" : "Show"}
		</Toggle>
	);
}

export function VariantsExample() {
	const [defaultPressed, setDefaultPressed] = React.useState(false);
	const [outlinePressed, setOutlinePressed] = React.useState(false);
	const [ghostPressed, setGhostPressed] = React.useState(false);

	return (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Default
				</h4>
				<Toggle
					variant="default"
					pressed={defaultPressed}
					onPressedChange={setDefaultPressed}
				>
					<Bold className="h-4 w-4" />
					Bold
				</Toggle>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Outline
				</h4>
				<Toggle
					variant="outline"
					pressed={outlinePressed}
					onPressedChange={setOutlinePressed}
				>
					<Italic className="h-4 w-4" />
					Italic
				</Toggle>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Ghost
				</h4>
				<Toggle
					variant="ghost"
					pressed={ghostPressed}
					onPressedChange={setGhostPressed}
				>
					<Underline className="h-4 w-4" />
					Underline
				</Toggle>
			</div>
		</div>
	);
}

export function SizesExample() {
	const [smallPressed, setSmallPressed] = React.useState(false);
	const [defaultPressed, setDefaultPressed] = React.useState(false);
	const [largePressed, setLargePressed] = React.useState(false);

	return (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Small
				</h4>
				<Toggle
					size="sm"
					pressed={smallPressed}
					onPressedChange={setSmallPressed}
				>
					<Heart className="h-3 w-3" />
				</Toggle>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Default
				</h4>
				<Toggle
					size="base"
					pressed={defaultPressed}
					onPressedChange={setDefaultPressed}
				>
					<Star className="h-4 w-4" />
				</Toggle>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Large
				</h4>
				<Toggle
					size="lg"
					pressed={largePressed}
					onPressedChange={setLargePressed}
				>
					<Bookmark className="h-5 w-5" />
				</Toggle>
			</div>
		</div>
	);
}

export function PlayPauseExample() {
	const [isPlaying, setIsPlaying] = React.useState(false);

	return (
		<Toggle pressed={isPlaying} onPressedChange={setIsPlaying} size="lg">
			{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
			{isPlaying ? "Pause" : "Play"}
		</Toggle>
	);
}

export function MuteExample() {
	const [isMuted, setIsMuted] = React.useState(false);

	return (
		<Toggle pressed={isMuted} onPressedChange={setIsMuted} variant="ghost">
			{isMuted ? (
				<VolumeX className="h-4 w-4" />
			) : (
				<Volume2 className="h-4 w-4" />
			)}
		</Toggle>
	);
}

export function DisabledExample() {
	return (
		<div className="space-y-4">
			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Disabled (Unpressed)
				</h4>
				<Toggle disabled pressed={false}>
					<Bold className="h-4 w-4" />
					Bold
				</Toggle>
			</div>

			<div>
				<h4 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
					Disabled (Pressed)
				</h4>
				<Toggle disabled pressed={true}>
					<Italic className="h-4 w-4" />
					Italic
				</Toggle>
			</div>
		</div>
	);
}

export function ToolbarExample() {
	const [formatting, setFormatting] = React.useState({
		bold: false,
		italic: false,
		underline: false,
	});

	return (
		<div className="flex items-center gap-1 p-1 border  dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950">
			<Toggle
				size="sm"
				pressed={formatting.bold}
				onPressedChange={(pressed) =>
					setFormatting((prev) => ({ ...prev, bold: pressed }))
				}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={formatting.italic}
				onPressedChange={(pressed) =>
					setFormatting((prev) => ({ ...prev, italic: pressed }))
				}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={formatting.underline}
				onPressedChange={(pressed) =>
					setFormatting((prev) => ({ ...prev, underline: pressed }))
				}
			>
				<Underline className="h-4 w-4" />
			</Toggle>
		</div>
	);
}
