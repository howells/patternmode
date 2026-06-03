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
