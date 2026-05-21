import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import { ApertoDemo, type CatalogMediaItem } from "@/components/aperto-demo";

const apertoMedia: CatalogMediaItem[] = [
	{
		id: "earth-corridor",
		type: "image",
		src: "/media/earth-corridor.jpg",
		thumbnailSrc: "/media/earth-corridor.jpg",
		alt: "A rammed earth corridor with a ceramic vase and wooden bench between tall slit windows",
		title: "Earth corridor",
		description: "Rammed earth, narrow light slits, and a single vessel.",
	},
	{
		id: "light-study",
		type: "image",
		src: "/media/light-study.jpg",
		thumbnailSrc: "/media/light-study.jpg",
		alt: "A blade of warm light falling across a polished floor from a slit in rammed earth walls",
		title: "Light study",
		description: "A narrow opening cuts a line across polished concrete.",
	},
	{
		id: "rammed-light",
		type: "image",
		src: "/media/rammed-light.jpg",
		thumbnailSrc: "/media/rammed-light.jpg",
		alt: "A rammed earth room with tall vertical windows casting warm light across a built-in bench",
		title: "Rammed light",
		description: "Earth walls, tall slits, and a low stone bench.",
	},
	{
		id: "concrete-room",
		type: "image",
		src: "/media/concrete-room.jpg",
		thumbnailSrc: "/media/concrete-room.jpg",
		alt: "A concrete and clay plaster room with a clerestory window flooding warm light onto a wooden bench",
		title: "Concrete room",
		description: "Clay plaster meets poured concrete under a clerestory.",
	},
	{
		id: "slit-window",
		type: "image",
		src: "/media/slit-window.jpg",
		thumbnailSrc: "/media/slit-window.jpg",
		alt: "Warm afternoon light entering through a vertical slit in a rammed earth wall",
		title: "Slit window",
		description: "A single opening washes warm light across earth.",
	},
	{
		id: "warm-chamber",
		type: "image",
		src: "/media/warm-chamber.jpg",
		thumbnailSrc: "/media/warm-chamber.jpg",
		alt: "A contemplative concrete chamber with a wooden bench beneath a beam of warm daylight",
		title: "Warm chamber",
		description: "Concrete walls, one bench, and a shaft of light.",
	},
];

const apertoApi: ApiSection[] = [
	{
		name: "Aperto.Group",
		description:
			"Gallery with keyboard navigation and shared-element transitions.",
		props: [
			{
				name: "media",
				type: "ApertoMediaItem[]",
				required: true,
				description: "Array of image or video items.",
			},
			{
				name: "motion",
				type: '"snappy" | "smooth" | "bouncy"',
				defaultValue: '"smooth"',
				description: "Open/close transition easing preset.",
			},
			{
				name: "navigationMotion",
				type: '"float" | "glide" | "snap"',
				defaultValue: '"glide"',
				description: "Expanded-media navigation transition style.",
			},
			{
				name: "classNames",
				type: "ApertoClassNames",
				description:
					"Slot class overrides for thumbnails and overlay controls.",
			},
		],
	},
	{
		name: "Aperto.Thumbnail",
		description: "Individual thumbnail trigger inside a group.",
		props: [
			{
				name: "index",
				type: "number",
				required: true,
				description: "Position in the media array.",
			},
			{
				name: "children",
				type: "ReactNode",
				description: "Optional custom thumbnail content.",
			},
		],
	},
];

const apertoExample = `import { Aperto, type ApertoMediaItem } from "@howells/aperto";
import "@howells/aperto/styles.css";

const media: ApertoMediaItem[] = [
  { id: "photo", type: "image", src: "/photo.jpg", alt: "Photo" },
];

export function Gallery() {
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
		<ComponentPage
			description="Thumbnail-to-expanded media transitions with image, video, and keyboard navigation."
			title="Aperto"
		>
			<ApertoDemo media={apertoMedia} />
			<DocsBlock title="Install">
				<CodeBlock install>npm install @howells/aperto</CodeBlock>
				<CodeBlock>{apertoExample}</CodeBlock>
			</DocsBlock>
			<DocsBlock title="Core API">
				<ApiTable sections={apertoApi} />
			</DocsBlock>
			<p className="read-more">
				Read the package README for primitive composition, media renderers, and
				motion presets.
			</p>
		</ComponentPage>
	);
}
