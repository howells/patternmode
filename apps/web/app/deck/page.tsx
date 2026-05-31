import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import type { Metadata } from "next";
import { DeckDemo } from "@/components/deck-demo";

export const metadata: Metadata = {
	title: "Deck | Patternmode",
	description:
		"Card decks with cyclic stacks, finite advance flows, velocity gestures, and keyboard control.",
};

const deckApi: ApiSection[] = [
	{
		name: "Deck",
		description: "Root deck with finite and cyclic advance modes.",
		props: [
			{
				name: "mode",
				type: '"cycle" | "finite"',
				defaultValue: '"cycle"',
				description: "Whether cards wrap forever or exhaust into Deck.Empty.",
			},
			{
				name: "index",
				type: "number",
				description: "Controlled active card index.",
			},
			{
				name: "defaultIndex",
				type: "number",
				defaultValue: "0",
				description: "Initial active card for uncontrolled decks.",
			},
			{
				name: "visibleCount",
				type: "number",
				defaultValue: "3",
				description: "Number of cards rendered in the visual stack.",
			},
			{
				name: "onAdvance",
				type: "(event: DeckAdvanceEvent) => void",
				description:
					"Called when the active card advances by drag or keyboard.",
			},
		],
	},
	{
		name: "Deck.Card",
		description: "A card child rendered into the animated stack.",
		props: [
			{
				name: "children",
				type: "ReactNode",
				required: true,
				description: "Card content.",
			},
			{
				name: "className",
				type: "string",
				description: "Class passed to the rendered motion card.",
			},
		],
	},
];

const deckExample = `import { Deck } from "@patternmode/deck";
import "@patternmode/deck/styles.css";

export function ProjectDeck() {
  return (
    <Deck mode="cycle" visibleCount={3} onAdvance={({ direction }) => console.log(direction)}>
      <Deck.Card key="one">One</Deck.Card>
      <Deck.Card key="two">Two</Deck.Card>
      <Deck.Card key="three">Three</Deck.Card>
      <Deck.Empty>No cards left</Deck.Empty>
    </Deck>
  );
}`;

export default function DeckPage() {
	return (
		<ComponentPage
			description="Card decks that merge cyclic stacks, finite advance flows, velocity gestures, keyboard control, and deterministic motion."
			title="Deck"
		>
			<DeckDemo />
			<DocsBlock title="Install">
				<CodeBlock install>npm install @patternmode/deck</CodeBlock>
				<CodeBlock>{deckExample}</CodeBlock>
			</DocsBlock>
			<DocsBlock title="Core API">
				<ApiTable sections={deckApi} />
			</DocsBlock>
		</ComponentPage>
	);
}
