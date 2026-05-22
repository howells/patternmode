import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import { ApertoDemo } from "@/components/aperto-demo";
import { apertoMedia } from "@/lib/aperto-media";

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
				name: "dismissible",
				type: "boolean | { threshold?: number; velocity?: number }",
				defaultValue: "true",
				description: "Drag-to-dismiss behavior for the expanded media surface.",
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
