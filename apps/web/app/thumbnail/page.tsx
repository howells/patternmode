import { ApiTable, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import { Thumbnail } from "@patternmode/thumbnail";

import { ComponentFrame } from "@/components/component-frame";
import { InstallBlock } from "@/components/install-block";
import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import { componentMetadata } from "@/lib/catalogue";
import "./thumbnail.css";

export const metadata = componentMetadata("thumbnail");

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

<Thumbnail src={thumbHref} alt="" size={32} />

<Thumbnail size={null} fit="contain">
  <Image src={previewHref} alt={caption} width={640} height={640} />
</Thumbnail>`;

const LIGHT_ROWS = [
  { image: "/media/light-study.jpg", name: "Light study", raised: false },
  { image: "/media/concrete-room.jpg", name: "Concrete room", raised: false },
  { image: "/media/slit-window.jpg", name: "Slit window, raised", raised: true },
];

const DARK_ROWS = [
  { image: "/media/earth-corridor.jpg", name: "Earth corridor", raised: false },
  { image: "/media/warm-chamber.jpg", name: "Warm chamber", raised: false },
  { image: "/media/rammed-light.jpg", name: "Rammed light", raised: false },
];

/* Two lists of the same rows, one on a light card and one on a dark card. The
   alt text is empty: each row's own title already names the picture. */
const ThumbnailDemo = () => (
  <div className="thumbnail-demo">
    {[
      { dark: false, rows: LIGHT_ROWS },
      { dark: true, rows: DARK_ROWS },
    ].map(({ dark, rows }) => (
      <ul className="thumbnail-demo-card" data-dark={dark ? "" : undefined} key={String(dark)}>
        {rows.map((row) => (
          <li className="thumbnail-demo-row" key={row.name}>
            <Thumbnail alt="" raised={row.raised} src={row.image} />
            <span className="thumbnail-demo-name">{row.name}</span>
            <span className="thumbnail-demo-size">1264 × 848</span>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

/* The picture's own shape waits in the reference, beside the fixed sizes. */
const ThumbnailVariants = () => (
  <VariantsBlock
    id="thumbnail-variants-title"
    lead="Square at a fixed size by default, so a list stays even. Every value is a custom property."
  >
    <VariantCell code="default" name="Inset edge">
      <div className="thumbnail-ground">
        <Thumbnail alt={imageDescription} size={72} src={image} />
      </div>
    </VariantCell>
    <VariantCell code="raised" name="Inset edge with lift">
      <div className="thumbnail-ground">
        <Thumbnail alt={imageDescription} raised size={72} src={image} />
      </div>
    </VariantCell>
    <VariantCell code="radius={12}" name="Larger radius">
      <div className="thumbnail-ground">
        <Thumbnail alt={imageDescription} radius={12} size={72} src="/media/concrete-room.jpg" />
      </div>
    </VariantCell>
    <VariantCell code='fit="contain"' name="Whole picture">
      <div className="thumbnail-ground">
        <Thumbnail
          alt={imageDescription}
          className="thumbnail-contained"
          fit="contain"
          size={72}
          src="/media/slit-window.jpg"
        />
      </div>
    </VariantCell>
    <VariantCell code="size={null}" name="Sized by the picture">
      <div className="thumbnail-ground">
        <Thumbnail
          alt={imageDescription}
          className="thumbnail-unsized"
          size={null}
          src="/media/earth-corridor.jpg"
        />
      </div>
    </VariantCell>
    <VariantCell code="edge turns to a highlight" name="Dark mode">
      <div className="thumbnail-ground thumbnail-ground--dark">
        <Thumbnail alt={imageDescription} size={72} src="/media/rammed-light.jpg" />
      </div>
    </VariantCell>
  </VariantsBlock>
);

export default function ThumbnailPage() {
  return (
    <ComponentFrame demo={<ThumbnailDemo />} slug="thumbnail">
      <ThumbnailVariants />
      <InstallBlock
        command="npm i @patternmode/thumbnail"
        example={example}
        lead="Pass src for a plain img, or children for your own media element. Needs Tailwind CSS v4."
      />
      <DocsBlock title="Core API">
        <ApiTable sections={thumbnailApi} />
      </DocsBlock>
    </ComponentFrame>
  );
}
