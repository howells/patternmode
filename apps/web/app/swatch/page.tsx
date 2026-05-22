import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import { SwatchDemo } from "@/components/swatch-demo";

const swatchApi: ApiSection[] = [
	{
		name: "Swatch",
		description:
			"Visual swatch primitive for solid colors, gradients, images, and weighted palettes.",
		props: [
			{
				name: "color",
				type: "string",
				description: "CSS color value used for a solid swatch fill.",
			},
			{
				name: "background",
				type: "string",
				description:
					"CSS background shorthand. Takes precedence over color and colors.",
			},
			{
				name: "colors",
				type: "Array<string | { color: string; ratio?: number }>",
				description:
					"Renders multiple color stops as one weighted palette fill.",
			},
			{
				name: "shape",
				type: '"circle" | "pill" | "square"',
				defaultValue: '"circle"',
				description: "Controls the rendered silhouette.",
			},
			{
				name: "size",
				type: '"2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"',
				defaultValue: '"base"',
				description: "Sets the swatch dimensions.",
			},
			{
				name: "selected",
				type: "boolean",
				defaultValue: "false",
				description: "Shows selected state and optional icon overlay.",
			},
			{
				name: "onRemove",
				type: "() => void",
				description: "Adds a hover/focus remove affordance.",
			},
		],
	},
];

const swatchExample = `import { Swatch } from "@howells/swatch";
import "@howells/swatch/styles.css";

function PalettePreview() {
  return (
    <Swatch
      aria-label="Palette"
      colors={[
        { color: "#315c4b", ratio: 60 },
        { color: "#e1ebe5", ratio: 40 },
      ]}
      shape="pill"
      size="2xl"
    />
  );
}`;

export default function SwatchPage() {
	return (
		<ComponentPage
			description="Color, gradient, image, and weighted palette swatches with selection, remove, unavailable, and contrast-aware states."
			title="Swatch"
		>
			<SwatchDemo />
			<DocsBlock title="Install">
				<CodeBlock install>npm install @howells/swatch</CodeBlock>
				<CodeBlock>{swatchExample}</CodeBlock>
			</DocsBlock>
			<DocsBlock title="Core API">
				<ApiTable sections={swatchApi} />
			</DocsBlock>
		</ComponentPage>
	);
}
