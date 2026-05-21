import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	DocsBlock,
	Intro,
	LinkSet,
	PageShell,
	ProductSection,
} from "@howells/site-ui";
import { ApertoDemo, type CatalogMediaItem } from "@/components/aperto-demo";
import { StacksheetDemo } from "@/components/stacksheet-demo";

const apertoMedia: CatalogMediaItem[] = [
	{
		id: "light-study",
		type: "image",
		src: "/media/light-study.jpg",
		thumbnailSrc: "/media/light-study.jpg",
		alt: "A blade of afternoon light crossing the floor of an empty concrete room",
		title: "Light study",
		description: "A narrow window cuts a line across polished concrete.",
	},
	{
		id: "stone-kitchen",
		type: "image",
		src: "/media/stone-kitchen.jpg",
		thumbnailSrc: "/media/stone-kitchen.jpg",
		alt: "A single dark vessel on a raw stone counter beneath a clerestory window",
		title: "Stone kitchen",
		description: "Rough stone, smooth plaster, and one vessel.",
	},
	{
		id: "corridor",
		type: "image",
		src: "/media/corridor.jpg",
		thumbnailSrc: "/media/corridor.jpg",
		alt: "A concrete corridor converging toward a square of bright daylight",
		title: "Corridor",
		description: "Poured concrete narrows toward a window of white light.",
	},
	{
		id: "stone-bath",
		type: "video",
		src: "/media/stone-bath.mp4",
		thumbnailSrc: "/media/stone-bath.jpg",
		poster: "/media/stone-bath.jpg",
		alt: "Steam rising from a sunken stone bath in a minimal plaster room",
		title: "Stone bath",
		description: "Still water, rough stone, and slow steam.",
	},
];

const stacksheetApi: ApiSection[] = [
	{
		name: "createStacksheet",
		description: "Creates an isolated sheet stack instance.",
		props: [
			{
				name: "config",
				type: "StacksheetConfig",
				description:
					"Side, width, modal behavior, drag settings, snap points, and spring presets.",
			},
			{
				name: "StacksheetProvider",
				type: "Component",
				description:
					"Wraps the app and renders the stack portal. Pass registered sheets and optional class overrides.",
			},
			{
				name: "useSheet",
				type: "Hook",
				description:
					"Returns open, push, navigate, replace, swap, pop, and close actions.",
			},
		],
	},
	{
		name: "Sheet",
		description: "Composable panel parts for custom layouts.",
		props: [
			{
				name: "Header / Body / Footer",
				type: "Components",
				description: "Panel regions with scroll and drag handling.",
			},
			{
				name: "Back / Close",
				type: "Components",
				description: "Built-in navigation controls for nested stacks.",
			},
		],
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
				name: "navigationMotion",
				type: '"float" | "glide" | "snap"',
				defaultValue: '"glide"',
				description: "Expanded-media transition style.",
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

const stacksheetExample = `import { createStacksheet } from "@howells/stacksheet";
import "@howells/stacksheet/styles.css";

const { StacksheetProvider, useSheet } = createStacksheet<{
  Settings: { title: string };
}>();

function OpenSettings() {
  const { open } = useSheet();
  return (
    <button onClick={() => open("Settings", "settings", { title: "Settings" })}>
      Open
    </button>
  );
}`;

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

export default function Home() {
	return (
		<PageShell>
			<Intro
				description="A small catalog for focused React interface tools."
				links={
					<LinkSet>
						<a href="#stacksheet">Stacksheet</a>
						<a href="#aperto">Aperto</a>
					</LinkSet>
				}
				title="Patternmode"
			/>

			<ProductSection
				description="Typed sheet stacks with push, navigate, replace, and composable panel parts."
				id="stacksheet"
				title="Stacksheet"
			>
				<StacksheetDemo />
				<DocsBlock title="Install">
					<CodeBlock install>npm install @howells/stacksheet</CodeBlock>
					<CodeBlock>{stacksheetExample}</CodeBlock>
				</DocsBlock>
				<DocsBlock title="Core API">
					<ApiTable sections={stacksheetApi} />
				</DocsBlock>
				<p className="read-more">
					Read the package README for callbacks, snap points, accessibility, and
					styling details.
				</p>
			</ProductSection>

			<ProductSection
				description="Thumbnail-to-expanded media transitions with image, video, and keyboard navigation."
				id="aperto"
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
					Read the package README for primitive composition, media renderers,
					and motion presets.
				</p>
			</ProductSection>
		</PageShell>
	);
}
