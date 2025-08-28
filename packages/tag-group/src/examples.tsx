"use client";

import { Tag } from "@patternmode/tag";
import * as React from "react";
import { TagGroup } from "./component";

export const DefaultExample = () => (
	<TagGroup>
		<Tag value="Design" />
		<Tag value="Development" />
		<Tag value="Marketing" />
	</TagGroup>
);

export const DismissibleExample = () => {
	const [tags, setTags] = React.useState([
		{ id: 1, value: "React" },
		{ id: 2, value: "TypeScript" },
		{ id: 3, value: "Tailwind" },
	]);
	const handleDismiss = (tagId: number) =>
		setTags((prev) => prev.filter((t) => t.id !== tagId));
	return (
		<TagGroup>
			{tags.map((tag) => (
				<Tag
					key={tag.id}
					value={tag.value}
					dismissible
					onDismiss={() => handleDismiss(tag.id)}
				/>
			))}
		</TagGroup>
	);
};

export const AlignmentExample = () => (
	<div className="space-y-4 w-full">
		<TagGroup justify="start" className="w-full">
			<Tag value="Left" />
			<Tag value="Aligned" />
		</TagGroup>
		<TagGroup justify="center" className="w-full">
			<Tag value="Center" />
			<Tag value="Aligned" />
		</TagGroup>
		<TagGroup justify="end" className="w-full">
			<Tag value="Right" />
			<Tag value="Aligned" />
		</TagGroup>
	</div>
);

export const DirectionExample = () => (
	<div className="flex gap-8">
		<div>
			<h4 className="text-sm font-medium mb-2">Row (default)</h4>
			<TagGroup direction="row">
				<Tag value="Horizontal" />
				<Tag value="Layout" />
				<Tag value="Tags" />
			</TagGroup>
		</div>
		<div>
			<h4 className="text-sm font-medium mb-2">Column</h4>
			<TagGroup direction="column">
				<Tag value="Vertical" />
				<Tag value="Layout" />
				<Tag value="Tags" />
			</TagGroup>
		</div>
	</div>
);

export const CustomGapExample = () => (
	<div className="space-y-4">
		<TagGroup gap={1}>
			<Tag value="Tight" />
			<Tag value="Spacing" />
			<Tag value="Tags" />
		</TagGroup>
		<TagGroup gap={4}>
			<Tag value="Wide" />
			<Tag value="Spacing" />
			<Tag value="Tags" />
		</TagGroup>
	</div>
);

export const LabeledTagsExample = () => (
	<TagGroup>
		<Tag label="Department" value="Engineering" />
		<Tag label="Location" value="San Francisco" />
		<Tag label="Team" value="Frontend" />
	</TagGroup>
);

export const TagsWithCountExample = () => (
	<TagGroup>
		<Tag value="JavaScript" count={42} />
		<Tag value="Python" count={28} />
		<Tag value="Go" count={15} />
	</TagGroup>
);

export const MixedOverrideExample = () => {
	const [tags, setTags] = React.useState([
		{ id: 1, value: "Inherited Dismissible", canDismiss: true },
		{ id: 2, value: "Override to Non-dismissible", canDismiss: false },
		{ id: 3, value: "Back to Dismissible", canDismiss: true },
	]);
	const handleDismiss = (tagId: number) =>
		setTags((prev) => prev.filter((t) => t.id !== tagId));
	return (
		<TagGroup dismissible onDismiss={() => {}}>
			{tags.map((tag) => (
				<Tag
					key={tag.id}
					value={tag.value}
					dismissible={tag.canDismiss}
					onDismiss={tag.canDismiss ? () => handleDismiss(tag.id) : undefined}
				/>
			))}
		</TagGroup>
	);
};
