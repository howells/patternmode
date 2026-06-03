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

## Optimized images

Deck renders card children unchanged. If your cards contain images, compose the
image component your app already uses. In Next.js, put `next/image` `Image`
inside each `Deck.Card`:

```tsx
import { Deck } from "@patternmode/deck";
import Image from "next/image";

export function ImageDeck({ items }: { items: { alt: string; id: string; src: string }[] }) {
  return (
    <Deck aria-label="Project images" mode="cycle">
      {items.map((item, index) => (
        <Deck.Card key={item.id}>
          <Image
            alt={item.alt}
            fill
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 78vw, 420px"
            src={item.src}
          />
        </Deck.Card>
      ))}
    </Deck>
  );
}
```
