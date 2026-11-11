import { ApiTable, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";

import { ApertoDemo } from "@/components/aperto-demo";
import { ApertoVariants } from "@/components/aperto-variants";
import { ComponentFrame } from "@/components/component-frame";
import { InstallBlock } from "@/components/install-block";
import { apertoMedia } from "@/lib/aperto-media";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("aperto");

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
    <Aperto.Group media={media} dismissible={{ threshold: 120, velocity: 600 }}>
      {media.map((item, index) => (
        <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
      ))}
    </Aperto.Group>
  );
}`;

export default function ApertoPage() {
  return (
    <ComponentFrame demo={<ApertoDemo media={apertoMedia} />} slug="aperto">
      <ApertoVariants />
      <InstallBlock
        command="npm i @patternmode/aperto motion lucide-react"
        example={apertoExample}
        lead="Pass the media once to the group. Each thumbnail only needs its index."
      />
      <DocsBlock title="Core API">
        <ApiTable sections={apertoApi} />
      </DocsBlock>
      <p className="read-more">
        Read the package README for primitive composition, media renderers, and motion presets.
      </p>
    </ComponentFrame>
  );
}
