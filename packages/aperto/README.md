# @patternmode/aperto

Opinionated, styled thumbnail-to-expanded media transitions for React.

```tsx
import { Aperto, type ApertoMediaItem } from "@patternmode/aperto";
import "@patternmode/aperto/styles.css";

const media: ApertoMediaItem[] = [
  {
    type: "image",
    src: "/images/studio-large.jpg",
    thumbnailSrc: "/images/studio-thumb.jpg",
    alt: "Ceramic vessels on a linen-covered studio table",
    title: "Studio table",
  },
  {
    type: "video",
    src: "/videos/room-study.mp4",
    thumbnailSrc: "/images/room-study-thumb.jpg",
    poster: "/images/room-study-poster.jpg",
    alt: "A slow interior pan across a quiet room",
    title: "Room study",
  },
];

export function MediaGroupExample() {
  return (
    <Aperto.Group media={media} dismissible={{ threshold: 120, velocity: 600 }}>
      {media.map((item, index) => (
        <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
      ))}
    </Aperto.Group>
  );
}
```

## Optimized images

Aperto's built-in image renderer uses a plain `img` so the package stays
framework agnostic. If your app uses Next.js, pass `renderImage` and return
your own `next/image` `Image` component:

```tsx
import Image from "next/image";

const leadSrc = media[0]?.src;

<Aperto.Group
  media={media}
  renderImage={({ alt, item, src, variant }) => {
    const isLeadImage = variant === "expanded" || item.src === leadSrc;

    return (
      <Image
        alt={alt ?? ""}
        fetchPriority={isLeadImage ? "high" : "auto"}
        fill
        loading={isLeadImage || variant === "thumbnail" ? "eager" : "lazy"}
        sizes={variant === "thumbnail" ? "(max-width: 640px) 50vw, 320px" : "90vw"}
        src={String(src)}
      />
    );
  }}
>
  {media.map((item, index) => (
    <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
  ))}
</Aperto.Group>;
```

## Panel shape and aspect ratio

The expanded panel takes its shape from the active item's `width`/`height`.
Set them to the aspect ratio you want the panel to hold — they are a ratio,
not pixel dimensions, so `width: 1, height: 1` and `width: 1200, height: 1200`
both produce a square panel:

```tsx
const media: ApertoMediaItem[] = [
  {
    type: "image",
    src: "/images/swatch-1600.jpg",
    thumbnailSrc: "/images/swatch-400.jpg",
    alt: "Herringbone weave",
    // Square panel — matches a square-cropped (object-cover) thumbnail, so
    // the shared-element morph never re-frames the image.
    width: 1,
    height: 1,
  },
];
```

Omitting `width`/`height` falls back to a 3:2 panel.

The declared ratio is honoured under every viewport constraint: the media box
refuses to flex-shrink inside the panel and derives its size budget from the
panel's own height cap, minus room for the caption stack. Three CSS custom
properties tune this without forking the stylesheet:

- `--aperto-panel-max-h` — the panel's height cap (default `min(90vh, 920px)`)
- `--aperto-caption-allowance` — vertical room reserved for title /
  description / counter (default `6rem`)
- `--aperto-expanded-width` — the media's preferred width (default `76vw`)

Set them via `classNames.content` or any ancestor.

## Seamless expansion

The in-flight transition clone always renders `thumbnailSrc` (falling back to
`src`) — those pixels are already decoded and on screen, so the morph is
seamless even when the full-size `src` hasn't loaded yet.

For the beat _after_ the morph, while the full-size asset is still loading,
layer the thumbnail underneath it in `renderImage` so there is never a blank
frame. Keep both variants on the same crop (`object-fit: cover` with matching
aspect) so nothing re-frames.

With `next/image`, also pin one **fixed** `sizes` value for every
thumbnail-sourced render — the grid tile, the clone (`variant: "thumbnail"`),
and the expanded underlay. `sizes` decides the srcset candidate, so any
divergence produces a different URL and defeats the cache reuse that makes the
morph seamless:

```tsx
renderImage={({ alt, item, src, variant }) =>
  variant === "expanded" ? (
    <>
      <Image alt="" aria-hidden className="object-cover" fill sizes={THUMB_SIZES} src={item.thumbnailSrc ?? String(src)} />
      <Image alt={alt ?? item.alt} className="object-cover" fill loading="eager" sizes="1600px" src={String(src)} />
    </>
  ) : (
    <Image alt={alt ?? item.alt} className="object-cover" fill sizes={THUMB_SIZES} src={String(src)} />
  )
}
```

## Install

```bash
pnpm add @patternmode/aperto
```

React and React DOM are peer dependencies.

## Drag dismissal

Expanded media can be dismissed by dragging past a distance or velocity
threshold. Pass `dismissible={false}` to disable drag dismissal, or pass
`{ threshold, velocity }` to tune the gesture.

## Primitive transitions

Use the Aperto Primitive API for custom shared-element dialogs that are not
Media Transitions. `Aperto.Primitive.Content` is centered by default; pass
`placement="none"` when the panel should own its own positioning.
