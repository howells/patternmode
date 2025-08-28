"use client";

import { useState } from "react";
import { SortableList } from "./component";
import type { SortableListItem, SortableListProps } from "./types";

export function SortableListPreview(props: Partial<SortableListProps>) {
	const [items, setItems] = useState<SortableListItem[]>(
		props.items || [
			{ id: "1", label: "ID", active: true },
			{ id: "2", label: "URI", active: true },
			{ id: "3", label: "Navigation Label", active: true },
			{ id: "4", label: "Link", active: true },
			{ id: "5", label: "Ancestors", active: false },
			{ id: "6", label: "Authors", active: false },
			{ id: "7", label: "Date Created", active: false },
			{ id: "8", label: "Date Updated", active: false },
		],
	);

	return (
		<div className="w-full max-w-md mx-auto">
			<SortableList
				items={items}
				onChange={setItems}
				showDragHandle={props.showDragHandle ?? true}
				showCheckbox={props.showCheckbox ?? true}
				allowReorder={props.allowReorder ?? true}
				size={props.size ?? "base"}
				className={props.className}
			/>

			<div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
				<h4 className="text-sm font-medium mb-2">Active Items (in order):</h4>
				<ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
					{items
						.filter((item) => item.active)
						.map((item, index) => (
							<li key={item.id}>
								{index + 1}. {item.label}
							</li>
						))}
				</ul>
				{items.filter((item) => item.active).length === 0 && (
					<p className="text-sm text-zinc-500 italic">No items selected</p>
				)}
			</div>
		</div>
	);
}

export const sortableListPreviewProps = [
	{
		name: "showDragHandle",
		type: "boolean",
		description: "Whether to show the drag handle for reordering.",
		defaultValue: true,
	},
	{
		name: "showCheckbox",
		type: "boolean",
		description: "Whether to show checkboxes for selection.",
		defaultValue: true,
	},
	{
		name: "allowReorder",
		type: "boolean",
		description: "Whether to allow drag-and-drop reordering.",
		defaultValue: true,
	},
	{
		name: "size",
		type: '"sm" | "base" | "lg"',
		description: "Size variant of the list items.",
		defaultValue: "base",
	},
];
