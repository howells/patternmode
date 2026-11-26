import type { ApiSection } from "@/components/docs-blocks";

import { DeckDemo } from "@/components/deck-demo";
import { DeckVariants } from "@/components/deck-variants";
import { PackageDocs } from "@/components/package-docs";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("deck");

const deckApi: ApiSection[] = [
  {
    description: "Root deck with finite and cyclic advance modes.",
    name: "Deck",
    props: [
      {
        defaultValue: '"cycle"',
        description: "Whether cards wrap forever or exhaust into Deck.Empty.",
        name: "mode",
        type: '"cycle" | "finite"',
      },
      {
        description: "Controlled active card index.",
        name: "index",
        type: "number",
      },
      {
        defaultValue: "0",
        description: "Initial active card for uncontrolled decks.",
        name: "defaultIndex",
        type: "number",
      },
      {
        defaultValue: "3",
        description: "Number of cards rendered in the visual stack.",
        name: "visibleCount",
        type: "number",
      },
      {
        description: "Called when the active card advances by drag or keyboard.",
        name: "onAdvance",
        type: "(event: DeckAdvanceEvent) => void",
      },
    ],
  },
  {
    description: "A card child rendered into the animated stack.",
    name: "Deck.Card",
    props: [
      {
        description:
          "Card content rendered unchanged. Next.js consumers can place their own next/image Image inside the card.",
        name: "children",
        required: true,
        type: "ReactNode",
      },
      {
        description: "Class passed to the rendered motion card.",
        name: "className",
        type: "string",
      },
    ],
  },
];

const deckExample = `import { Deck } from "@patternmode/deck";
import "@patternmode/deck/styles.css";

<Deck
  aria-label="Project cards"
  mode="cycle"
  visibleCount={3}
  onAdvance={({ direction }) => console.log(direction)}
>
  <Deck.Card key="one">One</Deck.Card>
  <Deck.Card key="two">Two</Deck.Card>
  <Deck.Empty>No cards left</Deck.Empty>
</Deck>`;

export default function DeckPage() {
  return (
    <PackageDocs
      api={deckApi}
      demo={<DeckDemo />}
      example={deckExample}
      installLead="Cards render their children unchanged, so use the image component your app already has."
      slug="deck"
      variants={<DeckVariants />}
    />
  );
}
