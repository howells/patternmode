"use client";

import { Tag, type TagItem, TagSelector } from "@patternmode/tags";
import { useState } from "react";

const options: TagItem[] = [
	{ id: "accessible", label: "Accessible", variant: "secondary" },
	{ id: "shadcn-compatible", label: "Shadcn compatible", variant: "outline" },
	{ id: "searchable", label: "Searchable", variant: "secondary" },
	{ id: "command-menu", label: "Command menu", variant: "default" },
	{ id: "paste-friendly", label: "Paste friendly", variant: "outline" },
	{ id: "reusable", label: "Reusable", variant: "secondary" },
	{ id: "keyboard-first", label: "Keyboard first", variant: "outline" },
	{ disabled: true, id: "locked", label: "Locked", variant: "ghost" },
];

function createTag(label: string): TagItem {
	return {
		id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		label,
		variant: "outline",
	};
}

export function TagsDemo() {
	const [tags, setTags] = useState<TagItem[]>([
		options[0] as TagItem,
		options[5] as TagItem,
	]);
	const [restrictedTags, setRestrictedTags] = useState<TagItem[]>([
		options[3] as TagItem,
	]);

	return (
		<div className="tags-demo">
			<div className="tags-demo-cell">
				<div className="tags-demo-label">Selector</div>
				<TagSelector
					aria-label="Component tags"
					onChange={setTags}
					onCreateItem={createTag}
					options={options}
					placeholder="Add tags"
					value={tags}
				/>
				<p className="tags-demo-note">
					Search, create from the menu, create from separators, paste, and
					toggle selected options.
				</p>
			</div>

			<div className="tags-demo-cell">
				<div className="tags-demo-label">Known options</div>
				<TagSelector
					aria-label="Known tags"
					onChange={setRestrictedTags}
					options={options}
					placeholder="Choose tags"
					value={restrictedTags}
				/>
			</div>

			<div className="tags-demo-cell">
				<div className="tags-demo-label">Badge variants</div>
				<div className="tags-demo-row">
					<Tag variant="default">Default</Tag>
					<Tag variant="secondary">Secondary</Tag>
					<Tag variant="destructive">Destructive</Tag>
					<Tag variant="outline">Outline</Tag>
					<Tag variant="ghost">Ghost</Tag>
					<Tag variant="link">Link</Tag>
				</div>
			</div>

			<div className="tags-demo-cell">
				<div className="tags-demo-label">Sizes</div>
				<div className="tags-demo-row">
					<Tag size="sm">Small</Tag>
					<Tag size="base" selected variant="outline">
						Base
					</Tag>
					<Tag size="lg" onRemove={() => undefined}>
						Large
					</Tag>
				</div>
			</div>
		</div>
	);
}
