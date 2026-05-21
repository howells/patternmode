"use client";

import { Deck, type DeckMode, type SwipeDirection } from "@howells/deck";
import { useState } from "react";

const cards = [
	{
		id: "archive",
		kicker: "Research",
		title: "Material archive",
		description:
			"Collect loose references, compare surfaces, and keep the next candidate close behind the active card.",
		tone: "green",
	},
	{
		id: "studio",
		kicker: "Studio",
		title: "Light study",
		description:
			"A tactile card that can cycle forever, useful for prompts, concepts, photos, or profile stacks.",
		tone: "ochre",
	},
	{
		id: "review",
		kicker: "Review",
		title: "Shortlist pass",
		description:
			"Switch to finite mode when the gesture means yes/no progression through a bounded queue.",
		tone: "clay",
	},
	{
		id: "handoff",
		kicker: "Handoff",
		title: "Ready state",
		description:
			"Events expose the index, direction, next index, mode, and stable item id for real workflows.",
		tone: "ink",
	},
];

function OptionBar<T extends string | number>({
	label,
	onChange,
	options,
	value,
}: {
	label: string;
	onChange: (value: T) => void;
	options: { label: string; value: T }[];
	value: T;
}) {
	return (
		<fieldset className="option-bar">
			<legend className="option-bar-label">{label}</legend>
			{options.map((option) => (
				<button
					aria-pressed={value === option.value}
					className="option-bar-item"
					key={String(option.value)}
					onClick={() => onChange(option.value)}
					type="button"
				>
					{option.label}
				</button>
			))}
		</fieldset>
	);
}

export function DeckDemo() {
	const [mode, setMode] = useState<DeckMode>("cycle");
	const [visibleCount, setVisibleCount] = useState(3);
	const [lastSwipe, setLastSwipe] = useState<SwipeDirection | "none">("none");

	return (
		<div className="deck-demo">
			<div className="deck-stage">
				<Deck
					aria-label="Patternmode deck demo"
					className="deck-surface"
					key={mode}
					mode={mode}
					onSwipe={({ direction }) => setLastSwipe(direction)}
					renderOverlay={({ active, direction }) =>
						active && direction ? (
							<span className="deck-swipe-badge">{direction}</span>
						) : null
					}
					rotation={7}
					visibleCount={visibleCount}
				>
					{cards.map((card) => (
						<Deck.Card
							className="deck-demo-card"
							data-tone={card.tone}
							key={card.id}
						>
							<span>{card.kicker}</span>
							<h3>{card.title}</h3>
							<p>{card.description}</p>
						</Deck.Card>
					))}
					<Deck.Empty>
						<div className="deck-empty-state">
							<h3>No cards left</h3>
							<p>Switch back to cycle mode to keep the stack moving.</p>
						</div>
					</Deck.Empty>
				</Deck>
			</div>

			<div className="aperto-controls">
				<OptionBar
					label="Mode"
					onChange={setMode}
					options={[
						{ label: "Cycle", value: "cycle" as const },
						{ label: "Finite", value: "finite" as const },
					]}
					value={mode}
				/>
				<OptionBar
					label="Visible"
					onChange={setVisibleCount}
					options={[
						{ label: "2", value: 2 },
						{ label: "3", value: 3 },
						{ label: "4", value: 4 },
					]}
					value={visibleCount}
				/>
				<p className="deck-demo-state">Last swipe: {lastSwipe}</p>
			</div>
		</div>
	);
}
