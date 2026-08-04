# @patternmode/thumbnail

A framed image — an inset hairline and an optional whisper of lift.

A photograph with an edge drawn _inside_ it reads as a window onto the image.
The same photograph inside an outer border reads as a form field containing one.
That is the whole component, and it is the reason imagery in an application so
often fails to look like imagery: it gets a `border` because everything else on
the screen has one.

```bash
npm install @patternmode/thumbnail
```

```tsx
import { Thumbnail } from "@patternmode/thumbnail";
import "@patternmode/thumbnail/styles.css";

<Thumbnail src={thumbHref} alt="" size={32} />;
```

Requires Tailwind CSS v4.

## What it already handles

So you don't rebuild something that is one import away:

|                     |                                                                                                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The edge holds**  | Painted by an overlay pseudo-element, never `box-shadow: inset` on the frame. An inset shadow is drawn _behind_ the frame's children, so a picture that fills the box hides it — correct in a skeleton, gone in production. |
| **Any image**       | Pass `children` and the frame clips and edges whatever it is given: a framework `<Image>`, a `<video>`, a `<canvas>`. It does not wrap, clone or intercept props.                                                           |
| **Dark mode**       | The edge inverts to a highlight, because on a dark surface that is what reads as a shadow falling inside an opening. Black-on-dark is invisible.                                                                            |
| **No baseline gap** | The media is `display: block`, so the frame does not measure 4px taller at the bottom than it does anywhere else.                                                                                                           |
| **Clipping**        | `overflow: hidden`, so the radius reaches the picture rather than curving the hairline around square corners.                                                                                                               |

## Sizing

Square at `size` by default — a thumbnail is a stamp of fixed footprint, and a
picture that sizes itself is what makes a list ragged.

`size={null}` hands sizing back to the caller, for the one case that needs it: a
preview whose height follows the photograph's own aspect ratio.

```tsx
<Thumbnail size={null} fit="contain">
  <Image src={previewHref} alt={caption} width={640} height={640} />
</Thumbnail>
```

## Props

| Prop       | Type                       | Default   |                                                                                 |
| ---------- | -------------------------- | --------- | ------------------------------------------------------------------------------- |
| `src`      | `string`                   | —         | Renders a plain `<img>`. Omit and pass `children` instead.                      |
| `alt`      | `string`                   | `""`      | Empty is often correct — if the row already names the thing, a repeat is noise. |
| `children` | `ReactNode`                | —         | Your own media element. Wins over `src`.                                        |
| `size`     | `number \| string \| null` | `"2rem"`  | Numbers are pixels. `null` hands sizing back.                                   |
| `radius`   | `number \| string`         | `3px`     |                                                                                 |
| `fit`      | `"cover" \| "contain"`     | `"cover"` |                                                                                 |
| `position` | `string`                   | `center`  | `object-position`, for a crop that is not from the centre.                      |
| `raised`   | `boolean`                  | `false`   | One tight downward layer. Not a card shadow.                                    |

## Theming

Every value is a custom property, so nothing here needs forking:

| Property                         | Default                                            |
| -------------------------------- | -------------------------------------------------- |
| `--patternmode-thumbnail-frame`  | `rgb(0 0 0 / 0.1)`, `rgb(255 255 255 / 0.12)` dark |
| `--patternmode-thumbnail-lift`   | `0 1px 2px -1px rgb(0 0 0 / 0.12)`                 |
| `--patternmode-thumbnail-radius` | `3px`                                              |
| `--patternmode-thumbnail-size`   | `2rem`                                             |

The frame colour is a **transparent** black rather than a border token on
purpose. It sits over whatever the photograph happens to be, and a solid colour
either disappears against a dark image or cuts a hard line across a pale one. A
translucent edge darkens whatever is underneath it by the same proportion
everywhere, which is why one value holds across a grid of unrelated pictures.

The dark default rides `prefers-color-scheme` rather than `light-dark()`, since
`light-dark()` silently resolves to light unless the host has declared
`color-scheme` and a package cannot assume that. If your theme is class-based,
set `--patternmode-thumbnail-frame` on your own selector — that beats the media
query cleanly, with neither fighting the other.

```css
.dark {
  --patternmode-thumbnail-frame: rgb(255 255 255 / 0.12);
}
```

## When not to use it

On an image that is the subject of its own screen. A hero photograph does not
want a frame; it wants the whole box. This is for pictures that live _in_
something — a row, a grid, a card, a picker.

## License

MIT
