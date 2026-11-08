import { ApiTable, CodeBlock, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import { Thumbnail } from "@patternmode/thumbnail";
import type { Metadata } from "next";

import { ComponentFrame } from "@/components/component-frame";
import { CopyCommand } from "@/components/copy-command";
import { VariantCell, VariantsBlock } from "@/components/variant-cells";

export const metadata: Metadata = {
  description: "Framed images with an inset hairline, optional lift, and flexible sizing.",
  title: "Thumbnail | Patternmode",
};

const image = "/media/light-study.jpg";
const imageDescription = "Sunlight crossing the floor of a room with textured earth walls";

const thumbnailApi: ApiSection[] = [
  {
    description: "A media frame with an inset edge. Accepts ordinary span props and a ref.",
    name: "Thumbnail",
    props: [
      {
        description: "Image URL. Renders a plain image element.",
        name: "src",
        type: "string",
      },
      {
        defaultValue: '""',
        description: "Image description; use an empty string when adjacent text describes it.",
        name: "alt",
        type: "string",
      },
      {
        description: "Your own image, video, or canvas. Takes precedence over src.",
        name: "children",
        type: "ReactNode",
      },
      {
        defaultValue: '"2rem"',
        description:
          "Square edge length. Numbers are pixels; null lets the media determine height.",
        name: "size",
        type: "number | string | null",
      },
      {
        defaultValue: '"3px"',
        description: "Corner radius. Numbers are pixels.",
        name: "radius",
        type: "number | string",
      },
      {
        defaultValue: '"cover"',
        description: "Crop to fill the frame or keep the whole image visible.",
        name: "fit",
        type: '"cover" | "contain"',
      },
      {
        defaultValue: '"center"',
        description: "Object position for an off-centre crop.",
        name: "position",
        type: "string",
      },
      {
        defaultValue: "false",
        description: "Adds a small downward shadow to separate the image from its surface.",
        name: "raised",
        type: "boolean",
      },
    ],
  },
];

const example = `import { Thumbnail } from "@patternmode/thumbnail";
import "@patternmode/thumbnail/styles.css";

// Fixed-size image in a row.
<Thumbnail src="/room.jpg" alt="Sunlit room" size={48} />;

// Preserve the photograph's aspect ratio.
<Thumbnail
  src="/room.jpg"
  alt="Sunlit room"
  size={null}
  className="w-full"
  raised
/>;`;

/* The picture's own shape waits in the reference, beside the fixed sizes. */
const ThumbnailVariants = () => (
  <VariantsBlock
    id="thumbnail-variants-title"
    lead="Square at a fixed size by default, so a list stays even."
  >
    <VariantCell code='size={null} fit="contain"' name="Original aspect ratio">
      <Thumbnail
        alt={imageDescription}
        className="thumbnail-demo-image"
        fit="contain"
        size={null}
        src={image}
      />
    </VariantCell>
  </VariantsBlock>
);

const ThumbnailDemo = () => (
  <div className="thumbnail-demo">
    <div className="thumbnail-demo-pair">
      {[false, true].map((raised) => (
        <figure className="thumbnail-demo-example" key={String(raised)}>
          <Thumbnail alt={imageDescription} raised={raised} size={128} src={image} />
          <figcaption>{raised ? "Inset edge with lift" : "Inset edge"}</figcaption>
        </figure>
      ))}
    </div>
    <fieldset aria-label="Thumbnail sizes" className="thumbnail-demo-sizes">
      {[32, 48, 64, 96].map((size) => (
        <figure className="thumbnail-demo-example" key={size}>
          <Thumbnail alt="" size={size} src={image} />
          <figcaption>{size}px</figcaption>
        </figure>
      ))}
    </fieldset>
  </div>
);

export default function ThumbnailPage() {
  return (
    <ComponentFrame demo={<ThumbnailDemo />} slug="thumbnail">
      <ThumbnailVariants />
      <DocsBlock title="Install">
        <CopyCommand command="npm install @patternmode/thumbnail" />
        <CodeBlock>{example}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={thumbnailApi} />
      </DocsBlock>
    </ComponentFrame>
  );
}
