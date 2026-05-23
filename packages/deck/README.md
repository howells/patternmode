# @patternmode/deck

Composable Deck primitives for React.

```tsx
import { Deck } from "@patternmode/deck";
import "@patternmode/deck/styles.css";

export function Example() {
	return (
		<Deck mode="cycle" visibleCount={3} onAdvance={({ direction }) => console.log(direction)}>
			<Deck.Card key="one">One</Deck.Card>
			<Deck.Card key="two">Two</Deck.Card>
			<Deck.Card key="three">Three</Deck.Card>
			<Deck.Empty>No cards left</Deck.Empty>
		</Deck>
	);
}
```

Use `mode="cycle"` for a repeating Deck, or `mode="finite"` when advanced Cards should exhaust into `Deck.Empty`.
