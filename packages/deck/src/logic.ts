import type { DeckItem, DeckMode, SwipeDirection } from "./types";

export interface SwipeDecisionInput {
	allowedDirections: SwipeDirection[];
	distanceThreshold: number;
	offsetX: number;
	velocityThreshold: number;
	velocityX: number;
	width: number;
}

export interface SwipeDecision {
	accepted: boolean;
	direction: SwipeDirection;
}

export function getVisibleDeckItems(
	items: DeckItem[],
	index: number,
	visibleCount: number,
	mode: DeckMode,
): DeckItem[] {
	if (items.length === 0 || visibleCount <= 0) {
		return [];
	}

	if (mode === "finite") {
		return items.slice(index, index + visibleCount);
	}

	const start = normalizeIndex(index, items.length);
	return Array.from(
		{ length: Math.min(visibleCount, items.length) },
		(_, depth) => {
			const itemIndex = (start + depth) % items.length;
			return items[itemIndex] as DeckItem;
		},
	);
}

export function getNextDeckIndex(
	index: number,
	length: number,
	mode: DeckMode,
): number {
	if (length <= 0) {
		return 0;
	}

	const next = index + 1;
	return mode === "cycle" ? next % length : Math.min(next, length);
}

export function getSwipeDecision(input: SwipeDecisionInput): SwipeDecision {
	const width = Math.max(input.width, 1);
	const distanceThreshold =
		input.distanceThreshold <= 1
			? width * input.distanceThreshold
			: input.distanceThreshold;
	const distanceAccepted = Math.abs(input.offsetX) >= distanceThreshold;
	const velocityAccepted = Math.abs(input.velocityX) >= input.velocityThreshold;
	const primaryMovement =
		Math.abs(input.offsetX) >= Math.abs(input.velocityX) / 4
			? input.offsetX
			: input.velocityX;
	const direction: SwipeDirection = primaryMovement < 0 ? "left" : "right";
	const directionAllowed = input.allowedDirections.includes(direction);

	return {
		accepted: directionAllowed && (distanceAccepted || velocityAccepted),
		direction,
	};
}

export function resolveCardRotation(id: string, spread: number): number {
	if (spread <= 0) {
		return 0;
	}

	const hash = hashString(id);
	const normalized = hash / 0xffffffff;
	return Number(((normalized * 2 - 1) * spread).toFixed(3));
}

export function getVisualDepth(
	item: DeckItem,
	visibleItems: DeckItem[],
): number {
	return visibleItems.findIndex((visibleItem) => visibleItem.id === item.id);
}

function normalizeIndex(index: number, length: number): number {
	return ((index % length) + length) % length;
}

function hashString(value: string): number {
	let hash = 2166136261;

	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}
