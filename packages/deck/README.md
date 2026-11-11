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

The rules live in `@layer components`, so your own utilities override them.
The published `styles.css` is compiled and needs no Tailwind; the shadcn
registry item ships the source stylesheet, which needs Tailwind CSS v4.

Use `mode="cycle"` for a repeating Deck, or `mode="finite"` when advanced Cards should exhaust into `Deck.Empty`.

## Keyboard

The Deck is one tab stop. When it has focus, the active card shows a `--ring`
outline.

| Key         | Action                                                             |
| ----------- | ------------------------------------------------------------------ |
| Left arrow  | Sends the active card off to the left and brings up the next one.  |
| Right arrow | Sends the active card off to the right and brings up the next one. |

Both arrows move forward through the deck; the arrow only chooses which side
the card leaves by. A direction left out of `allowedDirections` ignores its
arrow, and `disabled` ignores both. In `mode="finite"` the last advance shows
`Deck.Empty`.

Screen readers hear the Deck as a slider named by its `aria-label`, and each
card as its place in the deck, such as "Card 2 of 6". Give a `Deck.Card` an
`aria-label` to have it announced by name instead, such as "Light study, 2 of
6"; the card is then exposed as a labelled group.

## Cards that arrive later

Deck watches its children. A `Deck.Card` that appears after the first render,
because a fetch resolved or an agent streamed one more result, rises up into the
stack from beneath instead of popping in. Cards present at first render and
cards the deck has already shown never animate in. Pass `enter="none"` to place
late cards instantly.

```tsx
<Deck mode="finite" enter="rise">
  {results.map((result) => (
    <Deck.Card key={result.id}>{result.title}</Deck.Card>
  ))}
  <Deck.Empty>Waiting for more</Deck.Empty>
</Deck>
```

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
