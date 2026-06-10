import { ApiTable, CodeBlock, ComponentDocsShell, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { ApertoDemo } from "@/components/aperto-demo";
import { apertoMedia } from "@/lib/aperto-media";

export const metadata: Metadata = {
  description:
    "Thumbnail-to-expanded media transitions with image, video, and keyboard navigation.",
  title: "Aperto | Patternmode",
};

const apertoApi: ApiSection[] = [
  {
    description: "Media Group with keyboard Media Navigation and shared-element transitions.",
    name: "Aperto.Group",
    props: [
      {
        description: "Array of Image Media Items or Video Media Items.",
        name: "media",
        required: true,
        type: "ApertoMediaItem[]",
      },
      {
        defaultValue: '"smooth"',
        description: "Media Transition easing preset.",
        name: "motion",
        type: '"snappy" | "smooth" | "bouncy"',
      },
      {
        defaultValue: '"glide"',
        description: "Expanded-media navigation transition style.",
        name: "navigationMotion",
        type: '"float" | "glide" | "snap"',
      },
      {
        defaultValue: "true",
        description: "Drag Dismissal behavior for Expanded Media.",
        name: "dismissible",
        type: "boolean | { threshold?: number; velocity?: number }",
      },
      {
        description: "Slot class overrides for Thumbnails and Aperto Controls.",
        name: "classNames",
        type: "ApertoClassNames",
      },
      {
        description:
          "Replaces Aperto's framework-agnostic img renderer. Next.js consumers can return next/image Image here.",
        name: "renderImage",
        type: "RenderImage",
      },
    ],
  },
  {
    description: "Thumbnail for a Media Item inside a Media Group.",
    name: "Aperto.Thumbnail",
    props: [
      {
        description: "Position in the Media Group.",
        name: "index",
        required: true,
        type: "number",
      },
      {
        description: "Optional custom thumbnail content.",
        name: "children",
        type: "ReactNode",
      },
    ],
  },
];

const apertoExample = `import { Aperto, type ApertoMediaItem } from "@patternmode/aperto";
import "@patternmode/aperto/styles.css";

const media: ApertoMediaItem[] = [
  { id: "photo", type: "image", src: "/photo.jpg", alt: "Photo" },
];

export function MediaGroupExample() {
  return (
    <Aperto.Group media={media} navigationMotion="glide">
      {media.map((item, index) => (
        <Aperto.Thumbnail key={item.id} index={index} />
      ))}
    </Aperto.Group>
  );
}`;

export default function ApertoPage() {
  return (
    <ComponentDocsShell
      description="Thumbnail-to-expanded media transitions with image, video, and keyboard navigation."
      title="Aperto"
    >
      <ApertoDemo media={apertoMedia} />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/aperto</CodeBlock>
        <CodeBlock>{apertoExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={apertoApi} />
      </DocsBlock>
      <p className="read-more">
        Read the package README for primitive composition, media renderers, and motion presets.
      </p>
    </ComponentDocsShell>
  );
}
