"use client";

import React from "react";
import { getDynamicIconByName, IconSelect, useIconSelect } from "./component";

export const DefaultExample = () => {
	const [selectedIcon, setSelectedIcon] = React.useState<string>("");

	return (
		<div className="w-full max-w-96 space-y-4">
			<IconSelect
				value={selectedIcon}
				onValueChange={setSelectedIcon}
				placeholder="Choose an icon..."
			/>
			{selectedIcon && (
				<div className="flex items-center gap-2 text-sm text-zinc-600">
					<span>Selected:</span>
					<code className="bg-zinc-100 px-2 py-1 rounded text-xs">
						{selectedIcon}
					</code>
				</div>
			)}
		</div>
	);
};

export const WithValueExample = () => {
	const [selectedIcon, setSelectedIcon] = React.useState<string>("Camera");

	return (
		<div className="w-full max-w-96 space-y-4">
			<IconSelect
				value={selectedIcon}
				onValueChange={setSelectedIcon}
				placeholder="Choose an icon..."
			/>
			<div className="flex items-center gap-2 text-sm text-zinc-600">
				<span>Selected:</span>
				<code className="bg-zinc-100 px-2 py-1 rounded text-xs">
					{selectedIcon}
				</code>
			</div>
		</div>
	);
};

export const CustomPlaceholderExample = () => {
	const [selectedIcon, setSelectedIcon] = React.useState<string>("");

	return (
		<div className="w-full max-w-96 space-y-4">
			<IconSelect
				value={selectedIcon}
				onValueChange={setSelectedIcon}
				placeholder="Select a button icon..."
			/>
			{selectedIcon && (
				<div className="flex items-center gap-2 text-sm text-zinc-600">
					<span>Selected:</span>
					<code className="bg-zinc-100 px-2 py-1 rounded text-xs">
						{selectedIcon}
					</code>
				</div>
			)}
		</div>
	);
};

export const DisabledExample = () => {
	return (
		<div className="w-full max-w-96">
			<IconSelect
				value="Settings"
				disabled={true}
				placeholder="This is disabled..."
			/>
		</div>
	);
};

export const HookExample = () => {
	const { value, setValue, DynamicIconComponent } = useIconSelect("Heart");

	return (
		<div className="w-full max-w-96 space-y-4">
			<IconSelect
				value={value}
				onValueChange={setValue}
				placeholder="Choose an icon..."
			/>

			<div className="space-y-3">
				<div className="flex items-center gap-2 text-sm text-zinc-600">
					<span>Selected:</span>
					<code className="bg-zinc-100 px-2 py-1 rounded text-xs">
						{value || "None"}
					</code>
				</div>

				{DynamicIconComponent && (
					<div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg">
						<span className="text-sm text-zinc-600">Rendered icon:</span>
						<DynamicIconComponent className="w-6 h-6 text-blue-500" />
					</div>
				)}
			</div>
		</div>
	);
};

export const SizesExample = () => {
	const [xsValue, setXsValue] = React.useState<string>("");
	const [smValue, setSmValue] = React.useState<string>("");
	const [baseValue, setBaseValue] = React.useState<string>("");
	const [lgValue, setLgValue] = React.useState<string>("");

	return (
		<div className="w-full max-w-96 space-y-4">
			<div className="w-44">
				<label className="block text-xs font-medium mb-1">Extra Small</label>
				<IconSelect
					size="xs"
					value={xsValue}
					onValueChange={setXsValue}
					placeholder="Extra small icon select"
				/>
			</div>

			<div className="w-48">
				<label className="block text-xs font-medium mb-1">Small</label>
				<IconSelect
					size="sm"
					value={smValue}
					onValueChange={setSmValue}
					placeholder="Small icon select"
				/>
			</div>

			<div className="w-56">
				<label className="block text-sm font-medium mb-1">Base (Default)</label>
				<IconSelect
					size="base"
					value={baseValue}
					onValueChange={setBaseValue}
					placeholder="Base icon select"
				/>
			</div>

			<div className="w-64">
				<label className="block text-base font-medium mb-1">Large</label>
				<IconSelect
					size="lg"
					value={lgValue}
					onValueChange={setLgValue}
					placeholder="Large icon select"
				/>
			</div>
		</div>
	);
};

export const DynamicIconExample = () => {
	const [iconName, setIconName] = React.useState<string>("Star");

	// Create dynamic icon components
	const StarIcon = getDynamicIconByName("Star");
	const HeartIcon = getDynamicIconByName("Heart");
	const BellIcon = getDynamicIconByName("Bell");

	return (
		<div className="w-full max-w-96 space-y-4">
			<IconSelect
				value={iconName}
				onValueChange={setIconName}
				placeholder="Choose an icon to render..."
			/>

			<div className="space-y-3">
				<div className="text-sm text-zinc-600">Dynamic icon rendering:</div>

				<div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-sm text-zinc-500">Current:</span>
						{(() => {
							const CurrentIcon = getDynamicIconByName(iconName);
							return <CurrentIcon className="w-6 h-6 text-blue-500" />;
						})()}
					</div>

					<div className="w-px h-6 bg-zinc-300" />

					<div className="flex items-center gap-2">
						<span className="text-sm text-zinc-500">Static examples:</span>
						<StarIcon className="w-5 h-5 text-yellow-500" />
						<HeartIcon className="w-5 h-5 text-red-500" />
						<BellIcon className="w-5 h-5 text-green-500" />
					</div>
				</div>
			</div>
		</div>
	);
};
