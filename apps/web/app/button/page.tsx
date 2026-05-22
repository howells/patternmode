import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import { ButtonDemo } from "@/components/button-demo";

const buttonApi: ApiSection[] = [
	{
		name: "Button",
		description: "Single control primitive with responsive sizing and slots.",
		props: [
			{
				name: "variant",
				type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "brand"',
				defaultValue: '"default"',
				description: "Sets the semantic color treatment.",
			},
			{
				name: "appearance",
				type: '"solid" | "outline" | "ghost" | "dashed" | "transparent" | "input"',
				defaultValue: '"solid"',
				description: "Adjusts border, fill, and surface behavior.",
			},
			{
				name: "size",
				type: "ButtonSize | ResponsiveSize",
				defaultValue: '"base"',
				description:
					'Accepts static sizes, icon sizes, or breakpoint objects such as { base: "sm", md: "lg" }.',
			},
			{
				name: "responsiveMode",
				type: '"viewport" | "container"',
				defaultValue: '"viewport"',
				description:
					"Chooses viewport media queries or named container-query sizing.",
			},
			{
				name: "asChild",
				type: "boolean",
				defaultValue: "false",
				description: "Merges Button behavior onto a child element.",
			},
			{
				name: "loading",
				type: "boolean",
				defaultValue: "false",
				description:
					"Shows the spinner, sets busy state, and disables the control.",
			},
			{
				name: "icon / suffixIcon",
				type: "ComponentType<SVGProps<SVGSVGElement>>",
				description: "Adds leading and trailing SVG icons.",
			},
		],
	},
];

const buttonExample = `import { Button } from "@howells/button";
import "@howells/button/styles.css";

function SaveAction() {
  return (
    <Button icon={PlusIcon} suffixIcon={ArrowRightIcon}>
      Add item
    </Button>
  );
}`;

export default function ButtonPage() {
	return (
		<ComponentPage
			description="Responsive controls with icons, loading states, slots, dots, and predictable sizing."
			title="Button"
		>
			<ButtonDemo />
			<DocsBlock title="Install">
				<CodeBlock install>npm install @howells/button</CodeBlock>
				<CodeBlock>{buttonExample}</CodeBlock>
			</DocsBlock>
			<DocsBlock title="Core API">
				<ApiTable sections={buttonApi} />
			</DocsBlock>
		</ComponentPage>
	);
}
