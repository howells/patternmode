# @howells/aperto

Opinionated, styled thumbnail-to-expanded media transitions for React.

```tsx
import { Aperto, type ApertoMediaItem } from "@howells/aperto";
import "@howells/aperto/styles.css";

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

export function PreviewGrid() {
  return (
    <Aperto.Group media={media} dismissible={{ threshold: 120, velocity: 600 }}>
      {media.map((item, index) => (
        <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
      ))}
    </Aperto.Group>
  );
}
```

## Install

```bash
pnpm add @howells/aperto
```

React and React DOM are peer dependencies.

## Drag dismissal

Expanded media can be dismissed by dragging past a distance or velocity
threshold. Pass `dismissible={false}` to disable drag dismissal, or pass
`{ threshold, velocity }` to tune the gesture.

## Primitive transitions

Use `Aperto.Primitive` for custom shared-element dialogs that are not media
lightboxes. `Aperto.Primitive.Content` is centered by default; pass
`placement="none"` when the panel should own its own positioning.
