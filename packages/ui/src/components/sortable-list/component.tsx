"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cx } from "../../utils/cx";
import { Checkbox } from "../checkbox/component";
import type { SortableListItem, SortableListProps } from "./types";

/**
 * Individual sortable item component
 */
const SortableItem = ({
	item,
	showDragHandle,
	showCheckbox,
	size,
	onToggle,
}: {
	item: SortableListItem;
	showDragHandle: boolean;
	showCheckbox: boolean;
	size: "sm" | "base" | "lg";
	onToggle: (itemId: string, checked: boolean) => void;
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: item.id,
		disabled: item.disabled,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const getSizeClasses = () => {
		switch (size) {
			case "sm":
				return "text-sm py-1.5 px-2";
			case "lg":
				return "text-base py-3 px-4";
			default:
				return "text-sm py-2 px-3";
		}
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cx(
				"flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 transition-all bg-white dark:bg-zinc-950",
				getSizeClasses(),
				"hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
				// Dragging state
				isDragging && "opacity-50 shadow-lg z-50",
				// Disabled state
				item.disabled && "opacity-50 cursor-not-allowed",
			)}
		>
			{/* Drag Handle */}
			{showDragHandle && (
				<div
					className={cx(
						"flex-shrink-0 text-zinc-400 dark:text-zinc-600 touch-none",
						item.disabled
							? "cursor-not-allowed"
							: "cursor-grab active:cursor-grabbing",
					)}
					{...attributes}
					{...listeners}
				>
					<GripVertical
						className={
							size === "sm"
								? "h-3.5 w-3.5"
								: size === "lg"
									? "h-5 w-5"
									: "h-4 w-4"
						}
					/>
				</div>
			)}

			{/* Checkbox */}
			{showCheckbox && (
				<Checkbox
					checked={item.active || false}
					onCheckedChange={(checked) => onToggle(item.id, checked as boolean)}
					disabled={item.disabled}
				/>
			)}

			{/* Label */}
			<span
				className={cx(
					"flex-1 select-none",
					item.disabled && "text-zinc-400 dark:text-zinc-600",
				)}
			>
				{item.label}
			</span>
		</div>
	);
};

/**
 * A sortable list component with checkboxes and drag-and-drop reordering
 */
export const SortableList = ({
	items: initialItems,
	onChange,
	showDragHandle = true,
	allowReorder = true,
	showCheckbox = true,
	className,
	size = "base",
}: SortableListProps) => {
	const [items, setItems] = useState<SortableListItem[]>(initialItems);

	// Configure sensors for drag and drop
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	// Update internal state when props change
	useEffect(() => {
		setItems(initialItems);
	}, [initialItems]);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (!over || active.id === over.id) {
				return;
			}

			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);

			const newItems = arrayMove(items, oldIndex, newIndex);
			setItems(newItems);
			onChange?.(newItems);
		},
		[items, onChange],
	);

	const handleToggle = useCallback(
		(itemId: string, checked: boolean) => {
			const newItems = items.map((item) =>
				item.id === itemId ? { ...item, active: checked } : item,
			);
			setItems(newItems);
			onChange?.(newItems);
		},
		[items, onChange],
	);

	if (!allowReorder) {
		// Render without DnD context if reordering is disabled
		return (
			<div className={cx("w-full", className)} data-testid="sortable-list">
				{items.map((item) => (
					<div
						key={item.id}
						className={cx(
							"flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 transition-all",
							size === "sm"
								? "text-sm py-1.5 px-2"
								: size === "lg"
									? "text-base py-3 px-4"
									: "text-sm py-2 px-3",
							"hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
							item.disabled && "opacity-50 cursor-not-allowed",
						)}
					>
						{showCheckbox && (
							<Checkbox
								checked={item.active || false}
								onCheckedChange={(checked) =>
									handleToggle(item.id, checked as boolean)
								}
								disabled={item.disabled}
							/>
						)}
						<span
							className={cx(
								"flex-1 select-none",
								item.disabled && "text-zinc-400 dark:text-zinc-600",
							)}
						>
							{item.label}
						</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={cx("w-full", className)} data-testid="sortable-list">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={items.map((item) => item.id)}
					strategy={verticalListSortingStrategy}
				>
					{items.map((item) => (
						<SortableItem
							key={item.id}
							item={item}
							showDragHandle={showDragHandle && allowReorder}
							showCheckbox={showCheckbox}
							size={size}
							onToggle={handleToggle}
						/>
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};

SortableList.displayName = "SortableList";
