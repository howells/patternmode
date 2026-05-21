# @howells/deck

Composable swipeable deck and card stack primitives for React.

```tsx
import { Deck } from "@howells/deck";
import "@howells/deck/styles.css";

export function Example() {
	return (
		<Deck mode="cycle" visibleCount={3} onSwipe={({ direction }) => console.log(direction)}>
			<Deck.Card key="one">One</Deck.Card>
			<Deck.Card key="two">Two</Deck.Card>
			<Deck.Card key="three">Three</Deck.Card>
			<Deck.Empty>No cards left</Deck.Empty>
		</Deck>
	);
}
```

Use `mode="cycle"` for an infinite carousel-style stack, or `mode="finite"` when swiped cards should exhaust into `Deck.Empty`.
